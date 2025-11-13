/**
 * Onboarding Flow Constants
 */

export const ONBOARDING_STEPS = {
  USER_SETUP: 'user-setup',
  ORGANIZATION: 'organization',
  EVENT_INTENT: 'event-intent',
  FEATURE_PREFERENCES: 'feature-preferences',
  TAILORED_SETUP: 'tailored-setup',
} as const

export type OnboardingStep = typeof ONBOARDING_STEPS[keyof typeof ONBOARDING_STEPS]

export const ONBOARDING_STEP_LABELS: Record<OnboardingStep, string> = {
  'user-setup': 'User Setup',
  'organization': 'Organization',
  'event-intent': 'Event Intent',
  'feature-preferences': 'Feature Preferences',
  'tailored-setup': 'Tailored Setup',
}

export const ONBOARDING_STEP_DESCRIPTIONS: Record<OnboardingStep, string> = {
  'user-setup': 'Tell us about yourself',
  'organization': 'Set up your organization',
  'event-intent': 'What type of events do you organize?',
  'feature-preferences': 'Which features are most important to you?',
  'tailored-setup': 'Let us customize your experience',
}

// User types for onboarding
export const USER_TYPES = {
  STUDENT: 'student',
  EDUCATOR: 'educator',
  PROFESSIONAL: 'professional',
  ORGANIZER: 'organizer',
  OTHER: 'other',
} as const

export type UserType = typeof USER_TYPES[keyof typeof USER_TYPES]

export const USER_TYPE_LABELS: Record<UserType, string> = {
  student: 'Student',
  educator: 'Educator',
  professional: 'Professional',
  organizer: 'Event Organizer',
  other: 'Other',
}

// Organization types
export const ORGANIZATION_TYPES = {
  COLLEGE: 'college',
  UNIVERSITY: 'university',
  COMPANY: 'company',
  NONPROFIT: 'nonprofit',
  COMMUNITY: 'community',
  INDIVIDUAL: 'individual',
} as const

export type OrganizationType = typeof ORGANIZATION_TYPES[keyof typeof ORGANIZATION_TYPES]

export const ORGANIZATION_TYPE_LABELS: Record<OrganizationType, string> = {
  college: 'College',
  university: 'University',
  company: 'Company',
  nonprofit: 'Nonprofit Organization',
  community: 'Community Group',
  individual: 'Individual',
}

// Event intents (what users want to organize)
export const EVENT_INTENTS = {
  COLLEGE_EVENTS: 'college-events',
  CORPORATE_EVENTS: 'corporate-events',
  WORKSHOPS: 'workshops',
  CONFERENCES: 'conferences',
  COMMUNITY_EVENTS: 'community-events',
  FUNDRAISERS: 'fundraisers',
  COMPETITIONS: 'competitions',
  OTHER: 'other',
} as const

export type EventIntent = typeof EVENT_INTENTS[keyof typeof EVENT_INTENTS]

export const EVENT_INTENT_LABELS: Record<EventIntent, string> = {
  'college-events': 'College Events & Fests',
  'corporate-events': 'Corporate Events',
  'workshops': 'Workshops & Training',
  'conferences': 'Conferences & Summits',
  'community-events': 'Community Events',
  'fundraisers': 'Fundraisers & Charity',
  'competitions': 'Competitions & Contests',
  'other': 'Other Events',
}

// Feature preferences
export const FEATURE_PREFERENCES = {
  REGISTRATION: 'registration',
  TICKETING: 'ticketing',
  CERTIFICATES: 'certificates',
  ANALYTICS: 'analytics',
  MICROSITE: 'microsite',
  INTEGRATIONS: 'integrations',
  AUTOMATION: 'automation',
  SUPPORT: 'support',
} as const

export type FeaturePreference = typeof FEATURE_PREFERENCES[keyof typeof FEATURE_PREFERENCES]

export const FEATURE_PREFERENCE_LABELS: Record<FeaturePreference, string> = {
  registration: 'Registration Management',
  ticketing: 'Ticketing & Payments',
  certificates: 'Digital Certificates',
  analytics: 'Event Analytics',
  microsite: 'Event Microsites',
  integrations: 'Third-party Integrations',
  automation: 'Workflow Automation',
  support: '24/7 Support',
}

export const FEATURE_PREFERENCE_DESCRIPTIONS: Record<FeaturePreference, string> = {
  registration: 'Collect attendee information with custom forms',
  ticketing: 'Sell tickets and manage payments',
  certificates: 'Generate and distribute digital certificates',
  analytics: 'Track event performance and attendee engagement',
  microsite: 'Create beautiful event landing pages',
  integrations: 'Connect with your existing tools and platforms',
  automation: 'Automate repetitive tasks and workflows',
  support: 'Get help when you need it most',
}

// Onboarding completion rewards
export const ONBOARDING_REWARDS = {
  WELCOME_BONUS: 'welcome-bonus',
  FEATURE_UNLOCK: 'feature-unlock',
  TEMPLATE_ACCESS: 'template-access',
  PRIORITY_SUPPORT: 'priority-support',
} as const

// Default onboarding state
export const DEFAULT_ONBOARDING_STATE = {
  currentStep: ONBOARDING_STEPS.USER_SETUP,
  completedSteps: [],
  userType: null,
  organizationType: null,
  eventIntents: [],
  featurePreferences: [],
  isComplete: false,
} as const

// Step validation requirements
export const STEP_REQUIREMENTS: Record<OnboardingStep, string[]> = {
  'user-setup': ['name', 'userType'],
  'organization': ['organizationName', 'organizationType'],
  'event-intent': ['eventIntents'],
  'feature-preferences': ['featurePreferences'],
  'tailored-setup': [],
}