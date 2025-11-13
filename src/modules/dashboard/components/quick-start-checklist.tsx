"use client"

import { useState } from "react"
import { CheckCircle, Circle, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface ChecklistItem {
  id: string
  title: string
  description: string
  completed: boolean
  href?: string
  action?: string
}

interface QuickStartChecklistProps {
  eventId: string
  onDismiss?: () => void
}

export function QuickStartChecklist({ eventId, onDismiss }: QuickStartChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: 'basic-info',
      title: 'Complete Event Details',
      description: 'Add description, venue, and schedule',
      completed: true,
      href: `/dashboard/events/${eventId}/edit`,
      action: 'Edit Event'
    },
    {
      id: 'microsite',
      title: 'Setup Event Microsite',
      description: 'Choose how you want to present your event online',
      completed: false,
      href: `/dashboard/events/${eventId}/microsite`,
      action: 'Setup Microsite'
    },
    {
      id: 'registration',
      title: 'Configure Registration Form',
      description: 'Customize fields and settings for attendee registration',
      completed: false,
      href: `/dashboard/events/${eventId}/form`,
      action: 'Build Form'
    },
    {
      id: 'branding',
      title: 'Add Event Branding',
      description: 'Upload logo and customize colors',
      completed: false,
      href: `/dashboard/events/${eventId}/edit#branding`,
      action: 'Add Branding'
    },
    {
      id: 'publish',
      title: 'Publish Your Event',
      description: 'Make your event live and start accepting registrations',
      completed: false,
      href: `/dashboard/events/${eventId}#publish`,
      action: 'Publish Event'
    }
  ])

  const completedCount = items.filter(item => item.completed).length
  const totalCount = items.length
  const progressPercentage = (completedCount / totalCount) * 100

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  return (
    <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              🚀 Quick Start Checklist
            </CardTitle>
            <CardDescription>
              Complete these steps to get your event ready
            </CardDescription>
          </div>
          {onDismiss && (
            <Button variant="ghost" size="sm" onClick={onDismiss}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{completedCount} of {totalCount} completed</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-3 p-3 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="flex-shrink-0"
            >
              {item.completed ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            
            {!item.completed && item.href && (
              <Button variant="outline" size="sm" asChild>
                <Link href={item.href}>
                  {item.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        ))}
        
        {completedCount === totalCount && (
          <div className="text-center py-4 border-t">
            <div className="text-green-600 font-medium mb-2">
              🎉 Congratulations! Your event is ready to go live!
            </div>
            <Button asChild>
              <Link href={`/dashboard/events/${eventId}`}>
                View Event Dashboard
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}