import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

// Custom SVG icons with improved styling
const ArrowRightIcon = () => (
  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const BookOpenIcon = () => (
  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
    <circle cx="9" cy="9" r="1" fill="currentColor" />
    <circle cx="15" cy="9" r="1" fill="currentColor" />
  </svg>
)

const BullsEyeIcon = () => (
  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <circle cx="12" cy="12" r="6" strokeWidth={2} />
    <circle cx="12" cy="12" r="2" strokeWidth={2} fill="currentColor" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    <circle cx="13" cy="7" r="2" fill="currentColor" fillOpacity="0.3" />
    <circle cx="21" cy="7" r="1" fill="currentColor" />
    <circle cx="21" cy="15" r="1" fill="currentColor" />
  </svg>
)

const SparklesIcon = () => (
  <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3l1.5 1.5L5 6l-1.5-1.5L5 3zM19 3l1.5 1.5L19 6l-1.5-1.5L19 3zM12 8l1.5 1.5L12 11l-1.5-1.5L12 8z"
    />
  </svg>
)

export default function HomePage() {
  return (
    <div className="min-h-screen professional-bg bg-background">
      <div className="floating-element floating-circle" style={{ top: "15%", left: "8%", animationDelay: "0s" }} />
      <div className="floating-element floating-circle" style={{ top: "65%", right: "12%", animationDelay: "3s" }} />
      <div className="floating-element floating-square" style={{ top: "35%", left: "18%", animationDelay: "1.5s" }} />
      <div className="floating-element floating-square" style={{ top: "75%", right: "25%", animationDelay: "4s" }} />
      <div className="floating-element floating-diamond" style={{ top: "25%", right: "8%", animationDelay: "2s" }} />
      <div className="floating-element floating-diamond" style={{ top: "85%", left: "15%", animationDelay: "5s" }} />

      {/* Drifting particles */}
      <div className="drifting-dot" style={{ top: "20%", animationDelay: "0s", animationDuration: "30s" }} />
      <div className="drifting-dot" style={{ top: "50%", animationDelay: "8s", animationDuration: "35s" }} />
      <div className="drifting-dot" style={{ top: "80%", animationDelay: "15s", animationDuration: "25s" }} />

      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-xl shadow-lg">
                <BullsEyeIcon />
              </div>
              <span className="text-2xl font-heading font-bold text-foreground">CareerPath</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/quiz"
                className="text-muted-foreground hover:text-primary transition-colors font-medium font-body"
              >
                Take Quiz
              </Link>
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-primary transition-colors font-medium font-body"
              >
                Dashboard
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors font-medium font-body"
              >
                About
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
                <Link href="/quiz">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-muted/50 backdrop-blur-sm" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-8 leading-tight text-balance">
            Discover Your
            <span className="gradient-text block mt-2">Perfect Career Path</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-body text-pretty">
            Take our AI-powered career assessment to unlock personalized recommendations and skill development paths
            designed for ambitious students and professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              asChild
              className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all hover-lift"
            >
              <Link href="/quiz">
                Start Your Journey
                <ArrowRightIcon />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-lg px-10 py-6 glass-card hover:bg-green-500/10 border-green-500 text-green-600 hover:text-green-700 transition-all hover-lift bg-transparent"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 text-balance">
              Why Choose CareerPath?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body text-pretty">
              Our platform combines advanced AI assessment with personalized guidance to help you make informed career
              decisions with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <Card className="glass-card hover-lift border-0 shadow-lg">
              <CardHeader className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <BookOpenIcon />
                </div>
                <CardTitle className="text-2xl mb-4 font-heading font-bold">Personalized Assessment</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed font-body text-lg">
                  Answer thoughtfully crafted questions to receive tailored career recommendations powered by advanced
                  AI algorithms.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover-lift border-0 shadow-lg">
              <CardHeader className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    <circle cx="13" cy="6" r="1" fill="currentColor" />
                    <circle cx="8" cy="11" r="1" fill="currentColor" />
                  </svg>
                </div>
                <CardTitle className="text-2xl mb-4 font-heading font-bold">Smart Recommendations</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed font-body text-lg">
                  Get curated suggestions for courses, certifications, and resources that align perfectly with your
                  career goals.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover-lift border-0 shadow-lg">
              <CardHeader className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <TrendingUpIcon />
                </div>
                <CardTitle className="text-2xl mb-4 font-heading font-bold">Progress Tracking</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed font-body text-lg">
                  Monitor your learning journey with our comprehensive dashboard and achievement system to stay
                  motivated.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="text-5xl md:text-6xl font-heading font-bold text-primary">15,000+</div>
              <div className="text-lg text-muted-foreground font-body">Students Guided</div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl md:text-6xl font-heading font-bold text-secondary">750+</div>
              <div className="text-lg text-muted-foreground font-body">Career Paths</div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl md:text-6xl font-heading font-bold text-accent">98%</div>
              <div className="text-lg text-muted-foreground font-body">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-8 text-balance">
            Ready to Shape Your Future?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto font-body text-pretty">
            Join thousands of students and professionals who have discovered their ideal career path. Take the first
            step towards your dream career today.
          </p>
          <Button
            size="lg"
            asChild
            className="text-lg px-10 py-6 bg-background text-primary hover:bg-background/90 shadow-xl hover:shadow-2xl transition-all hover-lift"
          >
            <Link href="/quiz">
              Take the Career Assessment
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-16 px-6 glass-card">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary rounded-xl shadow-lg">
                  <BullsEyeIcon />
                </div>
                <span className="text-2xl font-heading font-bold text-foreground">CareerPath</span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md font-body text-lg">
                Empowering students and professionals to discover and pursue their ideal career paths through
                personalized AI-powered guidance and comprehensive resources.
              </p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-foreground mb-6 text-lg">Platform</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/quiz" className="text-muted-foreground hover:text-primary transition-colors font-body">
                    Career Assessment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recommendations"
                    className="text-muted-foreground hover:text-primary transition-colors font-body"
                  >
                    Recommendations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-muted-foreground hover:text-primary transition-colors font-body"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-bold text-foreground mb-6 text-lg">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors font-body">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors font-body">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-primary transition-colors font-body"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground font-body">&copy; 2025 CareerPath. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
