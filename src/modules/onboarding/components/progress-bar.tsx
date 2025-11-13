"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  stepTitles: string[]
  onStepClick: (step: number) => void
  canProceedToStep: (step: number) => boolean
}

export function ProgressBar({ 
  currentStep, 
  totalSteps, 
  stepTitles, 
  onStepClick,
  canProceedToStep 
}: ProgressBarProps) {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="w-full">
      {/* Progress Line */}
      <div className="relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
        
        {/* Step Circles */}
        <div className="relative flex justify-between">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep
            const canAccess = canProceedToStep(stepNumber)
            
            return (
              <button
                key={stepNumber}
                onClick={() => canAccess && onStepClick(stepNumber)}
                disabled={!canAccess}
                className={cn(
                  "relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  {
                    "bg-primary border-primary text-primary-foreground": isCompleted,
                    "bg-primary border-primary text-primary-foreground ring-2 ring-primary/20": isCurrent,
                    "bg-background border-muted text-muted-foreground": !isCompleted && !isCurrent && canAccess,
                    "bg-muted border-muted text-muted-foreground cursor-not-allowed": !canAccess,
                    "hover:border-primary hover:text-primary": canAccess && !isCompleted && !isCurrent,
                  }
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Step Labels */}
      <div className="flex justify-between">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const canAccess = canProceedToStep(stepNumber)
          
          return (
            <div
              key={stepNumber}
              className={cn(
                "text-center transition-colors duration-300",
                "flex-1 px-2"
              )}
            >
              <div
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  {
                    "text-primary": isCompleted || isCurrent,
                    "text-muted-foreground": !isCompleted && !isCurrent && canAccess,
                    "text-muted-foreground/50": !canAccess,
                  }
                )}
              >
                {title}
              </div>
              {isCurrent && (
                <div className="mt-1 text-xs text-muted-foreground">
                  Current Step
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}