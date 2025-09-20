"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  signup: (name: string, email: string, password: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsLoggedIn(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call - replace with actual authentication logic
    try {
      // For demo purposes, accept any email/password combination
      const userData: User = {
        id: Date.now().toString(),
        name: email.split("@")[0], // Use email prefix as name
        email: email,
      }

      setUser(userData)
      setIsLoggedIn(true)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call - replace with actual signup logic
    try {
      const userData: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
      }

      setUser(userData)
      setIsLoggedIn(true)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    } catch (error) {
      console.error("Signup failed:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, isLoggedIn, login, logout, signup }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
