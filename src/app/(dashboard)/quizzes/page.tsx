"use client";

import { useState, useEffect } from "react";
import { QuizCard } from "@/components/quiz/QuizCard";
import { DIFFICULTY_LEVELS, MOCK_QUIZ_DATA, QUIZ_CATEGORIES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function QuizzesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Local state for filters
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") || "all");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if (category && category !== "all") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    
    if (difficulty && difficulty !== "all") {
      params.set("difficulty", difficulty);
    } else {
      params.delete("difficulty");
    }
    
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  }, [category, difficulty, search, pathname, router, searchParams]);
  
  // Filter quizzes based on selected criteria
  const filteredQuizzes = MOCK_QUIZ_DATA.filter((quiz) => {
    // Filter by category if selected
    if (category && category !== "all" && quiz.category !== category) {
      return false;
    }
    
    // Filter by difficulty if selected
    if (difficulty && difficulty !== "all" && quiz.difficulty !== difficulty) {
      return false;
    }
    
    // Filter by search term if provided
    if (search && !quiz.title.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Handle filter changes
  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };
  
  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Quizzes</h1>
          <p className="text-muted-foreground text-lg">
            Browse our collection of AI quizzes to test and improve your knowledge
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search quizzes..."
              className="pl-9"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          
          <Select 
            value={category} 
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {QUIZ_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={difficulty} 
            onValueChange={handleDifficultyChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Difficulty Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulty Levels</SelectItem>
              {DIFFICULTY_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        {filteredQuizzes.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No quizzes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to find what you're looking for
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 