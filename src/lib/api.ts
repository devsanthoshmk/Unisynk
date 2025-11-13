/**
 * API Client Utilities
 * Centralized API helpers for consistent data fetching
 */

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`)
      }

      return data
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  // Event API methods
  events = {
    list: (params?: { status?: string; type?: string; page?: number }) =>
      this.request<any[]>(`/events/list?${new URLSearchParams(params as any)}`),
    
    get: (id: string) =>
      this.request<any>(`/events/${id}`),
    
    create: (data: any) =>
      this.request<any>('/events/create', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    update: (id: string, data: any) =>
      this.request<any>(`/events/${id}/update`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    
    delete: (id: string) =>
      this.request<any>(`/events/${id}`, {
        method: 'DELETE',
      }),
  }

  // Organization API methods
  orgs = {
    create: (data: any) =>
      this.request<any>('/orgs/create', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  }

  // Public API methods
  public = {
    getEventBySlug: (slug: string) =>
      this.request<any>(`/public/events/${slug}`),
    
    register: (slug: string, data: any) =>
      this.request<any>(`/public/events/${slug}/register`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  }
}

export const api = new ApiClient()

// Utility functions for common API patterns
export const withRetry = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> => {
  try {
    return await fn()
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
      return withRetry(fn, retries - 1, delay * 2)
    }
    throw error
  }
}

export const handleApiError = (error: any, fallbackMessage = 'Something went wrong') => {
  if (error?.error) return error.error
  if (error?.message) return error.message
  return fallbackMessage
}