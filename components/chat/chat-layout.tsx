"use client"

import * as React from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Sidebar } from "./sidebar"
import { Chat } from "./chat"
import type { DisplayMentor, Message } from "@/lib/types"

interface ChatLayoutProps {
  defaultLayout: number[] | undefined
  navCollapsedSize: number
  mentors: DisplayMentor[]
  selectedMentor: DisplayMentor
  onMentorSelect: (mentor: DisplayMentor) => void
  messages: Message[]
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}

export function ChatLayout({
  defaultLayout = [320, 1110],
  navCollapsedSize,
  mentors,
  selectedMentor,
  onMentorSelect,
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
        }}
        className="h-full w-full max-h-screen items-stretch bg-darker"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={25}
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
          }}
          onExpand={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
          }}
          className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
        >
          <Sidebar
            isCollapsed={isCollapsed}
            links={mentors}
            selectedMentor={selectedMentor}
            onMentorSelect={onMentorSelect}
          />
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-gray-800 hover:bg-neon-cyan transition-colors" />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Chat
            selectedMentor={selectedMentor}
            messages={messages}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
