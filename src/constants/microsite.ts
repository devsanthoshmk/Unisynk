/**
 * Microsite-related Constants
 */

export const MICROSITE_MODES = {
  EMBED: 'embed',
  TEMPLATE: 'template',
  CUSTOM: 'custom',
} as const

export type MicrositeMode = typeof MICROSITE_MODES[keyof typeof MICROSITE_MODES]

export const MICROSITE_MODE_LABELS: Record<MicrositeMode, string> = {
  embed: 'Use My Own Website',
  template: 'Use Unisynk Template',
  custom: 'Request Custom Site',
}

export const MICROSITE_MODE_DESCRIPTIONS: Record<MicrositeMode, string> = {
  embed: 'Embed Unisynk features into your existing website using simple code snippets',
  template: 'Get a ready-to-use microsite with customizable themes and sections',
  custom: 'Get a fully custom-built microsite designed by our team',
}

// Widget types for embed mode
export const WIDGET_TYPES = {
  REGISTRATION: 'registration',
  ENQUIRY: 'enquiry',
  CALENDAR: 'calendar',
  CERTIFICATE: 'certificate',
  ANNOUNCEMENTS: 'announcements',
} as const

export type WidgetType = typeof WIDGET_TYPES[keyof typeof WIDGET_TYPES]

export const WIDGET_LABELS: Record<WidgetType, string> = {
  registration: 'Registration Form',
  enquiry: 'Enquiry Form',
  calendar: 'Event Calendar',
  certificate: 'Certificate Download',
  announcements: 'Live Announcements',
}

// Microsite themes
export const MICROSITE_THEMES = {
  COLLEGE: 'college',
  CORPORATE: 'corporate',
  NONPROFIT: 'nonprofit',
  CREATIVE: 'creative',
  MINIMAL: 'minimal',
} as const

export type MicrositeTheme = typeof MICROSITE_THEMES[keyof typeof MICROSITE_THEMES]

export const THEME_LABELS: Record<MicrositeTheme, string> = {
  college: 'College & University',
  corporate: 'Corporate & Business',
  nonprofit: 'Nonprofit & Community',
  creative: 'Creative & Artistic',
  minimal: 'Minimal & Clean',
}

export const THEME_DESCRIPTIONS: Record<MicrositeTheme, string> = {
  college: 'Vibrant and energetic design perfect for college events and festivals',
  corporate: 'Professional and polished look ideal for business conferences',
  nonprofit: 'Warm and community-focused design for nonprofit organizations',
  creative: 'Bold and artistic styling for creative events and showcases',
  minimal: 'Clean and simple design that focuses on content',
}

// Section types for template mode
export const SECTION_TYPES = {
  HERO: 'hero',
  ABOUT: 'about',
  SCHEDULE: 'schedule',
  SPEAKERS: 'speakers',
  SPONSORS: 'sponsors',
  FAQ: 'faq',
  CONTACT: 'contact',
} as const

export type SectionType = typeof SECTION_TYPES[keyof typeof SECTION_TYPES]

export const SECTION_LABELS: Record<SectionType, string> = {
  hero: 'Hero Section',
  about: 'About Event',
  schedule: 'Event Schedule',
  speakers: 'Speakers',
  sponsors: 'Sponsors',
  faq: 'FAQ',
  contact: 'Contact',
}

// Default sections for new microsites
export const DEFAULT_SECTIONS = [
  {
    id: 'hero',
    type: 'hero' as const,
    label: 'Hero Section',
    enabled: true,
    order: 0,
  },
  {
    id: 'about',
    type: 'about' as const,
    label: 'About Event',
    enabled: true,
    order: 1,
  },
  {
    id: 'schedule',
    type: 'schedule' as const,
    label: 'Event Schedule',
    enabled: false,
    order: 2,
  },
  {
    id: 'speakers',
    type: 'speakers' as const,
    label: 'Speakers',
    enabled: false,
    order: 3,
  },
  {
    id: 'sponsors',
    type: 'sponsors' as const,
    label: 'Sponsors',
    enabled: false,
    order: 4,
  },
  {
    id: 'faq',
    type: 'faq' as const,
    label: 'FAQ',
    enabled: false,
    order: 5,
  },
  {
    id: 'contact',
    type: 'contact' as const,
    label: 'Contact',
    enabled: true,
    order: 6,
  },
] as const

// Color palettes for themes
export const THEME_COLORS: Record<MicrositeTheme, { primary: string; secondary: string; accent: string }> = {
  college: {
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#f59e0b',
  },
  corporate: {
    primary: '#1f2937',
    secondary: '#374151',
    accent: '#059669',
  },
  nonprofit: {
    primary: '#dc2626',
    secondary: '#991b1b',
    accent: '#f59e0b',
  },
  creative: {
    primary: '#7c3aed',
    secondary: '#5b21b6',
    accent: '#ec4899',
  },
  minimal: {
    primary: '#000000',
    secondary: '#6b7280',
    accent: '#3b82f6',
  },
}

// Font options
export const FONT_OPTIONS = [
  { value: 'Inter', label: 'Inter (Modern Sans-serif)' },
  { value: 'Roboto', label: 'Roboto (Clean Sans-serif)' },
  { value: 'Open Sans', label: 'Open Sans (Friendly Sans-serif)' },
  { value: 'Poppins', label: 'Poppins (Rounded Sans-serif)' },
  { value: 'Playfair Display', label: 'Playfair Display (Elegant Serif)' },
  { value: 'Merriweather', label: 'Merriweather (Readable Serif)' },
] as const

// SEO defaults
export const DEFAULT_SEO_SETTINGS = {
  title: '{eventName} - Register Now',
  description: 'Join us for {eventName}. Register now to secure your spot!',
  keywords: ['event', 'registration', 'conference', 'workshop'],
} as const

// Custom site request status
export const CUSTOM_REQUEST_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export type CustomRequestStatus = typeof CUSTOM_REQUEST_STATUS[keyof typeof CUSTOM_REQUEST_STATUS]

export const CUSTOM_REQUEST_STATUS_LABELS: Record<CustomRequestStatus, string> = {
  pending: 'Pending Review',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
}