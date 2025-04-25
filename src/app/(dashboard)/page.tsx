import { Button } from "@/components/ui/button";
import { MOCK_QUIZ_DATA } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight, Brain } from "lucide-react";
import { QuizCard } from "@/components/quiz/QuizCard";

export default function Home() {
  // Featured quizzes - showing only 3 for the homepage
  const featuredQuizzes = MOCK_QUIZ_DATA.slice(0, 3);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Master AI with Interactive Quizzes
              </h1>
              <p className="text-lg text-muted-foreground">
                Improve your knowledge of artificial intelligence concepts through our carefully crafted quizzes. Track your progress and identify areas for improvement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/quizzes">Browse Quizzes</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/auth/register">Create Account</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <Brain className="h-64 w-64 text-primary/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured quizzes section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Quizzes</h2>
              <p className="text-muted-foreground mt-2">
                Start with these popular AI quizzes to test your knowledge
              </p>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0" asChild>
              <Link href="/quizzes" className="flex items-center gap-2">
                View all quizzes <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="bg-muted/30 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why AI Quiz Tracker?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Quizzes</h3>
              <p className="text-muted-foreground">
                Access quizzes on various AI topics from machine learning fundamentals to advanced deep learning concepts.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 20v-6M6 20V10M18 20V4"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your performance over time and identify strengths and areas that need improvement.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Timed Challenges</h3>
              <p className="text-muted-foreground">
                Test your knowledge under time constraints to simulate real-world scenarios and improve recall speed.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Button size="lg" asChild>
              <Link href="/auth/register">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 