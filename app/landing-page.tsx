"use client"

import { useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import AuthButton from "@/components/auth-button"
import Image from "next/image"
import Link from "next/link"

// Types based on your Supabase schema
type MentorTemplate = {
  id: string
  name: string
  description: string
  is_premium: boolean
}

type MentorCategory = {
  id: string
  name: string
  mentors: MentorTemplate[]
}

const getFallbackMentorData = (): MentorCategory[] => [
  {
    id: "business",
    name: "Business",
    mentors: [
      {
        id: "startup-advisor",
        name: "Startup Advisor",
        description: "Guidance for scaling startups.",
        is_premium: false,
      },
    ],
  },
]

export default function MakeMentorsLanding() {
  const { scrollYProgress } = useScroll()
  const [mentorData, setMentorData] = useState<MentorCategory[]>([])
  const [isLoadingMentors, setIsLoadingMentors] = useState(true)

  useEffect(() => {
    const fetchMentors = async () => {
      const supabase = createClient()
      if (!supabase) {
        setMentorData(getFallbackMentorData())
        setIsLoadingMentors(false)
        return
      }

      setIsLoadingMentors(true)

      const { data: categories, error: categoriesError } = await supabase
        .from("mentor_categories")
        .select("id, name, sort_order")
        .order("sort_order")

      const { data: templates, error: templatesError } = await supabase
        .from("mentor_templates")
        .select("id, name, category, description, is_premium")

      if (categoriesError || templatesError) {
        console.error("Error fetching data:", categoriesError || templatesError)
        setMentorData(getFallbackMentorData())
      } else if (categories && templates) {
        const fullData = categories.map((category) => ({
          ...category,
          mentors: templates.filter((template) => template.category === category.id),
        }))
        setMentorData(fullData)
      }
      setIsLoadingMentors(false)
    }

    fetchMentors()
  }, [])

  return (
    <div className="w-full">
      <Header />
      <Hero />
      <Features />
      <MentorsSection mentors={mentorData} isLoading={isLoadingMentors} />
      <CTA />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-darkest bg-opacity-70 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Make Mentors Logo" width={32} height={32} />
          <span className="text-xl font-bold">Make Mentors</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#features"
            className="text-gray-300 hover:text-neon-cyan transition-colors duration-300 hover-glow cursor-pointer"
          >
            Features
          </a>
          <a
            href="#mentors"
            className="text-gray-300 hover:text-neon-cyan transition-colors duration-300 hover-glow cursor-pointer"
          >
            Mentors
          </a>
          <Link
            href="/mentors/create"
            className="text-gray-300 hover:text-neon-cyan transition-colors duration-300 hover-glow cursor-pointer"
          >
            Create Mentor
          </Link>
          <a
            href="#pricing"
            className="text-gray-300 hover:text-neon-cyan transition-colors duration-300 hover-glow cursor-pointer"
          >
            Pricing
          </a>
        </div>
        <AuthButton />
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="hero" className="relative h-[800px] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full object-cover z-0">
        <Image
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4acf02ae7d-aa755d472f9b3afd2522.png"
          alt="Futuristic city vista"
          layout="fill"
          objectFit="cover"
          quality={80}
        />
      </div>
      <div className="absolute inset-0 bg-darkest opacity-60 z-10"></div>
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider mb-6">
            Unlock Your <span className="text-gradient">Potential</span>
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg text-gray-300 max-w-2xl"
        >
          AI-powered mentorship to accelerate your skills, career, and personal growth. Find your perfect guide.
        </motion.p>
      </div>
    </section>
  )
}

function Features() {
  const featuresList = [
    { icon: "fa-solid fa-brain", title: "Personalized Learning", color: "neon-cyan" },
    { icon: "fa-solid fa-comments", title: "24/7 Conversations", color: "neon-purple" },
    { icon: "fa-solid fa-rocket", title: "Goal Acceleration", color: "neon-coral" },
    { icon: "fa-solid fa-users", title: "Custom Mentors", color: "neon-green" },
  ]
  return (
    <section id="features" className="py-20 bg-darker">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700 hover:border-${feature.color} transition-all duration-300`}
            >
              <div
                className={`w-14 h-14 bg-${feature.color} bg-opacity-20 rounded-lg flex items-center justify-center mb-6`}
              >
                <i className={`${feature.icon} text-${feature.color} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MentorsSection({ mentors, isLoading }: { mentors: MentorCategory[]; isLoading: boolean }) {
  const categoryColors: { [key: string]: string } = {
    business: "neon-cyan",
    education: "neon-purple",
    creative: "neon-coral",
    technology: "neon-green",
    wellness: "neon-purple",
  }

  return (
    <section id="mentors" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Your <span className="text-neon-coral">Mentors</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our collection of specialized AI mentors, ready to guide you.
          </p>
        </div>
        <div className="space-y-12">
          {isLoading
            ? "Loading mentors..."
            : mentors.map((category) => (
                <div key={category.id}>
                  <h3 className={`text-2xl font-bold mb-6 text-${categoryColors[category.id] || "neon-cyan"}`}>
                    {category.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.mentors.map((mentor) => (
                      <div
                        key={mentor.id}
                        className="group relative bg-gray-800 bg-opacity-30 rounded-xl overflow-hidden border border-gray-700 hover:border-neon-cyan/50 transition-all p-6"
                      >
                        <h4 className="text-xl font-semibold group-hover:text-neon-cyan transition-colors duration-300">
                          {mentor.name}
                        </h4>
                        <p className="text-gray-400 mt-2">{mentor.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section id="cta" className="py-20 bg-darker">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-12 border border-gray-700 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="text-gradient">Begin</span>?
          </h2>
          <p className="text-gray-300 text-lg mb-8">Start your journey with a Make Mentors guide today.</p>
          <a
            href="/login"
            className="inline-block px-8 py-4 bg-neon-cyan text-dark font-semibold rounded-full hover:bg-opacity-80 transition-all duration-300 animate-pulse-neon"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="footer" className="bg-darkest py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center space-x-3 mb-4">
          <Image src="/logo.png" alt="Make Mentors Logo" width={32} height={32} />
          <span className="text-xl font-bold">Make Mentors</span>
        </div>
        <p className="text-gray-500 text-sm">&copy; 2025 Make Mentors. All rights reserved.</p>
      </div>
    </footer>
  )
}
