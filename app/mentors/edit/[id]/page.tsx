import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateCustomMentor, deleteCustomMentor } from "./actions"
import { Edit, Trash2 } from "lucide-react"

export default async function EditMentorPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: mentor, error } = await supabase
    .from("custom_mentors")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single()

  if (error || !mentor) {
    console.error("Error fetching mentor or mentor not found:", error)
    redirect("/") // Redirect if mentor doesn't exist or user doesn't own it
  }

  const updateMentorWithId = updateCustomMentor.bind(null, mentor.id)
  const deleteMentorWithId = deleteCustomMentor.bind(null, mentor.id)

  return (
    <div className="flex-1 flex flex-col w-full max-w-2xl px-8 sm:px-4 justify-center gap-8 mx-auto">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back to Chat
      </Link>

      <div className="flex flex-col w-full justify-center gap-2 text-center">
        <Edit className="w-8 h-8 mx-auto text-purple-400" />
        <h1 className="text-2xl font-bold">Edit Mentor</h1>
        <p className="text-slate-400">Refine the details of your custom AI mentor.</p>
      </div>

      <form
        action={updateMentorWithId}
        className="animate-in flex-1 flex flex-col w-full justify-center gap-4 text-foreground"
      >
        <div className="grid gap-2">
          <Label htmlFor="name">Mentor Name</Label>
          <Input id="name" name="name" defaultValue={mentor.name} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" defaultValue={mentor.description} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="personality">Personality</Label>
          <Input id="personality" name="personality" defaultValue={mentor.personality} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="system_prompt">System Prompt (The Mentor's Brain)</Label>
          <Textarea
            id="system_prompt"
            name="system_prompt"
            defaultValue={mentor.system_prompt}
            className="min-h-[150px]"
            required
          />
        </div>

        <Button
          type="submit"
          variant="default"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          Update Mentor
        </Button>
      </form>

      <div className="border-t border-slate-700 pt-4">
        <h3 className="text-lg font-semibold text-red-400">Danger Zone</h3>
        <p className="text-sm text-slate-400 mb-4">Deleting a mentor is permanent and cannot be undone.</p>
        <form action={deleteMentorWithId}>
          <Button variant="destructive" className="w-full">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete this Mentor
          </Button>
        </form>
      </div>
    </div>
  )
}
