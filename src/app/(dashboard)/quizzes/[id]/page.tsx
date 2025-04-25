"use client";

import { useParams, useRouter } from "next/navigation";
import { MOCK_QUIZ_DATA } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Library, Timer, AlertTriangle, ArrowLeft, Award } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Find the quiz by ID
  const quiz = MOCK_QUIZ_DATA.find((q) => q.id === quizId);
  
  // If quiz not found, show an error message
  if (!quiz) {
    return (
      <div className="py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h1 className="text-3xl font-bold mb-4">Quiz Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The quiz you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/quizzes" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Quizzes
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Calculate total points
  const totalPoints = quiz.questions.reduce((total, question) => total + question.points, 0);
  
  return (
    <div className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/quizzes" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Quizzes
          </Link>
        </Button>
        
        <div className="flex items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {quiz.difficulty}
              </span>
              <span className="text-muted-foreground">{quiz.category}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Library className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="text-xl font-semibold">{quiz.questions.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Timer className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Limit</p>
                <p className="text-xl font-semibold">{quiz.timeLimit} minutes</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-xl font-semibold">{totalPoints}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-muted-foreground">{quiz.description}</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quiz Preview</h2>
          <div className="space-y-4">
            {quiz.questions.slice(0, 1).map((question) => (
              <Card key={question.id} className="p-6">
                <p className="font-medium mb-4">{question.text}</p>
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <div 
                      key={index}
                      className="p-3 border rounded-md cursor-not-allowed opacity-70 flex items-center gap-2"
                    >
                      <div className="w-5 h-5 rounded-full border flex items-center justify-center">
                        <span className="text-xs">{String.fromCharCode(65 + index)}</span>
                      </div>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground italic">
                  More questions will be revealed when you start the quiz
                </p>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">Start Quiz</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start Quiz: {quiz.title}</DialogTitle>
                <DialogDescription>
                  You are about to start the quiz. Once started, the timer will begin and you'll need to complete all questions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Time Limit:</span>
                  <span>{quiz.timeLimit} minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Questions:</span>
                  <span>{quiz.questions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Points:</span>
                  <span>{totalPoints}</span>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => router.push(`/quizzes/${quizId}/attempt`)}>
                  Begin Quiz
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
} 