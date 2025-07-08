import type React from "react"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import ParticleBackground from "@/components/effects/particle-background"
import { AppEffects } from "@/components/effects/app-effects"
import { FontAwesomeScript } from "@/components/effects/font-awesome"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Make Mentors - AI-Powered Coaching",
  description: "Transform your career with personalized AI-driven mentorship.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${GeistSans.className} ${montserrat.variable}`}>
      <body className="bg-dark text-white font-montserrat">
        <ParticleBackground />
        <AppEffects />
        <main className="min-h-screen flex flex-col items-center">{children}</main>
        <FontAwesomeScript />
      </body>
    </html>
  )
}
