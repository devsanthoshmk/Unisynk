"use client"

import * as React from "react"
import { Check, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "./input"

export interface SlugInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string
  onChange: (value: string) => void
  onAvailabilityCheck?: (slug: string) => Promise<boolean>
  generateFrom?: string
  prefix?: string
  suffix?: string
  className?: string
  error?: string
  debounceMs?: number
}

const SlugInput = React.forwardRef<HTMLInputElement, SlugInputProps>(
  ({ 
    value, 
    onChange, 
    onAvailabilityCheck,
    generateFrom,
    prefix = "",
    suffix = "",
    className,
    error,
    debounceMs = 500,
    ...props 
  }, ref) => {
    const [isChecking, setIsChecking] = React.useState(false)
    const [isAvailable, setIsAvailable] = React.useState<boolean | null>(null)
    const [validationError, setValidationError] = React.useState<string | null>(null)
    const checkTimeoutRef = React.useRef<number | undefined>()

    // Generate slug from source text
    const generateSlug = React.useCallback((text: string): string => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    }, [])

    // Auto-generate slug when generateFrom changes
    React.useEffect(() => {
      if (generateFrom && !value) {
        const generatedSlug = generateSlug(generateFrom)
        if (generatedSlug) {
          onChange(generatedSlug)
        }
      }
    }, [generateFrom, value, onChange, generateSlug])

    // Validate slug format
    const validateSlug = React.useCallback((slug: string): string | null => {
      if (!slug) {
        return "Slug is required"
      }

      if (slug.length < 2) {
        return "Slug must be at least 2 characters"
      }

      if (slug.length > 50) {
        return "Slug must be less than 50 characters"
      }

      if (!/^[a-z0-9-]+$/.test(slug)) {
        return "Slug can only contain lowercase letters, numbers, and hyphens"
      }

      if (slug.startsWith('-') || slug.endsWith('-')) {
        return "Slug cannot start or end with a hyphen"
      }

      if (slug.includes('--')) {
        return "Slug cannot contain consecutive hyphens"
      }

      return null
    }, [])

    // Check availability with debouncing
    const checkAvailability = React.useCallback(async (slug: string) => {
      if (!onAvailabilityCheck || !slug) {
        setIsAvailable(null)
        return
      }

      const formatError = validateSlug(slug)
      if (formatError) {
        setValidationError(formatError)
        setIsAvailable(null)
        return
      }

      setValidationError(null)
      setIsChecking(true)

      try {
        const available = await onAvailabilityCheck(slug)
        setIsAvailable(available)
      } catch (error) {
        console.error('Error checking slug availability:', error)
        setIsAvailable(null)
      } finally {
        setIsChecking(false)
      }
    }, [onAvailabilityCheck, validateSlug])

    // Debounced availability check
    React.useEffect(() => {
      if (checkTimeoutRef.current !== undefined) {
        clearTimeout(checkTimeoutRef.current)
      }

      if (value) {
        checkTimeoutRef.current = setTimeout(() => {
          checkAvailability(value)
        }, debounceMs)
      } else {
        setIsAvailable(null)
        setValidationError(null)
      }

      return () => {
        if (checkTimeoutRef.current !== undefined) {
          clearTimeout(checkTimeoutRef.current)
        }
      }
    }, [value, checkAvailability, debounceMs])

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      const slugValue = generateSlug(inputValue)
      onChange(slugValue)
    }, [onChange, generateSlug])

    const displayError = error || validationError || (isAvailable === false ? "This slug is already taken" : null)

    const getStatusIcon = () => {
      if (isChecking) {
        return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      }
      if (isAvailable === true) {
        return <Check className="h-4 w-4 text-green-500" />
      }
      if (isAvailable === false) {
        return <X className="h-4 w-4 text-destructive" />
      }
      return null
    }

    const fullSlug = `${prefix}${value}${suffix}`

    return (
      <div className={cn("w-full", className)}>
        <div className="relative">
          <div className="flex">
            {prefix && (
              <div className="flex items-center px-3 py-2 bg-muted border border-r-0 border-input rounded-l-md text-sm text-muted-foreground">
                {prefix}
              </div>
            )}
            <Input
              ref={ref}
              value={value}
              onChange={handleChange}
              className={cn(
                "font-mono",
                prefix && "rounded-l-none",
                suffix && "rounded-r-none",
                displayError && "border-destructive focus-visible:ring-destructive"
              )}
              {...props}
            />
            {suffix && (
              <div className="flex items-center px-3 py-2 bg-muted border border-l-0 border-input rounded-r-md text-sm text-muted-foreground">
                {suffix}
              </div>
            )}
          </div>
          
          {onAvailabilityCheck && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {getStatusIcon()}
            </div>
          )}
        </div>

        {(prefix || suffix) && value && (
          <p className="text-xs text-muted-foreground mt-1">
            Full URL: <span className="font-mono">{fullSlug}</span>
          </p>
        )}

        {displayError && (
          <p className="text-sm text-destructive mt-2">{displayError}</p>
        )}

        {isAvailable === true && (
          <p className="text-sm text-green-600 mt-2">✓ This slug is available</p>
        )}
      </div>
    )
  }
)

SlugInput.displayName = "SlugInput"

export { SlugInput }