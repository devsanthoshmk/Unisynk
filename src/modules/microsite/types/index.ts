// Microsite Types
export interface MicrositeMode {
  type: 'embed' | 'template' | 'custom'
  label: string
  description: string
  features: string[]
  recommended?: boolean
}

export interface EmbedWidget {
  id: string
  type: 'registration' | 'enquiry' | 'calendar' | 'certificate' | 'announcements'
  label: string
  enabled: boolean
  config: {
    width?: string
    height?: string
    theme?: 'light' | 'dark' | 'auto'
    language?: string
    customCSS?: string
  }
}

export interface MicrositeTheme {
  id: string
  name: string
  category: 'college' | 'corporate' | 'nonprofit' | 'creative' | 'minimal'
  preview: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
}

export interface MicrositeSection {
  id: string
  type: 'hero' | 'about' | 'schedule' | 'speakers' | 'sponsors' | 'faq' | 'contact'
  label: string
  enabled: boolean
  order: number
  content: {
    title?: string
    description?: string
    image?: string
    items?: any[]
    customHTML?: string
  }
}

export interface MicrositeBranding {
  logo?: string
  favicon?: string
  primaryColor: string
  secondaryColor?: string
  font: string
  socialLinks: {
    website?: string
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
}

export interface MicrositeSettings {
  mode: 'embed' | 'template' | 'custom'
  theme?: string
  sections: MicrositeSection[]
  branding: MicrositeBranding
  widgets: EmbedWidget[]
  customDomain?: string
  seoSettings: {
    title: string
    description: string
    keywords: string[]
    ogImage?: string
  }
}

export interface CustomSiteRequest {
  orgName: string
  eventName: string
  contactName: string
  contactEmail: string
  contactPhone?: string
  websiteUrl?: string
  brandGuidelines?: string
  desiredFeatures: string[]
  budgetRange?: string
  timeline?: string
  additionalNotes?: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface Event {
  id: string
  slug: string
  name: string
  description: string
  date: string
  time: string
  venue: string
  logo?: string
  bannerImage?: string
  organizer: {
    name: string
    logo?: string
    email?: string
    phone?: string
    whatsapp?: string
    primaryColor?: string
  }
  speakers: Speaker[]
  agenda: AgendaItem[]
  registrationEnabled: boolean
  certificatesEnabled: boolean
  announcements: Announcement[]
  micrositeSettings?: MicrositeSettings
}

export interface Speaker {
  id: string
  name: string
  title: string
  image: string
  bio: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    website?: string
  }
}

export interface AgendaItem {
  time: string
  title: string
  speaker?: string
  description?: string
  location?: string
}

export interface Announcement {
  id: string
  message: string
  type: 'info' | 'warning' | 'success' | 'urgent'
  createdAt: string
  expiresAt?: string
}