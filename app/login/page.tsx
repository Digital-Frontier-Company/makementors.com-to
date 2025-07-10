"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github } from "lucide-react"
import { login, signup, signInWithGithub, requestPasswordReset } from "./actions"
import Navigation from "@/components/navigation"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const message = searchParams.get("message")
  const mode = searchParams.get("mode")

  type View = "signin" | "signup" | "forgot_password"
  const [view, setView] = useState<View>(mode === "signup" ? "signup" : "signin")

  const [formMessage, setFormMessage] = useState<string | null>(message)

  const handlePasswordReset = async (formData: FormData) => {
    const result = await requestPasswordReset(formData)
    setFormMessage(result.message)
  }

  return (
    <>
      <Navigation />
      <div className="flex items-center justify-center min-h-screen bg-dark p-6">
        <Card className="w-full max-w-md bg-darkest border-gray-800 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-neon-lime">
              {view === "signup" && "Create an Account"}
              {view === "signin" && "Welcome Back"}
              {view === "forgot_password" && "Reset Password"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {view === "signup" && "Sign up to start your journey."}
              {view === "signin" && "Sign in to access your dashboard."}
              {view === "forgot_password" && "We'll email you instructions to reset your password."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {view !== "forgot_password" ? (
              <>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      className="bg-dark border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required className="bg-dark border-gray-600" />
                  </div>
                  {view === "signin" && (
                    <div className="flex justify-end text-sm">
                      <button
                        type="button"
                        onClick={() => setView("forgot_password")}
                        className="text-gray-400 hover:text-neon-lime underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}
                  <Button
                    formAction={view === "signup" ? signup : login}
                    className="w-full bg-neon-lime text-darkest hover:bg-opacity-80"
                  >
                    {view === "signup" ? "Sign Up" : "Sign In"}
                  </Button>
                </form>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-darkest px-2 text-gray-400">Or continue with</span>
                  </div>
                </div>
                <form>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-gray-600 hover:bg-gray-800"
                    formAction={signInWithGithub}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </form>
                <div className="mt-6 text-center text-sm">
                  {view === "signup" ? "Already have an account?" : "Don't have an account?"}
                  <button
                    onClick={() => setView(view === "signup" ? "signin" : "signup")}
                    className="underline text-neon-lime ml-1"
                  >
                    {view === "signup" ? "Sign In" : "Sign Up"}
                  </button>
                </div>
              </>
            ) : (
              <form action={handlePasswordReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-reset">Email</Label>
                  <Input
                    id="email-reset"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="bg-dark border-gray-600"
                  />
                </div>
                <Button className="w-full bg-neon-lime text-darkest hover:bg-opacity-80">Send Reset Link</Button>
                <div className="mt-6 text-center text-sm">
                  <button type="button" onClick={() => setView("signin")} className="underline text-neon-lime">
                    Back to Sign In
                  </button>
                </div>
              </form>
            )}
            {formMessage && (
              <p className="mt-4 text-center text-sm text-gray-400 bg-gray-800 p-3 rounded-md">{formMessage}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
