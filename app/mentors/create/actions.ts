"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createCustomMentor(formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login?message=You must be logged in to create a mentor.")
  }

  const mentorData = {
    user_id: user.id,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    personality: formData.get("personality") as string,
    system_prompt: formData.get("system_prompt") as string,
    ai_model: formData.get("ai_model") as string,
  }

  if (
    !mentorData.name ||
    !mentorData.description ||
    !mentorData.personality ||
    !mentorData.system_prompt ||
    !mentorData.ai_model
  ) {
    return redirect("/mentors/create?message=Error: All fields are required.")
  }

  const { error } = await supabase.from("custom_mentors").insert(mentorData)

  if (error) {
    console.error("Error creating custom mentor:", error)
    return redirect("/mentors/create?message=Error creating mentor. Please try again.")
  }

  revalidatePath("/") // Revalidate chat page to show new mentor
  redirect("/")
}
