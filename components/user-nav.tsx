"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "@/app/login/actions"

/**
 * UserNav – shows auth state, lets users reach their dashboard or sign out.
 * Uses client-side Supabase SDK, so it works in any Client Component.
 */
export const UserNav = () => {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState<string | null>(null)

  /* ──────────────────────────────────────────────────────────────────── */
  /*  Fetch / subscribe to auth state                                    */
  /* ──────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setEmail(session?.user?.email ?? null)
      setLoading(false)
    }

    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const initials = email ? email.split("@")[0].slice(0, 2).toUpperCase() : "U"

  /* ──────────────────────────────────────────────────────────────────── */
  /*  Render                                                             */
  /* ──────────────────────────────────────────────────────────────────── */
  if (loading) return <div className="h-10 w-24 animate-pulse rounded-md bg-gray-800" />

  if (!email) {
    return (
      <Link href="/login">
        <Button
          variant="outline"
          className="border-lime-300/80 bg-transparent text-lime-300/80 hover:bg-lime-300/10 hover:text-lime-300"
        >
          Login&nbsp;/&nbsp;Sign&nbsp;Up
        </Button>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-lime-400/50">
            <AvatarImage src="/placeholder.svg" alt={email} />
            <AvatarFallback className="bg-gray-800 text-lime-300">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 border-lime-500/20 bg-gray-900/90 text-white backdrop-blur-sm"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-lime-300">Signed&nbsp;In</p>
            <p className="text-xs leading-none text-gray-400">{email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-lime-500/20" />

        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer focus:bg-lime-500/10 focus:text-lime-200">
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/create-mentor" className="cursor-pointer focus:bg-lime-500/10 focus:text-lime-200">
            Create&nbsp;Mentor
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-lime-500/20" />

        <DropdownMenuItem asChild>
          {/* Server action form for secure sign-out */}
          <form action={signOut} className="w-full">
            <button
              type="submit"
              className="w-full cursor-pointer px-2 py-1.5 text-left text-sm focus:bg-lime-500/10 focus:text-lime-200"
            >
              Sign&nbsp;Out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* --------------------------------------------------------------------- */
/*  Default export (optional) – keeps flexibility for `import UserNav`   */
/* --------------------------------------------------------------------- */
export default UserNav
