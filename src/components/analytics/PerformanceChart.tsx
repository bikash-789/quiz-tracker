"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_QUIZ_ATTEMPTS } from "@/lib/constants";
import { useMemo } from "react";

export function PerformanceChart() {
  const chartData = useMemo(() => {
    const sortedAttempts = [...MOCK_QUIZ_ATTEMPTS].sort(
      (a, b) => a.completedAt.getTime() - b.completedAt.getTime()
    );
    
    return sortedAttempts.map((attempt) => ({
      id: attempt.id,
      date: attempt.completedAt,
      score: attempt.score,
      quizId: attempt.quizId,
    }));
  }, []);
  
  const maxHeight = 150;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Over Time</CardTitle>
        <CardDescription>
          Your quiz scores showing progress or areas needing improvement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-muted-foreground">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          
          <div className="ml-10 h-[200px] relative border-l border-b">
            <div className="absolute left-0 right-0 top-0 border-t border-dashed border-muted h-0"></div>
            <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-muted h-0"></div>
            <div className="absolute left-0 right-0 top-2/4 border-t border-dashed border-muted h-0"></div>
            <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-muted h-0"></div>
            
            <div className="absolute inset-0 flex items-end justify-around p-4">
              {chartData.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  <div 
                    className="w-8 bg-primary rounded-t-sm"
                    style={{ 
                      height: `${(item.score / 100) * maxHeight}px`,
                      opacity: 0.7 + (0.3 * (item.score / 100))
                    }}
                  ></div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {item.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-center text-muted-foreground">
          {chartData.length === 0 ? (
            <p>No quiz attempts yet. Take some quizzes to see your performance.</p>
          ) : (
            <p>
              {chartData.length} quiz attempts | 
              Average score: {Math.round(chartData.reduce((sum, item) => sum + item.score, 0) / chartData.length)}%
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 