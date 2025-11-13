/**
 * Slug Generation Utilities
 * Consistent URL-friendly string generation
 */

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace spaces and special characters with hyphens
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
}

/**
 * Generate a unique slug by appending a number if needed
 */
export function generateUniqueSlug(
  text: string, 
  existingSlugs: string[] = []
): string {
  const baseSlug = generateSlug(text)
  
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug
  }
  
  let counter = 1
  let uniqueSlug = `${baseSlug}-${counter}`
  
  while (existingSlugs.includes(uniqueSlug)) {
    counter++
    uniqueSlug = `${baseSlug}-${counter}`
  }
  
  return uniqueSlug
}

/**
 * Validate if a string is a valid slug
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug) && slug.length >= 3 && slug.length <= 50
}

/**
 * Generate event slug with validation
 */
export function generateEventSlug(eventName: string, eventDate?: string): string {
  let slug = generateSlug(eventName)
  
  // If slug is too short, append year
  if (slug.length < 3 && eventDate) {
    const year = new Date(eventDate).getFullYear()
    slug = `${slug}-${year}`
  }
  
  // Ensure minimum length
  if (slug.length < 3) {
    slug = `event-${Date.now().toString().slice(-6)}`
  }
  
  return slug
}

/**
 * Generate organization slug
 */
export function generateOrgSlug(orgName: string): string {
  let slug = generateSlug(orgName)
  
  // Ensure minimum length
  if (slug.length < 3) {
    slug = `org-${Date.now().toString().slice(-6)}`
  }
  
  return slug
}

/**
 * Extract slug from URL or path
 */
export function extractSlugFromPath(path: string): string | null {
  const segments = path.split('/').filter(Boolean)
  return segments[segments.length - 1] || null
}

/**
 * Validate and sanitize user input for slugs
 */
export function sanitizeSlugInput(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50)
}

/**
 * Generate microsite URL from slug
 */
export function generateMicrositeUrl(
  eventSlug: string, 
  orgSlug?: string,
  customDomain?: string
): string {
  if (customDomain) {
    return `https://${customDomain}`
  }
  
  if (orgSlug) {
    return `https://${orgSlug}.unisynk.com/${eventSlug}`
  }
  
  return `https://unisynk.com/events/${eventSlug}`
}

/**
 * Slug validation rules for different contexts
 */
export const slugRules = {
  event: {
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    reservedWords: ['admin', 'api', 'www', 'mail', 'ftp', 'localhost', 'dashboard']
  },
  organization: {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    reservedWords: ['admin', 'api', 'www', 'mail', 'ftp', 'localhost', 'app', 'dashboard', 'support']
  }
}

/**
 * Check if slug is reserved
 */
export function isReservedSlug(slug: string, type: 'event' | 'organization'): boolean {
  return slugRules[type].reservedWords.includes(slug.toLowerCase())
}