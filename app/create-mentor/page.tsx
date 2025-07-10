"use client"

import { useActionState, useEffect, useRef } from "react"
import {
  BrainCircuit,
  Bot,
  Gem,
  GraduationCap,
  Drama,
  Bell,
  CalendarCheck,
  Trophy,
  MessageSquare,
  Cpu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { createMentorAction, type FormState } from "./actions"
import { useToast } from "@/hooks/use-toast"
import Navigation from "@/components/navigation"

const initialState: FormState = {
  message: "",
}

export default function CreateMentorPage() {
  const [state, formAction, isPending] = useActionState(createMentorAction, initialState)
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.message && !state.issues) {
      toast({
        title: "Success!",
        description: state.message,
        variant: "default",
      })
      formRef.current?.reset()
    } else if (state.message && state.issues) {
      toast({
        title: "Error",
        description: state.issues.join("\n"),
        variant: "destructive",
      })
    }
  }, [state, toast])

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-20 font-montserrat text-white bg-dark">
        <div className="container mx-auto px-6">
          <div className="bg-darkest bg-opacity-70 rounded-2xl p-8 mb-12 border border-gray-800 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Create Your Custom <span className="text-neon-lime">AI Mentor</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Design a personalized AI mentor powered by cutting-edge AI models. Choose your preferred AI, customize
              personality, and create the perfect learning companion.
            </p>
          </div>

          <form ref={formRef} action={formAction}>
            {/* AI Model Selection */}
            <div className="bg-gray-800 bg-opacity-30 rounded-xl p-8 mb-12 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Cpu className="text-neon-lime mr-3" />
                Choose Your AI Frontier Model
              </h2>
              <RadioGroup name="ai-model" defaultValue="UX Pilot 4.1" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Label className="bg-darkest bg-opacity-70 rounded-lg p-6 border border-gray-700 hover:border-neon-lime transition-all duration-300 cursor-pointer group has-[:checked]:border-neon-lime has-[:checked]:ring-2 has-[:checked]:ring-neon-lime/30">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                      <BrainCircuit className="text-green-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-neon-lime transition-colors">
                        UX Pilot 4.1
                      </h3>
                      <p className="text-gray-400 text-sm">UX Pilot AI's Latest</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Advanced reasoning, creative problem-solving, and comprehensive knowledge.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-neon-lime text-sm font-medium">Most Popular</span>
                    <RadioGroupItem value="UX Pilot 4.1" id="model-ux-pilot-4.1" />
                  </div>
                </Label>
                <Label className="bg-darkest bg-opacity-70 rounded-lg p-6 border border-gray-700 hover:border-neon-lime transition-all duration-300 cursor-pointer group has-[:checked]:border-neon-lime has-[:checked]:ring-2 has-[:checked]:ring-neon-lime/30">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                      <Bot className="text-blue-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-neon-lime transition-colors">
                        UX Pilot 4
                      </h3>
                      <p className="text-gray-400 text-sm">UX Pilot AI's Flagship</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Exceptional analytical thinking, ethical reasoning, and detailed explanations.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 text-sm font-medium">Best for Analysis</span>
                    <RadioGroupItem value="UX Pilot 4" id="model-ux-pilot-4" />
                  </div>
                </Label>
                <Label className="bg-darkest bg-opacity-70 rounded-lg p-6 border border-gray-700 hover:border-neon-lime transition-all duration-300 cursor-pointer group has-[:checked]:border-neon-lime has-[:checked]:ring-2 has-[:checked]:ring-neon-lime/30">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                      <Gem className="text-purple-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-neon-lime transition-colors">
                        Gemini 2.5
                      </h3>
                      <p className="text-gray-400 text-sm">Google's Advanced</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Multimodal capabilities, code generation, and real-time information processing.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 text-sm font-medium">Multimodal</span>
                    <RadioGroupItem value="Gemini 2.5" id="model-gemini" />
                  </div>
                </Label>
              </RadioGroup>
            </div>

            {/* Mentor Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800 bg-opacity-30 rounded-xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <GraduationCap className="text-neon-lime mr-3" />
                  Mentor Profile
                </h2>
                <div className="space-y-6">
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="mentorName">
                      Mentor Name
                    </Label>
                    <Input
                      name="mentorName"
                      id="mentorName"
                      type="text"
                      className="w-full bg-darkest border-gray-600"
                      placeholder="e.g., Dr. Alex CodeMaster"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="mentorDescription">
                      What will your mentor teach you?
                    </Label>
                    <Textarea
                      name="mentorDescription"
                      id="mentorDescription"
                      className="w-full bg-darkest border-gray-600 h-24 resize-none"
                      placeholder="e.g., Advanced JavaScript, React development, full-stack web development, coding best practices..."
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Expertise Level</Label>
                    <Select name="expertiseLevel" defaultValue="Intermediate">
                      <SelectTrigger className="w-full bg-darkest border-gray-600">
                        <SelectValue placeholder="Select expertise level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner Friendly">Beginner Friendly</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Expert">Expert Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 bg-opacity-30 rounded-xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Drama className="text-neon-lime mr-3" />
                  Personality Settings
                </h2>
                <div className="space-y-6">
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-3">Communication Style</Label>
                    <RadioGroup name="communicationStyle" defaultValue="encouraging" className="grid grid-cols-2 gap-3">
                      <Label className="bg-darkest rounded-lg p-3 border border-gray-600 hover:border-neon-lime transition-all cursor-pointer has-[:checked]:border-neon-lime">
                        <RadioGroupItem value="encouraging" id="style-encouraging" className="mb-2" />
                        <div className="text-sm font-medium text-white">Encouraging</div>
                        <div className="text-xs text-gray-400">Supportive and motivating</div>
                      </Label>
                      <Label className="bg-darkest rounded-lg p-3 border border-gray-600 hover:border-neon-lime transition-all cursor-pointer has-[:checked]:border-neon-lime">
                        <RadioGroupItem value="direct" id="style-direct" className="mb-2" />
                        <div className="text-sm font-medium text-white">Direct</div>
                        <div className="text-xs text-gray-400">Straightforward and clear</div>
                      </Label>
                      <Label className="bg-darkest rounded-lg p-3 border border-gray-600 hover:border-neon-lime transition-all cursor-pointer has-[:checked]:border-neon-lime">
                        <RadioGroupItem value="socratic" id="style-socratic" className="mb-2" />
                        <div className="text-sm font-medium text-white">Socratic</div>
                        <div className="text-xs text-gray-400">Question-based learning</div>
                      </Label>
                      <Label className="bg-darkest rounded-lg p-3 border border-gray-600 hover:border-neon-lime transition-all cursor-pointer has-[:checked]:border-neon-lime">
                        <RadioGroupItem value="casual" id="style-casual" className="mb-2" />
                        <div className="text-sm font-medium text-white">Casual</div>
                        <div className="text-xs text-gray-400">Friendly and relaxed</div>
                      </Label>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-3">Aggressiveness Level</Label>
                    <Slider
                      name="aggressiveness"
                      defaultValue={[5]}
                      max={10}
                      step={1}
                      className="w-full range-slider"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Gentle</span>
                      <span>Balanced</span>
                      <span>Intense</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">How challenging and demanding should your mentor be?</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-gray-800 bg-opacity-30 rounded-xl p-8 mb-12 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Bell className="text-neon-lime mr-3" />
                Notification Preferences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-darkest bg-opacity-70 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <Label htmlFor="dailyReminders" className="flex items-center font-medium cursor-pointer">
                      <CalendarCheck className="text-neon-lime mr-2" />
                      Daily Reminders
                    </Label>
                    <Switch name="dailyReminders" id="dailyReminders" defaultChecked />
                  </div>
                  <p className="text-sm text-gray-400">Get daily learning reminders and progress updates</p>
                </div>
                <div className="bg-darkest bg-opacity-70 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <Label htmlFor="achievementAlerts" className="flex items-center font-medium cursor-pointer">
                      <Trophy className="text-neon-lime mr-2" />
                      Achievement Alerts
                    </Label>
                    <Switch name="achievementAlerts" id="achievementAlerts" defaultChecked />
                  </div>
                  <p className="text-sm text-gray-400">Celebrate milestones and learning achievements</p>
                </div>
                <div className="bg-darkest bg-opacity-70 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <Label htmlFor="sessionReminders" className="flex items-center font-medium cursor-pointer">
                      <MessageSquare className="text-neon-lime mr-2" />
                      Session Reminders
                    </Label>
                    <Switch name="sessionReminders" id="sessionReminders" />
                  </div>
                  <p className="text-sm text-gray-400">Reminders for scheduled mentoring sessions</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                disabled={isPending}
                className="px-12 py-6 bg-gradient-to-r from-neon-lime to-neon-cyan text-darkest font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--neon-cyan-hsl))] text-lg"
              >
                {isPending ? "Creating Mentor..." : "Create My AI Mentor"}
              </Button>
              {state?.message && !state.issues && <p className="mt-4 text-green-400">{state.message}</p>}
              {state?.issues && (
                <div className="mt-4 text-red-400">
                  <p>{state.message}</p>
                  <ul className="list-disc list-inside">
                    {state.issues.map((issue) => (
                      <li key={issue}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
