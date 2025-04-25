"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MATERIAL_TYPES } from "@/lib/constants";
import { Upload, FileText, Image as ImageIcon, Globe, Video, ArrowRight } from "lucide-react";

export function MaterialUploadForm() {
  const [materialType, setMaterialType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log({
        type: materialType,
        name,
        content,
        file,
        url
      });
      setIsSubmitting(false);
      resetForm();
    }, 1500);
  };

  const resetForm = () => {
    setMaterialType("");
    setName("");
    setContent("");
    setFile(null);
    setUrl("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Learning Material</CardTitle>
        <CardDescription>
          Add new material to generate quizzes from. You can upload documents, images, or paste text.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Material Name
            </label>
            <Input 
              id="name" 
              placeholder="E.g., Introduction to Neural Networks" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="material-type" className="text-sm font-medium">
              Material Type
            </label>
            <Select value={materialType} onValueChange={setMaterialType} required>
              <SelectTrigger id="material-type">
                <SelectValue placeholder="Select material type" />
              </SelectTrigger>
              <SelectContent>
                {MATERIAL_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {materialType === "text" && (
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Text Content
              </label>
              <Textarea 
                id="content" 
                placeholder="Paste your text content here..." 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px]"
                required
              />
            </div>
          )}
          
          {(materialType === "document" || materialType === "image") && (
            <div className="space-y-2">
              <label htmlFor="file" className="text-sm font-medium">
                Upload File
              </label>
              <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2">
                {materialType === "document" ? <FileText className="h-8 w-8 text-muted-foreground" /> 
                  : materialType === "image" ? <ImageIcon className="h-8 w-8 text-muted-foreground" /> 
                  : <Upload className="h-8 w-8 text-muted-foreground" />}
                
                <p className="text-sm text-muted-foreground">
                  {file ? file.name : "Drag and drop or click to upload"}
                </p>
                
                <Input 
                  id="file" 
                  type="file" 
                  className="hidden"
                  onChange={handleFileChange}
                  accept={materialType === "document" ? ".pdf,.docx,.txt" : ".jpg,.jpeg,.png,.gif"}
                  required
                />
                
                <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById("file")?.click()}>
                  Select File
                </Button>
              </div>
            </div>
          )}
          
          {(materialType === "website" || materialType === "video") && (
            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium">
                {materialType === "website" ? "Website URL" : "Video URL"}
              </label>
              <div className="flex items-center gap-2">
                {materialType === "website" ? <Globe className="h-4 w-4 text-muted-foreground" /> : 
                  <Video className="h-4 w-4 text-muted-foreground" />}
                <Input 
                  id="url" 
                  placeholder={materialType === "website" ? "https://example.com" : "https://youtube.com/watch?v=..."}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetForm} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload Material"}
          {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
} 