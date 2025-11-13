"use client"

import { useState } from "react"
import { 
  Activity, 
  UserPlus, 
  Edit, 
  Globe, 
  Award, 
  MessageSquare, 
  Calendar,
  Clock,
  Filter
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ActivityItem {
  id: string
  type: 'registration' | 'edit' | 'publish' | 'certificate' | 'announcement' | 'checkin'
  title: string
  description: string
  timestamp: string
  eventName?: string
  eventId?: string
  metadata?: Record<string, any>
}

const activityIcons = {
  registration: UserPlus,
  edit: Edit,
  publish: Globe,
  certificate: Award,
  announcement: MessageSquare,
  checkin: Calendar
}

const activityColors = {
  registration: 'text-green-600',
  edit: 'text-blue-600',
  publish: 'text-purple-600',
  certificate: 'text-yellow-600',
  announcement: 'text-orange-600',
  checkin: 'text-indigo-600'
}

interface RecentActivityProps {
  eventId?: string
  limit?: number
}

export function RecentActivity({ eventId, limit = 10 }: RecentActivityProps) {
  const [filter, setFilter] = useState<string>('all')
  
  // Mock data - replace with actual API call
  const [activities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'registration',
      title: '15 new registrations',
      description: 'New attendees registered in the last 2 hours',
      timestamp: '2024-10-26T14:30:00Z',
      eventName: 'Tech Conference 2024',
      eventId: '1',
      metadata: { count: 15 }
    },
    {
      id: '2',
      type: 'edit',
      title: 'Event details updated',
      description: 'Updated venue information and schedule',
      timestamp: '2024-10-26T12:15:00Z',
      eventName: 'Tech Conference 2024',
      eventId: '1'
    },
    {
      id: '3',
      type: 'publish',
      title: 'Microsite published',
      description: 'Event microsite is now live and accepting registrations',
      timestamp: '2024-10-26T10:45:00Z',
      eventName: 'Design Workshop',
      eventId: '2'
    },
    {
      id: '4',
      type: 'certificate',
      title: 'Certificate template approved',
      description: 'Certificate design has been finalized and approved',
      timestamp: '2024-10-25T16:20:00Z',
      eventName: 'Tech Conference 2024',
      eventId: '1'
    },
    {
      id: '5',
      type: 'announcement',
      title: 'Announcement sent',
      description: 'Reminder about early bird pricing sent to 342 attendees',
      timestamp: '2024-10-25T09:30:00Z',
      eventName: 'Tech Conference 2024',
      eventId: '1',
      metadata: { recipients: 342 }
    },
    {
      id: '6',
      type: 'registration',
      title: 'Registration form updated',
      description: 'Added new custom fields for dietary preferences',
      timestamp: '2024-10-24T14:10:00Z',
      eventName: 'Design Workshop',
      eventId: '2'
    },
    {
      id: '7',
      type: 'checkin',
      title: 'Check-in system activated',
      description: 'QR code check-in is now available for attendees',
      timestamp: '2024-10-24T11:00:00Z',
      eventName: 'Workshop Series',
      eventId: '3'
    }
  ])

  const filteredActivities = activities
    .filter(activity => {
      if (eventId && activity.eventId !== eventId) return false
      if (filter !== 'all' && activity.type !== filter) return false
      return true
    })
    .slice(0, limit)

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    return time.toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              {eventId ? 'Latest updates for this event' : 'Latest updates across all events'}
            </CardDescription>
          </div>
          {!eventId && (
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="registration">Registrations</SelectItem>
                <SelectItem value="edit">Edits</SelectItem>
                <SelectItem value="publish">Publishing</SelectItem>
                <SelectItem value="certificate">Certificates</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
                <SelectItem value="checkin">Check-ins</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredActivities.map((activity) => {
            const Icon = activityIcons[activity.type]
            const colorClass = activityColors[activity.type]
            
            return (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-background border flex items-center justify-center ${colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTimeAgo(activity.timestamp)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity.description}
                  </p>
                  
                  {activity.eventName && !eventId && (
                    <Badge variant="outline" className="mt-2 text-xs">
                      {activity.eventName}
                    </Badge>
                  )}
                </div>
              </div>
            )
          })}
          
          {filteredActivities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>No recent activity to show</p>
            </div>
          )}
        </div>
        
        {filteredActivities.length > 0 && activities.length > limit && (
          <div className="mt-4 text-center">
            <Button variant="ghost" size="sm">
              View All Activity
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}