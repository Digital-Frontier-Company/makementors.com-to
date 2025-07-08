"use client"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import ChatPage from "./chat/page"
import LandingPage from "./landing-page"
import { AnimatePresence, motion } from "framer-motion"

// Loading screen component
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-darker flex items-center justify-center z-50"
    >
      <div className="relative w-12 h-12">
        <span className="absolute w-3 h-3 bg-neon-cyan rounded-full top-0 left-1/2 -ml-1.5 animate-[dot1_1.5s_infinite]" />
        <span className="absolute w-3 h-3 bg-neon-purple rounded-full top-1/2 -mt-1.5 right-0 animate-[dot2_1.5s_infinite]" />
        <span className="absolute w-3 h-3 bg-neon-coral rounded-full bottom-0 left-1/2 -ml-1.5 animate-[dot3_1.5s_infinite]" />
        <span className="absolute w-3 h-3 bg-neon-green rounded-full top-1/2 -mt-1.5 left-0 animate-[dot4_1.5s_infinite]" />
      </div>
      <style jsx>{`
        @keyframes dot1 {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(20px);
          }
        }
        @keyframes dot2 {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-20px);
          }
        }
        @keyframes dot3 {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes dot4 {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(20px);
          }
        }
      `}</style>
    </motion.div>
  )
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      // Adding a slight delay to let the loading animation show
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    checkUser()
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      {!loading && (user ? <ChatPage /> : <LandingPage />)}
    </>
  )
}
