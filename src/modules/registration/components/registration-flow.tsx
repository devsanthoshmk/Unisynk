'use client'

import { useState, useEffect } from 'react'
import { TokenGate } from './token-gate'
import { RegistrationForm } from './registration-form'
import { ConfirmationScreen } from './confirmation-screen'
import { Progress } from '@/components/ui/progress'

interface FormField {
  id: string
  type: 'text' | 'email' | 'tel' | 'select' | 'checkbox' | 'textarea' | 'file'
  label: string
  required: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

interface RegistrationFormData {
  id: string
  eventId: string
  slug: string
  eventName: string
  tokenRequired: boolean
  teamRegistrationEnabled: boolean
  maxTeamSize: number
  fields: FormField[]
  conditionalLogic: any[]
}

interface RegistrationFlowProps {
  form: RegistrationFormData
  initialToken?: string
}

type FlowStep = 'token' | 'form' | 'confirmation'

export function RegistrationFlow({ form, initialToken }: RegistrationFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>(() => {
    if (form.tokenRequired && !initialToken) return 'token'
    return 'form'
  })
  
  const [token, setToken] = useState(initialToken || '')
  const [registrationData, setRegistrationData] = useState<any>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Update progress based on current step
    switch (currentStep) {
      case 'token':
        setProgress(25)
        break
      case 'form':
        setProgress(50)
        break
      case 'confirmation':
        setProgress(100)
        break
    }
  }, [currentStep])

  const handleTokenValidated = (validatedToken: string) => {
    setToken(validatedToken)
    setCurrentStep('form')
  }

  const handleFormSubmitted = (data: any) => {
    setRegistrationData(data)
    setCurrentStep('confirmation')
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 'token':
        return 'Enter Access Token'
      case 'form':
        return 'Registration Details'
      case 'confirmation':
        return 'Registration Complete'
      default:
        return 'Registration'
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{getStepTitle()}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      {currentStep === 'token' && (
        <TokenGate
          eventSlug={form.slug}
          onTokenValidated={handleTokenValidated}
        />
      )}

      {currentStep === 'form' && (
        <RegistrationForm
          form={form}
          token={token}
          onSubmitted={handleFormSubmitted}
        />
      )}

      {currentStep === 'confirmation' && registrationData && (
        <ConfirmationScreen
          eventName={form.eventName}
          registrationData={registrationData}
          eventSlug={form.slug}
        />
      )}
    </div>
  )
}