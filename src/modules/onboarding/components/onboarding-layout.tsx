"use client"

import Link from "next/link"
import { ProgressBar } from "./progress-bar"

interface OnboardingLayoutProps {
  children: React.ReactNode
  currentStep: number
  totalSteps: number
  onStepClick: (step: number) => void
  canProceedToStep: (step: number) => boolean
}

const stepTitles = [
  "User Setup",
  "Organization",
  "Event Intent", 
  "Preferences",
  "Setup Complete"
]

export function OnboardingLayout({ 
  children, 
  currentStep, 
  totalSteps, 
  onStepClick,
  canProceedToStep 
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link className="flex items-center space-x-2" href="/">
              <div className="h-6 w-6 rounded bg-primary" />
              <span className="font-bold text-xl">unisynk</span>
            </Link>
            
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b bg-background/50">
        <div className="container mx-auto px-4 py-6">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepTitles={stepTitles}
            onStepClick={onStepClick}
            canProceedToStep={canProceedToStep}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/3 rounded-full translate-y-32 -translate-x-32" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/2 rounded-full -translate-x-16 -translate-y-16" />
      </div>
    </div>
  )
}