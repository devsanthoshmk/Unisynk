"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  showBackButton?: boolean
}



export function AuthLayout({ children, title, subtitle, showBackButton = true }: AuthLayoutProps) {

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Marketing Card */}
      <div className="hidden lg:flex lg:w-1/2 bg-muted/30 relative overflow-hidden p-6">
        {/* Navigation Header */}
        <div className="absolute top-6 left-6 right-6 z-20">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-foreground">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">U</span>
              </div>
              <span className="font-bold text-xl">unisynk</span>
            </Link>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/docs">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to website
              </Link>
            </Button>
          </div>
        </div>

        {/* Floating Marketing Card */}
        <div className="flex items-center justify-center w-full">
          <div className="bg-background border rounded-3xl p-8 max-w-md w-full shadow-lg">
            {/* Main Content */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 leading-tight text-foreground">
                Capturing Moments,<br />Creating Memories
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Transform your events with powerful management tools designed for modern organizers.
              </p>
            </div>

            {/* Simple Testimonial */}
            <div className="bg-muted/50 rounded-2xl p-6 border">
              <div className="text-center">
                <p className="text-foreground italic mb-4 text-sm leading-relaxed">
                  "Wait. Is it so easy to manage events with Unisynk? It's like having a complete event management team in your pocket!"
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">S</span>
                  </div>
                  <div className="text-left">
                    <p className="text-foreground font-semibold text-sm">@Sarah_Events</p>
                    <p className="text-muted-foreground text-xs">Event Organizer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-muted"></div>
              <div className="w-2 h-2 rounded-full bg-muted"></div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full translate-y-24 -translate-x-24" />
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 text-foreground mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">U</span>
              </div>
              <span className="font-bold text-xl">unisynk</span>
            </Link>
          </div>

          {/* Back Button */}
          {showBackButton && (
            <Button variant="ghost" size="sm" className="mb-4" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to website
              </Link>
            </Button>
          )}

          {/* Form Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {/* Form Content */}
          {children}

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Need help?{" "}
              <Link href="/docs" className="text-primary hover:underline">
                Visit our documentation
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}