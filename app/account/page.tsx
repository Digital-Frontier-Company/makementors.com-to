import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AccountForm from "./account-form"
import Link from "next/link"

export default async function AccountPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 means no rows found, which is fine if profile is not created yet
    console.error("Error fetching profile:", error)
  }

  return (
    <div className="flex-1 flex flex-col w-full max-w-2xl px-8 sm:px-4 justify-center gap-2 mx-auto">
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
        Back
      </Link>
      <AccountForm profile={profile} />
    </div>
  )
}
