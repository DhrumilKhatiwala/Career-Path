"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Award, ExternalLink, Save, Lightbulb, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"

interface CareerRecommendation {
  title: string
  description: string
  matchPercentage: number
  skills: string[]
  averageSalary: string
  growthRate: string
  education: string
}

interface Course {
  title: string
  provider: string
  duration: string
  level: string
  rating: number
  price: string
}

interface Certification {
  title: string
  provider: string
  difficulty: string
  timeToComplete: string
  industry: string
}

const careerRecommendations: Record<string, CareerRecommendation[]> = {
  technical: [
    {
      title: "Software Developer",
      description:
        "Design, develop, and maintain software applications and systems using various programming languages and frameworks.",
      matchPercentage: 95,
      skills: ["Programming", "Problem Solving", "Logical Thinking", "Attention to Detail"],
      averageSalary: "$75,000 - $120,000",
      growthRate: "22% (Much faster than average)",
      education: "Bachelor's degree in Computer Science or related field",
    },
    {
      title: "Data Scientist",
      description:
        "Analyze complex data to help organizations make informed business decisions using statistical methods and machine learning.",
      matchPercentage: 88,
      skills: ["Statistics", "Python/R", "Data Visualization", "Critical Thinking"],
      averageSalary: "$85,000 - $140,000",
      growthRate: "31% (Much faster than average)",
      education: "Bachelor's degree in Statistics, Mathematics, or Computer Science",
    },
  ],
  creative: [
    {
      title: "UX/UI Designer",
      description:
        "Create intuitive and visually appealing user interfaces for websites, mobile apps, and digital products.",
      matchPercentage: 92,
      skills: ["Design Thinking", "Prototyping", "User Research", "Visual Communication"],
      averageSalary: "$65,000 - $110,000",
      growthRate: "13% (Faster than average)",
      education: "Bachelor's degree in Design, HCI, or related field",
    },
    {
      title: "Digital Marketing Specialist",
      description:
        "Develop and execute creative marketing campaigns across digital platforms to engage audiences and drive business growth.",
      matchPercentage: 85,
      skills: ["Content Creation", "Social Media", "Analytics", "Brand Strategy"],
      averageSalary: "$50,000 - $85,000",
      growthRate: "10% (Faster than average)",
      education: "Bachelor's degree in Marketing, Communications, or related field",
    },
  ],
  people: [
    {
      title: "Human Resources Manager",
      description:
        "Oversee recruitment, employee relations, and organizational development to create positive workplace cultures.",
      matchPercentage: 90,
      skills: ["Communication", "Conflict Resolution", "Leadership", "Empathy"],
      averageSalary: "$60,000 - $100,000",
      growthRate: "9% (Faster than average)",
      education: "Bachelor's degree in HR, Psychology, or Business Administration",
    },
    {
      title: "School Counselor",
      description:
        "Support students' academic, career, and personal development through guidance and counseling services.",
      matchPercentage: 87,
      skills: ["Active Listening", "Problem Solving", "Patience", "Cultural Sensitivity"],
      averageSalary: "$45,000 - $75,000",
      growthRate: "8% (As fast as average)",
      education: "Master's degree in School Counseling or related field",
    },
  ],
  leadership: [
    {
      title: "Project Manager",
      description:
        "Plan, execute, and oversee projects from initiation to completion, ensuring they meet objectives and deadlines.",
      matchPercentage: 93,
      skills: ["Organization", "Leadership", "Risk Management", "Communication"],
      averageSalary: "$70,000 - $115,000",
      growthRate: "11% (Faster than average)",
      education: "Bachelor's degree in Business, Management, or related field",
    },
    {
      title: "Business Analyst",
      description:
        "Analyze business processes and systems to identify improvements and help organizations achieve their goals.",
      matchPercentage: 86,
      skills: ["Analytical Thinking", "Process Improvement", "Documentation", "Stakeholder Management"],
      averageSalary: "$65,000 - $105,000",
      growthRate: "14% (Faster than average)",
      education: "Bachelor's degree in Business, Economics, or related field",
    },
  ],
}

const courses: Record<string, Course[]> = {
  technical: [
    {
      title: "Complete Web Development Bootcamp",
      provider: "Udemy",
      duration: "65 hours",
      level: "Beginner",
      rating: 4.7,
      price: "$89.99",
    },
    {
      title: "Python for Data Science",
      provider: "Coursera",
      duration: "4 months",
      level: "Intermediate",
      rating: 4.6,
      price: "$49/month",
    },
    {
      title: "Machine Learning Specialization",
      provider: "Coursera",
      duration: "3 months",
      level: "Advanced",
      rating: 4.8,
      price: "$49/month",
    },
  ],
  creative: [
    {
      title: "UI/UX Design Specialization",
      provider: "Coursera",
      duration: "6 months",
      level: "Beginner",
      rating: 4.5,
      price: "$49/month",
    },
    {
      title: "Digital Marketing Fundamentals",
      provider: "Google",
      duration: "40 hours",
      level: "Beginner",
      rating: 4.4,
      price: "Free",
    },
    {
      title: "Adobe Creative Suite Mastery",
      provider: "LinkedIn Learning",
      duration: "25 hours",
      level: "Intermediate",
      rating: 4.3,
      price: "$29.99/month",
    },
  ],
  people: [
    {
      title: "Human Resources Management",
      provider: "edX",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.2,
      price: "$99",
    },
    {
      title: "Counseling Psychology Fundamentals",
      provider: "Coursera",
      duration: "4 months",
      level: "Intermediate",
      rating: 4.5,
      price: "$49/month",
    },
    {
      title: "Conflict Resolution Skills",
      provider: "Udemy",
      duration: "12 hours",
      level: "Beginner",
      rating: 4.4,
      price: "$79.99",
    },
  ],
  leadership: [
    {
      title: "Project Management Professional (PMP)",
      provider: "PMI",
      duration: "6 months",
      level: "Advanced",
      rating: 4.6,
      price: "$405",
    },
    {
      title: "Business Analysis Fundamentals",
      provider: "Coursera",
      duration: "3 months",
      level: "Beginner",
      rating: 4.3,
      price: "$49/month",
    },
    {
      title: "Leadership and Management Skills",
      provider: "LinkedIn Learning",
      duration: "20 hours",
      level: "Intermediate",
      rating: 4.5,
      price: "$29.99/month",
    },
  ],
}

const certifications: Record<string, Certification[]> = {
  technical: [
    {
      title: "AWS Certified Solutions Architect",
      provider: "Amazon",
      difficulty: "Advanced",
      timeToComplete: "3-6 months",
      industry: "Cloud Computing",
    },
    {
      title: "Google Data Analytics Certificate",
      provider: "Google",
      difficulty: "Beginner",
      timeToComplete: "3-6 months",
      industry: "Data Analytics",
    },
    {
      title: "Microsoft Azure Fundamentals",
      provider: "Microsoft",
      difficulty: "Beginner",
      timeToComplete: "1-2 months",
      industry: "Cloud Computing",
    },
  ],
  creative: [
    {
      title: "Google UX Design Certificate",
      provider: "Google",
      difficulty: "Beginner",
      timeToComplete: "3-6 months",
      industry: "Design",
    },
    {
      title: "HubSpot Content Marketing",
      provider: "HubSpot",
      difficulty: "Intermediate",
      timeToComplete: "2-3 months",
      industry: "Marketing",
    },
    {
      title: "Adobe Certified Expert",
      provider: "Adobe",
      difficulty: "Advanced",
      timeToComplete: "6-12 months",
      industry: "Creative Software",
    },
  ],
  people: [
    {
      title: "SHRM Certified Professional",
      provider: "SHRM",
      difficulty: "Advanced",
      timeToComplete: "6-12 months",
      industry: "Human Resources",
    },
    {
      title: "Certified Professional Counselor",
      provider: "NBCC",
      difficulty: "Advanced",
      timeToComplete: "2-4 years",
      industry: "Counseling",
    },
    {
      title: "Conflict Resolution Certificate",
      provider: "Mediation Training Institute",
      difficulty: "Intermediate",
      timeToComplete: "3-6 months",
      industry: "Mediation",
    },
  ],
  leadership: [
    {
      title: "Project Management Professional (PMP)",
      provider: "PMI",
      difficulty: "Advanced",
      timeToComplete: "6-12 months",
      industry: "Project Management",
    },
    {
      title: "Certified Business Analysis Professional",
      provider: "IIBA",
      difficulty: "Advanced",
      timeToComplete: "6-12 months",
      industry: "Business Analysis",
    },
    {
      title: "Certified ScrumMaster",
      provider: "Scrum Alliance",
      difficulty: "Intermediate",
      timeToComplete: "2-3 months",
      industry: "Agile Management",
    },
  ],
}

export default function RecommendationsPage() {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string> | null>(null)
  const [recommendationType, setRecommendationType] = useState<string>("technical")
  const [savedItems, setSavedItems] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const answers = localStorage.getItem("quizAnswers")
    if (answers) {
      const parsedAnswers = JSON.parse(answers)
      setQuizAnswers(parsedAnswers)

      // Analyze answers to determine recommendation type
      const answerValues = Object.values(parsedAnswers) as string[]
      const technicalCount = answerValues.filter(
        (answer) =>
          answer.includes("technical") ||
          answer.includes("data") ||
          answer.includes("research") ||
          answer.includes("experimentation"),
      ).length
      const creativeCount = answerValues.filter(
        (answer) =>
          answer.includes("creative") ||
          answer.includes("visual") ||
          answer.includes("artistic") ||
          answer.includes("design"),
      ).length
      const peopleCount = answerValues.filter(
        (answer) =>
          answer.includes("people") ||
          answer.includes("helping") ||
          answer.includes("supporting") ||
          answer.includes("discussion"),
      ).length
      const leadershipCount = answerValues.filter(
        (answer) =>
          answer.includes("leading") ||
          answer.includes("managing") ||
          answer.includes("organization") ||
          answer.includes("executive"),
      ).length

      const maxCount = Math.max(technicalCount, creativeCount, peopleCount, leadershipCount)
      if (maxCount === technicalCount) setRecommendationType("technical")
      else if (maxCount === creativeCount) setRecommendationType("creative")
      else if (maxCount === peopleCount) setRecommendationType("people")
      else if (maxCount === leadershipCount) setRecommendationType("leadership")
    } else {
      router.push("/quiz")
    }
  }, [router])

  const handleSaveItem = (itemId: string) => {
    setSavedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const handleSaveToProfile = () => {
    localStorage.setItem(
      "savedRecommendations",
      JSON.stringify({
        careers: careerRecommendations[recommendationType],
        courses: courses[recommendationType],
        certifications: certifications[recommendationType],
        savedItems,
        type: recommendationType,
      }),
    )
    router.push("/dashboard")
  }

  if (!quizAnswers) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen pt-20">
          <div className="text-center">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-2">Loading Your Recommendations...</h2>
            <p className="text-muted-foreground">Please wait while we analyze your quiz results.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Your Personalized Recommendations</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Based on your quiz responses, we've identified career paths that align with your interests, skills, and
              goals.
            </p>
            <Badge variant="secondary" className="mt-4 text-sm">
              Profile Type: {recommendationType.charAt(0).toUpperCase() + recommendationType.slice(1)} Focused
            </Badge>
          </div>

          <Tabs defaultValue="careers" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="careers">Career Paths</TabsTrigger>
              <TabsTrigger value="courses">Recommended Courses</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

            <TabsContent value="careers" className="space-y-6">
              <div className="grid gap-6">
                {careerRecommendations[recommendationType].map((career, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-2xl font-serif">{career.title}</CardTitle>
                            <Badge variant="secondary" className="bg-accent/10 text-accent">
                              {career.matchPercentage}% Match
                            </Badge>
                          </div>
                          <CardDescription className="text-base leading-relaxed">{career.description}</CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSaveItem(`career-${index}`)}
                          className={savedItems.includes(`career-${index}`) ? "bg-accent/10" : ""}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            Key Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {career.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="font-semibold text-sm">Average Salary:</span>
                            <p className="text-muted-foreground">{career.averageSalary}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-sm">Job Growth:</span>
                            <p className="text-muted-foreground">{career.growthRate}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-sm">Education:</span>
                            <p className="text-muted-foreground">{career.education}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses[recommendationType].map((course, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-serif mb-2">{course.title}</CardTitle>
                          <CardDescription>{course.provider}</CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSaveItem(`course-${index}`)}
                          className={savedItems.includes(`course-${index}`) ? "bg-accent/10" : ""}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{course.level}</Badge>
                        <div className="flex items-center gap-1">
                          <span className="text-sm">★</span>
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-semibold text-primary">{course.price}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Course
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="certifications" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications[recommendationType].map((cert, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-serif mb-2">{cert.title}</CardTitle>
                          <CardDescription>{cert.provider}</CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSaveItem(`cert-${index}`)}
                          className={savedItems.includes(`cert-${index}`) ? "bg-accent/10" : ""}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Badge variant="outline">{cert.difficulty}</Badge>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Time to Complete:</span>
                          <span>{cert.timeToComplete}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Industry:</span>
                          <span>{cert.industry}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        <Award className="h-4 w-4 mr-2" />
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Save to Profile Button */}
          <div className="text-center mt-8">
            <Button onClick={handleSaveToProfile} size="lg">
              <Save className="h-4 w-4 mr-2" />
              Save to Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
