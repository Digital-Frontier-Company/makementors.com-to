"use client"
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  CheckCircle,
  Heart,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Navigation from "@/components/navigation"
import Link from "next/link"
import AnimatedFeatureCards from "@/components/animated-feature-cards"
import Image from "next/image"

const mentors = [
  {
    title: "Business Strategy Advisor",
    imageUrl: "/images/mentors/business_strategy_advisor.png",
    personality: "Visionary, analytical, data-driven",
    advice: "This isn't about building more - it's about building right.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Sales Performance Coach",
    imageUrl: "/images/mentors/sales_coach.png",
    personality: "Motivational, practical, results-focused",
    advice: "Turn objections into opportunities with authentic relationship building.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Leadership Development Mentor",
    imageUrl: "/images/mentors/leadership_mentor.png",
    personality: "Wise, supportive, challenging",
    advice: "Great leaders create more leaders. Let's develop your authentic style.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Digital Marketing Strategist",
    imageUrl: "/images/mentors/marketing_strategist.png",
    personality: "Creative, analytical, trend-aware",
    advice: "Data-driven creativity is the key to breakthrough marketing.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Study Skills Coach",
    imageUrl: "/images/mentors/study_coach.png",
    personality: "Patient, methodical, encouraging",
    advice: "Learning is a skill. Let's optimize your study techniques for success.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Career Development Counselor",
    imageUrl: "/images/mentors/career_counselor.png",
    personality: "Insightful, supportive, forward-thinking",
    advice: "Your next career move should align with your values and strengths.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Creative Writing Mentor",
    imageUrl: "/images/mentors/creative_writer.png",
    personality: "Imaginative, encouraging, literary",
    advice: "Every great story starts with authentic voice. Let's find yours.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Programming Mentor",
    imageUrl: "/images/mentors/programming_mentor.png",
    personality: "Logical, patient, problem-solving focused",
    advice: "Programming is problem-solving. Let's build your developer mindset.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Mindfulness & Meditation Guide",
    imageUrl: "/images/mentors/mindfulness_guide.png",
    personality: "Calm, wise, present-focused",
    advice: "The present moment is where transformation happens.",
    gradient: "from-purple-500 to-violet-500",
  },
]

const features = [
  {
    title: "Instant Access",
    description: "Get expert guidance the moment you need it - no scheduling, no waiting.",
    icon: Lightbulb,
  },
  {
    title: "Personalized Approach",
    description: "Mentors adapt to your learning style and communication preferences.",
    icon: Users,
  },
  {
    title: "Multiple AI Models",
    description: "Powered by OpenAI, Claude, and Gemini for superior intelligence.",
    icon: Brain,
  },
  {
    title: "Progress Tracking",
    description: "See your growth with detailed analytics and goal achievement.",
    icon: CheckCircle,
  },
  { title: "Always Available", description: "24/7 support means you never face challenges alone.", icon: ShieldCheck },
  {
    title: "Affordable Excellence",
    description: "World-class mentorship for 1/10th the cost of traditional coaching.",
    icon: Star,
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Startup Founder",
    quote:
      "The Startup Strategy Advisor helped me pivot my business model and secure $500K in funding. Best investment I've ever made.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Sales Manager",
    quote:
      "My conversion rate increased 40% after working with the Sales Coach. The techniques are practical and immediately actionable.",
  },
  {
    name: "Dr. Emily Watson",
    role: "Academic",
    quote:
      "The Study Skills Coach transformed how I approach research. I'm publishing twice as much with half the stress.",
  },
]

const faqs = [
  {
    question: "How is this different from ChatGPT or other AI tools?",
    answer:
      "Our mentors are specialized experts with distinct personalities and coaching methodologies, powered by multiple AI models for superior responses. They are designed for structured growth, not just answering questions.",
  },
  {
    question: "Can AI really replace human mentors?",
    answer:
      "While AI can't replace human connection, our mentors provide consistent, expert-level guidance available 24/7 at a fraction of the cost, making top-tier mentorship accessible to everyone.",
  },
  {
    question: "What if I don't see results?",
    answer:
      "We offer a 30-day money-back guarantee. If you don't see measurable progress in your skills or goals, we'll provide a full refund, no questions asked.",
  },
  {
    question: "How do you ensure quality responses?",
    answer:
      "Each mentor uses a unique set of fine-tuned prompts and is powered by a combination of leading AI models. We continuously monitor and improve response quality based on user feedback.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we use enterprise-grade encryption and security protocols. Your conversations are private and never used for training models without your explicit consent. Your privacy is our priority.",
  },
]

export default function LandingPage() {
  return (
    <div className="w-full bg-[#0f172a] text-gray-200 font-sans text-center">
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#6366f1]/20 -z-10" />
        <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/landing/hero_background.png')] opacity-20 -z-20" />
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
            Get World-Class Mentorship in <span className="text-neon-lime text-glow-lime">Minutes, Not Months</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-8">
            Access 9 expert AI mentors across business, creativity, and personal growth - all for less than the cost of
            a single coaching session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-neon-lime text-darkest hover:bg-neon-lime/90 transition-transform hover:scale-105 btn-hover-effect"
            >
              <Link href="/login?mode=signup">
                Start Free 7-Day Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-gray-600 hover:bg-gray-800 hover:text-white transition-transform hover:scale-105 bg-transparent"
            >
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 bg-gray-900/50 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-gray-300">
              <span className="font-bold text-white">10,000+</span> Professionals
            </div>
            <div className="flex items-center justify-center gap-1 text-gray-300">
              <Star className="text-yellow-400 fill-yellow-400 h-5 w-5" />{" "}
              <span className="font-bold text-white">4.9/5</span> Stars
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <BadgeCheck className="text-teal-400 h-5 w-5" /> 30-Day Guarantee
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <Heart className="text-pink-400 h-5 w-5" /> No credit card required
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Traditional coaching is broken.</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-400 mb-12">
            It's expensive, hard to access, and often inconsistent. You need expert guidance when challenges arise, not
            weeks later.
          </p>
          <div className="max-w-5xl mx-auto bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 text-left">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#14b8a6] mb-4">
                  The Make Mentors Solution
                </h3>
                <p className="text-lg text-gray-300">
                  Make Mentors provides instant access to specialized AI mentors who understand your unique goals and
                  adapt to your learning style. Get the expertise you need, exactly when you need it.
                </p>
              </div>
              <div className="h-full w-full">
                <Image
                  src="/images/landing/mentorship_concept.png"
                  alt="AI Mentorship Concept"
                  width={500}
                  height={400}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Showcase */}
      <section className="py-20 md:py-32 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Meet Your AI Mentors</h2>
            <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
              A diverse team of experts ready to guide you 24/7.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor) => {
              return (
                <div key={mentor.title} className={`bg-gradient-to-br ${mentor.gradient} p-1 rounded-xl group`}>
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
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Why Make Mentors Works</h2>
            <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
              We've engineered a better way to learn and grow, combining cutting-edge AI with proven coaching
              methodologies.
            </p>
          </div>
          <AnimatedFeatureCards features={features} />
        </div>
      </section>

      {/* How It Works Visual Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-left">
              <h3 className="text-2xl font-bold text-white mb-4">Instant, 24/7 Conversations</h3>
              <p className="text-gray-400 mb-6">
                Engage in meaningful dialogue whenever inspiration strikes. Our AI mentors are always online and ready
                to help you solve problems, brainstorm ideas, and learn new skills.
              </p>
              <Image
                src="/images/landing/ai_conversation.png"
                alt="AI conversation interface"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-left">
              <h3 className="text-2xl font-bold text-white mb-4">Visualize Your Progress</h3>
              <p className="text-gray-400 mb-6">
                With our advanced analytics, you can track your development over time. See your skills improve,
                celebrate milestones, and stay motivated on your journey to success.
              </p>
              <Image
                src="/images/landing/progress_tracking.png"
                alt="Progress tracking dashboard"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Choose Your Growth Plan</h2>
            <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Simple, transparent pricing. Cancel anytime.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Free Plan */}
            <Card className="bg-[#1e293b] border-gray-700 text-white text-left">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription className="text-gray-400">For getting started</CardDescription>
                <div className="text-4xl font-bold">
                  $0<span className="text-lg font-normal text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400" /> 3 conversations/month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400" /> Access to 3 basic mentors
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400" /> Basic progress tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400" /> Community support
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-800 bg-transparent">
                  Start Free
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="bg-[#1e293b] border-neon-lime text-white relative shadow-2xl shadow-neon-lime/20 scale-105 text-left">
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-neon-lime text-darkest px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <CardHeader className="pt-10">
                <CardTitle>Premium</CardTitle>
                <CardDescription className="text-gray-400">For accelerated growth</CardDescription>
                <div className="text-4xl font-bold">
                  $29<span className="text-lg font-normal text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400" /> Unlimited conversations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400" /> Access to all 9 mentors
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400" /> Advanced progress tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400" /> Goal setting and reminders
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400" /> Priority support
                  </li>
                </ul>
                <Button asChild className="w-full bg-neon-lime text-darkest hover:bg-neon-lime/90 btn-hover-effect">
                  <Link href="/login?mode=signup">Start 7-Day Free Trial</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-[#1e293b] border-gray-700 text-white text-left">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription className="text-gray-400">For teams and organizations</CardDescription>
                <div className="text-4xl font-bold">
                  $99<span className="text-lg font-normal text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400" /> Everything in Premium
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400" /> Custom mentor creation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400" /> Advanced analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400" /> Team collaboration features
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400" /> Dedicated success manager
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full border-gray-600 hover:bg-gray-800 bg-transparent">
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/landing/success_achievement.png"
            alt="Success and achievement background"
            layout="fill"
            objectFit="cover"
            className="opacity-10"
          />
        </div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Success Stories from Real Users</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border border-gray-800 text-white p-6 flex flex-col text-left"
              >
                <CardContent className="p-0 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={`/professional-headshot.png?width=48&height=48&query=professional+headshot+${testimonial.name.split(" ")[0]}`}
                      alt={`Avatar of ${testimonial.name}`}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-lg flex-grow">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-gray-900/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-800">
                <AccordionTrigger className="text-lg font-semibold text-white hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-base text-left">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#6366f1] to-[#14b8a6] rounded-xl p-8 md:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Accelerate Your Success?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of ambitious professionals who've transformed their careers with Make Mentors.
            </p>
            <div className="flex justify-center mb-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 h-14 px-10 text-lg font-bold">
                <Link href="/login?mode=signup">Start Your Free Trial</Link>
              </Button>
            </div>
            <div className="text-white/70 text-sm">No credit card required • Cancel anytime • 30-day guarantee</div>
            <div className="mt-4 text-white font-semibold">Limited time: 50% off your first month!</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 bg-[#0f172a]">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-left">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#14b8a6] flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl text-white">Make Mentors</span>
              </div>
              <p className="text-gray-400">AI-powered personalized coaching to accelerate your success.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-white">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Make Mentors. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
