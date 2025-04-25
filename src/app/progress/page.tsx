"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressStats } from "@/components/dashboard/ProgressStats";
import { WeaknessChart } from "@/components/dashboard/WeaknessChart";
import { MOCK_QUIZ_ATTEMPTS, MOCK_QUIZ_DATA, MOCK_USER, QUIZ_CATEGORIES } from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Download, 
  FileText, 
  FilterIcon, 
  Star, 
  Trophy,
  ChevronLeft,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const MOCK_USER_STATS = {
    quizzesAttempted: 3,
    quizzesCompleted: 3,
    averageScore: 71.7,
    totalPointsEarned: 215,
    quizzesByCategory: {
      "Machine Learning": 1,
      "Deep Learning": 1,
      "Computer Vision": 1
    },
    recentAttempts: [],
    learningStreak: 5,
    improvementRate: -12.5, 
    weaknessByCategory: {
      "Computer Vision": 40,
      "Deep Learning": 30,
      "Machine Learning": 15
    },
    recommendedTopics: ["CNNs", "Computer Vision Fundamentals", "Neural Network Architectures"]
}; 

export default function ProgressPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const filteredAttempts = selectedCategory === "all" 
    ? MOCK_QUIZ_ATTEMPTS 
    : MOCK_QUIZ_ATTEMPTS.filter(attempt => {
        const quiz = MOCK_QUIZ_DATA.find(q => q.id === attempt.quizId);
        return quiz?.category === selectedCategory;
      });
  
  const sortedAttempts = [...filteredAttempts].sort(
    (a, b) => b.completedAt.getTime() - a.completedAt.getTime()
  );
  
  const calculateLevel = () => {
    const points = MOCK_USER_STATS.totalPointsEarned;
    return Math.floor(points / 100) + 1;
  };
  
  const userLevel = calculateLevel();
  const progressToNextLevel = (MOCK_USER_STATS.totalPointsEarned % 100) / 100;
  
  const handleSwitchToListView = () => {
    const listTab = document.querySelector('[data-state="inactive"][value="list"]') as HTMLButtonElement | null;
    if (listTab) {
      listTab.click();
    }
  };
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };
  
  const getQuizAttemptsForDate = (date: Date) => {
    return sortedAttempts.filter(attempt => 
      isSameDay(new Date(attempt.completedAt), date)
    );
  };
  
  const getQuizForAttempt = (attempt: (typeof MOCK_QUIZ_ATTEMPTS)[0]) => {
    return MOCK_QUIZ_DATA.find(q => q.id === attempt.quizId);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-10 px-4 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Progress</h1>
            <p className="text-muted-foreground">
              Track your learning progress and review past quiz attempts
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
        
        <Card className="mb-8 overflow-hidden border-none shadow-md bg-gradient-to-r from-primary/5 via-background to-primary/5">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Level {userLevel}</h3>
                    <p className="text-sm text-muted-foreground">
                      AI Knowledge Explorer
                    </p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{MOCK_USER_STATS.totalPointsEarned} points</span>
                    <span>{100 - (MOCK_USER_STATS.totalPointsEarned % 100)} points to Level {userLevel + 1}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div 
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${progressToNextLevel * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-l p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-foreground">{userLevel}</div>
                  <Star className="h-6 w-6 text-yellow-500 mx-auto my-1" />
                  <p className="text-sm text-muted-foreground">Current Level</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-10">
          <ProgressStats />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <WeaknessChart />
          
          <Card className="col-span-1 border border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-background to-muted/20 border-b">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Top Achievements
              </CardTitle>
              <CardDescription>
                Your best performances and milestones
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="flex items-start gap-3 p-4 hover:bg-muted/10 transition-colors">
                  <div className="shrink-0 bg-yellow-100 text-yellow-700 p-2 rounded-full">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Highest Score</h4>
                    <p className="text-sm text-muted-foreground">
                      {Math.max(...MOCK_QUIZ_ATTEMPTS.map(a => a.score))}% on {
                        format(
                          MOCK_QUIZ_ATTEMPTS.sort((a, b) => b.score - a.score)[0].completedAt,
                          "MMM d, yyyy"
                        )
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 hover:bg-muted/10 transition-colors">
                  <div className="shrink-0 bg-blue-100 text-blue-700 p-2 rounded-full">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Current Streak</h4>
                    <p className="text-sm text-muted-foreground">
                      {MOCK_USER.learningStreak} days in a row
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 hover:bg-muted/10 transition-colors">
                  <div className="shrink-0 bg-green-100 text-green-700 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Completion Rate</h4>
                    <p className="text-sm text-muted-foreground">
                      100% of quizzes finished
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 hover:bg-muted/10 transition-colors">
                  <div className="shrink-0 bg-purple-100 text-purple-700 p-2 rounded-full">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Most Studied</h4>
                    <p className="text-sm text-muted-foreground">
                      {
                        Object.entries(
                          MOCK_QUIZ_ATTEMPTS.reduce((acc: Record<string, number>, attempt) => {
                            const quiz = MOCK_QUIZ_DATA.find(q => q.id === attempt.quizId);
                            if (quiz) {
                              acc[quiz.category] = (acc[quiz.category] || 0) + 1;
                            }
                            return acc;
                          }, {})
                        ).sort((a, b) => b[1] - a[1])[0][0]
                      }
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="border border-border/40 shadow-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-background to-muted/20 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Quiz History
                </CardTitle>
                <CardDescription>
                  Review your past quiz attempts and results
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <FilterIcon className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {QUIZ_CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" className="w-full mt-4">
              <TabsList className="mb-6 w-full sm:w-auto">
                <TabsTrigger value="list" className="flex-1 sm:flex-initial">
                  <FileText className="h-4 w-4 mr-2" />
                  List View
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex-1 sm:flex-initial">
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar View
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="list">
                <div className="space-y-6">
                  {sortedAttempts.length === 0 ? (
                    <div className="text-center py-16 bg-muted/5 rounded-lg border border-dashed">
                      <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                        <Activity className="h-8 w-8 text-primary/80" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No quiz attempts found</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                        Try a different category filter or take some quizzes to see your progress here.
                      </p>
                      <Button asChild>
                        <a href="/quizzes">Explore Quizzes</a>
                      </Button>
                    </div>
                  ) : (
                    sortedAttempts.map((attempt, index) => {
                      const quiz = getQuizForAttempt(attempt);
                      return (
                        <div key={attempt.id} className={`rounded-lg border overflow-hidden ${index % 2 === 0 ? 'bg-background' : 'bg-muted/5'}`}>
                          <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
                            <div className="flex items-start gap-4 mb-4 md:mb-0">
                              <div className={`p-3 rounded-full ${
                                attempt.score >= 80 ? "bg-green-100 text-green-700" :
                                attempt.score >= 60 ? "bg-yellow-100 text-yellow-700" :
                                "bg-red-100 text-red-700"
                              }`}>
                                <Trophy className="h-5 w-5" />
                              </div>
                              
                              <div>
                                <h4 className="font-medium">
                                  {quiz?.title || `Quiz ${attempt.quizId}`}
                                </h4>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {format(new Date(attempt.completedAt), "MMM d, yyyy")}
                                  </div>
                                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                    {quiz?.category}
                                  </span>
                                  <span className="text-xs bg-secondary/10 text-secondary-foreground px-2 py-0.5 rounded-full">
                                    {quiz?.difficulty}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 bg-muted/10 p-3 rounded-md">
                              <div className="text-center">
                                <div className={`text-2xl font-bold ${
                                  attempt.score >= 80 ? "text-green-600" : 
                                  attempt.score >= 60 ? "text-yellow-600" : 
                                  "text-red-600"
                                }`}>
                                  {attempt.score}%
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                  <Star className="h-3 w-3" />
                                  Score
                                </div>
                              </div>
                              
                              <div className="text-center">
                                <div className="text-2xl font-bold">
                                  {Math.floor(attempt.timeSpent / 60)}:{(attempt.timeSpent % 60).toString().padStart(2, '0')}
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Time
                                </div>
                              </div>
                              
                              <div className="text-center">
                                <div className="text-2xl font-bold">
                                  {attempt.answers.filter(a => a.isCorrect).length}/{attempt.answers.length}
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                  <CheckCircle className="h-3 w-3" />
                                  Correct
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-2 bg-muted/5 border-t flex justify-end">
                            <Button variant="ghost" size="sm">View Details</Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="calendar">
                <div className="border rounded-lg bg-muted/5 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">
                        {format(currentMonth, 'MMMM yyyy')}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Button 
                          onClick={prevMonth}
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button 
                          onClick={nextMonth}
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="p-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {(() => {
                        // Generate days for calendar view
                        const monthStart = startOfMonth(currentMonth);
                        const monthEnd = endOfMonth(monthStart);
                        const startDate = startOfWeek(monthStart);
                        const endDate = endOfWeek(monthEnd);
                        
                        const dateRange = eachDayOfInterval({
                          start: startDate,
                          end: endDate
                        });
                        
                        return dateRange.map((day, i) => {
                          const quizAttempts = getQuizAttemptsForDate(day);
                          const hasAttempts = quizAttempts.length > 0;
                          const isCurrentMonth = isSameMonth(day, monthStart);
                          const isSelected = selectedDate && isSameDay(day, selectedDate);
                          
                          return (
                            <div
                              key={i}
                              onClick={() => onDateClick(day)}
                              className={`
                                relative min-h-[80px] p-1 border rounded-md cursor-pointer
                                ${isCurrentMonth ? 'bg-background' : 'bg-muted/20 text-muted-foreground'}
                                ${isSelected ? 'ring-2 ring-primary' : ''}
                                ${hasAttempts ? 'hover:bg-primary/5' : 'hover:bg-muted/10'}
                              `}
                            >
                              <div className="flex justify-between items-start">
                                <span className="text-sm">{format(day, 'd')}</span>
                                {hasAttempts && (
                                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                                )}
                              </div>
                              
                              {hasAttempts && (
                                <div className="mt-1">
                                  {quizAttempts.length > 1 ? (
                                    <div className="text-xs font-medium text-primary">
                                      {quizAttempts.length} quizzes
                                    </div>
                                  ) : (
                                    <div className="text-xs text-muted-foreground truncate">
                                      {(() => {
                                        const quiz = getQuizForAttempt(quizAttempts[0]);
                                        const title = quiz?.title || `Quiz ${quizAttempts[0].quizId}`;
                                        return title.length > 15 ? `${title.substring(0, 15)}...` : title;
                                      })()}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                  
                  <div className="border-t p-4">
                    {selectedDate ? (
                      <div>
                        <h3 className="font-medium mb-2">
                          Quizzes on {format(selectedDate, 'MMMM d, yyyy')}
                        </h3>
                        <div className="space-y-3">
                          {getQuizAttemptsForDate(selectedDate).length === 0 ? (
                            <p className="text-muted-foreground text-sm">No quizzes attempted on this date.</p>
                          ) : (
                            getQuizAttemptsForDate(selectedDate).map(attempt => {
                              const quiz = getQuizForAttempt(attempt);
                              return (
                                <div key={attempt.id} className="rounded-lg border p-3 bg-background">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className={`p-2 rounded-full ${
                                        attempt.score >= 80 ? "bg-green-100 text-green-700" :
                                        attempt.score >= 60 ? "bg-yellow-100 text-yellow-700" :
                                        "bg-red-100 text-red-700"
                                      }`}>
                                        <Trophy className="h-4 w-4" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-sm">{quiz?.title || `Quiz ${attempt.quizId}`}</h4>
                                        <div className="flex gap-2 mt-1">
                                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                            {quiz?.category}
                                          </span>
                                          <span className="text-xs bg-secondary/10 text-secondary-foreground px-2 py-0.5 rounded-full">
                                            {quiz?.difficulty}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className={`text-lg font-bold ${
                                      attempt.score >= 80 ? "text-green-600" : 
                                      attempt.score >= 60 ? "text-yellow-600" : 
                                      "text-red-600"
                                    }`}>
                                      {attempt.score}%
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <HelpCircle className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Select a date to view your quiz activity</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

