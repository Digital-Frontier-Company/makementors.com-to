"use client"

import type React from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import type { DisplayMentor } from "@/lib/types"

interface ChatInputProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  selectedMentor: DisplayMentor
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading, selectedMentor }: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder={`Message ${selectedMentor.name}...`}
        className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-3 px-5 text-base text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:ring-opacity-50 transition-all duration-300 h-12"
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-neon-cyan text-dark hover:bg-opacity-80 transition-all duration-300 rounded-md disabled:bg-gray-600"
        disabled={isLoading || !input.trim()}
      >
        <i className="fa-solid fa-paper-plane"></i>
      </Button>
    </form>
  )
}
