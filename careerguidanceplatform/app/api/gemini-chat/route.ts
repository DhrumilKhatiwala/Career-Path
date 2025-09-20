import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const apiKey = "AIzaSyDiUEwwDwSkLVhtl174EUU8v9jkLdiurA8"

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "API key is not configured.",
        },
        { status: 500 },
      )
    }

    const body = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Missing or invalid messages array" }, { status: 400 })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are CareerBot, a helpful academic and career advisor.
You should ONLY answer questions related to:
- Career guidance
- College/University studies
- Skills, courses, and interview prep

If the question is unrelated (e.g. sports, politics, gossip), politely say:
"I'm focused on helping with career and academics only."`,
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    })

    const lastMessage = messages[messages.length - 1]

    // Build conversation history for context
    const history = []
    const allMessages = messages.slice(0, -1)

    for (let i = 0; i < allMessages.length; i++) {
      const msg = allMessages[i]

      // Skip initial assistant messages that don't have a preceding user message
      if (msg.role === "assistant" && history.length === 0) {
        continue
      }

      history.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })
    }

    // Ensure history starts with user message if it exists
    if (history.length > 0 && history[0].role !== "user") {
      history.length = 0
    }

    const chat = model.startChat({
      history: history,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    })

    const result = await chat.sendMessage(lastMessage.content)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      content: text,
      timestamp: new Date().toISOString(),
      model: "gemini-1.5-flash",
    })
  } catch (error: any) {
    console.error("Gemini API error:", error)

    let errorMessage = "Failed to generate response from Gemini"
    let statusCode = 500

    if (error.message?.includes("API_KEY")) {
      errorMessage = "Invalid API key. Please check your API key configuration."
      statusCode = 401
    } else if (error.message?.includes("quota")) {
      errorMessage = "API quota exceeded. Please try again later."
      statusCode = 429
    } else if (error.message?.includes("safety")) {
      errorMessage = "Content filtered for safety. Please rephrase your message."
      statusCode = 400
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: statusCode },
    )
  }
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
