"use server"

import { z } from "zod"

// Define the schema for form validation
const mentorSchema = z.object({
  model: z.string().min(1, "AI model is required."),
  mentorName: z.string().min(3, "Mentor name must be at least 3 characters."),
  mentorDescription: z.string().min(10, "Description must be at least 10 characters."),
  expertiseLevel: z.string(),
  communicationStyle: z.string(),
  aggressiveness: z.string(),
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

  const { model, mentorName, mentorDescription, expertiseLevel, communicationStyle, aggressiveness } =
    validatedFields.data

  // --- This is where you would interact with the LLM ---
  // 1. Construct the detailed system prompt
  const systemPrompt = `
    You are an AI Mentor named ${mentorName}.

    **Your Core Task:** 
    Teach the user about: ${mentorDescription}.

    **Your Persona & Style:**
    - Your expertise level is: ${expertiseLevel}.
    - Your communication style is: ${communicationStyle}. You should be ${
      communicationStyle === "encouraging"
        ? "supportive and motivating."
        : communicationStyle === "direct"
          ? "straightforward and clear."
          : communicationStyle === "socratic"
            ? "focused on asking questions to guide the user to their own answers."
            : "friendly and relaxed."
    }
    - Your aggressiveness level is ${aggressiveness} out of 10. This means you should be ${
      Number.parseInt(aggressiveness) < 4
        ? "gentle and patient."
        : Number.parseInt(aggressiveness) > 7
          ? "intense, challenging, and push the user to their limits."
          : "balanced in your approach, providing a healthy mix of support and challenge."
    }

    Adhere to this persona strictly in all your responses.
  `

  // 2. (Simulated) Call the LLM API with the prompt
  console.log("--- Sending to LLM ---")
  console.log("AI Model:", model)
  console.log("System Prompt:", systemPrompt)
  console.log("---------------------")
  console.log("Form Data:", validatedFields.data)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 3. Save the mentor configuration to your database (not implemented here)

  // Return a success message
  return { message: `Successfully created mentor: ${mentorName}!` }
}
