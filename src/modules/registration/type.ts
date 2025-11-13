// Registration Module Types
export interface RegistrationForm {
  id: string
  eventId: string
  slug: string
  eventName: string
  tokenRequired: boolean
  teamRegistrationEnabled: boolean
  maxTeamSize?: number
  fields: FormField[]
  conditionalLogic?: ConditionalLogic[]
}

export interface FormField {
  id: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkbox'
  label: string
  required: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

export interface ConditionalLogic {
  fieldId: string
  condition: 'equals' | 'not_equals' | 'contains'
  value: string
  showFields: string[]
}
