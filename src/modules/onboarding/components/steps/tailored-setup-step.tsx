"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Loader2, Sparkles, FileText, Users, Palette, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StepCard } from "../step-card"
// TODO: Rebuild onboarding store`n// import { useOnboardingStore } from "@/lib/stores/onboarding-store"

interface TailoredSetupStepProps {
  onNext: () => void
  onPrevious: () => void
  onComplete: () => void
}

const setupSteps = [
  { id: 'template', label: 'Creating event template', icon: FileText },
  { id: 'roles', label: 'Setting up role presets', icon: Users },
  { id: 'theme', label: 'Customizing microsite theme', icon: Palette },
  { id: 'automation', label: 'Configuring automation starter pack', icon: Zap },
]

export function TailoredSetupStep({ onNext, onPrevious, onComplete }: TailoredSetupStepProps) {
  const { data } = useOnboardingStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  useEffect(() => {
    // Start the setup generation process
    setIsGenerating(true)
    
    // Simulate workspace generation with step-by-step progress
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prevIndex) => {
        if (prevIndex >= setupSteps.length - 1) {
          clearInterval(stepInterval)
          setTimeout(() => {
            setIsGenerating(false)
            setIsComplete(true)
          }, 1000)
          return prevIndex
        }
        
        // Mark current step as completed
        setCompletedSteps(prev => [...prev, setupSteps[prevIndex].id])
        return prevIndex + 1
      })
    }, 1500)

    return () => clearInterval(stepInterval)
  }, [])

  const handleComplete = () => {
    onComplete()
  }

  const getPersonalizedMessage = () => {
    const { eventType } = data.eventIntent
    const { name } = data.organization
    
    switch (eventType) {
      case 'college-fest':
        return `Perfect for ${name}'s college festival! Your workspace includes registration forms, certificate templates, and engagement tools.`
      case 'summit':
        return `Great choice for ${name}'s summit! We've set up professional networking features and speaker management tools.`
      case 'workshop':
        return `Excellent for ${name}'s workshops! Your workspace includes attendance tracking and skill certification features.`
      case 'campaign':
        return `Ideal for ${name}'s campaigns! We've configured outreach tools and engagement analytics.`
      default:
        return `Your customized workspace for ${name} is ready with all the features you selected!`
    }
  }

  return (
    <StepCard
      title="Creating your tailored Unisynk workspace"
      description="Sit back while we set up everything based on your preferences"
      showPrevious={false}
    >
      <div className="space-y-8">
        {isGenerating && (
          <div className="space-y-6">
            {/* Loading Animation */}
            <div className="text-center">
              <div className="relative">
                <Sparkles className="h-16 w-16 mx-auto text-primary animate-pulse" />
                <div className="absolute inset-0 animate-spin">
                  <Loader2 className="h-16 w-16 mx-auto text-primary/30" />
                </div>
              </div>
              <div className="mt-4 text-lg font-medium">
                Creating your tailored Unisynk workspace...
              </div>
            </div>

            {/* Step Progress */}
            <div className="space-y-4">
              {setupSteps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = completedSteps.includes(step.id)
                const isCurrent = index === currentStepIndex && !isCompleted
                const isPending = index > currentStepIndex
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      isCompleted 
                        ? 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300' 
                        : isCurrent 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted/30 text-muted-foreground'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isCurrent 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{step.label}</div>
                      {isCompleted && (
                        <div className="text-xs text-green-600 dark:text-green-400">
                          Completed
                        </div>
                      )}
                      {isCurrent && (
                        <div className="text-xs">
                          In progress...
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {isComplete && (
          <div className="text-center space-y-6">
            <div className="relative">
              <CheckCircle className="h-20 w-20 mx-auto text-green-500" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-8 w-8 text-yellow-500 animate-bounce" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                🎉 Workspace Ready!
              </div>
              <div className="text-base text-muted-foreground max-w-md mx-auto">
                {getPersonalizedMessage()}
              </div>
            </div>

            {/* Summary of what was created */}
            <div className="bg-muted/30 rounded-lg p-4 text-left max-w-md mx-auto">
              <div className="text-sm font-medium mb-2">What we've set up for you:</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ Default event template for {data.eventIntent.eventType || 'your events'}</li>
                <li>✓ Role presets (organizer, volunteer, participant)</li>
                <li>✓ Customized microsite theme</li>
                <li>✓ Automation workflows for your selected goals</li>
                {data.preferences.modules.certificates && <li>✓ Certificate templates ready</li>}
                {data.preferences.modules.helpdesk && <li>✓ Support ticket system configured</li>}
                {data.preferences.integrations.stripe && <li>✓ Payment processing setup</li>}
              </ul>
            </div>

            <Button
              onClick={handleComplete}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Launch My Workspace
            </Button>
          </div>
        )}
      </div>
    </StepCard>
  )
}