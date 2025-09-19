"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Move } from "lucide-react"
import { cn } from "@/lib/utils"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 24, y: 24 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [hasDragged, setHasDragged] = useState(false)
  const chatWindowRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = isOpen ? chatWindowRef.current : buttonRef.current
    if (!target) return

    const rect = target.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setIsDragging(true)
    setHasDragged(false)
    e.preventDefault()
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return

      setHasDragged(true)

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const elementWidth = isOpen ? 384 : 56
      const elementHeight = isOpen ? 500 : 56
      const padding = 16

      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y

      const maxX = viewportWidth - elementWidth - padding
      const maxY = viewportHeight - elementHeight - padding

      const boundedX = Math.max(padding, Math.min(newX, maxX))
      const boundedY = Math.max(padding, Math.min(newY, maxY))

      const rightPos = viewportWidth - boundedX - elementWidth
      const bottomPos = viewportHeight - boundedY - elementHeight

      setPosition({ x: rightPos, y: bottomPos })
    },
    [isDragging, dragOffset, isOpen],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleButtonClick = () => {
    if (!hasDragged) {
      setIsOpen(true)
    }
  }

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = "none"
      document.body.style.cursor = "grabbing"

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.body.style.userSelect = ""
        document.body.style.cursor = ""
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        ref={buttonRef}
        onClick={handleButtonClick}
        onMouseDown={handleMouseDown}
        className={cn(
          "fixed h-14 w-14 rounded-full shadow-lg z-50",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "cursor-grab active:cursor-grabbing",
          "transition-transform duration-100 ease-out",
          isOpen && "hidden",
        )}
        style={{
          bottom: `${position.y}px`,
          right: `${position.x}px`,
          transform: `scale(${isDragging ? 1.05 : 1})`,
        }}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card
          ref={chatWindowRef}
          className={cn(
            "fixed w-96 h-[500px] shadow-xl z-50 flex flex-col",
            "transition-transform duration-100 ease-out",
            "cursor-grab active:cursor-grabbing",
          )}
          style={{
            bottom: `${position.y}px`,
            right: `${position.x}px`,
            transform: `scale(${isDragging ? 1.02 : 1})`,
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2 flex-1">
              <Bot className="h-5 w-5" />
              <h3 className="font-semibold">CareerBot Assistant</h3>
              <Move className="h-4 w-4 opacity-60" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onMouseDown={(e) => e.stopPropagation()} // Prevent drag when clicking close button
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <Bot className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <p className="text-sm">
                    Hi! I'm CareerBot, your AI career guidance assistant. Ask me anything about careers, education, or
                    professional development!
                  </p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-3 max-w-[80%]", message.role === "user" ? "ml-auto" : "mr-auto")}
                >
                  <div
                    className={cn("flex items-start gap-2", message.role === "user" ? "flex-row-reverse" : "flex-row")}
                  >
                    <div
                      className={cn(
                        "rounded-full p-2 text-white",
                        message.role === "user" ? "bg-primary" : "bg-accent",
                      )}
                    >
                      {message.role === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                    </div>
                    <div
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm",
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 max-w-[80%] mr-auto">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full p-2 bg-accent text-white">
                      <Bot className="h-3 w-3" />
                    </div>
                    <div className="rounded-lg px-3 py-2 text-sm bg-muted">
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

          {/* Input */}
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about careers, skills, education..."
                className="flex-1"
                disabled={isLoading}
                onMouseDown={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input?.trim()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  )
}
