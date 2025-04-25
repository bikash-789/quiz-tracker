"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MOCK_USER_STATS } from "@/lib/constants";
import { ArrowDownIcon, ArrowUpIcon, BarChart, Clock, Award, Target } from "lucide-react";

export function ProgressStats() {
  const stats = MOCK_USER_STATS;
  const getTrendIcon = () => {
    if (stats.improvementRate > 0) {
      return (
        <div className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
          <ArrowUpIcon className="mr-1 h-3 w-3" />
          {Math.abs(stats.improvementRate)}%
        </div>
      );
    } else if (stats.improvementRate < 0) {
      return (
        <div className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-700">
          <ArrowDownIcon className="mr-1 h-3 w-3" />
          {Math.abs(stats.improvementRate)}%
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
          Stable
        </div>
      );
    }
  };
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageScore.toFixed(1)}%</div>
          <div className="mt-1 flex items-center gap-1">
            {getTrendIcon()}
            <p className="text-xs text-muted-foreground">from previous month</p>
          </div>
          <Progress className="mt-4" value={stats.averageScore} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-1">
            <div className="text-2xl font-bold">{stats.quizzesCompleted}</div>
            <span className="text-sm text-muted-foreground">/ {stats.quizzesAttempted}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {((stats.quizzesCompleted / stats.quizzesAttempted) * 100).toFixed(0)}% completion rate
          </p>
          <Progress 
            className="mt-4" 
            value={(stats.quizzesCompleted / stats.quizzesAttempted) * 100} 
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.learningStreak} days</div>
          <p className="text-xs text-muted-foreground mt-1">
            Keep it up for rewards!
          </p>
          <div className="mt-4 flex space-x-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div 
                key={i}
                className={`h-2 w-full rounded-full ${
                  i < stats.learningStreak % 7 ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Points</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPointsEarned}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Earn 100 more for next level
          </p>
          <Progress 
            className="mt-4" 
            value={(stats.totalPointsEarned % 500) / 5} 
          />
        </CardContent>
      </Card>
    </div>
  );
} 