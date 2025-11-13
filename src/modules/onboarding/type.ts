// Onboarding Module Types
export interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
}

export interface OnboardingState {
  currentStep: number
  steps: OnboardingStep[]
  organizationId?: string
  eventId?: string
}
