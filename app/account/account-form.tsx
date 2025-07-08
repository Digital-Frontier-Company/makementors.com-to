"use client"

import type React from "react"

import { useState } from "react"
import { updateProfile } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSearchParams } from "next/navigation"

type Profile = {
  id: string
  full_name: string | null
  avatar_url: string | null
  // add other profile fields here
}

export default function AccountForm({ profile }: { profile: Profile | null }) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar_url || null)
  const searchParams = useSearchParams()
  const message = searchParams.get("message")

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full bg-darker/50 border border-gray-800 rounded-xl p-8">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <form action={updateProfile} className="flex-1 flex flex-col w-full justify-center gap-6 text-foreground">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-2 border-neon-purple/50">
            <AvatarImage src={avatarPreview || undefined} />
            <AvatarFallback>
              <i className="fa-solid fa-user text-gray-400 text-3xl"></i>
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-2 flex-1">
            <Label htmlFor="avatar">Update Avatar</Label>
            <Input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="bg-gray-800 border-gray-700 file:text-neon-cyan file:font-bold"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={profile?.id ? "Not available" : "Loading..."} disabled />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            defaultValue={profile?.full_name || ""}
            className="bg-gray-800 border-gray-700 focus:border-neon-cyan"
          />
        </div>

        <div>
          <Button type="submit" className="w-full bg-neon-cyan text-dark font-bold hover:bg-opacity-80">
            Update Profile
          </Button>
        </div>
        {message && (
          <p className="mt-4 p-4 bg-gray-800/70 border border-gray-700 text-gray-300 text-center rounded-md text-sm">
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
