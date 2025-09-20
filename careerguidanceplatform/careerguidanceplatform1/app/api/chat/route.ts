import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const systemPrompt = `You are CareerBot, an AI career guidance assistant for students. You help with:

- Career exploration and advice
- Educational pathway recommendations
- Skill development guidance
- Interview preparation tips
- Resume and portfolio advice
- Industry insights and trends
- Job search strategies
- Professional development

Keep responses helpful, encouraging, and tailored to students. Be concise but thorough. Always maintain a supportive and professional tone.`

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    maxTokens: 1000,
    temperature: 0.7,
  })

  return result.toDataStreamResponse()
}
