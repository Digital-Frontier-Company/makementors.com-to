"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Bot, Plus } from "lucide-react"
import Link from "next/link"
import type { Mentor } from "./types"

type Props = {
  userId: string
  initialMentors: Mentor[]
}

export default function DashboardClient({ userId, initialMentors }: Props) {
  const { toast } = useToast()
  const [mentors, setMentors] = useState<Mentor[]>(initialMentors)
  const [loading, setLoading] = useState(false)

  // Real-time listener (optional)
  useEffect(() => {
    const channel = supabase
      .channel("mentors-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mentors", filter: `user_id=eq.${userId}` },
        (payload) => {
          if (payload.eventType === "DELETE") {
            setMentors((prev) => prev.filter((m) => m.id !== payload.old.id))
          }
          if (payload.eventType === "INSERT") {
            setMentors((prev) => [payload.new as Mentor, ...prev])
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  // Delete mentor from Supabase
  const handleDelete = async (mentorId: string) => {
    setLoading(true)
    const { error } = await supabase.from("mentors").delete().eq("id", mentorId)
    setLoading(false)

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Deleted", description: "Mentor removed successfully." })
      setMentors((prev) => prev.filter((m) => m.id !== mentorId))
    }
  }

  return (
    <main className="pt-24 pb-20 w-full">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Your <span className="text-neon-lime">Mentors</span>
            </h1>
            <p className="text-gray-400">Manage your created AI mentors.</p>
          </div>
          <Button asChild className="bg-neon-lime text-darkest hover:bg-opacity-80">
            <Link href="/create-mentor">
              <Plus className="mr-2 h-4 w-4" />
              Create New Mentor
            </Link>
          </Button>
        </div>

        {/* Mentor grid */}
        <section className="mb-12">
          {loading && mentors.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 h-48 animate-pulse" />
              ))}
            </div>
          ) : mentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-neon-lime">{mentor.name}</h3>
                      <div className="w-10 h-10 bg-neon-lime/20 rounded-full flex items-center justify-center">
                        <Bot className="text-neon-lime" />
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">{mentor.description}</p>
                    <p className="text-xs text-gray-500">Model: {mentor.model}</p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(mentor.id)}
                      className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
              <Bot className="mx-auto h-12 w-12 text-gray-500" />
              <h3 className="mt-4 text-lg font-medium text-white">No mentors created yet</h3>
              <p className="text-gray-400 mt-1">Get started by creating your first AI mentor.</p>
              <Button asChild className="mt-6 bg-neon-lime text-darkest hover:bg-opacity-80">
                <Link href="/create-mentor">Create Your First Mentor</Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
