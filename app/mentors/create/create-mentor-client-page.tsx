"use client"

import { useEffect } from "react"
import { createCustomMentor } from "./actions"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

const Header = () => (
  <header id="header" className="fixed top-0 left-0 right-0 z-30 bg-darkest bg-opacity-70 backdrop-blur-md">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center">
        <div className="h-10 w-10 relative mr-2 [filter:drop-shadow(0_0_8px_rgba(184,255,51,0.8))]">
          <div className="star-shape absolute top-0 left-0 animate-spin-slow"></div>
          <div className="text-3xl font-bold text-neon-lime absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            M
          </div>
        </div>
        <span className="text-neon-lime text-2xl font-bold">MakeMentors.io</span>
      </Link>
      <div className="hidden md:flex items-center space-x-6">
        <Link
          href="/"
          className="text-gray-400 hover:text-neon-lime transition-colors duration-300 hover-glow cursor-pointer"
        >
          Home
        </Link>
        <Link
          href="/mentors/create"
          className="text-white hover:text-neon-lime transition-colors duration-300 hover-glow cursor-pointer"
        >
          Create Mentor
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        <button
          id="search-toggle"
          className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-neon-lime hover:bg-gray-700 transition-all duration-300 focus:outline-none btn-hover-effect"
          aria-label="Search"
        >
          <i className="fa-solid fa-search"></i>
        </button>
        <Link
          href="/login"
          className="hidden md:block px-5 py-2 bg-neon-lime text-darkest rounded-full font-semibold hover:bg-opacity-80 transition-all duration-300 btn-hover-effect"
        >
          Sign Up
        </Link>
        <button
          id="menu-toggle"
          className="md:hidden p-2 rounded-full bg-gray-800 text-gray-400 hover:text-neon-lime hover:bg-gray-700 transition-all duration-300 focus:outline-none"
          aria-label="Menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
    <style jsx>{`
      .star-shape {
        position: absolute;
        clip-path: polygon(
          50% 0%,
          61% 35%,
          98% 35%,
          68% 57%,
          79% 91%,
          50% 70%,
          21% 91%,
          32% 57%,
          2% 35%,
          39% 35%
        );
        background-color: #b8ff33;
        width: 40px;
        height: 40px;
      }
      .btn-hover-effect:hover {
        animation: pulse 1.5s infinite;
      }

      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(184, 255, 51, 0.7);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(184, 255, 51, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(184, 255, 51, 0);
        }
      }
    `}</style>
  </header>
)

const Footer = () => (
  <footer id="footer" className="bg-darkest py-12 relative">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center mb-4">
            <div className="h-8 w-8 relative mr-2 [filter:drop-shadow(0_0_8px_rgba(184,255,51,0.8))]">
              <div className="star-shape absolute top-0 left-0"></div>
            </div>
            <span className="text-neon-lime text-xl font-bold">MakeMentors.io</span>
          </div>
          <p className="text-gray-400 mb-4">Create custom AI mentors tailored to your learning goals.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <span className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                Templates
              </span>
            </li>
            <li>
              <span className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                Pricing
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <span className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                About Us
              </span>
            </li>
            <li>
              <span className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                Contact
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
          <div className="flex">
            <input
              type="email"
              className="bg-gray-800 border border-gray-700 rounded-l-lg py-2 px-4 focus:outline-none focus:border-neon-lime"
              placeholder="Your email"
            />
            <button className="bg-neon-lime text-darkest py-2 px-4 rounded-r-lg hover:bg-opacity-80 transition-colors duration-300">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">© 2025 MakeMentors.io. All rights reserved.</p>
      </div>
    </div>
    <style jsx>{`
      .star-shape {
        clip-path: polygon(
          50% 0%,
          61% 35%,
          98% 35%,
          68% 57%,
          79% 91%,
          50% 70%,
          21% 91%,
          32% 57%,
          2% 35%,
          39% 35%
        );
        background-color: #b8ff33;
        width: 32px;
        height: 32px;
      }
    `}</style>
  </footer>
)

const FloatingNav = () => (
  <nav
    id="floating-nav"
    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-darkest bg-opacity-50 backdrop-blur-lg rounded-full px-2 py-1 z-40 border border-gray-800 transition-all duration-500"
  >
    <div id="nav-container" className="flex items-center">
      <button
        id="nav-toggle"
        className="nav-btn p-3 rounded-full text-neon-lime hover:bg-gray-800 transition-all duration-300 focus:outline-none relative"
        aria-label="Toggle Navigation"
      >
        <i className="fa-solid fa-bars"></i>
        <span className="nav-tooltip">Navigation Menu</span>
      </button>

      <div id="nav-items" className="hidden">
        <Link
          href="/"
          id="nav-home"
          className="nav-btn nav-item p-3 rounded-full text-gray-400 hover:text-neon-lime hover:bg-gray-800 transition-all duration-300 focus:outline-none relative"
          aria-label="Home"
        >
          <i className="fa-solid fa-home"></i>
          <span className="nav-tooltip">Home</span>
        </Link>
        <Link
          href="/mentors/create"
          id="nav-create"
          className="nav-btn nav-item p-3 rounded-full text-neon-lime hover:bg-gray-800 transition-all duration-300 focus:outline-none relative"
          aria-label="Create Mentor"
        >
          <i className="fa-solid fa-plus"></i>
          <span className="nav-tooltip">Create Mentor</span>
        </Link>
      </div>
    </div>
    <style jsx>{`
      .nav-expanded {
        animation: expand 0.5s forwards;
      }
      .nav-item {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      .nav-item.visible {
        opacity: 1;
        transform: translateY(0);
      }
      .nav-tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(10, 10, 10, 0.9);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
        margin-bottom: 5px;
      }
      .nav-tooltip::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: rgba(10, 10, 10, 0.9) transparent transparent transparent;
      }
      .nav-btn:hover .nav-tooltip {
        opacity: 1;
      }
      @keyframes expand {
        from {
          width: 60px;
          border-radius: 9999px;
        }
        to {
          width: auto;
          border-radius: 20px;
        }
      }
    `}</style>
  </nav>
)

export default function CreateMentorClientPage() {
  useEffect(() => {
    // Menu Toggles
    const menuToggle = document.getElementById("menu-toggle")
    const mobileMenu = document.getElementById("mobile-menu")
    const mobileClose = document.getElementById("mobile-close")
    if (menuToggle && mobileMenu && mobileClose) {
      menuToggle.addEventListener("click", () => {
        mobileMenu.style.display = "flex"
        gsap.to(mobileMenu, { opacity: 1, duration: 0.3 })
      })
      mobileClose.addEventListener("click", () => {
        gsap.to(mobileMenu, { opacity: 0, duration: 0.3, onComplete: () => (mobileMenu.style.display = "none") })
      })
    }

    const searchToggle = document.getElementById("search-toggle")
    const searchOverlay = document.getElementById("search-overlay")
    const searchClose = document.getElementById("search-close")
    if (searchToggle && searchOverlay && searchClose) {
      searchToggle.addEventListener("click", () => {
        searchOverlay.style.display = "flex"
        gsap.to(searchOverlay, { opacity: 1, duration: 0.3 })
      })
      searchClose.addEventListener("click", () => {
        gsap.to(searchOverlay, { opacity: 0, duration: 0.3, onComplete: () => (searchOverlay.style.display = "none") })
      })
    }

    // Scroll Progress
    gsap.registerPlugin(ScrollTrigger)
    const scrollProgress = document.getElementById("scrollProgress")
    gsap.to(scrollProgress, {
      width: "100%",
      ease: "none",
      scrollTrigger: { scrub: true },
    })

    // Floating Navigation Animation
    const navToggle = document.getElementById("nav-toggle")
    const floatingNav = document.getElementById("floating-nav")
    const navItems = document.getElementById("nav-items")
    let isExpanded = false

    const toggleNavigation = () => {
      if (!floatingNav || !navItems || !navToggle) return
      if (!isExpanded) {
        floatingNav.classList.add("nav-expanded")
        navItems.style.display = "flex"
        navToggle.innerHTML = '<i class="fa-solid fa-times"></i><span class="nav-tooltip">Close Menu</span>'
        const items = document.querySelectorAll(".nav-item")
        items.forEach((item, index) => {
          setTimeout(() => item.classList.add("visible"), 100 * (index + 1))
        })
      } else {
        floatingNav.classList.remove("nav-expanded")
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i><span class="nav-tooltip">Navigation Menu</span>'
        const items = document.querySelectorAll(".nav-item")
        items.forEach((item) => item.classList.remove("visible"))
        setTimeout(() => (navItems.style.display = "none"), 300)
      }
      isExpanded = !isExpanded
    }

    navToggle?.addEventListener("click", toggleNavigation)

    gsap.utils.toArray("main > div > div").forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
    })

    return () => {
      navToggle?.removeEventListener("click", toggleNavigation)
      // Cleanup other listeners if necessary
    }
  }, [])

  return (
    <>
      <div
        id="scrollProgress"
        style={{
          height: "6px",
          background: "linear-gradient(90deg, #b8ff33, #00FFFF)",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          width: "0%",
        }}
      ></div>
      <Header />
      <FloatingNav />

      <main className="pt-24 pb-20">
        <form action={createCustomMentor} className="container mx-auto px-6">
          <div id="hero-section" className="bg-darkest bg-opacity-70 rounded-2xl p-8 mb-12 border border-gray-800">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Create Your Custom <span className="text-neon-lime">AI Mentor</span>
              </h1>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Design a personalized AI mentor powered by cutting-edge AI models.
              </p>
            </div>
          </div>

          <div
            id="ai-model-selection"
            className="bg-gray-800 bg-opacity-30 rounded-xl p-8 mb-12 border border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <i className="fa-solid fa-microchip text-neon-lime mr-3"></i>
              Choose Your AI Frontier Model
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="bg-darkest bg-opacity-70 rounded-lg p-6 border border-gray-700 hover:border-neon-lime transition-all duration-300 cursor-pointer group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <i className="fa-solid fa-brain text-green-400 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-neon-lime transition-colors">
                      OpenAI GPT-4o
                    </h3>
                    <p className="text-gray-400 text-sm">Most Popular</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Advanced reasoning, creative problem-solving, and comprehensive knowledge.
                </p>
                <input type="radio" name="ai_model" value="openai" className="w-4 h-4 text-neon-lime" required />
              </label>

              <label className="bg-darkest bg-opacity-70 rounded-lg p-6 border border-gray-700 hover:border-neon-lime transition-all duration-300 cursor-pointer group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <i className="fa-solid fa-robot text-blue-400 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-neon-lime transition-colors">
                      Claude 3.5 Sonnet
                    </h3>
                    <p className="text-gray-400 text-sm">Best for Analysis</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Exceptional analytical thinking, ethical reasoning, and detailed explanations.
                </p>
                <input type="radio" name="ai_model" value="claude" className="w-4 h-4 text-neon-lime" />
              </label>

              <label className="bg-darkest bg-opacity-70 rounded-lg p-6 border border-gray-700 hover:border-neon-lime transition-all duration-300 cursor-pointer group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <i className="fa-solid fa-gem text-purple-400 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-neon-lime transition-colors">
                      Google Gemini Pro
                    </h3>
                    <p className="text-gray-400 text-sm">Multimodal</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Multimodal capabilities, code generation, and real-time information processing.
                </p>
                <input type="radio" name="ai_model" value="gemini" className="w-4 h-4 text-neon-lime" />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div id="basic-info" className="bg-gray-800 bg-opacity-30 rounded-xl p-8 border border-gray-700 space-y-6">
              <h2 className="text-2xl font-bold flex items-center">
                <i className="fa-solid fa-user-graduate text-neon-lime mr-3"></i>
                Mentor Profile
              </h2>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Mentor Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full bg-darkest border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-neon-lime focus:ring-2 focus:ring-neon-lime focus:ring-opacity-30 transition-all duration-300"
                  placeholder="e.g., Dr. Alex CodeMaster"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full bg-darkest border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-neon-lime focus:ring-2 focus:ring-neon-lime focus:ring-opacity-30 transition-all duration-300 h-24 resize-none"
                  placeholder="e.g., An expert in Advanced JavaScript, React, and full-stack development..."
                  required
                />
              </div>
              <div>
                <label htmlFor="system_prompt" className="block text-sm font-medium text-gray-300 mb-2">
                  System Prompt (The Mentor&apos;s Brain)
                </label>
                <textarea
                  id="system_prompt"
                  name="system_prompt"
                  className="w-full bg-darkest border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-neon-lime focus:ring-2 focus:ring-neon-lime focus:ring-opacity-30 transition-all duration-300 h-32 resize-none"
                  placeholder="You are a helpful assistant that..."
                  required
                />
              </div>
            </div>

            <div
              id="personality-config"
              className="bg-gray-800 bg-opacity-30 rounded-xl p-8 border border-gray-700 space-y-6"
            >
              <h2 className="text-2xl font-bold flex items-center">
                <i className="fa-solid fa-masks-theater text-neon-lime mr-3"></i>
                Personality Settings
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Communication Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "Encouraging", desc: "Supportive and motivating" },
                    { val: "Direct", desc: "Straightforward and clear" },
                    { val: "Socratic", desc: "Question-based learning" },
                    { val: "Casual", desc: "Friendly and relaxed" },
                  ].map(({ val, desc }) => (
                    <label
                      key={val}
                      className="bg-darkest rounded-lg p-3 border border-gray-600 hover:border-neon-lime transition-all cursor-pointer"
                    >
                      <input type="radio" name="personality" value={val} className="mb-2" required />
                      <div className="text-sm font-medium text-white">{val}</div>
                      <div className="text-xs text-gray-400">{desc}</div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center py-8">
            <button
              type="submit"
              className="px-8 py-4 bg-neon-lime text-darkest font-semibold rounded-full hover:bg-opacity-80 transition-all duration-300 btn-hover-effect relative overflow-hidden"
            >
              Create Your Mentor
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}
