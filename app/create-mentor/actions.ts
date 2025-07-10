"use server"

import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Define the schema for form validation
const mentorSchema = z.object({
  model: z.string().min(1, "AI model is required."),
  mentorName: z.string().min(3, "Mentor name must be at least 3 characters."),
  mentorDescription: z.string().min(10, "Description must be at least 10 characters."),
  expertiseLevel: z.string(),
  communicationStyle: z.string(),
  aggressiveness: z.coerce.number(),
  dailyReminders: z.boolean(),
  achievementAlerts: z.boolean(),
  sessionReminders: z.boolean(),
})

export type FormState = {
  message: string
  fields?: Record<string, string>
  issues?: string[]
}

export async function createMentorAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      message: "Authentication error: You must be logged in to create a mentor.",
      issues: ["User not found."],
    }
  }

  // Safely parse the form data
  const validatedFields = mentorSchema.safeParse({
    model: formData.get("ai-model"),
    mentorName: formData.get("mentorName"),
    mentorDescription: formData.get("mentorDescription"),
    expertiseLevel: formData.get("expertiseLevel"),
    communicationStyle: formData.get("communicationStyle"),
    aggressiveness: formData.get("aggressiveness"),
    dailyReminders: formData.get("dailyReminders") === "on",
    achievementAlerts: formData.get("achievementAlerts") === "on",
    sessionReminders: formData.get("sessionReminders") === "on",
  })

  // Return errors if validation fails
  if (!validatedFields.success) {
    const issues = validatedFields.error.issues.map((issue) => issue.message)
    return {
      message: "Please fix the errors below.",
      issues,
    }
  }

  const {
    model,
    mentorName,
    mentorDescription,
    expertiseLevel,
    communicationStyle,
    aggressiveness,
    dailyReminders,
    achievementAlerts,
    sessionReminders,
  } = validatedFields.data

  // Insert data into the 'mentors' table
  const { error } = await supabase.from("mentors").insert({
    user_id: user.id,
    name: mentorName,
    description: mentorDescription,
    model: model,
    expertise_level: expertiseLevel,
    communication_style: communicationStyle,
    aggressiveness: aggressiveness,
    daily_reminders: dailyReminders,
    achievement_alerts: achievementAlerts,
    session_reminders: sessionReminders,
  })

  if (error) {
    return {
      message: "Database error: Failed to create mentor.",
      issues: [error.message],
    }
  }

  // Revalidate the dashboard path to show the new mentor
  revalidatePath("/dashboard")

  // Return a success message
  return { message: `Successfully created mentor: ${mentorName}!` }
}
