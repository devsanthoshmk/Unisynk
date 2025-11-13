"use client"

import { useState, useEffect } from "react"
import { 
  Calendar, 
  MapPin, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  Megaphone, 
  MoreHorizontal,
  UserCheck,
  Award,
  Heart,
  HelpCircle,
  ArrowLeft,
  Check,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface EventCreationProps {
  onEventCreated: (eventData: any) => void
  onBack: () => void
}

interface EventFormData {
  name: string
  slug: string
  startDate: string
  endDate: string
  venue: string
  eventType: 'college-fest' | 'summit' | 'workshop' | 'campaign' | 'other' | ''
  estimatedParticipants: number
  goals: ('registration' | 'certificates' | 'engagement' | 'helpdesk')[]
}

const eventTypes = [
  { id: 'college-fest', label: 'College Fest', icon: GraduationCap, description: 'Cultural and technical festivals' },
  { id: 'summit', label: 'Summit', icon: Briefcase, description: 'Professional conferences and summits' },
  { id: 'workshop', label: 'Workshop', icon: Wrench, description: 'Educational workshops and training' },
  { id: 'campaign', label: 'Campaign', icon: Megaphone, description: 'Marketing and awareness campaigns' },
  { id: 'other', label: 'Other', icon: MoreHorizontal, description: 'Custom event types' },
] as const

const goals = [
  { id: 'registration', label: 'Registration', icon: UserCheck, description: 'Manage event registrations' },
  { id: 'certificates', label: 'Certificates', icon: Award, description: 'Issue digital certificates' },
  { id: 'engagement', label: 'Engagement', icon: Heart, description: 'Boost participant engagement' },
  { id: 'helpdesk', label: 'Helpdesk', icon: HelpCircle, description: 'Provide customer support' },
] as const

export function EventCreation({ onEventCreated, onBack }: EventCreationProps) {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    slug: "",
    startDate: "",
    endDate: "",
    venue: "",
    eventType: '',
    estimatedParticipants: 100,
    goals: []
  })
  
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get current org from localStorage
  const [currentOrg, setCurrentOrg] = useState<any>(null)
  
  useEffect(() => {
    const orgData = localStorage.getItem("currentOrg")
    if (orgData) {
      setCurrentOrg(JSON.parse(orgData))
    }
  }, [])

  // Validate form
  useEffect(() => {
    const newErrors: string[] = []
    
    if (formData.name.length < 2) {
      newErrors.push("Event name must be at least 2 characters long")
    }
    
    if (formData.slug.length < 3) {
      newErrors.push("Slug must be at least 3 characters long")
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.slug)) {
      newErrors.push("Slug can only contain letters, numbers, hyphens, and underscores")
    }

    if (!formData.eventType) {
      newErrors.push("Please select an event type")
    }

    if (formData.goals.length === 0) {
      newErrors.push("Please select at least one goal")
    }

    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.push("End date must be after start date")
    }
    
    setErrors(newErrors)
    
    // Simulate slug availability check
    if (formData.slug.length >= 3 && /^[a-zA-Z0-9_-]+$/.test(formData.slug)) {
      setSlugStatus('checking')
      const timer = setTimeout(() => {
        // Simulate API call - in real app, this would be an actual API call
        const isAvailable = !['admin', 'root', 'api', 'www', 'test', 'app'].includes(formData.slug.toLowerCase())
        setSlugStatus(isAvailable ? 'available' : 'taken')
        if (!isAvailable) {
          setErrors(prev => [...prev.filter(e => !e.includes('Slug')), 'Slug is already taken'])
        }
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [formData])

  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateSlug = () => {
    if (formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 30)
      handleInputChange('slug', slug)
    }
  }

  const handleGoalToggle = (goalId: typeof goals[number]['id']) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }))
  }

  const handleParticipantCountChange = (value: number[]) => {
    handleInputChange('estimatedParticipants', value[0])
  }

  const getParticipantLabel = (count: number) => {
    if (count < 50) return `${count} participants`
    if (count < 100) return `${count} participants`
    if (count < 500) return `${count} participants`
    if (count < 1000) return `${count} participants`
    if (count < 5000) return `${Math.round(count / 1000)}K participants`
    return `${Math.round(count / 1000)}K+ participants`
  }

  const handleSubmit = async () => {
    if (errors.length > 0 || slugStatus !== 'available') {
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          organizationId: currentOrg?.id
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        onEventCreated(result.event)
      } else {
        setErrors([result.error || 'Failed to create event'])
      }
    } catch (error) {
      console.error('Failed to create event:', error)
      setErrors(['Failed to create event. Please try again.'])
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.name.length >= 2 && 
                     formData.slug.length >= 3 && 
                     slugStatus === 'available' && 
                     formData.eventType !== '' &&
                     formData.goals.length > 0 &&
                     errors.length === 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-primary" />
              <span className="font-bold text-xl">unisynk</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Step 2 of 2: Event Setup
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold">Create Your First Event</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {currentOrg ? `Set up your first event for ${currentOrg.name}` : 'Set up your first event'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
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

              {/* Basic Event Info */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="eventName" className="text-sm font-medium">
                      Event Name *
                    </Label>
                    <Input
                      id="eventName"
                      type="text"
                      placeholder="Tech Fest 2024"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={cn(
                        formData.name.length > 0 && formData.name.length < 2 && "border-red-500"
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="eventSlug" className="text-sm font-medium">
                        Event Slug *
                      </Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={generateSlug}
                        disabled={!formData.name}
                        className="text-xs"
                      >
                        Generate from name
                      </Button>
                    </div>
                    <div className="relative">
                      <Input
                        id="eventSlug"
                        type="text"
                        placeholder="tech-fest-2024"
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        className={cn(
                          "pr-10",
                          slugStatus === 'taken' && "border-red-500",
                          slugStatus === 'available' && "border-green-500"
                        )}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {slugStatus === 'checking' && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                        )}
                        {slugStatus === 'available' && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                        {slugStatus === 'taken' && (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Event URL: {currentOrg?.slug || 'your-org'}.unisynk.com/{formData.slug || 'event-slug'}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sm font-medium">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-sm font-medium">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue" className="text-sm font-medium">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Venue (Optional)
                    </Label>
                    <Input
                      id="venue"
                      type="text"
                      placeholder="Main Auditorium"
                      value={formData.venue}
                      onChange={(e) => handleInputChange('venue', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Event Type Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Event Type *</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {eventTypes.map((type) => {
                    const Icon = type.icon
                    const isSelected = formData.eventType === type.id
                    
                    return (
                      <Button
                        key={type.id}
                        variant="outline"
                        onClick={() => handleInputChange('eventType', type.id)}
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
                <h3 className="text-lg font-semibold">
                  <Users className="w-5 h-5 inline mr-2" />
                  Expected Participants
                </h3>
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

              {/* Goals Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Primary Goals * (Select all that apply)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {goals.map((goal) => {
                    const Icon = goal.icon
                    const isSelected = formData.goals.includes(goal.id)
                    
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

              {/* Event Preview */}
              {formData.name && formData.eventType && (
                <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {formData.eventType === 'college-fest' && '🎓'}
                      {formData.eventType === 'summit' && '💼'}
                      {formData.eventType === 'workshop' && '🔧'}
                      {formData.eventType === 'campaign' && '📢'}
                      {formData.eventType === 'other' && '✨'}
                    </div>
                    <h4 className="font-semibold text-lg">{formData.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {eventTypes.find(t => t.id === formData.eventType)?.label} • {getParticipantLabel(formData.estimatedParticipants)}
                    </p>
                    {formData.startDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(formData.startDate).toLocaleDateString()} 
                        {formData.endDate && formData.endDate !== formData.startDate && 
                          ` - ${new Date(formData.endDate).toLocaleDateString()}`}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Organization</span>
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Creating Event...
                    </>
                  ) : (
                    'Create Event & Launch Dashboard'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}