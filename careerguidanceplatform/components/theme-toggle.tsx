"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const SunIcon = () => (
  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" strokeWidth="2" />
    <path
      strokeWidth="2"
      d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
    />
  </svg>
)

const MoonIcon = () => (
  <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
        <div className="w-5 h-5" />
      </Button>
    )
  }

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className="w-10 h-10 p-0 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 border border-transparent hover:border-primary/20"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
