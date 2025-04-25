import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Library, TimerIcon } from "lucide-react";
import Link from "next/link";
import { Quiz } from "@/lib/types";

interface QuizCardProps {
  quiz: Quiz;
  showStartButton?: boolean;
}

export function QuizCard({ quiz, showStartButton = true }: QuizCardProps) {
  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{quiz.title}</CardTitle>
            <CardDescription className="mt-2">
              {quiz.category}
            </CardDescription>
          </div>
          <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {quiz.difficulty}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground">{quiz.description}</p>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Library className="h-4 w-4" />
            <span>{quiz.questions.length} questions</span>
          </div>
          {quiz.timeLimit && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <TimerIcon className="h-4 w-4" />
              <span>{quiz.timeLimit} min</span>
            </div>
          )}
        </div>
      </CardContent>
      {showStartButton && (
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={`/quizzes/${quiz.id}`}>Start Quiz</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
} 