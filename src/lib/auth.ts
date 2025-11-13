/**
 * Authentication Utilities
 * Centralized auth helpers and session management
 */

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'organizer' | 'member'
  organizationId?: string
  avatar?: string
  preferences: {
    theme: 'light' | 'dark' | 'system'
    language: string
    timezone: string
  }
}

export interface AuthSession {
  user: User
  token: string
  expiresAt: string
}

class AuthManager {
  private readonly TOKEN_KEY = 'unisynk_token'
  private readonly USER_KEY = 'unisynk_user'

  // Session management
  setSession(session: AuthSession) {
    localStorage.setItem(this.TOKEN_KEY, session.token)
    localStorage.setItem(this.USER_KEY, JSON.stringify(session.user))
  }

  getSession(): AuthSession | null {
    try {
      const token = localStorage.getItem(this.TOKEN_KEY)
      const userStr = localStorage.getItem(this.USER_KEY)
      
      if (!token || !userStr) return null
      
      const user = JSON.parse(userStr)
      return { user, token, expiresAt: '' } // TODO: Add proper expiry
    } catch {
      return null
    }
  }

  clearSession() {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  getUser(): User | null {
    try {
      const userStr = localStorage.getItem(this.USER_KEY)
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  // Role-based access control
  hasRole(role: User['role']): boolean {
    const user = this.getUser()
    return user?.role === role
  }

  canAccessEvent(eventId: string): boolean {
    const user = this.getUser()
    if (!user) return false
    
    // Admin can access all events
    if (user.role === 'admin') return true
    
    // TODO: Check if user is organizer of this event
    return true
  }

  canManageOrganization(orgId: string): boolean {
    const user = this.getUser()
    if (!user) return false
    
    return user.role === 'admin' || user.organizationId === orgId
  }
}

export const auth = new AuthManager()

// Auth hooks for React components
export const useAuth = () => {
  const session = auth.getSession()
  
  return {
    user: session?.user || null,
    token: session?.token || null,
    isAuthenticated: auth.isAuthenticated(),
    login: (session: AuthSession) => auth.setSession(session),
    logout: () => auth.clearSession(),
    hasRole: (role: User['role']) => auth.hasRole(role),
    canAccessEvent: (eventId: string) => auth.canAccessEvent(eventId),
    canManageOrganization: (orgId: string) => auth.canManageOrganization(orgId),
  }
}

// Route protection utilities
export const requireAuth = (redirectTo = '/auth/login') => {
  if (typeof window !== 'undefined' && !auth.isAuthenticated()) {
    window.location.href = redirectTo
    return false
  }
  return true
}

export const requireRole = (role: User['role'], redirectTo = '/dashboard') => {
  if (typeof window !== 'undefined' && !auth.hasRole(role)) {
    window.location.href = redirectTo
    return false
  }
  return true
}