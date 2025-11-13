"use client"

import { 
  Eye,
  UserCheck,
  Award,
  HelpCircle,
  Megaphone,
  BarChart3,
  Settings,
  Share2,
  Download,
  Mail,
  Calendar,
  Users,
  FileText,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface QuickAction {
  id: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  onClick?: () => void
  external?: boolean
  color: string
  disabled?: boolean
  badge?: string
}

interface QuickActionsProps {
  eventId?: string
  organizationSlug?: string
  eventSlug?: string
  userRole?: 'organizer' | 'volunteer' | 'viewer' | 'admin'
  className?: string
}

export function QuickActions({ 
  eventId, 
  organizationSlug, 
  eventSlug, 
  userRole = 'organizer',
  className 
}: QuickActionsProps) {
  
  const getMicrositeUrl = () => {
    return `https://${organizationSlug}.unisynk.com/${eventSlug}`
  }

  // Define actions based on user role
  const getActionsForRole = (): QuickAction[] => {
    const baseActions: QuickAction[] = [
      {
        id: 'microsite',
        label: 'View Microsite',
        description: 'See your public event page',
        icon: Eye,
        href: getMicrositeUrl(),
        external: true,
        color: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
      },
      {
        id: 'analytics',
        label: 'View Analytics',
        description: 'Event insights and metrics',
        icon: BarChart3,
        href: `/dashboard/events/${eventId}/analytics`,
        color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
      }
    ]

    const organizerActions: QuickAction[] = [
      ...baseActions,
      {
        id: 'registration',
        label: 'Manage Registration',
        description: 'Configure registration form',
        icon: UserCheck,
        href: `/dashboard/events/${eventId}/registration`,
        color: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
      },
      {
        id: 'certificates',
        label: 'Certificate Designer',
        description: 'Create certificate templates',
        icon: Award,
        href: `/dashboard/events/${eventId}/certificates`,
        color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
      },
      {
        id: 'announcement',
        label: 'Send Announcement',
        description: 'Notify all participants',
        icon: Megaphone,
        href: `/dashboard/events/${eventId}/announcements`,
        color: 'bg-pink-50 hover:bg-pink-100 text-pink-700 border-pink-200'
      },
      {
        id: 'settings',
        label: 'Event Settings',
        description: 'Configure event options',
        icon: Settings,
        href: `/dashboard/events/${eventId}/settings`,
        color: 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
      }
    ]

    const volunteerActions: QuickAction[] = [
      ...baseActions,
      {
        id: 'checkin',
        label: 'Check-in Participants',
        description: 'Scan QR codes and check-in',
        icon: UserCheck,
        href: `/dashboard/events/${eventId}/checkin`,
        color: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
      },
      {
        id: 'helpdesk',
        label: 'Open Helpdesk',
        description: 'Manage support tickets',
        icon: HelpCircle,
        href: `/dashboard/events/${eventId}/helpdesk`,
        color: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200'
      }
    ]

    const viewerActions: QuickAction[] = [
      ...baseActions,
      {
        id: 'reports',
        label: 'Generate Reports',
        description: 'Download event reports',
        icon: Download,
        href: `/dashboard/events/${eventId}/reports`,
        color: 'bg-teal-50 hover:bg-teal-100 text-teal-700 border-teal-200'
      }
    ]

    switch (userRole) {
      case 'organizer':
      case 'admin':
        return organizerActions
      case 'volunteer':
        return volunteerActions
      case 'viewer':
        return viewerActions
      default:
        return baseActions
    }
  }

  const actions = getActionsForRole()

  const handleActionClick = (action: QuickAction) => {
    if (action.onClick) {
      action.onClick()
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks for managing your event
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon
            const ActionButton = (
              <Button
                key={action.id}
                variant="outline"
                disabled={action.disabled}
                onClick={() => handleActionClick(action)}
                className={cn(
                  "h-auto p-4 flex flex-col items-start space-y-2 text-left transition-all relative",
                  action.color,
                  action.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <Icon className="w-6 h-6" />
                  {action.badge && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      {action.badge}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-xs opacity-70">{action.description}</div>
                </div>
              </Button>
            )

            if (action.href && !action.disabled) {
              return (
                <Link 
                  key={action.id}
                  href={action.href} 
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                >
                  {ActionButton}
                </Link>
              )
            }

            return ActionButton
          })}
        </div>

        {/* Role-specific help text */}
        <div className="mt-6 p-3 bg-muted/30 rounded-lg">
          <div className="text-sm text-muted-foreground">
            {userRole === 'organizer' && (
              <>
                <strong>Organizer Access:</strong> You have full control over this event. 
                Use these actions to manage all aspects of your event.
              </>
            )}
            {userRole === 'volunteer' && (
              <>
                <strong>Volunteer Access:</strong> You can help with check-ins and support tickets. 
                Contact an organizer for additional permissions.
              </>
            )}
            {userRole === 'viewer' && (
              <>
                <strong>Viewer Access:</strong> You have read-only access to event data and reports. 
                Contact an organizer to request additional permissions.
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Preset configurations for common scenarios
export const EventQuickActions = {
  // For event dashboard page
  Dashboard: (props: Omit<QuickActionsProps, 'className'>) => (
    <QuickActions {...props} className="mb-6" />
  ),
  
  // For mobile/compact view
  Compact: (props: Omit<QuickActionsProps, 'className'>) => (
    <QuickActions {...props} className="lg:hidden" />
  ),
  
  // For sidebar widget
  Sidebar: (props: Omit<QuickActionsProps, 'className'>) => (
    <QuickActions {...props} className="w-full max-w-sm" />
  )
}