"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, LayoutDashboard } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/app/login/actions"
import Image from "next/image"
import { UserNav } from "@/components/user-nav"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Create Mentor", href: "/create-mentor" },
  { name: "Mentor Templates", href: "/mentor-templates" },
  { name: "Pricing", href: "/#pricing" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      subscription.unsubscribe()
    }
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.startsWith("/#")) return false // Don't mark anchor links as active
    return pathname.startsWith(href)
  }

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`transition-colors duration-300 hover-glow ${isMobile ? "text-2xl font-medium" : "text-sm"} ${
            isActive(link.href) ? "text-neon-lime hover:text-neon-lime" : "text-gray-300 hover:text-neon-lime"
          }`}
        >
          {link.name}
        </Link>
      ))}
      {user && (
        <Link
          href="/dashboard"
          className={`transition-colors duration-300 hover-glow ${isMobile ? "text-2xl font-medium" : "text-sm"} ${
            isActive("/dashboard") ? "text-neon-lime hover:text-neon-lime" : "text-gray-300 hover:text-neon-lime"
          }`}
        >
          Dashboard
        </Link>
      )}
    </>
  )

  const AuthNav = () => {
    if (loading) {
      return <div className="h-10 w-24 animate-pulse bg-gray-800 rounded-md" />
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 p-1 rounded-full">
              <img
                src={user.user_metadata.avatar_url || "/placeholder.svg?width=40&height=40"}
                alt={user.user_metadata.full_name || "User avatar"}
                className="w-8 h-8 rounded-full border-2 border-neon-lime"
              />
              <span className="hidden lg:block text-sm text-gray-300">
                {user.user_metadata.full_name || user.email}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-darkest border-gray-700 text-white">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/dashboard" className="flex items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => signOut()} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <div className="hidden md:flex items-center space-x-2">
        <Button asChild variant="ghost" className="text-gray-300 hover:text-neon-lime hover-glow">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild className="bg-neon-lime text-darkest hover:bg-opacity-80 rounded-full btn-hover-effect">
          <Link href="/login?mode=signup">Sign Up</Link>
        </Button>
      </div>
    )
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? "bg-darkest/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image
            src="/images/logo-icon.png"
            alt="MakeMentors Logo"
            width={40}
            height={40}
            className="animate-hero-logo"
          />
          <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-cyan-400 drop-shadow-[0_0_10px_rgba(163,230,53,0.5)]">
            MakeMentors
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/mentor-templates"
            className="text-lg font-medium text-gray-300 transition-colors hover:text-lime-300 hover:drop-shadow-[0_0_5px_rgba(163,230,53,0.7)]"
            prefetch={false}
          >
            Templates
          </Link>
          <Link
            href="/create-mentor"
            className="text-lg font-medium text-gray-300 transition-colors hover:text-lime-300 hover:drop-shadow-[0_0_5px_rgba(163,230,53,0.7)]"
            prefetch={false}
          >
            Create
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium text-gray-300 transition-colors hover:text-lime-300 hover:drop-shadow-[0_0_5px_rgba(163,230,53,0.7)]"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <UserNav />
        </div>
      </div>
    </header>
  )
}
