"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import { deleteMentorAction } from "./actions"
import { Button } from "@/components/ui/button"
import { Trash2, Bot, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"
import type { Mentor } from "./client"

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: mentors, error } = await supabase
    .from("mentors")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching mentors:", error)
    // In a real app, you might want to pass the error to the client to display a message
  }

  const DashboardClientComponent = ({ user, initialMentors }: { user: any; initialMentors: Mentor[] }) => {
    const { toast } = useToast()
    const router = useRouter()
    const [mentorsState, setMentorsState] = useState<Mentor[]>(initialMentors)
    const [loading, setLoading] = useState(false)

    const handleDelete = async (mentorId: string) => {
      const result = await deleteMentorAction(mentorId)
      if (result.error) {
        toast({ title: "Error", description: result.error, variant: "destructive" })
      } else {
        toast({ title: "Success", description: result.success })
        setMentorsState(mentorsState.filter((m) => m.id !== mentorId))
      }
    }

    return (
      <main id="dashboard" className="pt-24 pb-20 w-full">
        <div className="container mx-auto px-6">
          <div id="dashboard-header" className="mb-10 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Your <span className="text-neon-lime">Mentors</span>
              </h1>
              <p className="text-gray-400">Manage your created AI mentors.</p>
            </div>
            <Button asChild className="bg-neon-lime text-darkest hover:bg-opacity-80">
              <a href="/create-mentor">
                <Plus className="mr-2 h-4 w-4" />
                Create New Mentor
              </a>
            </Button>
          </div>

          <section id="your-mentors" className="mb-12">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 h-48 animate-pulse" />
                ))}
              </div>
            ) : mentorsState.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentorsState.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-neon-lime">{mentor.name}</h3>
                        <div className="w-10 h-10 bg-neon-lime/20 rounded-full flex items-center justify-center flex-shrink-0">
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
                  <a href="/create-mentor">Create Your First Mentor</a>
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>
    )
  }

  return (
    <>
      <Navigation />
      <DashboardClientComponent user={user} initialMentors={(mentors as Mentor[]) || []} />
    </>
  )
}
