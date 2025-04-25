"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MOCK_QUIZ_DATA } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, CheckCircle, Timer } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Answer } from "@/lib/types";
import { toast } from "sonner";

export default function QuizAttemptPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;
  
  // Find the quiz by ID
  const quiz = MOCK_QUIZ_DATA.find((q) => q.id === quizId);
  
  // State for quiz attempt
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(quiz ? (quiz.timeLimit || 15) * 60 : 900); // in seconds, default to 15 mins
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isTimeUpDialogOpen, setIsTimeUpDialogOpen] = useState(false);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  
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
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = (currentQuestionIndex + 1) / totalQuestions * 100;
  
  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Handle timer
  useEffect(() => {
    if (isQuizSubmitted) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUpDialogOpen(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isQuizSubmitted]);
  
  // Handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };
  
  // Go to next question
  const goToNextQuestion = () => {
    if (selectedOption === null) {
      toast.error("Please select an answer before proceeding");
      return;
    }
    
    // Save the answer
    const isCorrect = selectedOption === currentQuestion.correctOptionIndex;
    const answer: Answer = {
      questionId: currentQuestion.id,
      selectedOptionIndex: selectedOption,
      isCorrect,
    };
    
    // Update answers
    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === currentQuestion.id);
      if (existingAnswerIndex >= 0) {
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex] = answer;
        return updatedAnswers;
      }
      return [...prev, answer];
    });
    
    // Move to next question
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setIsSubmitDialogOpen(true);
    }
  };
  
  // Go to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      
      // Restore previous answer if exists
      const prevAnswer = answers.find(a => a.questionId === quiz.questions[currentQuestionIndex - 1].id);
      setSelectedOption(prevAnswer ? prevAnswer.selectedOptionIndex : null);
    }
  };
  
  // Submit the quiz
  const submitQuiz = () => {
    // Calculate score
    const score = answers.reduce((total, answer) => {
      if (answer.isCorrect) {
        const question = quiz.questions.find(q => q.id === answer.questionId);
        return total + (question ? question.points : 0);
      }
      return total;
    }, 0);
    
    const maxScore = quiz.questions.reduce((total, question) => total + question.points, 0);
    const quizTimeLimit = quiz.timeLimit || 15; // Default to 15 minutes if timeLimit is undefined
    
    // In a real app, we would send this data to the server
    const quizAttempt = {
      id: Date.now().toString(),
      userId: "user123", // In a real app, this would be the actual user ID
      quizId: quiz.id,
      score,
      maxScore,
      completedAt: new Date(),
      answers,
      timeSpent: quizTimeLimit * 60 - timeLeft
    };
    
    console.log("Quiz submitted:", quizAttempt);
    
    setIsQuizSubmitted(true);
    setIsSubmitDialogOpen(false);
    setIsTimeUpDialogOpen(false);
    
    // Redirect to results page
    router.push(`/quizzes/${quizId}/results?score=${score}&maxScore=${maxScore}`);
  };
  
  return (
    <div className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Quiz header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-primary" />
              <span className="font-mono font-medium">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-muted-foreground">
              {quiz.difficulty} • {quiz.category}
            </span>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>
        
        {/* Question card */}
        <Card className="p-6 mb-8">
          <div className="mb-6">
            <p className="text-lg font-medium mb-6">
              {currentQuestion.text}
            </p>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  className={`p-4 border rounded-md cursor-pointer flex items-center gap-3 hover:border-primary/50 transition-colors ${
                    selectedOption === index ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <div className={`w-6 h-6 rounded-full border ${
                    selectedOption === index ? 'border-primary bg-primary text-white' : ''
                  } flex items-center justify-center`}>
                    <span className="text-sm">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          <Button onClick={goToNextQuestion}>
            {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
      
      {/* Submit confirmation dialog */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Quiz</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your answers? You won't be able to change them afterward.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Questions Answered:</span>
              <span>{answers.length} of {totalQuestions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Time Remaining:</span>
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
              Continue Quiz
            </Button>
            <Button onClick={submitQuiz}>
              Submit Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Time up dialog */}
      <Dialog open={isTimeUpDialogOpen} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Time's Up!</DialogTitle>
            <DialogDescription>
              Your time for this quiz has expired. Your answers will be submitted automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-6">
            <Timer className="h-16 w-16 text-destructive" />
          </div>
          <DialogFooter>
            <Button onClick={submitQuiz}>
              Submit Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 