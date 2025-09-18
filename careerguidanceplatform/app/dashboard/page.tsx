"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Custom SVG components
const Target = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const BookOpen = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
)

const Award = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
  </svg>
)

const TrendingUp = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
    <polyline points="17,6 23,6 23,12" />
  </svg>
)

const Calendar = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const CheckCircle = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const Clock = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
)

const Star = () => (
  <svg className="w-4 h-4" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
)

const ExternalLink = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
)

const RefreshCw = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="23,4 23,10 17,10" />
    <polyline points="1,20 1,14 7,14" />
    <path d="M20.49,9A9,9,0,0,0,5.64,5.64L1,10m22,4a9,9,0,0,1-14.85,4.36L23,14" />
  </svg>
)

interface SavedRecommendations {
  careers: any[]
  courses: any[]
  certifications: any[]
  savedItems: string[]
  type: string
}

interface LearningGoal {
  id: string
  title: string
  description: string
  progress: number
  dueDate: string
  status: "in-progress" | "completed" | "overdue"
  category: string
}

const mockLearningGoals: LearningGoal[] = [
  {
    id: "1",
    title: "Complete Python Fundamentals",
    description: "Master basic Python programming concepts and syntax",
    progress: 75,
    dueDate: "2024-12-15",
    status: "in-progress",
    category: "Programming",
  },
  {
    id: "2",
    title: "UI/UX Design Portfolio",
    description: "Create 3 design projects for portfolio",
    progress: 40,
    dueDate: "2024-12-30",
    status: "in-progress",
    category: "Design",
  },
  {
    id: "3",
    title: "Data Analysis Certificate",
    description: "Complete Google Data Analytics certification",
    progress: 100,
    dueDate: "2024-11-20",
    status: "completed",
    category: "Analytics",
  },
  {
    id: "4",
    title: "Project Management Basics",
    description: "Learn fundamental project management principles",
    progress: 20,
    dueDate: "2024-11-25",
    status: "overdue",
    category: "Management",
  },
]

const achievements = [
  {
    title: "Quiz Completed",
    description: "Successfully completed the career assessment",
    date: "2024-11-15",
    icon: CheckCircle,
    color: "text-accent",
  },
  {
    title: "First Course Started",
    description: "Enrolled in your first recommended course",
    date: "2024-11-16",
    icon: BookOpen,
    color: "text-primary",
  },
  {
    title: "Goal Setter",
    description: "Set your first learning goal",
    date: "2024-11-17",
    icon: Target,
    color: "text-accent",
  },
  {
    title: "Milestone Reached",
    description: "Completed 75% of Python Fundamentals",
    date: "2024-11-20",
    icon: TrendingUp,
    color: "text-primary",
  },
]

export default function DashboardPage() {
  const [savedRecommendations, setSavedRecommendations] = useState<SavedRecommendations | null>(null)
  const [learningGoals, setLearningGoals] = useState<LearningGoal[]>(mockLearningGoals)

  useEffect(() => {
    const saved = localStorage.getItem("savedRecommendations")
    if (saved) {
      setSavedRecommendations(JSON.parse(saved))
    }
  }, [])

  const completedGoals = learningGoals.filter((goal) => goal.status === "completed").length
  const totalGoals = learningGoals.length
  const overallProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-accent"
      case "overdue":
        return "text-destructive"
      default:
        return "text-primary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "overdue":
        return Clock
      default:
        return RefreshCw
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Target />
              <span className="text-xl font-bold">CareerPath</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/quiz">Retake Quiz</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/chatbot">AI Assistant</Link>
              </Button>
              <Button asChild>
                <Link href="/recommendations">View Recommendations</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back!</h1>
            <p className="text-lg text-muted-foreground">
              Track your progress and continue your journey toward your ideal career.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                <TrendingUp />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
                <Progress value={overallProgress} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
                <CheckCircle />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {completedGoals}/{totalGoals}
                </div>
                <p className="text-xs text-muted-foreground">Learning goals achieved</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
                <BookOpen />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{savedRecommendations?.savedItems?.length || 0}</div>
                <p className="text-xs text-muted-foreground">Courses & certifications</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Award />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{achievements.length}</div>
                <p className="text-xs text-muted-foreground">Milestones unlocked</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="goals" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="goals">Learning Goals</TabsTrigger>
              <TabsTrigger value="saved">Saved Items</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="goals" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Learning Goals</h2>
                <Button>Add New Goal</Button>
              </div>

              <div className="grid gap-4">
                {learningGoals.map((goal) => {
                  const StatusIcon = getStatusIcon(goal.status)
                  return (
                    <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-lg">{goal.title}</CardTitle>
                              <StatusIcon className={`h-5 w-5 ${getStatusColor(goal.status)}`} />
                            </div>
                            <CardDescription>{goal.description}</CardDescription>
                          </div>
                          <Badge variant="outline">{goal.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} />
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar />
                              Due: {new Date(goal.dueDate).toLocaleDateString()}
                            </div>
                            <Badge
                              variant={
                                goal.status === "completed"
                                  ? "default"
                                  : goal.status === "overdue"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {goal.status.replace("-", " ")}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="space-y-6">
              <h2 className="text-2xl font-bold">Saved Recommendations</h2>

              {savedRecommendations ? (
                <div className="space-y-8">
                  {/* Saved Careers */}
                  {savedRecommendations.careers && savedRecommendations.careers.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Career Paths</h3>
                      <div className="grid gap-4">
                        {savedRecommendations.careers.slice(0, 2).map((career, index) => (
                          <Card key={index}>
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle>{career.title}</CardTitle>
                                <Badge variant="secondary">{career.matchPercentage}% Match</Badge>
                              </div>
                              <CardDescription>{career.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2">
                                {career.skills.slice(0, 3).map((skill: string, skillIndex: number) => (
                                  <Badge key={skillIndex} variant="outline">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Saved Courses */}
                  {savedRecommendations.courses && savedRecommendations.courses.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Recommended Courses</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {savedRecommendations.courses.slice(0, 4).map((course, index) => (
                          <Card key={index}>
                            <CardHeader>
                              <CardTitle className="text-lg">{course.title}</CardTitle>
                              <CardDescription>{course.provider}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between mb-3">
                                <Badge variant="outline">{course.level}</Badge>
                                <div className="flex items-center gap-1">
                                  <Star />
                                  <span className="text-sm">{course.rating}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{course.duration}</span>
                                <span className="font-semibold text-primary">{course.price}</span>
                              </div>
                              <Button variant="outline" className="w-full mt-3 bg-transparent">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Start Learning
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Saved Items Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Take the quiz and save recommendations to see them here.
                    </p>
                    <Button asChild>
                      <Link href="/quiz">Take Career Quiz</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <h2 className="text-2xl font-bold">Achievements</h2>

              <div className="grid gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <Card key={index}>
                      <CardContent className="flex items-center gap-4 p-6">
                        <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center`}>
                          <Icon className={`h-6 w-6 ${achievement.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-muted-foreground">{achievement.description}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(achievement.date).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <h2 className="text-2xl font-bold">Profile Overview</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Career Profile</CardTitle>
                    <CardDescription>Your personalized career assessment results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {savedRecommendations ? (
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-medium">Profile Type:</span>
                          <Badge variant="secondary" className="ml-2">
                            {savedRecommendations.type.charAt(0).toUpperCase() + savedRecommendations.type.slice(1)}{" "}
                            Focused
                          </Badge>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Top Career Match:</span>
                          <p className="text-muted-foreground mt-1">
                            {savedRecommendations.careers[0]?.title || "Complete quiz to see results"}
                          </p>
                        </div>
                        <Button variant="outline" asChild className="w-full bg-transparent">
                          <Link href="/recommendations">View Full Results</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Target className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Take the career quiz to see your profile</p>
                        <Button asChild className="mt-4">
                          <Link href="/quiz">Start Quiz</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Learning Statistics</CardTitle>
                    <CardDescription>Your progress and activity summary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Goals Completed</span>
                        <span className="font-semibold">
                          {completedGoals}/{totalGoals}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Average Progress</span>
                        <span className="font-semibold">{Math.round(overallProgress)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Achievements Earned</span>
                        <span className="font-semibold">{achievements.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Days Active</span>
                        <span className="font-semibold">12</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
