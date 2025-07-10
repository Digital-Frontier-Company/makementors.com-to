"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/navigation"
import { updatePassword } from "./actions"

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = async (formData: FormData) => {
    const result = await updatePassword(formData)
    if (result?.error) {
      setError(result.error)
      setSuccess(false)
    } else {
      setError(null)
      setSuccess(true)
    }
  }

  return (
    <>
      <Navigation />
      <div className="flex items-center justify-center min-h-screen bg-dark p-6">
        <Card className="w-full max-w-md bg-darkest border-gray-800 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-neon-lime">Set a New Password</CardTitle>
            <CardDescription className="text-gray-400">Enter and confirm your new password below.</CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="text-center text-green-400">
                <p>Your password has been reset successfully!</p>
                <a href="/dashboard" className="underline text-neon-lime mt-4 inline-block">
                  Go to Dashboard
                </a>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input id="password" name="password" type="password" required className="bg-dark border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="bg-dark border-gray-600"
                  />
                </div>
                <Button className="w-full bg-neon-lime text-darkest hover:bg-opacity-80">Update Password</Button>
                {error && <p className="mt-4 text-center text-sm text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
