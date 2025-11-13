// Microsite Hooks
import { useState, useEffect, useCallback } from 'react'
import type { MicrositeSettings, EmbedWidget } from '../types'

export function useMicrositeSettings(eventId: string) {
  const [settings, setSettings] = useState<MicrositeSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true)
        // Mock API call - replace with actual implementation
        const response = await fetch(`/api/events/${eventId}/microsite`)
        if (!response.ok) throw new Error('Failed to fetch settings')
        
        const data = await response.json()
        setSettings(data.settings)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [eventId])

  const updateSettings = useCallback(async (updates: Partial<MicrositeSettings>) => {
    if (!settings) return

    const newSettings = { ...settings, ...updates }
    setSettings(newSettings)

    try {
      // Mock API call - replace with actual implementation
      await fetch(`/api/events/${eventId}/microsite`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: newSettings })
      })
    } catch (err) {
      console.error('Failed to update settings:', err)
      // Revert on error
      setSettings(settings)
    }
  }, [eventId, settings])

  return {
    settings,
    isLoading,
    error,
    updateSettings
  }
}

export function useEmbedWidgets(eventId: string) {
  const [widgets, setWidgets] = useState<EmbedWidget[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        setIsLoading(true)
        // Mock API call - replace with actual implementation
        const response = await fetch(`/api/events/${eventId}/widgets`)
        if (!response.ok) throw new Error('Failed to fetch widgets')
        
        const data = await response.json()
        setWidgets(data.widgets)
      } catch (err) {
        console.error('Failed to fetch widgets:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWidgets()
  }, [eventId])

  const updateWidget = useCallback(async (widgetId: string, updates: Partial<EmbedWidget>) => {
    const newWidgets = widgets.map(widget =>
      widget.id === widgetId ? { ...widget, ...updates } : widget
    )
    setWidgets(newWidgets)

    try {
      // Mock API call - replace with actual implementation
      await fetch(`/api/events/${eventId}/widgets/${widgetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
    } catch (err) {
      console.error('Failed to update widget:', err)
      // Revert on error
      setWidgets(widgets)
    }
  }, [eventId, widgets])

  return {
    widgets,
    isLoading,
    updateWidget
  }
}

export function useAutoSave<T>(
  data: T,
  saveFunction: (data: T) => Promise<void>,
  delay: number = 2000
) {
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (data) {
        setIsSaving(true)
        try {
          await saveFunction(data)
          setLastSaved(new Date())
        } catch (err) {
          console.error('Auto-save failed:', err)
        } finally {
          setIsSaving(false)
        }
      }
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [data, saveFunction, delay])

  return {
    isSaving,
    lastSaved
  }
}

export function usePreviewMode() {
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const togglePreview = useCallback(() => {
    setIsPreviewMode(prev => !prev)
  }, [])

  const setDevice = useCallback((device: 'desktop' | 'tablet' | 'mobile') => {
    setPreviewDevice(device)
  }, [])

  return {
    isPreviewMode,
    previewDevice,
    togglePreview,
    setDevice
  }
}

export function useClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      setTimeout(() => setCopiedText(null), 2000)
      return true
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
      return false
    }
  }, [])

  return {
    copiedText,
    copyToClipboard,
    hasCopied: (text: string) => copiedText === text
  }
}