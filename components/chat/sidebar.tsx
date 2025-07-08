"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { DisplayMentor } from "@/lib/types"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface SidebarProps {
  isCollapsed: boolean
  links: DisplayMentor[]
  selectedMentor: DisplayMentor
  onMentorSelect: (mentor: DisplayMentor) => void
}

export function Sidebar({ links, isCollapsed, selectedMentor, onMentorSelect }: SidebarProps) {
  const templateMentors = links.filter((l) => !l.isCustom)
  const customMentors = links.filter((l) => l.isCustom)

  const renderMentorLink = (link: DisplayMentor) => (
    <button
      key={link.id}
      className={cn(
        "flex items-center gap-4 w-full text-left p-3 rounded-lg transition-colors duration-200",
        selectedMentor.id === link.id
          ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30"
          : "text-gray-400 hover:bg-gray-800 hover:text-white",
        isCollapsed && "justify-center h-14 w-14",
      )}
      onClick={() => onMentorSelect(link)}
    >
      <Avatar className="flex justify-center items-center h-8 w-8">
        <AvatarImage src={link.avatar || `/placeholder.svg?height=32&width=32&query=${link.name}`} alt={link.name} />
        <AvatarFallback>{link.name.charAt(0)}</AvatarFallback>
      </Avatar>
      {!isCollapsed && <span className="truncate">{link.name}</span>}
    </button>
  )

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col h-full gap-4 p-2 bg-darkest bg-opacity-70 backdrop-blur-md border-r border-gray-800"
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <p className="font-medium text-xl">Mentors</p>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 overflow-y-auto">
        {templateMentors.map(renderMentorLink)}

        {customMentors.length > 0 && (
          <div className="my-2">
            {!isCollapsed && <Separator className="bg-gray-700" />}
            <div className="py-2 space-y-1">
              {!isCollapsed && <p className="text-sm text-gray-500 px-2 mb-2">Your Mentors</p>}
              {customMentors.map(renderMentorLink)}
            </div>
          </div>
        )}
      </nav>

      <div className="mt-auto p-2">
        <Link
          href="/mentors/create"
          className={cn(
            "flex items-center gap-4 w-full p-3 rounded-lg transition-colors duration-200 border-2 border-dashed border-gray-700 text-gray-500 hover:border-neon-green hover:text-neon-green",
            isCollapsed && "justify-center h-14 w-14",
          )}
        >
          <i className="fa-solid fa-plus"></i>
          {!isCollapsed && <span>Create Mentor</span>}
        </Link>
      </div>
    </div>
  )
}
