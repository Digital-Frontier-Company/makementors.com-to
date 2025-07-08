import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, system_prompt } = await req.json()

  // Prepend the system prompt to the messages array
  const fullMessages = [{ role: "system", content: system_prompt }, ...messages]

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages: fullMessages,
  })

  return result.toDataStreamResponse()
}
