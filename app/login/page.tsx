import Link from "next/link"
import { headers } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage({ searchParams }: { searchParams: { message: string } }) {
  const signIn = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect(`/login?message=Could not authenticate user`)
    }

    return redirect("/")
  }

  const signUp = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${headers().get("origin")}/auth/callback`,
      },
    })

    if (error) {
      return redirect("/login?message=Could not create user")
    }

    return redirect("/login?message=Check email to continue sign up process")
  }

  return (
    <div className="flex-1 flex flex-col w-full max-w-md px-8 justify-center gap-8 mx-auto">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-gray-400 hover:text-white flex items-center group text-sm"
      >
        <i className="fa-solid fa-arrow-left mr-2 transition-transform group-hover:-translate-x-1"></i>
        Back
      </Link>

      <div className="flex flex-col w-full justify-center gap-2 text-center">
        <i className="fa-solid fa-meteor w-8 h-8 mx-auto text-neon-purple text-3xl"></i>
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray-400">Sign in or create an account to continue your journey.</p>
      </div>

      <div className="bg-darker/50 border border-gray-800 rounded-xl p-8">
        <form className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              className="bg-gray-800 border-gray-700 focus:border-neon-cyan"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="bg-gray-800 border-gray-700 focus:border-neon-cyan"
            />
          </div>
          <Button
            formAction={signIn}
            className="w-full bg-neon-cyan text-dark font-bold hover:bg-opacity-80 animate-pulse-neon"
          >
            Sign In
          </Button>
          <Button
            formAction={signUp}
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
          >
            Sign Up
          </Button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-gray-800/70 border border-gray-700 text-gray-300 text-center rounded-md text-sm">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
