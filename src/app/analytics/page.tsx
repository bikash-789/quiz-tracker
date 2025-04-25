"use client";

import { Navbar } from "@/components/Navbar";
import { PerformanceChart } from "@/components/analytics/PerformanceChart";
import { CategoryDistribution } from "@/components/analytics/CategoryDistribution";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_QUIZ_ATTEMPTS, MOCK_USER_STATS } from "@/lib/constants";
import { useMemo, useState } from "react";
import { 
  BarChart3, 
  Clock, 
  Download, 
  Filter, 
  PieChart, 
  Target, 
  Calendar 
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<string>("all");
  
  // Filter quiz attempts based on time range
  const filteredAttempts = useMemo(() => {
    if (timeRange === "all") {
      return MOCK_QUIZ_ATTEMPTS;
    }
    
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (timeRange) {
      case "week":
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case "month":
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case "quarter":
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      default:
        return MOCK_QUIZ_ATTEMPTS;
    }
    
    return MOCK_QUIZ_ATTEMPTS.filter(
      attempt => attempt.completedAt >= cutoffDate
    );
  }, [timeRange]);
  
  // Calculate stats for filtered attempts
  const stats = useMemo(() => {
    if (!filteredAttempts.length) {
      return { 
        totalAttempts: 0, 
        avgScore: 0, 
        avgTime: 0,
        highestScore: 0
      };
    }
    
    const totalScore = filteredAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
    const totalTime = filteredAttempts.reduce((sum, attempt) => sum + attempt.timeSpent, 0);
    const highestScore = Math.max(...filteredAttempts.map(attempt => attempt.score));
    
    return {
      totalAttempts: filteredAttempts.length,
      avgScore: Math.round(totalScore / filteredAttempts.length),
      avgTime: Math.round(totalTime / filteredAttempts.length),
      highestScore
    };
  }, [filteredAttempts]);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-10 px-4 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Track your learning progress and identify areas for improvement
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 w-full md:w-auto flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Attempts</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAttempts}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {MOCK_USER_STATS.improvementRate > 0 ? '+' : ''}
                {MOCK_USER_STATS.improvementRate}% from previous period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgScore}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.highestScore}% highest score
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.floor(stats.avgTime / 60)}m {stats.avgTime % 60}s
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Per quiz attempt
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_USER_STATS.learningStreak} days</div>
              <p className="text-xs text-muted-foreground mt-1">
                Last active: {new Date().toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <PerformanceChart />
          <CategoryDistribution />
        </div>
        
        {/* Improvement Areas */}
        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Detailed Insights</CardTitle>
                <CardDescription>
                  Specific areas where you can improve your knowledge
                </CardDescription>
              </div>
              <Download className="h-5 w-5 text-muted-foreground cursor-pointer" />
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-medium mb-3">Top Improvement Areas</h4>
                  <div className="space-y-4">
                    {Object.entries(MOCK_USER_STATS.weaknessByCategory)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([category, percentage]) => (
                        <div key={category} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{category}</span>
                            <span className="text-sm text-muted-foreground">{percentage}% incorrect</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div 
                              className="h-full rounded-full bg-destructive" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Recommended Actions</h4>
                  <ul className="space-y-2">
                    {MOCK_USER_STATS.recommendedTopics.map((topic, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-primary w-5 h-5 flex items-center justify-center text-xs text-primary-foreground shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span>Review {topic} materials and take practice quizzes</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 