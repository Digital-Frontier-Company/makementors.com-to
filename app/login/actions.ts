"use server"

import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/login?message=Could not authenticate user: ${error.message}`)
  }

  return redirect("/dashboard")
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = createClient()
  const origin = headers().get("origin")!

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error("Supabase signup error:", error.message)
    return redirect(`/login?message=Could not authenticate user: ${error.message}`)
  }

  return redirect("/login?message=Check email to continue sign in process")
}

export async function signInWithGithub() {
  const supabase = createClient()
  const origin = headers().get("origin")!

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.log(error)
    return redirect("/login?message=Could not authenticate with GitHub")
  }

  return redirect(data.url)
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect("/")
}

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get("email") as string
  const supabase = createClient()
  const origin = headers().get("origin")!

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/reset-password`,
  })

  if (error) {
    return {
      message: "Could not send password reset link. Please try again.",
    }
  }

  return {
    message: "Password reset link sent. Please check your email.",
  }
}
