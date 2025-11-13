"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/layout/navigation"
import { TopNav } from "@/layout/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated")
    const onboardingComplete = localStorage.getItem("onboardingComplete")
    
    if (authStatus !== "true") {
      // Redirect to login if not authenticated
      router.push("/auth/login")
      return
    }

    if (onboardingComplete !== "true") {
      // Redirect to onboarding if not completed (requirement 1.1)
      router.push("/onboarding")
      return
    }

    setIsAuthenticated(true)
    setIsLoading(false)

    // Load sidebar state from localStorage
    const savedSidebarState = localStorage.getItem("sidebarCollapsed")
    if (savedSidebarState) {
      setSidebarCollapsed(JSON.parse(savedSidebarState))
    }
  }, [router])

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState))
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}