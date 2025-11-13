"use client"

import { useState, useEffect } from "react"
import { 
  Zap, 
  Award, 
  HelpCircle, 
  Puzzle,
  CreditCard,
  Video,
  MessageCircle,
  Sparkles,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { StepCard } from "../step-card"
// TODO: Rebuild onboarding store`n// import { useOnboardingStore } from "@/lib/stores/onboarding-store"
import { cn } from "@/lib/utils"

interface FeaturePreferencesStepProps {
  onNext: () => void
  onPrevious: () => void
  onSkip?: () => void
}

const modules = [
  { 
    id: 'automation', 
    label: 'Automation', 
    icon: Zap, 
    description: 'Automate workflows and notifications',
    tooltip: 'Set up automated email sequences, reminders, and workflow triggers'
  },
  { 
    id: 'certificates', 
    label: 'Certificates', 
    icon: Award, 
    description: 'Issue digital certificates',
    tooltip: 'Generate and distribute digital certificates to participants'
  },
  { 
    id: 'helpdesk', 
    label: 'Helpdesk', 
    icon: HelpCircle, 
    description: 'Customer support system',
    tooltip: 'Manage support tickets and provide customer assistance'
  },
  { 
    id: 'plugins', 
    label: 'Plugins', 
    icon: Puzzle, 
    description: 'Extend functionality with plugins',
    tooltip: 'Add custom features and third-party integrations'
  },
] as const

const integrations = [
  { 
    id: 'stripe', 
    label: 'Stripe', 
    icon: CreditCard, 
    description: 'Payment processing',
    tooltip: 'Accept payments for event registrations and merchandise'
  },
  { 
    id: 'zoom', 
    label: 'Zoom', 
    icon: Video, 
    description: 'Video conferencing',
    tooltip: 'Integrate with Zoom for virtual events and meetings'
  },
  { 
    id: 'whatsapp', 
    label: 'WhatsApp', 
    icon: MessageCircle, 
    description: 'WhatsApp messaging',
    tooltip: 'Send notifications and updates via WhatsApp Business API'
  },
] as const

export function FeaturePreferencesStep({ onNext, onPrevious, onSkip }: FeaturePreferencesStepProps) {
  const { data, updatePreferencesData, isStepValid } = useOnboardingStore()
  const [formData, setFormData] = useState(data.preferences)

  // Update store when form data changes
  useEffect(() => {
    updatePreferencesData(formData)
  }, [formData, updatePreferencesData])

  const handleModuleToggle = (moduleId: keyof typeof formData.modules) => {
    setFormData(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleId]: !prev.modules[moduleId]
      }
    }))
  }

  const handleIntegrationToggle = (integrationId: keyof typeof formData.integrations) => {
    setFormData(prev => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [integrationId]: !prev.integrations[integrationId]
      }
    }))
  }

  const selectRecommended = () => {
    // Select recommended features based on event intent
    const eventType = data.eventIntent.eventType
    const goals = data.eventIntent.primaryGoals
    
    let recommendedModules = {
      automation: true,
      certificates: goals.includes('certificates'),
      helpdesk: goals.includes('helpdesk'),
      plugins: false
    }

    let recommendedIntegrations = {
      stripe: goals.includes('registration'),
      zoom: eventType === 'workshop' || eventType === 'summit',
      whatsapp: true
    }

    setFormData(prev => ({
      ...prev,
      modules: recommendedModules,
      integrations: recommendedIntegrations
    }))
  }

  const isFormValid = isStepValid(4)

  return (
    <StepCard
      title="Customize your workspace"
      description="Choose the modules and integrations that fit your needs"
      onNext={onNext}
      onPrevious={onPrevious}
      onSkip={onSkip}
      isNextDisabled={!isFormValid}
      showSkip={true}
      nextLabel="Continue to Setup"
    >
      <div className="space-y-8">
        {/* Recommended Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={selectRecommended}
            className="flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Select Recommended</span>
          </Button>
        </div>

        {/* Modules Section */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Modules to Enable</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module) => {
              const Icon = module.icon
              const isEnabled = formData.modules[module.id]
              
              return (
                <div
                  key={module.id}
                  className={cn(
                    "flex items-start space-x-3 p-4 border rounded-lg transition-all",
                    isEnabled && "border-primary bg-primary/5"
                  )}
                >
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={() => handleModuleToggle(module.id)}
                    className="mt-1"
                  />
                  <div className="flex items-start space-x-3 flex-1">
                    <Icon className={cn(
                      "w-5 h-5 mt-0.5",
                      isEnabled ? "text-primary" : "text-muted-foreground"
                    )} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="font-medium">{module.label}</div>
                        <div className="group relative">
                          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-10">
                            {module.tooltip}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{module.description}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Integrations Section */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Preferred Integrations</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => {
              const Icon = integration.icon
              const isEnabled = formData.integrations[integration.id]
              
              return (
                <div
                  key={integration.id}
                  className={cn(
                    "flex items-start space-x-3 p-4 border rounded-lg transition-all",
                    isEnabled && "border-primary bg-primary/5"
                  )}
                >
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={() => handleIntegrationToggle(integration.id)}
                    className="mt-1"
                  />
                  <div className="flex items-start space-x-3 flex-1">
                    <Icon className={cn(
                      "w-5 h-5 mt-0.5",
                      isEnabled ? "text-primary" : "text-muted-foreground"
                    )} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="font-medium">{integration.label}</div>
                        <div className="group relative">
                          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-10">
                            {integration.tooltip}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{integration.description}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="text-sm text-muted-foreground">
            <div className="font-medium mb-2">Selected Features:</div>
            <div className="space-y-1">
              <div>
                Modules: {Object.entries(formData.modules)
                  .filter(([_, enabled]) => enabled)
                  .map(([key, _]) => modules.find(m => m.id === key)?.label)
                  .join(', ') || 'None selected'}
              </div>
              <div>
                Integrations: {Object.entries(formData.integrations)
                  .filter(([_, enabled]) => enabled)
                  .map(([key, _]) => integrations.find(i => i.id === key)?.label)
                  .join(', ') || 'None selected'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StepCard>
  )
}