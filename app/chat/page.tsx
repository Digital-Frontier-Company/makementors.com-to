"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useChat } from "ai/react"
import { ChatLayout } from "@/components/chat/chat-layout"
import { createClient } from "@/lib/supabase/client"
import type { MentorTemplate, CustomMentor, Conversation, Message, DisplayMentor } from "@/lib/types"
import type { User } from "@supabase/supabase-js"

export default function ChatPage() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [mentors, setMentors] = useState<DisplayMentor[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedMentor, setSelectedMentor] = useState<DisplayMentor | null>(null)
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)

  useEffect(() => {
    const checkUserAndFetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      // Fetch templates
      const { data: templateData, error: templateError } = await supabase.from("mentor_templates").select("*")
      if (templateError) console.error("Error fetching templates:", templateError)

      const templateMentors: DisplayMentor[] =
        templateData?.map((t: MentorTemplate) => ({
          id: t.id,
          name: t.name,
          description: t.description,
          system_prompt: t.system_prompt,
          isCustom: false,
          is_premium: t.is_premium,
        })) || []

      let customMentors: DisplayMentor[] = []
      if (user) {
        // Fetch custom mentors if user is logged in
        const { data: customData, error: customError } = await supabase
          .from("custom_mentors")
          .select("*")
          .eq("user_id", user.id)
        if (customError) console.error("Error fetching custom mentors:", customError)

        customMentors =
          customData?.map((c: CustomMentor) => ({
            id: c.id,
            name: c.name,
            description: c.description,
            system_prompt: c.system_prompt,
            isCustom: true,
          })) || []

        // Fetch conversations
        const { data: convoData, error: convoError } = await supabase
          .from("conversations")
          .select("*")
          .eq("user_id", user.id)
        if (convoError) {
          console.error("Error fetching conversations:", convoError)
        } else {
          setConversations(convoData)
        }
      }

      const allMentors = [...templateMentors, ...customMentors]
      setMentors(allMentors)
      if (allMentors.length > 0) {
        setSelectedMentor(allMentors[0])
      }
    }
    checkUserAndFetchData()
  }, [])

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/chat",
    body: {
      system_prompt: selectedMentor?.system_prompt,
    },
    async onFinish(message) {
      if (!user || !activeConversationId) return
      await supabase.from("messages").insert({
        conversation_id: activeConversationId,
        role: "assistant",
        content: message.content,
      })
    },
  })

  const handleSelectMentor = async (mentor: DisplayMentor) => {
    setSelectedMentor(mentor)
    const existingConvo = conversations.find((c) => c.mentor_id === mentor.id)

    if (existingConvo) {
      setActiveConversationId(existingConvo.id)
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", existingConvo.id)
        .order("created_at")

      if (error) {
        console.error("Error fetching messages:", error)
        setMessages([])
      } else {
        setMessages(data as Message[])
      }
    } else {
      setActiveConversationId(null)
      setMessages([]) // Start with a clean slate
    }
  }

  const handleCustomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      handleSubmit(e)
      return
    }

    let currentConversationId = activeConversationId
    if (!currentConversationId && selectedMentor) {
      const { data, error } = await supabase
        .from("conversations")
        .insert({
          user_id: user.id,
          mentor_id: selectedMentor.id,
          mentor_type: selectedMentor.isCustom ? "custom" : "template",
          title: `Chat with ${selectedMentor.name}`,
        })
        .select()
        .single()

      if (error) {
        console.error("Error creating conversation:", error)
        return
      }
      currentConversationId = data.id
      setActiveConversationId(currentConversationId)
      setConversations([...conversations, data])
    }

    if (currentConversationId) {
      await supabase.from("messages").insert({
        conversation_id: currentConversationId,
        role: "user",
        content: input,
      })
    }

    handleSubmit(e)
  }

  if (!selectedMentor) {
    return <div className="flex h-screen w-full items-center justify-center">Loading or no mentors available...</div>
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center w-full">
      <ChatLayout
        navCollapsedSize={10}
        defaultLayout={[20, 80]}
        mentors={mentors}
        selectedMentor={selectedMentor}
        onMentorSelect={handleSelectMentor}
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleCustomSubmit}
        isLoading={isLoading}
      />
    </main>
  )
}
