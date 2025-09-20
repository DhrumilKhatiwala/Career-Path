"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Custom SVG icons
const ArrowLeftIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const TargetIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

interface Question {
  id: number
  category: string
  question: string
  options: string[]
}

const questions: Question[] = [
  {
    id: 1,
    category: "Interests",
    question: "Which type of activities do you find most engaging?",
    options: [
      "Solving complex problems and analyzing data",
      "Creating and designing visual content",
      "Helping and supporting other people",
      "Leading teams and managing projects",
    ],
  },
  {
    id: 2,
    category: "Skills",
    question: "What is your strongest skill area?",
    options: [
      "Technical and analytical thinking",
      "Creative and artistic abilities",
      "Communication and interpersonal skills",
      "Organization and leadership",
    ],
  },
  {
    id: 3,
    category: "Work Environment",
    question: "What type of work environment appeals to you most?",
    options: [
      "Quiet, focused spaces with minimal distractions",
      "Creative studios with collaborative energy",
      "Dynamic environments with lots of people interaction",
      "Professional offices with structured processes",
    ],
  },
  {
    id: 4,
    category: "Values",
    question: "What motivates you most in your future career?",
    options: [
      "Innovation and technological advancement",
      "Self-expression and creative fulfillment",
      "Making a positive impact on others",
      "Achievement and professional recognition",
    ],
  },
  {
    id: 5,
    category: "Learning Style",
    question: "How do you prefer to learn new things?",
    options: [
      "Through hands-on experimentation and research",
      "Through visual examples and creative projects",
      "Through discussion and collaboration with others",
      "Through structured courses and clear guidelines",
    ],
  },
  {
    id: 6,
    category: "Future Goals",
    question: "Where do you see yourself in 10 years?",
    options: [
      "Leading innovative projects in technology or science",
      "Running my own creative business or studio",
      "Managing a team that helps improve people's lives",
      "Holding an executive position in a major organization",
    ],
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()

  const questionsAttempted = Object.keys(answers).length
  const progress = (questionsAttempted / questions.length) * 100

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleComplete = () => {
    // Store answers in localStorage for the recommendations page
    localStorage.setItem("quizAnswers", JSON.stringify(answers))
    router.push("/recommendations")
  }

  const currentAnswer = answers[questions[currentQuestion]?.id]

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen pt-16 md:pt-20 p-2 md:p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center pb-4 md:pb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                <CheckCircleIcon />
              </div>
              <CardTitle className="text-xl md:text-3xl font-heading">Quiz Complete!</CardTitle>
              <CardDescription className="text-sm md:text-lg font-body">
                Great job! We've analyzed your responses and are ready to show you personalized career recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4 md:space-y-6 px-4 md:px-6">
              <div className="bg-muted/50 rounded-lg p-4 md:p-6">
                <h3 className="font-heading font-semibold mb-2 text-sm md:text-base">What's Next?</h3>
                <p className="text-muted-foreground font-body text-xs md:text-sm">
                  Based on your answers, we'll provide tailored career suggestions, recommended courses, and learning
                  resources that align with your interests and goals.
                </p>
              </div>
              <Button size="lg" onClick={handleComplete} className="w-full text-sm md:text-base">
                View My Recommendations
                <ArrowRightIcon />
              </Button>
              <Button variant="outline" asChild className="text-sm md:text-base bg-transparent">
                <Link href="/">Return to Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8 pt-16 md:pt-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4 md:mb-8">
            <div className="flex justify-between items-center mb-1 md:mb-2">
              <span className="text-xs md:text-sm font-medium text-muted-foreground">Progress</span>
              <span className="text-xs md:text-sm font-medium text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5 md:h-2" />
          </div>

          <Card className="mb-4 md:mb-8">
            <CardHeader className="pb-3 md:pb-6">
              <div className="flex items-center gap-2 mb-1 md:mb-2">
                <span className="text-xs md:text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  {questions[currentQuestion].category}
                </span>
              </div>
              <CardTitle className="text-lg md:text-2xl font-heading text-balance leading-tight">
                {questions[currentQuestion].question}
              </CardTitle>
              <CardDescription className="font-body text-xs md:text-sm">
                Choose the option that best describes you or your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <RadioGroup value={currentAnswer || ""} onValueChange={handleAnswer}>
                <div className="space-y-2 md:space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2 md:space-x-3 p-2 md:p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} className="mt-0.5 md:mt-1" />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer text-sm md:text-base leading-relaxed font-body"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="space-y-3 md:space-y-0">
            <div className="flex justify-center md:hidden">
              <div className="flex gap-1.5">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index < currentQuestion ? "bg-accent" : index === currentQuestion ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center gap-1 md:gap-2 bg-transparent text-xs md:text-sm px-3 md:px-4"
              >
                <ArrowLeftIcon />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>

              <div className="hidden md:flex gap-2">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index < currentQuestion ? "bg-accent" : index === currentQuestion ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="flex items-center gap-1 md:gap-2 text-xs md:text-sm px-3 md:px-4"
              >
                <span className="hidden sm:inline">
                  {currentQuestion === questions.length - 1 ? "Complete Quiz" : "Next"}
                </span>
                <span className="sm:hidden">{currentQuestion === questions.length - 1 ? "Complete" : "Next"}</span>
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
