"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"

const BullsEyeIcon = () => (
  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <circle cx="12" cy="12" r="6" strokeWidth={2} />
    <circle cx="12" cy="12" r="2" strokeWidth={2} fill="currentColor" />
  </svg>
)

const HamburgerIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-1.5 sm:p-2 bg-primary rounded-xl shadow-lg">
              <BullsEyeIcon />
            </div>
            <span className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-foreground">CareerPath</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2 sm:space-x-4 md:space-x-6">
            <Link
              href="/"
              className={`font-medium font-body px-2 sm:px-3 py-1 sm:py-2 rounded-md text-sm sm:text-base transition-colors ${
                isActive("/") ? "text-primary font-semibold bg-primary/10" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/quiz"
              className={`font-medium font-body px-2 sm:px-3 py-1 sm:py-2 rounded-md text-sm sm:text-base transition-colors ${
                isActive("/quiz")
                  ? "text-primary font-semibold bg-primary/10"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Take Quiz
            </Link>
            <Link
              href="/dashboard"
              className={`font-medium font-body px-2 sm:px-3 py-1 sm:py-2 rounded-md text-sm sm:text-base transition-colors ${
                isActive("/dashboard")
                  ? "text-primary font-semibold bg-primary/10"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/chatbot"
              className={`font-medium font-body px-2 sm:px-3 py-1 sm:py-2 rounded-md text-sm sm:text-base transition-colors ${
                isActive("/chatbot")
                  ? "text-primary font-semibold bg-primary/10"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              AI Assistant
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Button
              variant="outline"
              asChild
              className="hover:bg-primary hover:text-primary-foreground border-primary text-primary bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="bg-primary hover:bg-primary/80 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:brightness-110"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-2 pt-4">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={`font-medium font-body px-3 py-2 rounded-md text-base transition-colors ${
                  isActive("/")
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Home
              </Link>
              <Link
                href="/quiz"
                onClick={closeMobileMenu}
                className={`font-medium font-body px-3 py-2 rounded-md text-base transition-colors ${
                  isActive("/quiz")
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Take Quiz
              </Link>
              <Link
                href="/dashboard"
                onClick={closeMobileMenu}
                className={`font-medium font-body px-3 py-2 rounded-md text-base transition-colors ${
                  isActive("/dashboard")
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/chatbot"
                onClick={closeMobileMenu}
                className={`font-medium font-body px-3 py-2 rounded-md text-base transition-colors ${
                  isActive("/chatbot")
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                AI Assistant
              </Link>

              <div className="flex flex-col space-y-2 pt-4 border-t border-border mt-4">
                <Button
                  variant="outline"
                  asChild
                  className="hover:bg-primary hover:text-primary-foreground border-primary text-primary bg-transparent transition-all duration-300"
                >
                  <Link href="/login" onClick={closeMobileMenu}>
                    Login
                  </Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/80 transition-all duration-300">
                  <Link href="/signup" onClick={closeMobileMenu}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
