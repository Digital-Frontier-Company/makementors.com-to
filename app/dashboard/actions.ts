"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteMentorAction(mentorId: string) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to delete a mentor." }
  }

  const { error } = await supabase.from("mentors").delete().match({ id: mentorId, user_id: user.id })

  if (error) {
    return { error: `Failed to delete mentor: ${error.message}` }
  }

  revalidatePath("/dashboard")
  return { success: "Mentor deleted successfully." }
}
