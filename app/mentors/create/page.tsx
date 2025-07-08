import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import CreateMentorClientPage from "./create-mentor-client-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Custom Mentor | Make Mentors",
  description: "Design a personalized AI mentor powered by cutting-edge AI models.",
}

export default async function CreateMentorPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return <CreateMentorClientPage />
}
