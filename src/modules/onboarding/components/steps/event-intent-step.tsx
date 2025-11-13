"use client"

import { useState, useEffect } from "react"
import { 
  GraduationCap, 
  Users, 
  Wrench, 
  Megaphone, 
  MoreHorizontal,
  UserCheck,
  Award,
  Heart,
  HelpCircle,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { StepCard } from "../step-card"
// TODO: Rebuild onboarding store`n// import { useOnboardingStore } from "@/lib/stores/onboarding-store"
import { cn } from "@/lib/utils"

interface EventIntentStepProps {
  onNext: () => void
  onPrevious: () => void
  onSkip?: () => void
}

const eventTypes = [
  { id: 'college-fest', label: 'College Fest', icon: GraduationCap, description: 'Cultural and technical festivals' },
  { id: 'summit', label: 'Summit', icon: Users, description: 'Professional conferences and summits' },
  { id: 'workshop', label: 'Workshop', icon: Wrench, description: 'Educational workshops and training' },
  { id: 'campaign', label: 'Campaign', icon: Megaphone, description: 'Marketing and awareness campaigns' },
  { id: 'other', label: 'Other', icon: MoreHorizontal, description: 'Custom event types' },
] as const

const primaryGoals = [
  { id: 'registration', label: 'Registration', icon: UserCheck, description: 'Manage event registrations' },
  { id: 'certificates', label: 'Certificates', icon: Award, description: 'Issue digital certificates' },
  { id: 'engagement', label: 'Engagement', icon: Heart, description: 'Boost participant engagement' },
  { id: 'helpdesk', label: 'Helpdesk', icon: HelpCircle, description: 'Provide customer support' },
] as const

export function EventIntentStep({ onNext, onPrevious, onSkip }: EventIntentStepProps) {
  const { data, updateEventIntentData, isStepValid } = useOnboardingStore()
  const [formData, setFormData] = useState(data.eventIntent)
  const [errors, setErrors] = useState<string[]>([])

  // Update store when form data changes
  useEffect(() => {
    updateEventIntentData(formData)
  }, [formData, updateEventIntentData])

  // Validate form
  useEffect(() => {
    const newErrors: string[] = []
    
    if (!formData.eventType) {
      newErrors.push("Please select an event type")
    }
    
    if (formData.primaryGoals.length === 0 && !formData.isExploring) {
      newErrors.push("Please select at least one primary goal or toggle 'I'm just exploring'")
    }
    
    setErrors(newErrors)
  }, [formData.eventType, formData.primaryGoals, formData.isExploring])

  const handleEventTypeSelect = (eventType: typeof formData.eventType) => {
    setFormData(prev => ({ ...prev, eventType }))
  }

  const handleGoalToggle = (goalId: typeof primaryGoals[number]['id']) => {
    setFormData(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goalId)
        ? prev.primaryGoals.filter(g => g !== goalId)
        : [...prev.primaryGoals, goalId]
    }))
  }

  const handleParticipantCountChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, estimatedParticipants: value[0] }))
  }

  const handleExploringToggle = (isExploring: boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      isExploring,
      // Clear goals if just exploring
      primaryGoals: isExploring ? [] : prev.primaryGoals
    }))
  }

  const getParticipantLabel = (count: number) => {
    if (count < 50) return `${count} participants`
    if (count < 100) return `${count} participants`
    if (count < 500) return `${count} participants`
    if (count < 1000) return `${count} participants`
    if (count < 5000) return `${Math.round(count / 1000)}K participants`
    return `${Math.round(count / 1000)}K+ participants`
  }

  const isFormValid = isStepValid(3)

  return (
    <StepCard
      title="What's your event vision?"
      description="Help us understand what you're planning so we can tailor your experience"
      onNext={onNext}
      onPrevious={onPrevious}
      onSkip={onSkip}
      isNextDisabled={!isFormValid}
      showSkip={true}
      errors={errors}
    >
      <div className="space-y-8">
        {/* Event Type Selection */}
        <div className="space-y-4">
          <Label className="text-base font-medium">What type of event are you planning? *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {eventTypes.map((type) => {
              const Icon = type.icon
              const isSelected = formData.eventType === type.id
              
              return (
                <Button
                  key={type.id}
                  variant="outline"
                  onClick={() => handleEventTypeSelect(type.id)}
                  className={cn(
                    "h-auto p-4 flex flex-col items-center space-y-2 text-center transition-all",
                    isSelected && "border-primary bg-primary/5 text-primary"
                  )}
                >
                  <Icon className="w-8 h-8" />
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs text-muted-foreground">{type.description}</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Participant Count */}
        <div className="space-y-4">
          <Label className="text-base font-medium">
            How many participants do you expect?
          </Label>
          <div className="space-y-4">
            <Slider
              value={[formData.estimatedParticipants]}
              onValueChange={handleParticipantCountChange}
              max={10000}
              min={10}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>10</span>
              <span className="font-medium text-foreground">
                {getParticipantLabel(formData.estimatedParticipants)}
              </span>
              <span>10K+</span>
            </div>
          </div>
        </div>

        {/* Exploring Toggle */}
        <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
          <Switch
            id="exploring"
            checked={formData.isExploring}
            onCheckedChange={handleExploringToggle}
          />
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-muted-foreground" />
            <Label htmlFor="exploring" className="text-sm font-medium cursor-pointer">
              I'm just exploring Unisynk's features
            </Label>
          </div>
        </div>

        {/* Primary Goals */}
        {!formData.isExploring && (
          <div className="space-y-4">
            <Label className="text-base font-medium">
              What are your primary goals? * (Select all that apply)
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {primaryGoals.map((goal) => {
                const Icon = goal.icon
                const isSelected = formData.primaryGoals.includes(goal.id)
                
                return (
                  <div
                    key={goal.id}
                    className={cn(
                      "flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted/30",
                      isSelected && "border-primary bg-primary/5"
                    )}
                    onClick={() => handleGoalToggle(goal.id)}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleGoalToggle(goal.id)}
                      className="mt-0.5"
                    />
                    <div className="flex items-start space-x-3 flex-1">
                      <Icon className="w-5 h-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{goal.label}</div>
                        <div className="text-sm text-muted-foreground">{goal.description}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Dynamic Illustration Placeholder */}
        {formData.eventType && (
          <div className="text-center py-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
            <div className="text-4xl mb-2">
              {formData.eventType === 'college-fest' && '🎓'}
              {formData.eventType === 'summit' && '👥'}
              {formData.eventType === 'workshop' && '🔧'}
              {formData.eventType === 'campaign' && '📢'}
              {formData.eventType === 'other' && '✨'}
            </div>
            <p className="text-sm text-muted-foreground">
              Perfect! We'll customize Unisynk for your {eventTypes.find(t => t.id === formData.eventType)?.label.toLowerCase()}
            </p>
          </div>
        )}
      </div>
    </StepCard>
  )
}