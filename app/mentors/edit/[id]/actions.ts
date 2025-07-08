"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updateCustomMentor(mentorId: string, formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login?message=You must be logged in to update a mentor.")
  }

  const mentorData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    personality: formData.get("personality") as string,
    system_prompt: formData.get("system_prompt") as string,
  }

  const { error } = await supabase.from("custom_mentors").update(mentorData).eq("id", mentorId).eq("user_id", user.id) // Ensure user can only update their own mentors

  if (error) {
    console.error("Error updating custom mentor:", error)
    return redirect(`/mentors/edit/${mentorId}?message=Error updating mentor. Please try again.`)
  }

  revalidatePath("/") // Revalidate chat page to show updated mentor info
  revalidatePath(`/mentors/edit/${mentorId}`)
  redirect(`/mentors/edit/${mentorId}?message=Mentor updated successfully!`)
}

export async function deleteCustomMentor(mentorId: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login?message=You must be logged in to delete a mentor.")
  }

  // Optional: Delete related conversations and messages first if desired
  // For now, we'll just delete the mentor. The database schema should handle cascades.

  const { error } = await supabase.from("custom_mentors").delete().eq("id", mentorId).eq("user_id", user.id) // Ensure user can only delete their own mentors

  if (error) {
    console.error("Error deleting custom mentor:", error)
    return redirect(`/mentors/edit/${mentorId}?message=Error deleting mentor. Please try again.`)
  }

  revalidatePath("/")
  redirect("/")
}
