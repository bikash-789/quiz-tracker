"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DIFFICULTY_LEVELS, MOCK_MATERIAL_SOURCES, QUIZ_CATEGORIES } from "@/lib/constants";
import { FileText, Image as ImageIcon, Globe, Video, Sparkles, Loader2 } from "lucide-react";
import { MaterialSource } from "@/lib/types";

export function QuizGenerator() {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSource | null>(null);
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  const getMaterialIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5" />;
      case "image":
        return <ImageIcon className="h-5 w-5" />;
      case "website":
        return <Globe className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  const handleGenerate = () => {
    if (!selectedMaterial || !title || !category || !difficulty) {
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call to generate quiz
    setTimeout(() => {
      console.log({
        material: selectedMaterial,
        title,
        category,
        difficulty,
        questionCount,
        customPrompt
      });
      
      setIsGenerating(false);
      
      // Here you would redirect to the newly created quiz
    }, 3000);
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Generate AI Quiz</CardTitle>
        <CardDescription>
          Create a custom quiz based on your learning materials
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Step 1: Select Learning Material</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MOCK_MATERIAL_SOURCES.map((material) => (
              <div
                key={material.id}
                className={`border rounded-lg p-3 cursor-pointer transition-colors hover:border-primary ${
                  selectedMaterial?.id === material.id 
                    ? "border-primary bg-primary/5" 
                    : ""
                }`}
                onClick={() => setSelectedMaterial(material)}
              >
                <div className="flex items-start gap-2">
                  <div className={`p-2 rounded-full ${selectedMaterial?.id === material.id ? "bg-primary/10" : "bg-muted"}`}>
                    {getMaterialIcon(material.type)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium text-sm truncate">{material.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {material.type}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Step 2: Quiz Details</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm">Quiz Title</label>
              <Input 
                id="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Introduction to Neural Networks"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {QUIZ_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="difficulty" className="text-sm">Difficulty</label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTY_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="question-count" className="text-sm">Number of Questions</label>
              <div className="flex items-center gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuestionCount(Math.max(5, questionCount - 5))}
                >
                  -
                </Button>
                <Input 
                  id="question-count" 
                  type="number" 
                  min={5} 
                  max={30} 
                  value={questionCount}
                  onChange={(e) => setQuestionCount(parseInt(e.target.value) || 10)}
                  className="text-center"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuestionCount(Math.min(30, questionCount + 5))}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Step 3: Custom Prompt (Optional)</h3>
            <span className="text-xs text-muted-foreground">
              {customPrompt.length}/250
            </span>
          </div>
          <Textarea 
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value.slice(0, 250))}
            placeholder="Add specific instructions for generating the quiz, e.g., 'Focus on neural network architectures' or 'Include questions about backpropagation'"
            className="min-h-[100px] resize-none"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-3">
        <Button variant="outline" disabled={isGenerating}>
          Cancel
        </Button>
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || !selectedMaterial || !title || !category || !difficulty}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Quiz
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
} 