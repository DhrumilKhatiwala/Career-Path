"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>

// Custom SVG icons
const BullsEyeIcon = () => (
  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <circle cx="12" cy="12" r="6" strokeWidth={2} />
    <circle cx="12" cy="12" r="2" strokeWidth={2} fill="currentColor" />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
)

const EyeOffIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
    />
  </svg>
)

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onLoginSubmit = (data: LoginFormData) => {
    console.log("Login data:", data)
    // TODO: Implement login logic
  }

  return (
    <div className="min-h-screen professional-bg bg-background">
      {/* Floating background elements */}
      <div className="floating-element floating-circle" style={{ top: "15%", left: "8%", animationDelay: "0s" }} />
      <div className="floating-element floating-circle" style={{ top: "65%", right: "12%", animationDelay: "3s" }} />
      <div className="floating-element floating-square" style={{ top: "35%", left: "18%", animationDelay: "1.5s" }} />
      <div className="floating-element floating-square" style={{ top: "75%", right: "25%", animationDelay: "4s" }} />
      <div className="floating-element floating-diamond" style={{ top: "25%", right: "8%", animationDelay: "2s" }} />
      <div className="floating-element floating-diamond" style={{ top: "85%", left: "15%", animationDelay: "5s" }} />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen pt-20 px-6">
        <div className="w-full max-w-md">
          <Card className="glass-card shadow-2xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-heading font-bold text-foreground">Login</CardTitle>
              <CardDescription className="text-muted-foreground text-lg">
                Sign in to continue your career journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="login-email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    {...loginForm.register("email")}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm font-medium text-destructive">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pr-10"
                      {...loginForm.register("password")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-sm font-medium text-destructive">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 shadow-lg">
                  Login
                </Button>
              </form>

              <div className="text-center">
                <p className="text-muted-foreground">Don't have an account?</p>
                <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-medium" asChild>
                  <Link href="/signup">Sign up here</Link>
                </Button>
              </div>

              <div className="text-center">
                <Button variant="link" className="text-muted-foreground hover:text-primary p-0 h-auto text-sm">
                  Forgot your password?
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
