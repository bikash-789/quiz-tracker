"use client";

import { useParams, useSearchParams } from "next/navigation";
import { MOCK_QUIZ_DATA } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Home, XCircle } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function QuizResultsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const quizId = params.id as string;
  
  // Get score from query parameters
  const score = Number(searchParams.get("score") || 0);
  const maxScore = Number(searchParams.get("maxScore") || 1);
  
  // Find the quiz by ID
  const quiz = MOCK_QUIZ_DATA.find((q) => q.id === quizId);
  
  // Calculate percentage
  const percentage = Math.round((score / maxScore) * 100);
  
  // Determine pass/fail status (assuming 60% is passing)
  const isPassed = percentage >= 60;
  
  // Get feedback based on score
  const getFeedback = () => {
    if (percentage >= 90) {
      return "Excellent! You have a strong understanding of this topic.";
    } else if (percentage >= 70) {
      return "Good job! You have a solid grasp of the material.";
    } else if (percentage >= 60) {
      return "You passed! Keep studying to improve your knowledge.";
    } else {
      return "You didn't pass this time. Review the material and try again.";
    }
  };
  
  if (!quiz) {
    return (
      <div className="py-12 px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Quiz Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The quiz you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/quizzes">
            Back to Quizzes
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/quizzes" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Quizzes
          </Link>
        </Button>
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Quiz Results</h1>
          <p className="text-muted-foreground text-lg">{quiz.title}</p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6 text-center">
            <div className="max-w-md mx-auto">
              <div className="relative mb-6">
                <Progress value={percentage} className="h-4" />
                <span className="absolute top-0 right-0 transform translate-y-6 text-sm font-medium">
                  {percentage}%
                </span>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-center mb-4">
                  {isPassed ? (
                    <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" />
                    </div>
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                      <XCircle className="h-10 w-10 text-red-600 dark:text-red-500" />
                    </div>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold mb-2">
                  {isPassed ? "Congratulations!" : "Better Luck Next Time"}
                </h2>
                <p className="text-muted-foreground">
                  {getFeedback()}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                <div className="bg-muted/40 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Your Score</p>
                  <p className="text-xl font-semibold">{score} / {maxScore} points</p>
                </div>
                <div className="bg-muted/40 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Category</p>
                  <p className="text-xl font-semibold">{quiz.category}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link href={`/quizzes/${quizId}`}>Retry Quiz</Link>
                </Button>
                <Button asChild>
                  <Link href="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" /> Go to Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Performance Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto">
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Questions</p>
              <p className="text-2xl font-semibold">{quiz.questions.length}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Difficulty</p>
              <p className="text-2xl font-semibold capitalize">{quiz.difficulty}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Score</p>
              <p className="text-2xl font-semibold">{percentage}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 