"use client";

import { Navbar } from "@/components/Navbar";
import { ProgressStats } from "@/components/dashboard/ProgressStats";
import { WeaknessChart } from "@/components/dashboard/WeaknessChart";
import { RemindersList } from "@/components/dashboard/RemindersList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_QUIZ_ATTEMPTS, MOCK_USER } from "@/lib/constants";
import { BookOpen, Calendar, CheckCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
  // Get recent activities from quiz attempts
  const recentActivities = [...MOCK_QUIZ_ATTEMPTS]
    .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
    .slice(0, 5);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-10 px-4 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {MOCK_USER.name.split(' ')[0]}
            </h1>
            <p className="text-muted-foreground">
              Track your progress and continue learning
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date().toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
        
        <div className="mb-10">
          <ProgressStats />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <WeaknessChart />
          
          <RemindersList />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest quiz attempts and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentActivities.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You haven't attempted any quizzes yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {recentActivities.map((attempt) => {
                    const quiz = MOCK_QUIZ_ATTEMPTS.find(q => q.quizId === attempt.quizId);
                    return (
                      <div key={attempt.id} className="flex items-start gap-4">
                        <div className="bg-muted rounded-full p-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">
                              Completed "{quiz ? quiz.id : attempt.quizId}" Quiz
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(attempt.completedAt), { addSuffix: true })}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-6">
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Score: <strong>{attempt.score}%</strong>
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Time: <strong>{Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s</strong>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Quizzes</CardTitle>
              <CardDescription>
                Quizzes recommended for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <h4 className="font-medium">Computer Vision Basics</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your weaknesses in CNN and Computer Vision topics
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      Beginner
                    </span>
                    <span className="text-xs text-muted-foreground">10 questions</span>
                  </div>
                </div>
                
                <div className="rounded-lg border p-3">
                  <h4 className="font-medium">Neural Network Architectures</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Recommended for your upcoming learning path
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      Intermediate
                    </span>
                    <span className="text-xs text-muted-foreground">8 questions</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 