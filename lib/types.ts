import type { Message as AIMessage } from "ai/react"

// From mentor_templates table
export type MentorTemplate = {
  id: string
  name: string
  category: string
  description: string
  personality: string
  gradient: string
  system_prompt: string
  avatar?: string // Assuming you might add an avatar URL to your table
  is_premium: boolean
  created_at: string
  updated_at: string
}

// From custom_mentors table
export type CustomMentor = {
  id: string
  user_id: string
  name: string
  description: string
  personality: string
  system_prompt: string
  ai_model: string
  is_public: boolean
  created_at: string
  updated_at: string
}

// A unified type for display in the UI
export type DisplayMentor = {
  id: string
  name: string
  description: string
  system_prompt: string
  avatar?: string
  isCustom: boolean
  is_premium?: boolean // Optional, only for templates
}

// From conversations table
export type Conversation = {
  id: string
  user_id: string
  mentor_id: string
  mentor_type: "template" | "custom"
  title: string
  created_at: string
  updated_at: string
}

// The AI SDK Message type is used directly
export type Message = AIMessage
