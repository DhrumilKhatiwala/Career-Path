"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

// Custom SVG icons
const BullsEyeIcon = () => (
  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <circle cx="12" cy="12" r="6" strokeWidth={2} />
    <circle cx="12" cy="12" r="2" strokeWidth={2} fill="currentColor" />
  </svg>
)

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Take Quiz" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/chatbot", label: "AI Assistant" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isAuthPage = pathname === "/login" || pathname === "/signup"

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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {!isAuthPage &&
              navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-muted-foreground hover:text-primary transition-colors font-medium font-body px-3 py-2 rounded-md",
                    pathname === item.href && "text-primary font-semibold bg-primary/10",
                  )}
                >
                  {item.label}
                </Link>
              ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <ThemeToggle />

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden ml-2">
                <Button variant="outline" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 bg-transparent">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] px-4">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-3 py-4 border-b">
                    <div className="p-2 bg-primary rounded-xl shadow-lg">
                      <BullsEyeIcon />
                    </div>
                    <span className="text-lg font-heading font-bold text-foreground">CareerPath</span>
                  </div>

                  <div className="flex-1 py-6">
                    <div className="space-y-1">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center text-base font-medium py-3 px-3 rounded-lg transition-all duration-200",
                            pathname === item.href
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:text-primary hover:bg-muted/50",
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4 pb-2 space-y-3">
                    <Button
                      variant="outline"
                      asChild
                      className="w-full h-11 bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                    >
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="w-full h-11">
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
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
          </div>
        </div>
      </div>
    </nav>
  )
}
