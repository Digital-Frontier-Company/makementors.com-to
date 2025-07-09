"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Create Mentor", href: "/create-mentor" },
  { name: "Mentor Templates", href: "/mentor-templates" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Dashboard", href: "/dashboard" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
    </>
  )

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-darkest/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 relative logo-glow flex items-center justify-center">
            <div className="star-shape absolute top-0 left-0 animate-spin-slow" />
            <div className="text-3xl font-bold text-neon-lime z-10">M</div>
          </div>
          <span className="text-neon-lime text-2xl font-bold">MakeMentors.io</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLinks />
        </nav>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center mr-4">
            <img
              src="/placeholder.svg?width=40&height=40"
              alt="User avatar"
              className="w-10 h-10 rounded-full border-2 border-neon-lime"
            />
            <span className="ml-2 hidden lg:block">Michael</span>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden p-2 rounded-full bg-gray-800 text-gray-400 hover:text-neon-lime hover:bg-gray-700"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-darkest/95 border-l-gray-800 w-[80vw]">
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                <NavLinks isMobile={true} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
