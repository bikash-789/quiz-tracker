"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_USER_STATS } from "@/lib/constants";

export function WeaknessChart() {
  const { weaknessByCategory } = MOCK_USER_STATS;
  
  // Sort categories by weakness score (highest first)
  const sortedCategories = Object.entries(weaknessByCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([category, score]) => ({ category, score }));
  
  // Find the maximum score for relative scaling
  const maxScore = Math.max(...Object.values(weaknessByCategory));
  
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Areas for Improvement</CardTitle>
        <CardDescription>
          Your performance across different categories, showing where to focus your study efforts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedCategories.map(({ category, score }) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{category}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {score}% mistakes
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div 
                  className="h-full rounded-full bg-primary" 
                  style={{ width: `${(score / maxScore) * 100}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 border-t pt-6">
          <h4 className="font-medium mb-3">Recommended Topics to Study</h4>
          <ul className="space-y-1">
            {MOCK_USER_STATS.recommendedTopics.map(topic => (
              <li key={topic} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 