"use client"

import { ReactNode } from 'react'

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: string[]
  fallback?: ReactNode
}

export function RoleGuard({ 
  children, 
  allowedRoles,
  fallback = <div>Access Denied</div>
}: RoleGuardProps) {
  // TODO: Get user role from auth context
  const userRole = 'admin' // Replace with actual role check
  
  const hasAccess = allowedRoles.includes(userRole)
  
  if (!hasAccess) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}
