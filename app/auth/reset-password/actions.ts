"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." }
  }

  const supabase = createClient()

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: "Could not update password. Please try again." }
  }

  // The user is already signed in at this point from the magic link.
  // We can redirect them to the dashboard.
  redirect("/dashboard")
}
