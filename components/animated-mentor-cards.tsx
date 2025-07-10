"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import Image from "next/image"

type Mentor = {
  title: string
  imageUrl: string
  personality: string
  advice: string
  gradient: string
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function AnimatedMentorCards({ mentors }: { mentors: Mentor[] }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {mentors.map((mentor) => (
        <motion.div key={mentor.title} variants={cardVariants} className="h-full">
          <div className={`bg-gradient-to-br ${mentor.gradient} p-1 rounded-xl group h-full`}>
            <div className="bg-[#1e293b] h-full rounded-lg p-6 flex flex-col transition-all duration-300 text-left">
              <div className="relative h-64 w-full mb-4 rounded-md overflow-hidden">
                <Image
                  src={mentor.imageUrl || "/placeholder.svg"}
                  alt={`Image of ${mentor.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-white">{mentor.title}</h3>
              <p className="text-sm text-gray-400 italic my-2">"{mentor.personality}"</p>
              <p className="flex-grow text-gray-300">"{mentor.advice}"</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
