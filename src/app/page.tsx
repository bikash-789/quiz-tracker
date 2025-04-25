"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, BookOpen, CheckCircle, Trophy, BarChart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="py-20 px-6 flex-1 flex items-center justify-center bg-gradient-to-b from-background to-accent/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Accelerate your learning with interactive quizzes
            </h1>
            <p className="text-xl text-muted-foreground">
              Improve your understanding of any subject through carefully crafted quizzes
              that adapt to your learning style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/quizzes">
                  Explore Quizzes <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/register">Sign Up Free</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-primary/20 to-primary/5">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl">
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Quiz Tracker Platform</h3>
                  <p className="text-sm text-muted-foreground">
                    Test your knowledge, track progress, and accelerate your learning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Use Quiz Tracker?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform helps you master any subject through interactive quizzes and detailed progress tracking
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-background p-8 rounded-xl shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn Any Subject</h3>
              <p className="text-muted-foreground">
                Access quizzes covering a wide range of topics - from academic subjects to professional skills and hobbies
              </p>
              <div className="mt-6 h-32 bg-muted/30 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-grid-pattern-primary/5"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background/80 backdrop-blur-sm py-2 px-4 rounded text-sm">
                      Feature Image: Learning Concepts
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-8 rounded-xl shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
              <p className="text-muted-foreground">
                Visualize your learning journey with detailed analytics and identify areas that need improvement
              </p>
              <div className="mt-6 h-32 bg-muted/30 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-grid-pattern-secondary/5"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background/80 backdrop-blur-sm py-2 px-4 rounded text-sm">
                      Feature Image: Progress Tracking
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-8 rounded-xl shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Achievements</h3>
              <p className="text-muted-foreground">
                Stay motivated with badges, certificates, and achievements that showcase your growing expertise
              </p>
              <div className="mt-6 h-32 bg-muted/30 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-grid-pattern-accent/5"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background/80 backdrop-blur-sm py-2 px-4 rounded text-sm">
                      Feature Image: Achievements
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 rounded-full bg-primary/10 p-2">
            <div className="bg-primary text-primary-foreground p-3 rounded-full">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-6">Ready to boost your knowledge?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners improving their skills through our interactive quizzes
          </p>
          <Button size="lg" asChild>
            <Link href="/quizzes">Get Started Now</Link>
          </Button>
        </div>
      </section>
      
      <footer className="bg-muted/30 py-8 px-6 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Quiz Tracker. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
