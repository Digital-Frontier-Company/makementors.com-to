"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Template = {
  id: number
  title: string
  category: "Business" | "Technology" | "Creative" | "Personal"
  description: string
  imageUrl: string
  rating: number
  reviews: number
  price: "Free" | "Premium"
  color: "lime" | "cyan" | "purple" | "coral" | "green"
}

const templatesData: Template[] = [
  {
    id: 1,
    title: "Business Strategy Advisor",
    category: "Business",
    description:
      "Get world-class strategic planning and market analysis from a visionary architect of unicorn companies.",
    imageUrl: "/images/mentors/business_strategy_advisor.png",
    rating: 4.8,
    reviews: 155,
    price: "Premium",
    color: "lime",
  },
  {
    id: 2,
    title: "AI Engineer",
    category: "Technology",
    description: "Master machine learning, neural networks, and AI development with a specialized mentor.",
    imageUrl: "/images/templates/ai-engineer.png",
    rating: 5.0,
    reviews: 87,
    price: "Premium",
    color: "cyan",
  },
  {
    id: 3,
    title: "UX Designer",
    category: "Creative",
    description: "Learn user experience design principles, wireframing, and prototyping from an expert.",
    imageUrl: "/images/templates/ux-designer.png",
    rating: 4.0,
    reviews: 64,
    price: "Free",
    color: "purple",
  },
  {
    id: 4,
    title: "Life Coach",
    category: "Personal",
    description: "Get guidance on personal growth, goal setting, and building positive habits.",
    imageUrl: "/images/templates/life-coach.png",
    rating: 4.5,
    reviews: 92,
    price: "Premium",
    color: "coral",
  },
  {
    id: 5,
    title: "Financial Advisor",
    category: "Business",
    description: "Learn investment strategies, retirement planning, and personal finance management.",
    imageUrl: "/images/templates/financial-advisor.png",
    rating: 4.0,
    reviews: 78,
    price: "Free",
    color: "green",
  },
  {
    id: 6,
    title: "Full-Stack Developer",
    category: "Technology",
    description: "Master front-end and back-end development, databases, and modern frameworks.",
    imageUrl: "/images/templates/full-stack-dev.png",
    rating: 5.0,
    reviews: 142,
    price: "Premium",
    color: "lime",
  },
]

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-darker flex items-center justify-center z-50">
    <div className="relative w-12 h-12">
      <div className="absolute w-2.5 h-2.5 rounded-full bg-neon-lime top-0 left-1/2 -translate-x-1/2 animate-[dot1_1.5s_infinite]" />
      <div className="absolute w-2.5 h-2.5 rounded-full bg-neon-cyan top-1/2 right-0 -translate-y-1/2 animate-[dot2_1.5s_infinite]" />
      <div className="absolute w-2.5 h-2.5 rounded-full bg-neon-purple bottom-0 left-1/2 -translate-x-1/2 animate-[dot3_1.5s_infinite]" />
      <div className="absolute w-2.5 h-2.5 rounded-full bg-neon-coral top-1/2 left-0 -translate-y-1/2 animate-[dot4_1.5s_infinite]" />
    </div>
    <p className="ml-4 text-xl font-light tracking-wider">LOADING...</p>
    <style jsx>{`
    @keyframes dot1 {
      0%,
      100% {
        transform: translate(-50%, 0);
      }
      50% {
        transform: translate(-50%, 20px);
      }
    }
    @keyframes dot2 {
      0%,
      100% {
        transform: translate(0, -50%);
      }
      50% {
        transform: translate(-20px, -50%);
      }
    }
    @keyframes dot3 {
      0%,
      100% {
        transform: translate(-50%, 0);
      }
      50% {
        transform: translate(-50%, -20px);
      }
    }
    @keyframes dot4 {
      0%,
      100% {
        transform: translate(0, -50%);
      }
      50% {
        transform: translate(20px, -50%);
      }
    }
  `}</style>
  </div>
)

export default function MentorTemplatesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState("popular")
  const [currentPage, setCurrentPage] = useState(1)
  const templatesPerPage = 6

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const filteredTemplates = useMemo(() => {
    return templatesData.filter((template) => activeCategory === "All" || template.category === activeCategory)
  }, [activeCategory])

  const sortedTemplates = useMemo(() => {
    return [...filteredTemplates].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.id - a.id
        case "rating":
          return b.rating - a.rating
        case "popular":
        default:
          return b.reviews - a.reviews
      }
    })
  }, [filteredTemplates, sortBy])

  const paginatedTemplates = useMemo(() => {
    const startIndex = (currentPage - 1) * templatesPerPage
    return sortedTemplates.slice(startIndex, startIndex + templatesPerPage)
  }, [sortedTemplates, currentPage])

  const totalPages = Math.ceil(sortedTemplates.length / templatesPerPage)

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="font-inter bg-dark text-white">
      <Navigation />
      <main>
        <section className="pt-32 pb-12">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mentor <span className="text-neon-lime">Templates</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose from our curated collection of mentor templates or customize your own to start learning whatever
              you want.
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                  {["All", "Business", "Technology", "Creative", "Personal"].map((category) => (
                    <Button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      variant="ghost"
                      className={cn(
                        "px-4 py-2 rounded-full transition-all duration-300",
                        activeCategory === category
                          ? "bg-neon-lime/20 text-neon-lime border border-neon-lime"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600",
                      )}
                    >
                      {category === "All" ? "All Categories" : category}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </section>

        <section className="py-20 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-12 border border-gray-700 relative">
              <div className="max-w-3xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Can't find what you need?{" "}
                  <span className="bg-gradient-to-r from-neon-lime to-neon-cyan text-transparent bg-clip-text">
                    Create Your Own
                  </span>{" "}
                  Mentor
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                  Design a custom mentor with specific expertise tailored to your learning goals and preferences.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="px-8 py-4 bg-neon-lime text-dark font-semibold rounded-full">
                    <Link href="/create-mentor">Create Custom Mentor</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 bg-transparent"
                  >
                    <Link href="/#features">Learn How It Works</Link>
                  </Button>
                </div>
              </div>
              <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-neon-lime/30 rounded-full blur-3xl" />
              <div className="absolute -left-16 -top-16 w-48 h-48 bg-neon-cyan/20 rounded-full blur-3xl" />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function TemplateCard({ template }: { template: Template }) {
  const colors = {
    lime: "bg-neon-lime",
    cyan: "bg-neon-cyan",
    purple: "bg-neon-purple",
    coral: "bg-neon-coral",
    green: "bg-neon-green",
  }
  const textColors = {
    lime: "text-neon-lime",
    cyan: "text-neon-cyan",
    purple: "text-neon-purple",
    coral: "text-neon-coral",
    green: "text-neon-green",
  }
  const bgColors = {
    lime: "bg-neon-lime/20",
    cyan: "bg-neon-cyan/20",
    purple: "bg-neon-purple/20",
    coral: "bg-neon-coral/20",
    green: "bg-neon-green/20",
  }
  const overlayColors = {
    lime: "bg-neon-lime/10",
    cyan: "bg-neon-cyan/10",
    purple: "bg-neon-purple/10",
    coral: "bg-neon-coral/10",
    green: "bg-neon-green/10",
  }

  return (
    <div className="group bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700 transition-transform duration-300 hover:-translate-y-2">
      <div className="relative h-64">
        <Image
          src={template.imageUrl || "/placeholder.svg"}
          alt={`${template.title} template`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkest to-transparent opacity-70" />
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
            overlayColors[template.color],
          )}
        >
          <Button asChild className={cn("text-darkest rounded-full font-medium", colors[template.color])}>
            <Link href={`/create-mentor?template=${template.id}`}>Use Template</Link>
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">{template.title}</h3>
          <span className={cn("text-xs px-2 py-1 rounded-full", bgColors[template.color], textColors[template.color])}>
            {template.category}
          </span>
        </div>
        <p className="text-gray-400 mb-4 text-sm h-10">{template.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn("w-4 h-4", i < Math.round(template.rating) ? "fill-current" : "fill-transparent")}
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm ml-2">
              {template.rating.toFixed(1)} ({template.reviews})
            </span>
          </div>
          <span className={cn("font-medium", textColors[template.color])}>{template.price}</span>
        </div>
      </div>
    </div>
  )
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center mt-12">
      <div className="flex space-x-2">
        <Button
          size="icon"
          variant="outline"
          className="bg-gray-800 text-gray-400 hover:bg-gray-700"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {pages.map((page) => (
          <Button
            key={page}
            size="icon"
            variant="outline"
            className={cn(
              "hover:bg-gray-700",
              currentPage === page
                ? "bg-neon-lime text-darkest border-neon-lime"
                : "bg-gray-800 text-white border-gray-600",
            )}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          size="icon"
          variant="outline"
          className="bg-gray-800 text-gray-400 hover:bg-gray-700"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
