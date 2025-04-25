export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeLimit?: number; // in minutes
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
  materialSource?: MaterialSource; // Reference to the source material
  tags?: string[]; // For categorizing and filtering
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
  points: number;
  materialReference?: string; // Reference to specific part of material
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  quizAttempts: QuizAttempt[];
  emailPreferences: EmailPreferences;
  learningStreak: number; // Days in a row with quiz attempts
  lastActive: Date;
}

export interface EmailPreferences {
  reminderFrequency: "daily" | "weekly" | "monthly" | "never";
  mistakeReviewReminders: boolean;
  progressReports: boolean;
  newContentAlerts: boolean;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  maxScore: number;
  completedAt: Date;
  answers: Answer[];
  timeSpent: number; // in seconds
  mistakeCategories?: Record<string, number>; // Categories of mistakes for targeted review
}

export interface Answer {
  questionId: string;
  selectedOptionIndex: number;
  isCorrect: boolean;
  timeSpent?: number; // in seconds
  confidence?: "low" | "medium" | "high"; // Self-reported confidence
}

// Material source types
export interface MaterialSource {
  id: string;
  name: string;
  type: "document" | "text" | "image" | "website" | "video";
  content?: string; // For text content
  fileUrl?: string; // For uploaded files
  imageUrl?: string; // For images
  webUrl?: string; // For websites
  uploadedAt: Date;
  userId: string;
}

export type QuizCategory = 
  | "Machine Learning"
  | "Deep Learning"
  | "Natural Language Processing"
  | "Computer Vision"
  | "Reinforcement Learning"
  | "Data Science"
  | "AI Ethics"
  | "General AI";

export interface QuizStats {
  totalAttempts: number;
  averageScore: number;
  highestScore: number;
  averageTimeSpent: number; // in seconds
  completionRate: number; // percentage
  weakestTopics?: string[]; // Areas needing improvement
  strongestTopics?: string[]; // Areas of strength
}

export interface UserStats {
  quizzesAttempted: number;
  quizzesCompleted: number;
  averageScore: number;
  totalPointsEarned: number;
  quizzesByCategory: Record<string, number>;
  recentAttempts: QuizAttempt[];
  learningStreak: number;
  improvementRate: number; // Improvement over time percentage
  weaknessByCategory: Record<string, number>; // Weaknesses by category
  recommendedTopics: string[]; // Topics recommended to study
}

export interface StudyReminder {
  id: string;
  userId: string;
  title: string;
  message: string;
  scheduledFor: Date;
  isCompleted: boolean;
  relatedTopics: string[];
  priority: "low" | "medium" | "high";
} 