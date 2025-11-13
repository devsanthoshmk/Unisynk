/**
 * API Hooks for Data Fetching
 */

import { useState, useEffect, useCallback } from 'react'
import { api, type ApiResponse } from '@/lib/api'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const response = await apiCall()
      
      if (response.success && response.data) {
        setState({ data: response.data, loading: false, error: null })
        onSuccess?.(response.data)
      } else {
        const errorMessage = response.error || 'An error occurred'
        setState({ data: null, loading: false, error: errorMessage })
        onError?.(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setState({ data: null, loading: false, error: errorMessage })
      onError?.(errorMessage)
    }
  }, [apiCall, onSuccess, onError])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  const refetch = useCallback(() => {
    execute()
  }, [execute])

  return {
    ...state,
    execute,
    refetch,
  }
}

// Specific API hooks
export function useEvents(params?: { status?: string; type?: string; page?: number }) {
  return useApi(() => api.events.list(params))
}

export function useEvent(id: string, options?: UseApiOptions) {
  return useApi(() => api.events.get(id), options)
}

export function useEventBySlug(slug: string, options?: UseApiOptions) {
  return useApi(() => api.public.getEventBySlug(slug), options)
}

// Mutation hooks
export function useCreateEvent() {
  const [state, setState] = useState<UseApiState<any>>({
    data: null,
    loading: false,
    error: null,
  })

  const createEvent = useCallback(async (eventData: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const response = await api.events.create(eventData)
      
      if (response.success) {
        setState({ data: response.data, loading: false, error: null })
        return response.data
      } else {
        const errorMessage = response.error || 'Failed to create event'
        setState({ data: null, loading: false, error: errorMessage })
        throw new Error(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create event'
      setState({ data: null, loading: false, error: errorMessage })
      throw error
    }
  }, [])

  return {
    ...state,
    createEvent,
  }
}

export function useUpdateEvent() {
  const [state, setState] = useState<UseApiState<any>>({
    data: null,
    loading: false,
    error: null,
  })

  const updateEvent = useCallback(async (id: string, eventData: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const response = await api.events.update(id, eventData)
      
      if (response.success) {
        setState({ data: response.data, loading: false, error: null })
        return response.data
      } else {
        const errorMessage = response.error || 'Failed to update event'
        setState({ data: null, loading: false, error: errorMessage })
        throw new Error(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update event'
      setState({ data: null, loading: false, error: errorMessage })
      throw error
    }
  }, [])

  return {
    ...state,
    updateEvent,
  }
}