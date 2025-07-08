"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updateProfile(formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login?message=You must be logged in to update your profile")
  }

  const fullName = formData.get("fullName") as string
  const avatarFile = formData.get("avatar") as File

  const profileData: { full_name?: string; avatar_url?: string } = {}
  const userMetaData: { avatar_url?: string; full_name?: string } = {}

  if (avatarFile && avatarFile.size > 0) {
    const fileName = `${user.id}/${Date.now()}`
    const { error: uploadError } = await supabase.storage.from("avatars").upload(fileName, avatarFile)

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError)
      return redirect("/account?message=Error uploading avatar. Please try again.")
    }

    const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(fileName)

    if (publicUrlData) {
      profileData.avatar_url = publicUrlData.publicUrl
      userMetaData.avatar_url = publicUrlData.publicUrl
    }
  }

  if (fullName) {
    profileData.full_name = fullName
    userMetaData.full_name = fullName
  }

  // Update profiles table
  if (Object.keys(profileData).length > 0) {
    const { error: profileError } = await supabase.from("profiles").update(profileData).eq("id", user.id)
    if (profileError) {
      console.error("Error updating profile:", profileError)
      return redirect("/account?message=Error updating profile.")
    }
  }

  // Update user metadata in auth for consistency
  if (Object.keys(userMetaData).length > 0) {
    const { error: userError } = await supabase.auth.updateUser({
      data: userMetaData,
    })
    if (userError) {
      console.error("Error updating user metadata:", userError)
      // This is not critical, so we don't show an error to the user
    }
  }

  revalidatePath("/account")
  revalidatePath("/") // To update header avatar
  return redirect("/account?message=Profile updated successfully!")
}
