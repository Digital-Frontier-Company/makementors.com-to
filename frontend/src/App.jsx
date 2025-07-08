"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fetchMentorTemplates, postChatMessage } from "./services/api"
import { User, Bot, Send, Loader, Menu, X, ChevronDown } from "lucide-react"
import logo from "./assets/makementors-logo-green.png"
import { twMerge } from "tailwind-merge"

const Header = () => (
  <header className="bg-dark-card/80 backdrop-blur-sm border-b border-dark-border fixed top-0 left-0 right-0 z-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <img src={logo || "/placeholder.svg"} alt="Make Mentors Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold text-brand-green">Make Mentors</h1>
        </div>
      </div>
    </div>
  </header>
)

const MentorSidebar = ({ mentors, selectedMentor, onSelectMentor, isOpen, toggleSidebar }) => {
  return (
    <>
      <div
        className={twMerge(
          "fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-dark-card border-r border-dark-border transition-transform transform z-10 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-4 space-y-4 overflow-y-auto h-full">
          <h2 className="text-lg font-semibold text-white">Mentors</h2>
          {Object.entries(mentors).map(([category, mentorList]) => (
            <div key={category}>
              <h3 className="font-bold text-brand-green mb-2">{category}</h3>
              <ul className="space-y-1">
                {mentorList.map((mentor) => (
                  <li key={mentor.id}>
                    <button
                      onClick={() => onSelectMentor(mentor)}
                      className={twMerge(
                        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        selectedMentor?.id === mentor.id
                          ? "bg-purple-accent/20 text-white font-semibold"
                          : "text-dark-text hover:bg-dark-border",
                      )}
                    >
                      {mentor.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <button onClick={toggleSidebar} className="md:hidden fixed top-4 right-4 z-30 bg-dark-card p-2 rounded-full">
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </>
  )
}

const ChatMessage = ({ message }) => {
  const isUser = message.role === "user"
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={twMerge("flex items-start space-x-3 my-4", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-accent flex items-center justify-center">
          <Bot size={20} className="text-white" />
        </div>
      )}
      <div className={twMerge("p-3 rounded-lg max-w-lg", isUser ? "bg-brand-green text-black" : "bg-dark-card")}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-dark-border flex items-center justify-center">
          <User size={20} />
        </div>
      )}
    </motion.div>
  )
}

const ChatWindow = ({ mentor, messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput("")
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-dark-border">
        <form onSubmit={handleSend} className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${mentor.name}...`}
            className="w-full bg-dark-card border border-dark-border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-accent"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-brand-green rounded-full p-2 text-black disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
      </div>
    </div>
  )
}

const WelcomeScreen = ({ onSelectMentor }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <img src={logo || "/placeholder.svg"} alt="Make Mentors Logo" className="h-24 w-24 mx-auto" />
    </motion.div>
    <motion.h2
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mt-6 text-3xl font-bold text-white"
    >
      Welcome to <span className="text-brand-green">Make Mentors</span>
    </motion.h2>
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-2 text-dark-text-secondary max-w-md"
    >
      Select a mentor from the sidebar to start your personalized coaching session.
    </motion.p>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-8 md:hidden"
    >
      <button
        onClick={() => onSelectMentor(true)}
        className="bg-purple-accent text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2"
      >
        <span>Choose a Mentor</span>
        <ChevronDown size={20} />
      </button>
    </motion.div>
  </div>
)

function App() {
  const [mentors, setMentors] = useState({})
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [chatHistory, setChatHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const loadMentors = async () => {
      const mentorData = await fetchMentorTemplates()
      setMentors(mentorData)
    }
    loadMentors()
  }, [])

  const handleSelectMentor = useCallback((mentor) => {
    setSelectedMentor(mentor)
    setChatHistory([{ role: "assistant", content: `Hello! I am the ${mentor.name}. How can I help you today?` }])
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false)
    }
  }, [])

  const handleSendMessage = async (userInput) => {
    const newHistory = [...chatHistory, { role: "user", content: userInput }]
    setChatHistory(newHistory)
    setIsLoading(true)

    try {
      const response = await postChatMessage(selectedMentor.id, newHistory)
      setChatHistory([...newHistory, { role: "assistant", content: response.response }])
    } catch (error) {
      console.error("Chat error:", error)
      setChatHistory([
        ...newHistory,
        { role: "assistant", content: "I'm sorry, I encountered an error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow pt-16">
        <MentorSidebar
          mentors={mentors}
          selectedMentor={selectedMentor}
          onSelectMentor={handleSelectMentor}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main className="flex-grow transition-all duration-300 md:ml-64">
          {selectedMentor ? (
            <ChatWindow
              mentor={selectedMentor}
              messages={chatHistory}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          ) : (
            <WelcomeScreen onSelectMentor={toggleSidebar} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
