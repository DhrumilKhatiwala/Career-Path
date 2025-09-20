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
  status: "in-progress" | "completed" | "overdue"
  category: string
}

const mockLearningGoals: LearningGoal[] = [
  {
    id: "1",
    title: "Complete Python Fundamentals",
    description: "Master basic Python programming concepts and syntax",
    progress: 0,
    status: "in-progress",
    category: "Programming",
  },
  {
    id: "2",
    title: "UI/UX Design Portfolio",
    description: "Create 3 design projects for portfolio",
    progress: 0,
    status: "in-progress",
    category: "Design",
  },
  {
    id: "3",
    title: "Data Analysis Certificate",
    description: "Complete Google Data Analytics certification",
    progress: 0,
    status: "in-progress",
    category: "Analytics",
  },
  {
    id: "4",
    title: "Project Management Basics",
    description: "Learn fundamental project management principles",
    progress: 0,
    status: "in-progress",
    category: "Management",
  },
]

const achievements: any[] = []

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
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8 pt-16 md:pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-4 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-1 md:mb-2">Welcome Back!</h1>
            <p className="text-sm md:text-lg text-muted-foreground">
              Track your progress and continue your journey toward your ideal career.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Progress</CardTitle>
                <TrendingUp className="w-4 h-4 md:w-6 md:h-6" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">{Math.round(overallProgress)}%</div>
                <Progress value={overallProgress} className="mt-1 md:mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Goals</CardTitle>
                <CheckCircle className="w-4 h-4 md:w-6 md:h-6" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">
                  {completedGoals}/{totalGoals}
                </div>
                <p className="text-xs text-muted-foreground hidden md:block">Learning goals achieved</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Saved</CardTitle>
                <BookOpen className="w-4 h-4 md:w-6 md:h-6" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">{savedRecommendations?.savedItems?.length || 0}</div>
                <p className="text-xs text-muted-foreground hidden md:block">Courses & certifications</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Awards</CardTitle>
                <Award className="w-4 h-4 md:w-6 md:h-6" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">{achievements.length}</div>
                <p className="text-xs text-muted-foreground hidden md:block">Milestones unlocked</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="goals" className="space-y-3 md:space-y-6">
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-4 min-w-max md:min-w-0">
                <TabsTrigger value="goals" className="text-xs md:text-sm px-2 md:px-4">
                  Goals
                </TabsTrigger>
                <TabsTrigger value="saved" className="text-xs md:text-sm px-2 md:px-4">
                  Saved
                </TabsTrigger>
                <TabsTrigger value="achievements" className="text-xs md:text-sm px-2 md:px-4">
                  Awards
                </TabsTrigger>
                <TabsTrigger value="profile" className="text-xs md:text-sm px-2 md:px-4">
                  Profile
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="goals" className="space-y-3 md:space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-2xl font-bold">Learning Goals</h2>
                <Button size="sm" className="text-xs md:text-sm">
                  Add Goal
                </Button>
              </div>

              <div className="grid gap-3 md:gap-4">
                {learningGoals.map((goal) => {
                  const StatusIcon = getStatusIcon(goal.status)
                  return (
                    <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2 md:pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                              <CardTitle className="text-sm md:text-lg">{goal.title}</CardTitle>
                              <StatusIcon className={`h-4 w-4 md:h-5 md:w-5 ${getStatusColor(goal.status)}`} />
                            </div>
                            <CardDescription className="text-xs md:text-sm">{goal.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {goal.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 md:space-y-3">
                          <div className="flex items-center justify-between text-xs md:text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} />
                          <div className="flex items-center justify-end">
                            <Badge
                              variant={
                                goal.status === "completed"
                                  ? "default"
                                  : goal.status === "overdue"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className="text-xs"
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

            <TabsContent value="saved" className="space-y-3 md:space-y-6">
              <h2 className="text-lg md:text-2xl font-bold">Saved Recommendations</h2>

              {savedRecommendations ? (
                <div className="space-y-4 md:space-y-8">
                  {/* Saved Careers */}
                  {savedRecommendations.careers && savedRecommendations.careers.length > 0 && (
                    <div>
                      <h3 className="text-base md:text-xl font-semibold mb-3 md:mb-4">Career Paths</h3>
                      <div className="grid gap-3 md:gap-4">
                        {savedRecommendations.careers.slice(0, 2).map((career, index) => (
                          <Card key={index}>
                            <CardHeader className="pb-2 md:pb-4">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-sm md:text-base">{career.title}</CardTitle>
                                <Badge variant="secondary" className="text-xs">
                                  {career.matchPercentage}% Match
                                </Badge>
                              </div>
                              <CardDescription className="text-xs md:text-sm">{career.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex flex-wrap gap-1 md:gap-2">
                                {career.skills.slice(0, 3).map((skill: string, skillIndex: number) => (
                                  <Badge key={skillIndex} variant="outline" className="text-xs">
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
                      <h3 className="text-base md:text-xl font-semibold mb-3 md:mb-4">Recommended Courses</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {savedRecommendations.courses.slice(0, 4).map((course, index) => (
                          <Card key={index}>
                            <CardHeader className="pb-2 md:pb-4">
                              <CardTitle className="text-sm md:text-lg">{course.title}</CardTitle>
                              <CardDescription className="text-xs md:text-sm">{course.provider}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center justify-between mb-2 md:mb-3">
                                <Badge variant="outline" className="text-xs">
                                  {course.level}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 md:w-4 md:h-4" />
                                  <span className="text-xs md:text-sm">{course.rating}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-xs md:text-sm mb-2 md:mb-3">
                                <span className="text-muted-foreground">{course.duration}</span>
                                <span className="font-semibold text-primary">{course.price}</span>
                              </div>
                              <Button
                                variant="outline"
                                className="w-full bg-transparent text-xs md:text-sm h-8 md:h-10"
                              >
                                <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
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

            <TabsContent value="achievements" className="space-y-3 md:space-y-6">
              <h2 className="text-lg md:text-2xl font-bold">Achievements</h2>

              <div className="grid gap-3 md:gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <Card key={index}>
                      <CardContent className="flex items-center gap-3 md:gap-4 p-4 md:p-6">
                        <div
                          className={`w-8 h-8 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center`}
                        >
                          <Icon className={`h-4 w-4 md:h-6 md:w-6 ${achievement.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm md:text-base">{achievement.title}</h3>
                          <p className="text-muted-foreground text-xs md:text-sm">{achievement.description}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(achievement.date).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-3 md:space-y-6">
              <h2 className="text-lg md:text-2xl font-bold">Profile Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                        <span className="font-semibold">0</span>
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
