/**
 * Event-related Constants
 */

export const EVENT_TYPES = {
  COLLEGE_FEST: 'college-fest',
  SUMMIT: 'summit',
  WORKSHOP: 'workshop',
  CAMPAIGN: 'campaign',
  OTHER: 'other',
} as const

export type EventType = typeof EVENT_TYPES[keyof typeof EVENT_TYPES]

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  'college-fest': 'College Fest',
  'summit': 'Summit',
  'workshop': 'Workshop',
  'campaign': 'Campaign',
  'other': 'Other',
}

export const EVENT_TYPE_DESCRIPTIONS: Record<EventType, string> = {
  'college-fest': 'Multi-day college festivals with various activities',
  'summit': 'Professional conferences and industry summits',
  'workshop': 'Educational workshops and training sessions',
  'campaign': 'Marketing campaigns and promotional events',
  'other': 'Custom event types not covered above',
}

export const EVENT_STATUSES = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export type EventStatus = typeof EVENT_STATUSES[keyof typeof EVENT_STATUSES]

export const EVENT_STATUS_LABELS: Record<EventStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export const EVENT_STATUS_COLORS: Record<EventStatus, string> = {
  draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
}

// Registration field types
export const REGISTRATION_FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PHONE: 'tel',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  TEXTAREA: 'textarea',
  FILE: 'file',
  DATE: 'date',
  NUMBER: 'number',
} as const

export type RegistrationFieldType = typeof REGISTRATION_FIELD_TYPES[keyof typeof REGISTRATION_FIELD_TYPES]

export const FIELD_TYPE_LABELS: Record<RegistrationFieldType, string> = {
  text: 'Text Input',
  email: 'Email Address',
  tel: 'Phone Number',
  select: 'Dropdown Select',
  checkbox: 'Checkbox',
  textarea: 'Long Text',
  file: 'File Upload',
  date: 'Date Picker',
  number: 'Number Input',
}

// Common registration field templates
export const FIELD_TEMPLATES = [
  {
    id: 'name',
    type: 'text' as const,
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
  {
    id: 'email',
    type: 'email' as const,
    label: 'Email Address',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    id: 'phone',
    type: 'tel' as const,
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    required: true,
  },
  {
    id: 'college',
    type: 'text' as const,
    label: 'College/University',
    placeholder: 'Enter your institution name',
    required: false,
  },
  {
    id: 'year',
    type: 'select' as const,
    label: 'Year of Study',
    options: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Other'],
    required: false,
  },
  {
    id: 'department',
    type: 'text' as const,
    label: 'Department/Branch',
    placeholder: 'e.g., Computer Science',
    required: false,
  },
  {
    id: 'dietary',
    type: 'select' as const,
    label: 'Dietary Preferences',
    options: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'No Preference'],
    required: false,
  },
  {
    id: 'tshirt',
    type: 'select' as const,
    label: 'T-Shirt Size',
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    required: false,
  },
]

// Event capacity limits
export const CAPACITY_LIMITS = {
  FREE_TIER: 100,
  BASIC_TIER: 500,
  PRO_TIER: 2000,
  ENTERPRISE_TIER: 10000,
} as const

// Time zones (common ones)
export const TIMEZONES = [
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
  { value: 'Europe/Berlin', label: 'Central European Time (CET)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
] as const

// Default event settings
export const DEFAULT_EVENT_SETTINGS = {
  estimatedParticipants: 50,
  isPublic: true,
  allowRegistration: true,
  requireApproval: false,
  sendConfirmationEmail: true,
  allowTeamRegistration: false,
  maxTeamSize: 5,
} as const