import { Quiz, QuizCategory, MaterialSource, StudyReminder, User, QuizAttempt, UserStats } from "../types";

export const QUIZ_CATEGORIES: QuizCategory[] = [
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Reinforcement Learning",
  "Data Science",
  "AI Ethics",
  "General AI"
];

export const DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" }
];

export const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/quizzes", label: "Quizzes" },
  { href: "/materials", label: "Materials" },
  { href: "/progress", label: "My Progress" },
  { href: "/analytics", label: "Analytics" },
  { href: "/profile", label: "Profile" }
];

export const MATERIAL_TYPES = [
  { value: "document", label: "Document" },
  { value: "text", label: "Text" },
  { value: "image", label: "Image" },
  { value: "website", label: "Website" },
  { value: "video", label: "Video" },
];

export const MOCK_MATERIAL_SOURCES: MaterialSource[] = [
  {
    id: "1",
    name: "Introduction to Machine Learning",
    type: "document",
    fileUrl: "/mock/docs/intro-to-ml.pdf",
    uploadedAt: new Date("2023-05-10"),
    userId: "user1"
  },
  {
    id: "2",
    name: "Neural Network Basics",
    type: "text",
    content: "Neural networks are a set of algorithms, modeled loosely after the human brain, that are designed to recognize patterns...",
    uploadedAt: new Date("2023-04-22"),
    userId: "user1"
  },
  {
    id: "3",
    name: "Convolutional Neural Network Architecture",
    type: "image",
    imageUrl: "/images/image.png",
    uploadedAt: new Date("2023-06-15"),
    userId: "user1"
  }
];

export const MOCK_REMINDERS: StudyReminder[] = [
  {
    id: "1",
    userId: "user1",
    title: "Review Neural Networks",
    message: "You've been struggling with neural network concepts. Take some time to review the basics.",
    scheduledFor: new Date(new Date().setDate(new Date().getDate() + 2)),
    isCompleted: false,
    relatedTopics: ["Neural Networks", "Deep Learning", "Backpropagation"],
    priority: "high"
  },
  {
    id: "2",
    userId: "user1",
    title: "Practice NLP Concepts",
    message: "It's been a while since you've practiced NLP concepts. Consider taking a quiz to refresh your knowledge.",
    scheduledFor: new Date(new Date().setDate(new Date().getDate() + 5)),
    isCompleted: false,
    relatedTopics: ["NLP", "Tokenization", "Embeddings"],
    priority: "medium"
  }
];

export const MOCK_QUIZ_DATA: Quiz[] = [
  {
    id: "1",
    title: "Machine Learning Fundamentals",
    description: "Test your knowledge of basic machine learning concepts and algorithms.",
    category: "Machine Learning",
    difficulty: "beginner" as const,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        quizId: "1",
        text: "Which of the following is NOT a type of machine learning?",
        options: [
          "Supervised Learning", 
          "Unsupervised Learning", 
          "Deterministic Learning", 
          "Reinforcement Learning"
        ],
        correctOptionIndex: 2,
        explanation: "Deterministic Learning is not a type of machine learning. The main types are Supervised, Unsupervised, Semi-supervised, and Reinforcement Learning.",
        points: 10,
        materialReference: "Page 4, Intro to ML"
      },
      {
        id: "q2",
        quizId: "1",
        text: "What does the 'gradient' refer to in gradient descent?",
        options: [
          "The slope of the loss function", 
          "The learning rate value", 
          "The difference between predicted and actual values", 
          "The weight initialization method"
        ],
        correctOptionIndex: 0,
        explanation: "The gradient refers to the slope of the loss function with respect to the parameters, indicating the direction of steepest ascent.",
        points: 10,
        materialReference: "Page 8, Intro to ML"
      }
    ],
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
    materialSource: MOCK_MATERIAL_SOURCES[0],
    tags: ["algorithms", "supervised", "basics"]
  },
  {
    id: "2",
    title: "Deep Learning Networks",
    description: "Explore your understanding of neural networks and deep learning architectures.",
    category: "Deep Learning",
    difficulty: "intermediate" as const,
    timeLimit: 20,
    questions: [
      {
        id: "q3",
        quizId: "2",
        text: "Which activation function outputs values between 0 and 1?",
        options: [
          "ReLU", 
          "Sigmoid", 
          "Tanh", 
          "Leaky ReLU"
        ],
        correctOptionIndex: 1,
        explanation: "The Sigmoid activation function maps input values to a range between 0 and 1, making it useful for binary classification output layers.",
        points: 15,
        materialReference: "Neural Network Basics, Paragraph 3"
      }
    ],
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-02-12"),
    materialSource: MOCK_MATERIAL_SOURCES[1],
    tags: ["neural networks", "activation functions"]
  },
  {
    id: "3",
    title: "Computer Vision Concepts",
    description: "Test your knowledge about computer vision algorithms and techniques.",
    category: "Computer Vision",
    difficulty: "advanced" as const,
    timeLimit: 25,
    questions: [
      {
        id: "q4",
        quizId: "3",
        text: "What is the main purpose of pooling layers in CNNs?",
        options: [
          "To add non-linearity", 
          "To reduce spatial dimensions", 
          "To extract features", 
          "To normalize values"
        ],
        correctOptionIndex: 1,
        explanation: "Pooling layers are used to reduce the spatial dimensions (width and height) of the input volume, which helps in reducing computation and controlling overfitting.",
        points: 20,
        materialReference: "CNN Architecture Image, Pooling Section"
      }
    ],
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date("2023-03-22"),
    materialSource: MOCK_MATERIAL_SOURCES[2],
    tags: ["CNN", "computer vision", "pooling"]
  }
];

export const MOCK_USER: User = {
  id: "user1",
  name: "Jane Smith",
  email: "jane.smith@example.com",
  image: "/mock/avatars/user1.png",
  quizAttempts: [],
  emailPreferences: {
    reminderFrequency: "weekly",
    mistakeReviewReminders: true,
    progressReports: true,
    newContentAlerts: true
  },
  learningStreak: 5,
  lastActive: new Date()
};

export const MOCK_QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: "attempt1",
    userId: "user1",
    quizId: "1",
    score: 85,
    maxScore: 100,
    completedAt: new Date("2023-06-01"),
    answers: [
      {
        questionId: "q1",
        selectedOptionIndex: 2,
        isCorrect: true,
        timeSpent: 45,
        confidence: "high"
      },
      {
        questionId: "q2",
        selectedOptionIndex: 0,
        isCorrect: true,
        timeSpent: 60,
        confidence: "medium"
      }
    ],
    timeSpent: 105,
    mistakeCategories: { "algorithms": 0, "terminology": 1 }
  },
  {
    id: "attempt2",
    userId: "user1",
    quizId: "2",
    score: 70,
    maxScore: 100,
    completedAt: new Date("2023-06-05"),
    answers: [
      {
        questionId: "q3",
        selectedOptionIndex: 1,
        isCorrect: true,
        timeSpent: 80,
        confidence: "medium"
      }
    ],
    timeSpent: 80,
    mistakeCategories: { "neural networks": 0 }
  },
  {
    id: "attempt3",
    userId: "user1",
    quizId: "3",
    score: 60,
    maxScore: 100,
    completedAt: new Date("2023-06-10"),
    answers: [
      {
        questionId: "q4",
        selectedOptionIndex: 2,
        isCorrect: false,
        timeSpent: 120,
        confidence: "low"
      }
    ],
    timeSpent: 120,
    mistakeCategories: { "CNN": 1 }
  }
];


MOCK_USER.quizAttempts = MOCK_QUIZ_ATTEMPTS;

export const MOCK_USER_STATS: UserStats = {
  quizzesAttempted: 3,
  quizzesCompleted: 3,
  averageScore: 71.7,
  totalPointsEarned: 215,
  quizzesByCategory: {
    "Machine Learning": 1,
    "Deep Learning": 1,
    "Computer Vision": 1
  },
  recentAttempts: MOCK_QUIZ_ATTEMPTS,
  learningStreak: 5,
  improvementRate: -12.5,
  weaknessByCategory: {
    "Computer Vision": 40,
    "Deep Learning": 30,
    "Machine Learning": 15
  },
  recommendedTopics: ["CNNs", "Computer Vision Fundamentals", "Neural Network Architectures"]
}; 