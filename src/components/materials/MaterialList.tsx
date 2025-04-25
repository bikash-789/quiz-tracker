"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MaterialSource } from "@/lib/types";
import { MOCK_MATERIAL_SOURCES } from "@/lib/constants";
import { FileText, Image as ImageIcon, Globe, Video, Trash, PlusCircle, FileQuestion } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function MaterialList() {
  const [materials, setMaterials] = useState<MaterialSource[]>(MOCK_MATERIAL_SOURCES);
  
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
  
  const handleDelete = (id: string) => {
    setMaterials(materials.filter(material => material.id !== id));
  };
  
  const handleCreateQuiz = (id: string) => {
    console.log(`Creating quiz from material ${id}`);
    // Here we would navigate to quiz creation page with the material id
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Learning Materials</h2>
        <span className="text-sm text-muted-foreground">{materials.length} total</span>
      </div>
      
      {materials.length === 0 ? (
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">You haven't uploaded any learning materials yet.</p>
          <Button>Upload Your First Material</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <Card key={material.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {getMaterialIcon(material.type)}
                  </div>
                  <CardTitle className="text-lg">{material.name}</CardTitle>
                </div>
                <CardDescription>
                  Uploaded {formatDistanceToNow(new Date(material.uploadedAt), { addSuffix: true })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {material.type === "text" && material.content && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {material.content}
                  </p>
                )}
                {material.type === "image" && material.imageUrl && (
                  <div className="relative h-40 rounded overflow-hidden">
                    <img 
                      src={material.imageUrl} 
                      alt={material.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                {material.type === "document" && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Document file</span>
                  </div>
                )}
                {material.type === "website" && material.webUrl && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <a 
                      href={material.webUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="truncate hover:underline"
                    >
                      {material.webUrl}
                    </a>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDelete(material.id)}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleCreateQuiz(material.id)}
                >
                  <FileQuestion className="h-4 w-4 mr-1" />
                  Create Quiz
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 