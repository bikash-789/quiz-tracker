"use client";

import { Navbar } from "@/components/Navbar";
import { QuizGenerator } from "@/components/quiz/QuizGenerator";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CreateQuizPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-10 px-4 mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/materials">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Materials
              </Link>
            </Button>
          </div>
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center bg-primary/10 rounded-full p-3 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Create AI Quiz</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Generate customized quizzes from your learning materials using AI
            </p>
          </div>
          
          <QuizGenerator />
        </div>
      </main>
    </div>
  );
} 