"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AuthButton() {
  const supabase = createClient()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    setUser(null)
  }

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none">
          <Avatar className="h-9 w-9 border-2 border-neon-purple/50 hover:border-neon-purple transition-all">
            <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} alt={user.email} />
            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-darkest border-gray-700 text-gray-300" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white">My Account</p>
            <p className="text-xs leading-none text-gray-400">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-800">
          <Link href="/account">Account Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer hover:bg-gray-800">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <a
      href="/login"
      className="px-5 py-2.5 bg-neon-cyan text-dark font-semibold rounded-full hover:bg-opacity-80 transition-all duration-300 animate-pulse-neon"
    >
      Sign In
    </a>
  )
}
