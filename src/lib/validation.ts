/**
 * Validation Schemas and Utilities
 * Centralized validation using Zod
 */

import { z } from 'zod'
import { isValidSlug, isReservedSlug } from './slug'

// Common validation patterns
const emailSchema = z.string().email('Please enter a valid email address')
const phoneSchema = z.string().regex(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number')
const urlSchema = z.string().url('Please enter a valid URL')

// Custom slug validation
const slugSchema = (type: 'event' | 'organization') => 
  z.string()
    .min(3, `${type} slug must be at least 3 characters`)
    .max(type === 'event' ? 50 : 30, `${type} slug must be less than ${type === 'event' ? 50 : 30} characters`)
    .refine(isValidSlug, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .refine(slug => !isReservedSlug(slug, type), 'This slug is reserved and cannot be used')

// User schemas
export const userRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const userLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
})

// Organization schemas
export const organizationSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  slug: slugSchema('organization'),
  description: z.string().optional(),
  website: urlSchema.optional().or(z.literal('')),
  logo: z.string().url().optional(),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Please enter a valid hex color'),
  contactEmail: emailSchema.optional(),
  contactPhone: phoneSchema.optional(),
})

// Event schemas
export const eventSchema = z.object({
  name: z.string().min(2, 'Event name must be at least 2 characters'),
  slug: slugSchema('event'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  startDate: z.string().refine(date => new Date(date) > new Date(), 'Start date must be in the future'),
  endDate: z.string(),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:MM)'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:MM)'),
  venue: z.string().optional(),
  eventType: z.enum(['college-fest', 'summit', 'workshop', 'campaign', 'other']),
  estimatedParticipants: z.number().min(1, 'Must have at least 1 participant'),
  isPublic: z.boolean(),
  allowRegistration: z.boolean(),
}).refine(data => new Date(data.endDate) >= new Date(data.startDate), {
  message: 'End date must be after start date',
  path: ['endDate'],
})

// Registration form schemas
export const registrationFieldSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'email', 'tel', 'select', 'checkbox', 'textarea', 'file']),
  label: z.string().min(1, 'Field label is required'),
  placeholder: z.string().optional(),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
  validation: z.object({
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    pattern: z.string().optional(),
  }).optional(),
})

export const registrationFormSchema = z.object({
  eventId: z.string(),
  fields: z.array(registrationFieldSchema),
  settings: z.object({
    allowTeamRegistration: z.boolean(),
    maxTeamSize: z.number().min(1).max(20),
    requireApproval: z.boolean(),
    sendConfirmationEmail: z.boolean(),
  }),
})

// Microsite schemas
export const micrositeSettingsSchema = z.object({
  mode: z.enum(['embed', 'template', 'custom']),
  theme: z.string().optional(),
  branding: z.object({
    logo: z.string().url().optional(),
    primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i),
    secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
    font: z.string(),
    socialLinks: z.object({
      website: urlSchema.optional(),
      facebook: urlSchema.optional(),
      twitter: urlSchema.optional(),
      instagram: urlSchema.optional(),
      linkedin: urlSchema.optional(),
    }),
  }),
  seoSettings: z.object({
    title: z.string().min(1, 'SEO title is required'),
    description: z.string().min(1, 'SEO description is required'),
    keywords: z.array(z.string()),
    ogImage: z.string().url().optional(),
  }),
})

// Utility functions for validation
export const validateField = <T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; errors?: string[] } => {
  try {
    const result = schema.parse(data)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => err.message)
      }
    }
    return { success: false, errors: ['Validation failed'] }
  }
}

export const getFieldErrors = (error: z.ZodError, field: string): string[] => {
  return error.errors
    .filter(err => err.path.includes(field))
    .map(err => err.message)
}

// Form validation helpers
export const createFormValidator = <T>(schema: z.ZodSchema<T>) => {
  return (data: unknown) => {
    const result = validateField(schema, data)
    if (result.success) {
      return { isValid: true, data: result.data, errors: {} }
    }
    
    const errors: Record<string, string> = {}
    if (result.errors) {
      // Map errors to field names (simplified)
      result.errors.forEach(error => {
        const field = error.toLowerCase().split(' ')[0]
        errors[field] = error
      })
    }
    
    return { isValid: false, data: null, errors }
  }
}

// Export commonly used validators
export const validateEmail = (email: string) => validateField(emailSchema, email)
export const validatePhone = (phone: string) => validateField(phoneSchema, phone)
export const validateUrl = (url: string) => validateField(urlSchema, url)
export const validateEventSlug = (slug: string) => validateField(slugSchema('event'), slug)
export const validateOrgSlug = (slug: string) => validateField(slugSchema('organization'), slug)