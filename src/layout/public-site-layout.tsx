"use client"

import { ReactNode } from 'react'
import { MainNavigation } from './navigation/main-navigation'
import { Footer } from './navigation/footer'

interface PublicSiteLayoutProps {
  children: ReactNode
}

export function PublicSiteLayout({ children }: PublicSiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Navigation */}
      <MainNavigation />
      
      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
