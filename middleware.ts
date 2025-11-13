import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the user is trying to access protected routes
  if (pathname.startsWith('/dashboard')) {
    // In a real app, you'd check for a valid JWT token or session
    // For demo purposes, we'll check localStorage on the client side
    // This is handled in the dashboard layout component
    return NextResponse.next()
  }

  // Handle onboarding route protection
  if (pathname.startsWith('/onboarding')) {
    // In a real app, you'd check for authentication status from cookies/headers
    // For demo purposes, authentication check is handled on the client side
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding/:path*']
}