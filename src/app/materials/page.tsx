"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialUploadForm } from "@/components/materials/MaterialUploadForm";
import { MaterialList } from "@/components/materials/MaterialList";
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload } from "lucide-react";

export default function MaterialsPage() {
  const [activeTab, setActiveTab] = useState<string>("materials");
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-10 px-4 mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Learning Materials</h1>
            <p className="text-muted-foreground">
              Manage your learning materials and create quizzes
            </p>
          </div>
          
          {activeTab === "materials" && (
            <Button 
              className="mt-4 sm:mt-0"
              onClick={() => setActiveTab("upload")}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Material
            </Button>
          )}
        </div>
        
        <Tabs 
          defaultValue="materials" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="materials">My Materials</TabsTrigger>
            <TabsTrigger value="upload">Upload Material</TabsTrigger>
          </TabsList>
          
          <TabsContent value="materials">
            <MaterialList />
          </TabsContent>
          
          <TabsContent value="upload">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center bg-primary/10 rounded-full p-3 mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Upload Learning Material</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Add your learning materials to generate AI-powered quizzes and track your progress
                </p>
              </div>
              
              <MaterialUploadForm />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
} 