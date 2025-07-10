"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github } from "lucide-react"
import { login, signup, signInWithGithub } from "./actions"
import Navigation from "@/components/navigation"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")
  const [isSignUp, setIsSignUp] = useState(mode === "signup")

  return (
    <>
      <Navigation />
      <div className="flex items-center justify-center min-h-screen bg-dark p-6">
        <Card className="w-full max-w-md bg-darkest border-gray-800 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-neon-lime">{isSignUp ? "Create an Account" : "Welcome Back"}</CardTitle>
            <CardDescription className="text-gray-400">
              {isSignUp ? "Sign up to start your journey." : "Sign in to access your dashboard."}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
              <Button
                formAction={isSignUp ? signup : login}
                className="w-full bg-neon-lime text-darkest hover:bg-opacity-80"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
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
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button onClick={() => setIsSignUp(!isSignUp)} className="underline text-neon-lime ml-1">
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
