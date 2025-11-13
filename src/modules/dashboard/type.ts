// Dashboard Module Types

export interface DashboardConfig {
  organizationId: string
  userId: string
  preferences: DashboardPreferences
}

export interface DashboardPreferences {
  theme: 'light' | 'dark' | 'system'
  sidebarCollapsed: boolean
  defaultView: 'grid' | 'list'
}

export interface DashboardStats {
  totalEvents: number
  totalAttendees: number
  activeEvents: number
  conversionRate: number
}

export interface RecentEvent {
  id: string
  name: string
  status: 'active' | 'draft' | 'completed'
  attendees: number
  date: string
}

export interface QuickAction {
  id: string
  label: string
  icon: string
  href: string
  description?: string
}
