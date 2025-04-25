"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { MOCK_USER } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Camera, Shield, User as UserIcon } from "lucide-react";
import { EmailPreferences } from "@/lib/types";

export default function ProfilePage() {
  const user = MOCK_USER;
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [emailPreferences, setEmailPreferences] = useState<EmailPreferences>({
    reminderFrequency: user.emailPreferences.reminderFrequency,
    mistakeReviewReminders: user.emailPreferences.mistakeReviewReminders,
    progressReports: user.emailPreferences.progressReports,
    newContentAlerts: user.emailPreferences.newContentAlerts
  });
  
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleSaveProfile = () => {
    setIsUpdating(true);
    
    // simulate API call
    setTimeout(() => {
      console.log("Profile updated:", { name, email });
      setIsUpdating(false);
    }, 1000);
  };
  
  const handleUpdatePreferences = () => {
    setIsUpdating(true);        
    
    // simulate API call
    setTimeout(() => {
      console.log("Email preferences updated:", emailPreferences);
      setIsUpdating(false);
    }, 1000);
  };
  
  const getAvatarBackground = () => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500"];
    const hash = user.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-10 px-4 mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-3 pb-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-background shadow-md">
                  {user.image ? (
                    <AvatarImage src={user.image} alt={user.name} />
                  ) : (
                    <div className={`h-full w-full flex items-center justify-center ${getAvatarBackground()} text-white text-2xl font-semibold`}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1.5 rounded-full border-2 border-background">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg overflow-hidden">
              <div className="h-16 w-full bg-gradient-to-r from-primary/10 to-accent/10"></div>
              <div className="p-4">
                <div className="flex items-center gap-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Active Streak: {user.learningStreak} days</span>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Quizzes Completed: {user.quizAttempts.length}</span>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Joined: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="account">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <Card className="border border-border/40 shadow-sm">
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your account details and personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="profile-image" className="text-sm font-medium">
                        Profile Image
                      </label>
                      <div className="flex items-center gap-4">
                        <Avatar className="border border-muted">
                          {user.image ? (
                            <AvatarImage src={user.image} alt={user.name} />
                          ) : (
                            <div className={`h-full w-full flex items-center justify-center ${getAvatarBackground()} text-white font-semibold`}>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">Change Image</Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t bg-muted/5 p-6">
                    <Button onClick={handleSaveProfile} disabled={isUpdating}>
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card className="border border-border/40 shadow-sm">
                  <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                    <CardDescription>
                      Configure your email notification preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium">
                        Reminder Frequency
                      </label>
                      <Select 
                        value={emailPreferences.reminderFrequency} 
                        onValueChange={(val: "daily" | "weekly" | "monthly" | "never") => 
                          setEmailPreferences({...emailPreferences, reminderFrequency: val})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Email Updates</h4>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium" htmlFor="mistake-review">
                            Mistake Review Reminders
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Get reminders to review topics you've struggled with
                          </p>
                        </div>
                        <Switch 
                          id="mistake-review"
                          checked={emailPreferences.mistakeReviewReminders}
                          onCheckedChange={(checked: boolean) => 
                            setEmailPreferences({...emailPreferences, mistakeReviewReminders: checked})
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium" htmlFor="progress-reports">
                            Progress Reports
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Receive regular reports on your learning progress
                          </p>
                        </div>
                        <Switch 
                          id="progress-reports"
                          checked={emailPreferences.progressReports}
                          onCheckedChange={(checked: boolean) => 
                            setEmailPreferences({...emailPreferences, progressReports: checked})
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium" htmlFor="new-content">
                            New Content Alerts
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Get notified when new quizzes or materials are available
                          </p>
                        </div>
                        <Switch 
                          id="new-content"
                          checked={emailPreferences.newContentAlerts}
                          onCheckedChange={(checked: boolean) => 
                            setEmailPreferences({...emailPreferences, newContentAlerts: checked})
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t bg-muted/5 p-6">
                    <Button onClick={handleUpdatePreferences} disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Update Preferences"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card className="border border-border/40 shadow-sm">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your password and account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="current-password" className="text-sm font-medium">
                        Current Password
                      </label>
                      <Input id="current-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="new-password" className="text-sm font-medium">
                        New Password
                      </label>
                      <Input id="new-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirm-password" className="text-sm font-medium">
                        Confirm New Password
                      </label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t bg-muted/5 p-6">
                    <Button>Change Password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
} 