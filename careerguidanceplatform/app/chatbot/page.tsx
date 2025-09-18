"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  User,
  Send,
  MessageCircle,
  BarChart3,
  Target,
  Trash2,
  Download,
  Star,
  Clock,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useChat } from "@ai-sdk/react"

interface ChatSession {
  id: string
  title: string
  date: string
  messageCount: number
  lastMessage: string
}

interface ChatAnalytics {
  totalChats: number
  totalMessages: number
  averageSessionLength: number
  topTopics: string[]
  weeklyActivity: number[]
}

const mockChatHistory: ChatSession[] = [
  {
    id: "1",
    title: "Resume Review Discussion",
    date: "2024-11-20",
    messageCount: 12,
    lastMessage: "Thank you for the resume tips! I'll implement these changes.",
  },
  {
    id: "2",
    title: "Career Path Exploration",
    date: "2024-11-19",
    messageCount: 8,
    lastMessage: "What skills should I focus on for data science?",
  },
  {
    id: "3",
    title: "Interview Preparation",
    date: "2024-11-18",
    messageCount: 15,
    lastMessage: "Can you help me practice behavioral interview questions?",
  },
  {
    id: "4",
    title: "Skill Development Planning",
    date: "2024-11-17",
    messageCount: 10,
    lastMessage: "Which programming languages are most in-demand?",
  },
]

const mockAnalytics: ChatAnalytics = {
  totalChats: 24,
  totalMessages: 156,
  averageSessionLength: 8.5,
  topTopics: ["Resume", "Interview Prep", "Skills", "Career Path", "Networking"],
  weeklyActivity: [12, 8, 15, 10, 18, 14, 9],
}

export default function ChatbotDashboard() {
  const [chatHistory, setChatHistory] = useState<ChatSession[]>(mockChatHistory)
  const [analytics, setAnalytics] = useState<ChatAnalytics>(mockAnalytics)
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Welcome to your dedicated AI Career Assistant dashboard! I'm here to provide in-depth career guidance, skill recommendations, and personalized advice. What would you like to explore today?",
      },
    ],
  })

  const startNewChat = () => {
    setSelectedChat(null)
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Starting a new conversation! I'm ready to help with any career-related questions or guidance you need.",
      },
    ])
  }

  const loadChatSession = (chatId: string) => {
    setSelectedChat(chatId)
    // In a real app, you'd load the actual chat messages from storage
    setMessages([
      {
        id: "loaded",
        role: "assistant",
        content: `Loaded previous conversation: ${chatHistory.find((c) => c.id === chatId)?.title}. How can I continue helping you?`,
      },
    ])
  }

  const deleteChatSession = (chatId: string) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-primary" />
              <span className="text-xl font-heading font-bold">CareerPath</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard">Main Dashboard</Link>
              </Button>
              <Button onClick={startNewChat}>New Chat</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Bot className="h-10 w-10 text-primary" />
              <div>
                <h1 className="text-4xl font-heading font-bold text-foreground">AI Career Assistant</h1>
                <p className="text-lg text-muted-foreground">
                  Your dedicated space for in-depth career conversations and guidance
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-heading">Chat Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Chats</span>
                    <span className="font-semibold">{analytics.totalChats}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Messages</span>
                    <span className="font-semibold">{analytics.totalMessages}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg. Session</span>
                    <span className="font-semibold">{analytics.averageSessionLength} msgs</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Chats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-heading">Recent Chats</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {chatHistory.slice(0, 5).map((chat) => (
                        <div
                          key={chat.id}
                          className={`p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedChat === chat.id ? "bg-muted border-primary" : ""
                          }`}
                          onClick={() => loadChatSession(chat.id)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium truncate">{chat.title}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteChatSession(chat.id)
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">{chat.messageCount} messages</span>
                            <span className="text-xs text-muted-foreground">{chat.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="chat" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat">Active Chat</TabsTrigger>
                  <TabsTrigger value="history">Chat History</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="space-y-6">
                  <Card className="h-[700px] flex flex-col">
                    <CardHeader className="border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bot className="h-5 w-5 text-primary" />
                          <CardTitle className="font-heading">
                            {selectedChat
                              ? `Chat: ${chatHistory.find((c) => c.id === selectedChat)?.title}`
                              : "New Conversation"}
                          </CardTitle>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                          <Button variant="outline" size="sm" onClick={startNewChat}>
                            New Chat
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <ScrollArea className="flex-1 p-6">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`flex items-start gap-3 max-w-[80%] ${
                                message.role === "user" ? "flex-row-reverse" : "flex-row"
                              }`}
                            >
                              <div
                                className={`rounded-full p-2 text-white ${
                                  message.role === "user" ? "bg-primary" : "bg-accent"
                                }`}
                              >
                                {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                              </div>
                              <div
                                className={`rounded-lg px-4 py-3 ${
                                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                }`}
                              >
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}

                        {isLoading && (
                          <div className="flex gap-3 justify-start">
                            <div className="flex items-start gap-3 max-w-[80%]">
                              <div className="rounded-full p-2 bg-accent text-white">
                                <Bot className="h-4 w-4" />
                              </div>
                              <div className="rounded-lg px-4 py-3 bg-muted">
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                                  <div
                                    className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  />
                                  <div
                                    className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>

                    <CardContent className="border-t p-4">
                      <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                          value={input}
                          onChange={handleInputChange}
                          placeholder="Ask detailed questions about your career, get personalized advice..."
                          className="flex-1"
                          disabled={isLoading}
                        />
                        <Button type="submit" size="icon" disabled={isLoading || !input?.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <Button variant="outline" size="sm" disabled={isLoading}>
                          Career Strategy
                        </Button>
                        <Button variant="outline" size="sm" disabled={isLoading}>
                          Salary Negotiation
                        </Button>
                        <Button variant="outline" size="sm" disabled={isLoading}>
                          Industry Insights
                        </Button>
                        <Button variant="outline" size="sm" disabled={isLoading}>
                          Networking Tips
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-heading font-bold">Chat History</h2>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export All
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {chatHistory.map((chat) => (
                      <Card key={chat.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-heading font-semibold">{chat.title}</h3>
                                <Badge variant="outline">{chat.messageCount} messages</Badge>
                              </div>
                              <p className="text-muted-foreground mb-3">{chat.lastMessage}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {chat.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="h-4 w-4" />
                                  {chat.messageCount} messages
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => loadChatSession(chat.id)}>
                                Continue
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => deleteChatSession(chat.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold">Chat Analytics</h2>

                  <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          Usage Stats
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm">Total Conversations</span>
                          <span className="font-semibold">{analytics.totalChats}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Total Messages</span>
                          <span className="font-semibold">{analytics.totalMessages}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Average Session</span>
                          <span className="font-semibold">{analytics.averageSessionLength} messages</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Top Topics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analytics.topTopics.map((topic, index) => (
                            <div key={topic} className="flex items-center justify-between">
                              <span className="text-sm">{topic}</span>
                              <Badge variant="secondary">#{index + 1}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Star className="h-5 w-5" />
                          Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-sm">
                          <span className="font-medium">Most Active Day:</span>
                          <p className="text-muted-foreground">Friday (18 messages)</p>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Favorite Topic:</span>
                          <p className="text-muted-foreground">Resume & Interview Prep</p>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Growth:</span>
                          <p className="text-muted-foreground">+25% more conversations this week</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
