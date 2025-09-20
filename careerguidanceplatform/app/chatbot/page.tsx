"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FormattedMessage } from "@/components/formatted-message"
import { LoginPopup } from "@/components/login-popup"
import { useAuth } from "@/contexts/auth-context"
import { Bot, User, Send, MessageCircle, Trash2, Download, Clock, AlertCircle, Sparkles, History } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp?: string
}

interface ChatSession {
  id: string
  title: string
  date: string
  messageCount: number
  lastMessage: string
  firstUserInput?: string // Added to store the original user input
}

interface ChatAnalytics {
  totalChats: number
  totalMessages: number
  averageSessionLength: number
  topTopics: string[]
  weeklyActivity: number[]
}

const mockChatHistory: ChatSession[] = []

const mockAnalytics: ChatAnalytics = {
  totalChats: 0, // Start with 0 since we'll track real chats
  totalMessages: 0, // Start with 0 since we'll track real messages
  averageSessionLength: 0,
  topTopics: ["Resume", "Interview Prep", "Skills", "Career Path", "Networking"],
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0], // Start with empty activity
}

export default function ChatbotDashboard() {
  const [chatHistory, setChatHistory] = useState<ChatSession[]>(mockChatHistory)
  const [analytics, setAnalytics] = useState<ChatAnalytics>(mockAnalytics)
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [currentChatId, setCurrentChatId] = useState<string | null>(null) // Track current chat session
  const [sidebarView, setSidebarView] = useState<"recent" | "statistics" | null>(null)
  const [activeTab, setActiveTab] = useState<"chat" | "history">("chat")

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Welcome to your dedicated AI Career Assistant dashboard! I'm powered by Google's Gemini AI and here to provide in-depth career guidance, skill recommendations, and personalized advice. What would you like to explore today?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const { isLoggedIn } = useAuth()
  const [showLoginPopup, setShowLoginPopup] = useState(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const generateChatTitle = (userInput: string): string => {
    const input = userInput.toLowerCase().trim()

    if (input.includes("resume") || input.includes("cv")) {
      return "Resume Review & Optimization"
    } else if (input.includes("interview") || input.includes("preparation")) {
      return "Interview Preparation"
    } else if (input.includes("career") && input.includes("change")) {
      return "Career Transition Planning"
    } else if (input.includes("salary") || input.includes("negotiate")) {
      return "Salary Negotiation Strategy"
    } else if (input.includes("skill") || input.includes("learn")) {
      return "Skill Development Planning"
    } else if (input.includes("network") || input.includes("connection")) {
      return "Networking & Professional Growth"
    } else if (input.includes("job") && input.includes("search")) {
      return "Job Search Strategy"
    } else if (input.includes("promotion") || input.includes("advance")) {
      return "Career Advancement"
    } else {
      // Extract key words and create a meaningful title
      const words = input.split(" ").filter((word) => word.length > 3)
      const keyWords = words.slice(0, 3).join(" ")
      return keyWords.length > 0
        ? `${keyWords.charAt(0).toUpperCase() + keyWords.slice(1)} Discussion`
        : "Career Guidance"
    }
  }

  const saveChatSession = useCallback(
    (userInput: string, messageCount: number) => {
      const chatId = currentChatId || Date.now().toString()
      const title = generateChatTitle(userInput)
      const date = new Date().toLocaleDateString()

      setChatHistory((prev) => {
        const existingChatIndex = prev.findIndex((chat) => chat.id === chatId)
        const chatSession: ChatSession = {
          id: chatId,
          title,
          date,
          messageCount,
          lastMessage: userInput,
          firstUserInput: userInput,
        }

        if (existingChatIndex >= 0) {
          const updated = [...prev]
          updated[existingChatIndex] = {
            ...updated[existingChatIndex],
            messageCount,
            lastMessage: userInput,
            date, // Update date to current
          }
          return updated
        } else {
          return [chatSession, ...prev].slice(0, 10)
        }
      })

      if (!currentChatId) {
        setCurrentChatId(chatId)
      }

      setAnalytics((prev) => ({
        ...prev,
        totalChats: currentChatId ? prev.totalChats : prev.totalChats + 1,
        totalMessages: prev.totalMessages + 1, // Only count one message at a time
      }))
    },
    [currentChatId],
  )

  const sendMessage = useCallback(
    async (messageContent: string) => {
      if (!messageContent.trim() || isLoading) return

      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: messageContent,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)
      setError(null)

      const currentMessageCount = messages.length + 1
      saveChatSession(messageContent, currentMessageCount)

      abortControllerRef.current = new AbortController()

      try {
        const response = await fetch("/api/gemini-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          }),
          signal: abortControllerRef.current.signal,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.content || "I apologize, but I couldn't generate a response. Please try again.",
          timestamp: data.timestamp || new Date().toISOString(),
        }

        setMessages((prev) => [...prev, assistantMessage])

        setAnalytics((prev) => ({
          ...prev,
          totalMessages: prev.totalMessages + 1,
        }))
      } catch (error: any) {
        if (error.name === "AbortError") {
          return
        }

        console.error("Chat error:", error)
        setError(error.message)

        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `I'm sorry, I encountered an error: ${error.message}. Please try again.`,
          timestamp: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
        abortControllerRef.current = null
      }
    },
    [messages, isLoading, saveChatSession],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (input.trim()) {
        sendMessage(input.trim())
      }
    },
    [input, sendMessage],
  )

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setError(null)
  }, [])

  const loadChatSession = useCallback(
    (chatId: string) => {
      setSelectedChat(chatId)
      const chat = chatHistory.find((c) => c.id === chatId)

      setActiveTab("chat")
      setSidebarView(null) // Close sidebar view
      setCurrentChatId(chatId) // Set as current chat for continuation

      // Load the chat with a more contextual message
      setMessages([
        {
          id: "loaded",
          role: "assistant",
          content: `Welcome back! I've loaded your previous conversation about "${chat?.title}". Feel free to continue where we left off or ask me anything new.`,
          timestamp: new Date().toISOString(),
        },
      ])
      setError(null)
    },
    [chatHistory],
  )

  const deleteChatSession = useCallback((chatId: string) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId))
  }, [])

  const handleSuggestedPrompt = useCallback(
    (prompt: string) => {
      setInput(prompt)
      sendMessage(prompt)
    },
    [sendMessage],
  )

  const startNewChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    setSelectedChat(null)
    setCurrentChatId(null) // Reset current chat ID for new conversation
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Starting a new conversation! I'm ready to help with any career-related questions or guidance you need.",
        timestamp: new Date().toISOString(),
      },
    ])
    setError(null)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const exportChatToPDF = useCallback(async () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true)
      return
    }

    try {
      // Dynamically import PDF libraries to avoid SSR issues
      const jsPDF = (await import("jspdf")).default
      const html2canvas = (await import("html2canvas")).default

      // Get the chat messages container
      const chatContainer = document.querySelector("[data-chat-messages]") as HTMLElement
      if (!chatContainer) {
        console.error("Chat container not found")
        return
      }

      // Create canvas from the chat container
      const canvas = await html2canvas(chatContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      })

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Add title
      pdf.setFontSize(20)
      pdf.text("Chat Conversation Export", 20, 20)

      // Add date
      pdf.setFontSize(12)
      pdf.text(`Exported on: ${new Date().toLocaleDateString()}`, 20, 30)

      // Calculate dimensions for the image
      const imgWidth = 170 // A4 width minus margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Add the chat image to PDF
      const imgData = canvas.toDataURL("image/png")
      pdf.addImage(imgData, "PNG", 20, 40, imgWidth, imgHeight)

      // Save the PDF
      const chatTitle = selectedChat
        ? chatHistory.find((c) => c.id === selectedChat)?.title || "Chat Conversation"
        : "New Chat Conversation"

      pdf.save(`${chatTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_${Date.now()}.pdf`)
    } catch (error) {
      console.error("Failed to export PDF:", error)
      setError("Failed to export chat as PDF. Please try again.")
    }
  }, [isLoggedIn, selectedChat, chatHistory])

  const handleLoginSuccess = useCallback(() => {
    // After successful login, automatically trigger PDF export
    setTimeout(() => {
      exportChatToPDF()
    }, 500)
  }, [exportChatToPDF])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-12 pt-28">
        <div className="w-full">
          <div className="text-center mb-6 md:mb-12 hidden md:block">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <div className="relative">
                <Bot className="h-6 w-6 md:h-12 md:w-12 text-primary" />
                <Sparkles className="h-2 w-2 md:h-4 md:w-4 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-xl md:text-5xl font-heading font-bold text-foreground mb-2">AI Career Assistant</h1>
                <p className="text-xs md:text-xl text-muted-foreground max-w-2xl hidden md:block">
                  Your dedicated space for in-depth career conversations and personalized guidance
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button
              variant={sidebarView === "recent" ? "default" : "outline"}
              onClick={() => {
                const newView = sidebarView === "recent" ? null : "recent"
                setSidebarView(newView)
                // Auto-switch to history tab when Recent Chats is clicked
                if (newView === "recent") {
                  setActiveTab("history")
                }
              }}
              className="gap-2 w-full sm:w-auto"
            >
              <History className="h-4 w-4" />
              Recent Chats
            </Button>
            <Button
              variant={sidebarView === "statistics" ? "default" : "outline"}
              onClick={() => {
                const newView = sidebarView === "statistics" ? null : "statistics"
                setSidebarView(newView)
                // Auto-switch to history tab when Chat Statistics is clicked
                if (newView === "statistics") {
                  setActiveTab("history")
                }
              }}
              className="gap-2 w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Chat Statistics
            </Button>
          </div>

          <div className="w-full">
            <div className="w-full">
              <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as "chat" | "history")}
                className="space-y-4 md:space-y-8"
              >
                <TabsList className="grid w-full grid-cols-2 h-10 md:h-12 bg-muted/50 p-1 md:p-6">
                  <TabsTrigger value="chat" className="text-xs md:text-sm font-medium">
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="history" className="text-xs md:text-sm font-medium">
                    {sidebarView === "recent" ? "Recent" : sidebarView === "statistics" ? "Stats" : "History"}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="space-y-4 md:space-y-6">
                  <div className="flex md:hidden gap-2 mb-2 px-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={startNewChat}
                      className="gap-1 flex-1 text-xs h-8 bg-transparent"
                    >
                      New
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportChatToPDF}
                      className="gap-1 flex-1 text-xs h-8 bg-transparent"
                    >
                      Export
                    </Button>
                  </div>

                  <Card className="h-[calc(100vh-120px)] md:h-[750px] flex flex-col border-0 md:border-2 border-primary/10 shadow-none md:shadow-xl rounded-none md:rounded-lg w-full">
                    <CardHeader className="border-b bg-muted/20 rounded-none md:rounded-t-lg p-2 md:p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 md:gap-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="p-1 md:p-2 bg-primary/10 rounded-lg">
                            <Bot className="h-3 w-3 md:h-5 md:w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="font-heading text-sm md:text-lg">
                              {selectedChat
                                ? `${chatHistory.find((c) => c.id === selectedChat)?.title}`
                                : "AI Assistant"}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground hidden md:block">
                              {selectedChat ? "Continue your conversation" : "Start a new chat session"}
                            </p>
                          </div>
                        </div>
                        <div className="hidden md:flex gap-1 md:gap-2 w-full sm:w-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={exportChatToPDF}
                            className="gap-1 md:gap-2 bg-transparent flex-1 sm:flex-none text-xs"
                          >
                            <Download className="h-3 w-3 md:h-4 md:w-4" />
                            <span className="hidden sm:inline">Export</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={startNewChat}
                            className="gap-1 md:gap-2 bg-transparent flex-1 sm:flex-none text-xs"
                          >
                            <span className="hidden sm:inline">New Chat</span>
                            <span className="sm:hidden">New</span>
                          </Button>
                        </div>
                      </div>
                      {error && (
                        <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-destructive/10 border border-destructive/20 rounded-lg mt-2 md:mt-4">
                          <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-destructive flex-shrink-0" />
                          <span className="text-xs md:text-sm text-destructive">{error}</span>
                        </div>
                      )}
                    </CardHeader>

                    <ScrollArea className="flex-1 p-1 sm:p-4 md:p-8" data-chat-messages>
                      <div className="space-y-4 sm:space-y-6">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-2 sm:gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`flex items-start gap-2 sm:gap-4 ${
                                message.role === "user"
                                  ? "max-w-[95%] sm:max-w-[80%] flex-row-reverse"
                                  : "max-w-[95%] sm:max-w-[95%] lg:max-w-[90%] xl:max-w-[85%] flex-row"
                              }`}
                            >
                              <div
                                className={`rounded-full p-2 sm:p-3 text-white flex-shrink-0 shadow-lg ${
                                  message.role === "user" ? "bg-primary" : "bg-accent"
                                }`}
                              >
                                {message.role === "user" ? (
                                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                                ) : (
                                  <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                                )}
                              </div>
                              <div
                                className={`rounded-2xl px-3 sm:px-4 md:px-6 py-3 sm:py-4 shadow-md ${
                                  message.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted/50 border border-border/50"
                                }`}
                              >
                                <div className="text-xs sm:text-base">
                                  <FormattedMessage content={message.content} role={message.role} />
                                </div>
                                {message.timestamp && (
                                  <p className="text-xs opacity-60 mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-border/30">
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {isLoading && (
                          <div className="flex gap-2 sm:gap-4 justify-start">
                            <div className="flex items-start gap-2 sm:gap-4 max-w-[95%] sm:max-w-full">
                              <div className="rounded-full p-2 sm:p-3 bg-accent text-white shadow-lg">
                                <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                              </div>
                              <div className="rounded-2xl px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-muted/50 border border-border/50 shadow-md">
                                <div className="flex gap-2 items-center">
                                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                                  <div
                                    className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  />
                                  <div
                                    className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  />
                                  <span className="text-xs sm:text-sm text-muted-foreground ml-3">Thinking...</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    <CardContent className="border-t bg-muted/10 p-2 md:p-6 rounded-none md:rounded-b-lg">
                      <form onSubmit={handleSubmit} className="flex gap-2 mb-2 md:mb-4">
                        <Input
                          value={input}
                          onChange={handleInputChange}
                          placeholder="Ask about your career..."
                          className="flex-1 h-10 md:h-12 px-3 md:px-4 text-sm md:text-base border-2 border-border/50 focus:border-primary"
                          disabled={isLoading}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                              handleSubmit(e)
                            }
                          }}
                        />
                        <Button
                          type="submit"
                          size="icon"
                          disabled={isLoading || !input?.trim()}
                          className="h-10 w-10 md:h-12 md:w-12 shadow-lg"
                        >
                          <Send className="h-4 w-4 md:h-5 md:w-5" />
                        </Button>
                      </form>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestedPrompt("Help me optimize my resume for a specific job role")}
                          className="text-xs h-8 md:h-auto py-1 md:py-3 px-2 md:px-4 text-left justify-start"
                          disabled={isLoading}
                        >
                          Resume
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestedPrompt("Prepare me for behavioral interview questions")}
                          className="text-xs h-8 md:h-auto py-1 md:py-3 px-2 md:px-4 text-left justify-start"
                          disabled={isLoading}
                        >
                          Interview
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestedPrompt("What skills should I develop for career advancement?")}
                          className="text-xs h-8 md:h-auto py-1 md:py-3 px-2 md:px-4 text-left justify-start"
                          disabled={isLoading}
                        >
                          Skills
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestedPrompt("How can I negotiate a better salary package?")}
                          className="text-xs h-8 md:h-auto py-1 md:py-3 px-2 md:px-4 text-left justify-start"
                          disabled={isLoading}
                        >
                          Salary
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold">
                      {sidebarView === "recent"
                        ? "Recent Chats"
                        : sidebarView === "statistics"
                          ? "Chat Statistics"
                          : "Chat History"}
                    </h2>
                    <Button variant="outline" className="gap-2 bg-transparent w-full sm:w-auto">
                      <Download className="h-4 w-4" />
                      Export All
                    </Button>
                  </div>

                  {!sidebarView && (
                    <div className="grid gap-6">
                      {chatHistory.map((chat) => (
                        <Card
                          key={chat.id}
                          className="hover:shadow-xl transition-all duration-200 border-2 border-border/50 hover:border-primary/30"
                        >
                          <CardContent className="p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                                  <h3 className="text-lg sm:text-xl font-heading font-semibold">{chat.title}</h3>
                                  <Badge variant="outline" className="px-3 py-1 w-fit">
                                    {chat.messageCount} messages
                                  </Badge>
                                </div>
                                <p className="text-muted-foreground mb-4 leading-relaxed">{chat.lastMessage}</p>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    {chat.date}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MessageCircle className="h-4 w-4" />
                                    {chat.messageCount} messages
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-3 w-full sm:w-auto">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => loadChatSession(chat.id)}
                                  className="gap-2 flex-1 sm:flex-none"
                                >
                                  Continue
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteChatSession(chat.id)}
                                  className="hover:bg-destructive/10 hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {sidebarView === "recent" && (
                    <div className="grid gap-6">
                      {chatHistory.length === 0 ? (
                        <Card className="border-2 border-primary/10">
                          <CardContent className="text-center py-12 text-muted-foreground">
                            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-30" />
                            <p className="text-base font-medium mb-2">No conversations yet</p>
                            <p className="text-sm">Start chatting to see your history here</p>
                          </CardContent>
                        </Card>
                      ) : (
                        chatHistory.slice(0, 3).map((chat) => (
                          <Card
                            key={chat.id}
                            className={`hover:shadow-xl transition-all duration-200 border-2 cursor-pointer ${
                              selectedChat === chat.id
                                ? "border-primary shadow-lg bg-muted/30"
                                : "border-border/50 hover:border-primary/30"
                            }`}
                            onClick={() => loadChatSession(chat.id)}
                          >
                            <CardContent className="p-6 sm:p-8">
                              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                                    <h3 className="text-lg sm:text-xl font-heading font-bold">{chat.title}</h3>
                                    <Badge variant="outline" className="px-3 py-1 w-fit">
                                      {chat.messageCount} messages
                                    </Badge>
                                  </div>
                                  <p className="text-muted-foreground mb-4 leading-relaxed">{chat.lastMessage}</p>
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4" />
                                      {chat.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MessageCircle className="h-4 w-4" />
                                      {chat.messageCount} messages
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-3 w-full sm:w-auto">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      loadChatSession(chat.id)
                                    }}
                                    className="gap-2 flex-1 sm:flex-none"
                                  >
                                    Continue
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteChatSession(chat.id)
                                    }}
                                    className="hover:bg-destructive/10 hover:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  )}

                  {sidebarView === "statistics" && (
                    <div className="grid gap-6 md:grid-cols-1">
                      <Card className="border-2 border-primary/10">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5 text-primary" />
                            Usage Overview
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Total Conversations</span>
                            <span className="font-semibold text-lg">{analytics.totalChats}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Total Messages</span>
                            <span className="font-semibold text-lg">{analytics.totalMessages}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Average Session Length</span>
                            <span className="font-semibold text-lg">
                              {analytics.totalChats > 0
                                ? Math.round(analytics.totalMessages / analytics.totalChats)
                                : 0}{" "}
                              messages
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}
