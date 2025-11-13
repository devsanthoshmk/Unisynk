// Auth Module Types

export interface AuthUser {
  id: string
  email: string
  name?: string
  role: string
  avatar?: string
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupCredentials {
  email: string
  password: string
  name: string
  phone?: string
}

export interface ResetPasswordRequest {
  email: string
}

export interface ResetPasswordConfirm {
  token: string
  password: string
  confirmPassword: string
}
