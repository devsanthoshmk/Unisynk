'use client'

import { useState } from 'react'
import { X, Info, AlertTriangle, CheckCircle, Megaphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Announcement {
  id: string
  message: string
  type: 'info' | 'warning' | 'success' | 'urgent'
  createdAt: string
}

interface LiveAnnouncementsProps {
  announcements: Announcement[]
}

const announcementConfig = {
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-900',
    badgeVariant: 'default' as const
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    badgeVariant: 'secondary' as const
  },
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 border-green-200 text-green-900',
    badgeVariant: 'default' as const
  },
  urgent: {
    icon: Megaphone,
    className: 'bg-red-50 border-red-200 text-red-900',
    badgeVariant: 'destructive' as const
  }
}

export function LiveAnnouncements({ announcements }: LiveAnnouncementsProps) {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())
  
  const visibleAnnouncements = announcements.filter(
    announcement => !dismissedIds.has(announcement.id)
  )
  
  const dismissAnnouncement = (id: string) => {
    setDismissedIds(prev => new Set([...prev, id]))
  }
  
  if (visibleAnnouncements.length === 0) {
    return null
  }
  
  return (
    <section className="py-4 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="space-y-3">
          {visibleAnnouncements.map((announcement) => {
            const config = announcementConfig[announcement.type]
            const Icon = config.icon
            
            return (
              <Card 
                key={announcement.id} 
                className={cn("border", config.className)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-grow">
                          <p className="font-medium leading-relaxed">
                            {announcement.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={config.badgeVariant} className="text-xs">
                              {announcement.type.toUpperCase()}
                            </Badge>
                            <span className="text-xs opacity-75">
                              {new Date(announcement.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-black/10"
                          onClick={() => dismissAnnouncement(announcement.id)}
                        >
                          <X className="w-4 h-4" />
                          <span className="sr-only">Dismiss announcement</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}