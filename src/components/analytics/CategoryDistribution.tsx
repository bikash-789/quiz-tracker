"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_USER_STATS } from "@/lib/constants";
import { useMemo } from "react";

export function CategoryDistribution() {
  const { quizzesByCategory } = MOCK_USER_STATS;
  const totalQuizzes = useMemo(() => {
    return Object.values(quizzesByCategory).reduce((sum, count) => sum + count, 0);
  }, [quizzesByCategory]);
  
  const categoryData = useMemo(() => {
    return Object.entries(quizzesByCategory)
      .map(([category, count]) => ({
        category,
        count,
        percentage: Math.round((count / totalQuizzes) * 100)
      }))
      .sort((a, b) => b.count - a.count);
  }, [quizzesByCategory, totalQuizzes]);
  
  const getCategoryColor = (index: number) => {
    const colors = [
      "bg-[#8884d8]",
      "bg-[#82ca9d]",
      "bg-[#ffc658]",
      "bg-[#ff8042]",
      "bg-[#0088fe]",
      "bg-[#00c49f]",
      "bg-[#ffbb28]",
      "bg-[#ff8042]"
    ];
    return colors[index % colors.length];
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Attempts by Category</CardTitle>
        <CardDescription>
          Distribution of your quiz attempts across different AI topics
        </CardDescription>
      </CardHeader>
      <CardContent>
        {categoryData.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            No quiz attempts recorded yet.
          </p>
        ) : (
          <div className="space-y-8">
            <div className="relative flex justify-center">
              <div className="w-40 h-40 rounded-full border flex items-center justify-center">
                <div className="absolute inset-0">
                  {categoryData.map((item, index) => {
                    const previousPercentages = categoryData
                      .slice(0, index)
                      .reduce((sum, cat) => sum + cat.percentage, 0);
                    
                    return (
                      <div 
                        key={item.category}
                        className={`absolute inset-0 ${getCategoryColor(index)}`}
                        style={{
                          clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * previousPercentages / 100 - Math.PI/2)}% ${50 + 50 * Math.sin(2 * Math.PI * previousPercentages / 100 - Math.PI/2)}%, ${50 + 50 * Math.cos(2 * Math.PI * (previousPercentages + item.percentage) / 100 - Math.PI/2)}% ${50 + 50 * Math.sin(2 * Math.PI * (previousPercentages + item.percentage) / 100 - Math.PI/2)}%)`
                        }}
                      />
                    );
                  })}
                </div>
                <div className="z-10 text-center">
                  <div className="text-2xl font-bold">{totalQuizzes}</div>
                  <div className="text-xs text-muted-foreground">Total Quizzes</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {categoryData.map((item, index) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-sm ${getCategoryColor(index)}`}></div>
                  <div className="text-sm flex-1">{item.category}</div>
                  <div className="text-sm font-medium">{item.count} ({item.percentage}%)</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 