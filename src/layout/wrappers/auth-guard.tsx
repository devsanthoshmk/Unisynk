"use client"

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AuthGuardProps {
  children: ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const router = useRouter()
  
  useEffect(() => {
    if (requireAuth) {
      // TODO: Check authentication status
      const isAuthenticated = false // Replace with actual auth check
      
      if (!isAuthenticated) {
        router.push('/auth/login')
      }
    }
  }, [requireAuth, router])
  
  return <>{children}</>
}
