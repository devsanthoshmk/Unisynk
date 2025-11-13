/**
 * Global Type Definitions
 */

// Re-export microsite types for global access
export * from '@/modules/microsite/types'

// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// API response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// User and authentication types
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'organizer' | 'member'
  organizationId?: string
  avatar?: string
  preferences: {
    theme: 'light' | 'dark' | 'system'
    language: string
    timezone: string
  }
  createdAt: string
  updatedAt: string
}

export interface Organization {
  id: string
  name: string
  slug: string
  description?: string
  website?: string
  logo?: string
  primaryColor: string
  contactEmail?: string
  contactPhone?: string
  settings: {
    allowMemberInvites: boolean
    requireEventApproval: boolean
    defaultEventSettings: any
  }
  createdAt: string
  updatedAt: string
}

// Event types
export interface Event {
  id: string
  name: string
  slug: string
  description: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  venue?: string
  eventType: 'college-fest' | 'summit' | 'workshop' | 'campaign' | 'other'
  estimatedParticipants: number
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  isPublic: boolean
  allowRegistration: boolean
  organizationId: string
  createdBy: string
  registrations: number
  checkIns: number
  certificatesIssued: number
  createdAt: string
  updatedAt: string
}

// Registration types
export interface RegistrationField {
  id: string
  type: 'text' | 'email' | 'tel' | 'select' | 'checkbox' | 'textarea' | 'file' | 'date' | 'number'
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: string
  }
}

export interface RegistrationForm {
  id: string
  eventId: string
  fields: RegistrationField[]
  settings: {
    allowTeamRegistration: boolean
    maxTeamSize: number
    requireApproval: boolean
    sendConfirmationEmail: boolean
  }
  createdAt: string
  updatedAt: string
}

export interface Registration {
  id: string
  eventId: string
  formId: string
  data: Record<string, any>
  status: 'pending' | 'approved' | 'rejected'
  registrationType: 'individual' | 'team'
  teamMembers?: Registration[]
  submittedAt: string
  approvedAt?: string
}

// Activity types
export interface Activity {
  id: string
  type: 'registration' | 'edit' | 'publish' | 'certificate' | 'announcement' | 'checkin'
  title: string
  description: string
  timestamp: string
  eventId?: string
  userId: string
  metadata?: Record<string, any>
}

// Dashboard types
export interface DashboardStats {
  totalEvents: number
  activeEvents: number
  totalRegistrations: number
  totalCheckIns: number
  recentActivity: Activity[]
}

// Form builder types
export interface FormBuilderState {
  fields: RegistrationField[]
  selectedFieldId: string | null
  isDirty: boolean
}

// Onboarding types
export interface OnboardingState {
  currentStep: string
  completedSteps: string[]
  userType: string | null
  organizationType: string | null
  eventIntents: string[]
  featurePreferences: string[]
  isComplete: boolean
}

// Component prop types
export interface PageProps {
  params: Record<string, string>
  searchParams: Record<string, string | string[] | undefined>
}

export interface LayoutProps {
  children: React.ReactNode
  params?: Record<string, string>
}

// Utility types for forms
export interface FormState<T> {
  data: T
  errors: Partial<Record<keyof T, string>>
  isSubmitting: boolean
  isDirty: boolean
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

// Theme and styling types
export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
  }
  fonts: {
    heading: string
    body: string
  }
}

// File upload types
export interface FileUpload {
  file: File
  url?: string
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  error?: string
}