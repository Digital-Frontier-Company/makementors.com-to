import type React from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { ChatInput } from "./chat-input"
import type { DisplayMentor, Message } from "@/lib/types"

interface ChatProps {
  messages: Message[]
  selectedMentor: DisplayMentor
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}

export function Chat({ messages, selectedMentor, input, handleInputChange, handleSubmit, isLoading }: ChatProps) {
  return (
    <div className="flex flex-col justify-between w-full h-full bg-dark">
      <header className="border-b border-gray-800 p-4 flex justify-between items-center bg-darkest/30 backdrop-blur-sm">
        <h1 className="text-xl font-bold">{selectedMentor.name}</h1>
        {selectedMentor.isCustom && (
          <Button asChild variant="ghost" className="text-gray-400 hover:text-neon-purple">
            <Link href={`/mentors/edit/${selectedMentor.id}`}>
              <i className="fa-solid fa-pen-to-square"></i>
              <span className="sr-only">Edit Mentor</span>
            </Link>
          </Button>
        )}
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn("flex items-end gap-3", message.role === "user" ? "justify-end" : "justify-start")}
          >
            {message.role === "assistant" && (
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={selectedMentor.avatar || `/placeholder.svg?height=32&width=32&query=${selectedMentor.name}`}
                  alt={selectedMentor.name}
                />
                <AvatarFallback>{selectedMentor.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "rounded-2xl p-3 max-w-lg",
                message.role === "assistant"
                  ? "bg-gray-800 text-gray-300 rounded-bl-none"
                  : "bg-gradient-to-br from-neon-purple to-neon-cyan text-dark font-medium rounded-br-none",
              )}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end gap-3 justify-start">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={selectedMentor.avatar || `/placeholder.svg?height=32&width=32&query=${selectedMentor.name}`}
                alt={selectedMentor.name}
              />
            </Avatar>
            <div className="bg-gray-800 rounded-2xl p-3 rounded-bl-none">
              <div className="flex space-x-1">
                <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-800 bg-darkest/30 backdrop-blur-sm">
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          selectedMentor={selectedMentor}
        />
      </div>
    </div>
  )
}
