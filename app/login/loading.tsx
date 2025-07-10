import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-darkest">
      <span className="flex flex-col items-center gap-4 text-gray-300">
        <Loader2 className="h-8 w-8 animate-spin text-neon-lime" />
        <span className="text-sm">Loading&nbsp;authentication&nbsp;page&hellip;</span>
      </span>
    </div>
  )
}
