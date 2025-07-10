"use client"

import { useEffect } from "react"
import Navigation from "@/components/navigation"
import { deleteMentorAction } from "./actions"
import { Button } from "@/components/ui/button"
import { Trash2, Bot } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Mentor = {
  id: string
  name: string
  description: string
  model: string
}

export default function DashboardClient({ mentors }: { mentors: Mentor[] }) {
  const { toast } = useToast()

  useEffect(() => {
    // Custom Cursor
    const cursor = document.querySelector(".custom-cursor")
    const hoverables = document.querySelectorAll('button, a, input, .card-3d, [class*="hover:"], .cursor-pointer')

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX + "px"
        cursor.style.top = e.clientY + "px"
      }
    }

    const handleMouseDown = () => cursor?.classList.add("click")
    const handleMouseUp = () => cursor?.classList.remove("click")

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor?.classList.add("hover"))
      el.addEventListener("mouseleave", () => cursor?.classList.remove("hover"))
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  const handleDelete = async (mentorId: string) => {
    const result = await deleteMentorAction(mentorId)
    if (result.error) {
      toast({ title: "Error", description: result.error, variant: "destructive" })
    } else {
      toast({ title: "Success", description: result.success })
    }
  }

  return (
    <>
      <Navigation />
      <div className="custom-cursor"></div>
      <div className="progress-bar" id="scrollProgress"></div>
      <canvas id="particles-canvas"></canvas>

      {/* Main Dashboard Content */}
      <main id="dashboard" className="pt-24 pb-20 w-full">
        <div className="container mx-auto px-6">
          {/* Dashboard Header */}
          <div id="dashboard-header" className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Your Learning <span className="text-neon-lime">Dashboard</span>
            </h1>
            <p className="text-gray-400">Track your progress, achievements, and learning journey</p>
          </div>

          {/* Your Created Mentors Section */}
          <section id="your-mentors" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Your Created Mentors</h2>
            {mentors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-neon-lime">{mentor.name}</h3>
                        <div className="w-10 h-10 bg-neon-lime/20 rounded-full flex items-center justify-center">
                          <Bot className="text-neon-lime" />
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-2 line-clamp-2">{mentor.description}</p>
                      <p className="text-xs text-gray-500">Model: {mentor.model}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(mentor.id)}
                        className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
                <p className="text-gray-400">You haven't created any mentors yet.</p>
                <Button asChild className="mt-4 bg-neon-lime text-darkest hover:bg-opacity-80">
                  <a href="/create-mentor">Create Your First Mentor</a>
                </Button>
              </div>
            )}
          </section>

          {/* Progress Overview */}
          <section id="progress-overview" className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Progress Card 1 */}
              <div
                id="progress-card-1"
                className="bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700 card-3d"
              >
                <div className="card-content">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-semibold">Coding Progress</h3>
                      <p className="text-gray-400 text-sm">React Development</p>
                    </div>
                    <div className="w-12 h-12 bg-neon-lime bg-opacity-20 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-code text-neon-lime text-xl"></i>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-gradient-to-r from-neon-lime to-neon-cyan h-full rounded-full animate-progress"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-neon-lime font-medium">75%</span>
                  </div>
                </div>
              </div>

              {/* Progress Card 2 */}
              <div
                id="progress-card-2"
                className="bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700 card-3d"
              >
                <div className="card-content">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-semibold">Learning Hours</h3>
                      <p className="text-gray-400 text-sm">This Month</p>
                    </div>
                    <div className="w-12 h-12 bg-neon-lime bg-opacity-20 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-clock text-neon-lime text-xl"></i>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">32</span>
                    <span className="text-gray-400 ml-2 mb-1">/ 40 hours</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-gradient-to-r from-neon-lime to-neon-cyan h-full rounded-full animate-progress"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Progress Card 3 */}
              <div
                id="progress-card-3"
                className="bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700 card-3d"
              >
                <div className="card-content">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-semibold">Active Mentors</h3>
                      <p className="text-gray-400 text-sm">Current Sessions</p>
                    </div>
                    <div className="w-12 h-12 bg-neon-lime bg-opacity-20 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-user-graduate text-neon-lime text-xl"></i>
                    </div>
                  </div>
                  <div className="flex -space-x-3">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                      alt="Mentor avatar"
                      className="w-10 h-10 rounded-full border-2 border-neon-lime"
                    />
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                      alt="Mentor avatar"
                      className="w-10 h-10 rounded-full border-2 border-neon-lime"
                    />
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                      alt="Mentor avatar"
                      className="w-10 h-10 rounded-full border-2 border-neon-lime"
                    />
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium border-2 border-neon-lime">
                      +1
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-400">
                    <span className="text-neon-lime font-medium">4</span> active mentors
                  </div>
                </div>
              </div>

              {/* Progress Card 4 */}
              <div
                id="progress-card-4"
                className="bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700 card-3d"
              >
                <div className="card-content">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-semibold">Achievements</h3>
                      <p className="text-gray-400 text-sm">Badges Earned</p>
                    </div>
                    <div className="w-12 h-12 bg-neon-lime bg-opacity-20 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-award text-neon-lime text-xl"></i>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-1">
                      <div className="w-8 h-8 rounded-full bg-neon-lime bg-opacity-20 flex items-center justify-center text-neon-lime">
                        <i className="fa-solid fa-star text-xs"></i>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-neon-cyan bg-opacity-20 flex items-center justify-center text-neon-cyan">
                        <i className="fa-solid fa-code text-xs"></i>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-neon-purple bg-opacity-20 flex items-center justify-center text-neon-purple">
                        <i className="fa-solid fa-trophy text-xs"></i>
                      </div>
                    </div>
                    <span className="text-3xl font-bold">12</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    <span className="text-neon-lime font-medium">+3</span> new this month
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Engagement and Achievements Section */}
          <section id="engagement-section" className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Progress Bars and Milestones */}
              <div
                id="progress-bars"
                className="lg:col-span-2 bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700"
              >
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <i className="fa-solid fa-chart-line text-neon-lime mr-3"></i>
                  Learning Progress
                </h2>

                {/* Progress Bar 1 */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-medium">React Development</h3>
                      <p className="text-sm text-gray-400">Frontend Framework</p>
                    </div>
                    <div className="text-neon-lime font-medium">75%</div>
                  </div>
                  <div className="relative">
                    <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-neon-lime to-neon-cyan rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                    {/* Milestone Markers */}
                    <div className="absolute top-0 left-0 w-full flex justify-between -mt-1 px-1">
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-neon-lime flex items-center justify-center milestone-animation">
                          <i className="fa-solid fa-check text-neon-lime text-xs"></i>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          Basics
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-neon-lime flex items-center justify-center milestone-animation">
                          <i className="fa-solid fa-check text-neon-lime text-xs"></i>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          Components
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-neon-lime flex items-center justify-center milestone-animation">
                          <i className="fa-solid fa-check text-neon-lime text-xs"></i>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          State
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-gray-600 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">4</span>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          Hooks
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-gray-600 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">5</span>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          Advanced
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar 2 */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-medium">Node.js Backend</h3>
                      <p className="text-sm text-gray-400">Server Development</p>
                    </div>
                    <div className="text-neon-lime font-medium">60%</div>
                  </div>
                  <div className="relative">
                    <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-neon-lime to-neon-cyan rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                    {/* Milestone Markers */}
                    <div className="absolute top-0 left-0 w-full flex justify-between -mt-1 px-1">
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-neon-lime flex items-center justify-center milestone-animation">
                          <i className="fa-solid fa-check text-neon-lime text-xs"></i>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          Setup
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-neon-lime flex items-center justify-center milestone-animation">
                          <i className="fa-solid fa-check text-neon-lime text-xs"></i>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          Express
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-neon-lime flex items-center justify-center milestone-animation">
                          <i className="fa-solid fa-check text-neon-lime text-xs"></i>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          Routes
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-gray-600 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">4</span>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          MongoDB
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-gray-600 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">5</span>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          Auth
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar 3 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-medium">UI/UX Design</h3>
                      <p className="text-sm text-gray-400">Interface Design</p>
                    </div>
                    <div className="text-neon-lime font-medium">40%</div>
                  </div>
                  <div className="relative">
                    <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-neon-lime to-neon-cyan rounded-full"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                    {/* Milestone Markers */}
                    <div className="absolute top-0 left-0 w-full flex justify-between -mt-1 px-1">
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-neon-lime flex items-center justify-center milestone-animation">
                          <i className="fa-solid fa-check text-neon-lime text-xs"></i>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          Basics
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-neon-lime flex items-center justify-center milestone-animation">
                          <i className="fa-solid fa-check text-neon-lime text-xs"></i>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          Color
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-gray-600 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">3</span>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          Layout
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-gray-600 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">4</span>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          Prototyping
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-darkest border-2 border-gray-600 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">5</span>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          Advanced
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement Badges */}
              <div id="achievement-badges" className="bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <i className="fa-solid fa-award text-neon-lime mr-3"></i>
                  Achievements
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  {/* Badge 1 */}
                  <div className="badge bg-darkest bg-opacity-70 rounded-lg p-4 border border-neon-lime text-center">
                    <div className="w-16 h-16 mx-auto bg-neon-lime bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                      <i className="fa-solid fa-rocket text-neon-lime text-2xl"></i>
                    </div>
                    <h3 className="text-sm font-medium">Fast Learner</h3>
                    <p className="text-xs text-gray-400 mt-1">Completed 5 lessons in one day</p>
                  </div>

                  {/* Badge 2 */}
                  <div className="badge bg-darkest bg-opacity-70 rounded-lg p-4 border border-neon-cyan text-center">
                    <div className="w-16 h-16 mx-auto bg-neon-cyan bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                      <i className="fa-solid fa-code text-neon-cyan text-2xl"></i>
                    </div>
                    <h3 className="text-sm font-medium">Code Master</h3>
                    <p className="text-xs text-gray-400 mt-1">Completed 10 coding challenges</p>
                  </div>

                  {/* Badge 3 */}
                  <div className="badge bg-darkest bg-opacity-70 rounded-lg p-4 border border-neon-purple text-center">
                    <div className="w-16 h-16 mx-auto bg-neon-purple bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                      <i className="fa-solid fa-calendar-check text-neon-purple text-2xl"></i>
                    </div>
                    <h3 className="text-sm font-medium">Consistent</h3>
                    <p className="text-xs text-gray-400 mt-1">Logged in for 7 days in a row</p>
                  </div>

                  {/* Badge 4 (Locked) */}
                  <div className="bg-darkest bg-opacity-70 rounded-lg p-4 border border-gray-700 text-center relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-darkest bg-opacity-70 rounded-lg">
                      <i className="fa-solid fa-lock text-gray-400 text-xl"></i>
                    </div>
                    <div className="w-16 h-16 mx-auto bg-gray-700 bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                      <i className="fa-solid fa-star text-gray-600 text-2xl"></i>
                    </div>
                    <h3 className="text-sm font-medium text-gray-500">Project Pro</h3>
                    <p className="text-xs text-gray-500 mt-1">Complete your first project</p>
                  </div>

                  <button className="col-span-2 mt-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300">
                    View All Achievements
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Learning Activity Chart */}
          <section id="learning-activity" className="mb-12">
            <div className="bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <i className="fa-solid fa-chart-area text-neon-lime mr-3"></i>
                  Learning Activity
                </h2>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <button className="px-4 py-2 bg-neon-lime bg-opacity-20 text-neon-lime rounded-lg text-sm">
                    Week
                  </button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm">
                    Month
                  </button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm">
                    Year
                  </button>
                </div>
              </div>
              <div
                id="activity-chart"
                className="h-80 bg-gray-900 bg-opacity-50 rounded-lg flex items-center justify-center"
              >
                <p className="text-gray-400">Activity Chart Placeholder</p>
              </div>
            </div>
          </section>

          {/* Recent Sessions and Next Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Recent Sessions */}
            <section id="recent-sessions">
              <div className="bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <i className="fa-solid fa-history text-neon-lime mr-3"></i>
                  Recent Sessions
                </h2>

                <div className="space-y-4">
                  {/* Session 1 */}
                  <div className="bg-darkest bg-opacity-70 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                        alt="Mentor avatar"
                        className="w-10 h-10 rounded-full border-2 border-neon-lime"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">React Hooks Deep Dive</h3>
                          <span className="text-xs text-gray-400">Today</span>
                        </div>
                        <p className="text-sm text-gray-400">David Rodriguez - Coding Coach</p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center text-xs text-neon-lime">
                            <i className="fa-solid fa-clock mr-1"></i>
                            <span>45 minutes</span>
                          </div>
                          <button className="text-xs text-white px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300">
                            Resume
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Session 2 */}
                  <div className="bg-darkest bg-opacity-70 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                        alt="Mentor avatar"
                        className="w-10 h-10 rounded-full border-2 border-neon-lime"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">UI Design Principles</h3>
                          <span className="text-xs text-gray-400">Yesterday</span>
                        </div>
                        <p className="text-sm text-gray-400">Sarah Johnson - Creative Director</p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center text-xs text-neon-lime">
                            <i className="fa-solid fa-clock mr-1"></i>
                            <span>60 minutes</span>
                          </div>
                          <button className="text-xs text-white px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300">
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Session 3 */}
                  <div className="bg-darkest bg-opacity-70 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                        alt="Mentor avatar"
                        className="w-10 h-10 rounded-full border-2 border-neon-lime"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">Express.js Routing</h3>
                          <span className="text-xs text-gray-400">2 days ago</span>
                        </div>
                        <p className="text-sm text-gray-400">James Wilson - Backend Expert</p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center text-xs text-neon-lime">
                            <i className="fa-solid fa-clock mr-1"></i>
                            <span>30 minutes</span>
                          </div>
                          <button className="text-xs text-white px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300">
                            Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300">
                  View All Sessions
                </button>
              </div>
            </section>

            {/* Next Steps */}
            <section id="next-steps">
              <div className="bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <i className="fa-solid fa-map-marker-alt text-neon-lime mr-3"></i>
                  Recommended Next Steps
                </h2>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="bg-darkest bg-opacity-70 rounded-lg p-4 border border-gray-700 hover:border-neon-lime transition-all duration-300">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-neon-lime bg-opacity-20 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-code-branch text-neon-lime"></i>
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="font-medium">Complete React Hooks Tutorial</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Continue your progress with advanced hooks concepts
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center text-xs text-gray-400">
                            <i className="fa-solid fa-clock mr-1"></i>
                            <span>Estimated: 45 min</span>
                          </div>
                          <button className="text-xs text-darkest px-3 py-1 bg-neon-lime hover:bg-opacity-80 rounded-full transition-all duration-300 btn-hover-effect">
                            Start
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-darkest bg-opacity-70 rounded-lg p-4 border border-gray-700 hover:border-neon-lime transition-all duration-300">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-neon-lime bg-opacity-20 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-laptop-code text-neon-lime"></i>
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="font-medium">Build a Todo App with React</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Apply your React knowledge with a practical project
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center text-xs text-gray-400">
                            <i className="fa-solid fa-clock mr-1"></i>
                            <span>Estimated: 2 hours</span>
                          </div>
                          <button className="text-xs text-white px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-darkest bg-opacity-70 rounded-lg p-4 border border-gray-700 hover:border-neon-lime transition-all duration-300">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-neon-lime bg-opacity-20 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-database text-neon-lime"></i>
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="font-medium">MongoDB Integration with Node.js</h3>
                        <p className="text-sm text-gray-400 mt-1">Learn how to connect your Node.js app to MongoDB</p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center text-xs text-gray-400">
                            <i className="fa-solid fa-clock mr-1"></i>
                            <span>Estimated: 1.5 hours</span>
                          </div>
                          <button className="text-xs text-white px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300">
                  View Learning Path
                </button>
              </div>
            </section>
          </div>

          {/* Quick Actions */}
          <section id="quick-actions" className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700 hover:border-neon-lime transition-all duration-300 flex items-center">
                <div className="w-12 h-12 bg-neon-lime bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <i className="fa-solid fa-plus text-neon-lime text-xl"></i>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Add New Mentor</h3>
                  <p className="text-sm text-gray-400">Expand your learning resources</p>
                </div>
              </button>

              <button className="bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700 hover:border-neon-lime transition-all duration-300 flex items-center">
                <div className="w-12 h-12 bg-neon-lime bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <i className="fa-solid fa-calendar-plus text-neon-lime text-xl"></i>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Schedule Session</h3>
                  <p className="text-sm text-gray-400">Book time with your mentors</p>
                </div>
              </button>

              <button className="bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700 hover:border-neon-lime transition-all duration-300 flex items-center">
                <div className="w-12 h-12 bg-neon-lime bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <i className="fa-solid fa-file-export text-neon-lime text-xl"></i>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Export Progress</h3>
                  <p className="text-sm text-gray-400">Download your learning data</p>
                </div>
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-darkest py-8 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 relative mr-2 logo-glow">
                <div className="star-shape absolute top-0 left-0"></div>
              </div>
              <span className="text-neon-lime text-xl font-bold">MakeMentors.io</span>
            </div>
            <div className="flex space-x-6">
              <span className="text-gray-400 hover:text-neon-lime transition-colors duration-300 cursor-pointer text-sm">
                Help Center
              </span>
              <span className="text-gray-400 hover:text-neon-lime transition-colors duration-300 cursor-pointer text-sm">
                Privacy Policy
              </span>
              <span className="text-gray-400 hover:text-neon-lime transition-colors duration-300 cursor-pointer text-sm">
                Terms of Service
              </span>
            </div>
            <div className="mt-4 md:mt-0 text-gray-500 text-sm">© 2025 MakeMentors.io</div>
          </div>
        </div>
      </footer>
    </>
  )
}
