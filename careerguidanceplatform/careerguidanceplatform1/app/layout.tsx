import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import Header from "@/components/header"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
})

export const metadata: Metadata = {
  title: "CareerPath - Your Future Starts Here",
  description: "Discover your ideal career path with personalized quizzes and recommendations tailored for students.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${roboto.variable} ${GeistMono.variable} antialiased`}
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {/* Using Header instead of Navigation for consistent header across all pages */}
            <Header />
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
