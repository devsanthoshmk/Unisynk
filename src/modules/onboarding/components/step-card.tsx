"use client"

import { ArrowLeft, ArrowRight, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StepCardProps {
  title: string
  description: string
  children: React.ReactNode
  onNext?: () => void
  onPrevious?: () => void
  onSkip?: () => void
  nextLabel?: string
  previousLabel?: string
  skipLabel?: string
  isNextDisabled?: boolean
  showPrevious?: boolean
  showSkip?: boolean
  errors?: string[]
  className?: string
}

export function StepCard({
  title,
  description,
  children,
  onNext,
  onPrevious,
  onSkip,
  nextLabel = "Continue",
  previousLabel = "Previous",
  skipLabel = "Skip for now",
  isNextDisabled = false,
  showPrevious = true,
  showSkip = false,
  errors = [],
  className
}: StepCardProps) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="text-sm text-red-700 dark:text-red-300">
                <div className="font-medium mb-2">Please fix the following issues:</div>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Step Content */}
          <div className="space-y-6">
            {children}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex items-center space-x-3">
              {showPrevious && onPrevious && (
                <Button
                  variant="outline"
                  onClick={onPrevious}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{previousLabel}</span>
                </Button>
              )}
              
              {showSkip && onSkip && (
                <Button
                  variant="ghost"
                  onClick={onSkip}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
                >
                  <SkipForward className="w-4 h-4" />
                  <span>{skipLabel}</span>
                </Button>
              )}
            </div>

            {onNext && (
              <Button
                onClick={onNext}
                disabled={isNextDisabled}
                className="flex items-center space-x-2 bg-primary hover:bg-primary/90"
              >
                <span>{nextLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}