"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_REMINDERS } from "@/lib/constants";
import { StudyReminder } from "@/lib/types";
import { CheckCircle, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export function RemindersList() {
  const [reminders, setReminders] = useState<StudyReminder[]>(MOCK_REMINDERS);
  
  const markAsCompleted = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, isCompleted: true } : reminder
    ));
  };
  
  // Priority icon and styling
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-rose-500" />;
      case "medium":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "low":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };
  
  // Filter active reminders
  const activeReminders = reminders.filter(reminder => !reminder.isCompleted);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Study Reminders</CardTitle>
            <CardDescription>
              Based on your performance and study patterns
            </CardDescription>
          </div>
          {activeReminders.length > 0 && (
            <div className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium min-w-[4.5rem] text-center">
              {activeReminders.length} active
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {activeReminders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CheckCircle className="h-10 w-10 text-muted-foreground mb-3" />
            <h3 className="font-medium mb-1">All caught up!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You have no active study reminders at the moment.
            </p>
            <Button size="sm">Schedule Study Session</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {activeReminders.map(reminder => (
              <div 
                key={reminder.id} 
                className="flex items-start gap-3 p-3 rounded-lg border"
              >
                <div className="pt-0.5">
                  {getPriorityIcon(reminder.priority)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{reminder.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(reminder.scheduledFor), "MMM d")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {reminder.message}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {reminder.relatedTopics.map(topic => (
                      <span 
                        key={topic} 
                        className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="shrink-0 mt-1"
                  onClick={() => markAsCompleted(reminder.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Complete
                </Button>
              </div>
            ))}
            
            <div className="pt-2 text-center">
              <Button variant="link" size="sm" className="text-muted-foreground">
                View All Reminders
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 