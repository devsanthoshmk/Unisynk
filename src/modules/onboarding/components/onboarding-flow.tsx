"use client"

// TODO: Rebuild onboarding store`n// import { useOnboardingStore } from "@/lib/stores/onboarding-store"
import { OnboardingLayout } from "./onboarding-layout"
import { UserSetupStep } from "./steps/user-setup-step"
import { OrganizationStep } from "./steps/organization-step"
import { EventIntentStep } from "./steps/event-intent-step"
import { FeaturePreferencesStep } from "./steps/feature-preferences-step"
import { TailoredSetupStep } from "./steps/tailored-setup-step"

interface OnboardingFlowProps {
  onComplete: () => void
  onSkip?: () => void
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const { currentStep, setStep, isStepValid, canProceedToStep, completeOnboarding } = useOnboardingStore()

  const handleNext = () => {
    if (currentStep < 5 && isStepValid(currentStep)) {
      setStep(currentStep + 1)
    } else if (currentStep === 5) {
      // Complete onboarding
      completeOnboarding()
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1)
    }
  }

  const handleStepClick = (step: number) => {
    if (canProceedToStep(step)) {
      setStep(step)
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UserSetupStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSkip={onSkip}
          />
        )
      case 2:
        return (
          <OrganizationStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSkip={onSkip}
          />
        )
      case 3:
        return (
          <EventIntentStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSkip={onSkip}
          />
        )
      case 4:
        return (
          <FeaturePreferencesStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSkip={onSkip}
          />
        )
      case 5:
        return (
          <TailoredSetupStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            onComplete={onComplete}
          />
        )
      default:
        return null
    }
  }

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={5}
      onStepClick={handleStepClick}
      canProceedToStep={canProceedToStep}
    >
      {renderCurrentStep()}
    </OnboardingLayout>
  )
}