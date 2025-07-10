"use client"

import type React from "react"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import type { LucideProps } from "lucide-react"

type Feature = {
  title: string
  description: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function AnimatedFeatureCards({ features }: { features: Feature[] }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {features.map((feature, index) => {
        const Icon = feature.icon
        return (
          <motion.div
            key={index}
            variants={cardVariants}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <Icon className="h-8 w-8 text-[#14b8a6]" />
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
            </div>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
