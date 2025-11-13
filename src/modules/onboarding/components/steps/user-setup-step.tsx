"use client"

import { useState, useEffect } from "react"
import { User, Upload, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { StepCard } from "../step-card"
// TODO: Rebuild onboarding store`n// import { useOnboardingStore } from "@/lib/stores/onboarding-store"
import { cn } from "@/lib/utils"

interface UserSetupStepProps {
  onNext: () => void
  onPrevious: () => void
  onSkip?: () => void
}

export function UserSetupStep({ onNext, onPrevious, onSkip }: UserSetupStepProps) {
  const { data, updateUserData, isStepValid } = useOnboardingStore()
  const [formData, setFormData] = useState(data.user)
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
  const [errors, setErrors] = useState<string[]>([])

  // Update store when form data changes
  useEffect(() => {
    updateUserData(formData)
  }, [formData, updateUserData])

  // Validate form and check username availability
  useEffect(() => {
    const newErrors: string[] = []
    
    if (formData.fullName.length < 2) {
      newErrors.push("Full name must be at least 2 characters long")
    }
    
    if (formData.username.length < 3) {
      newErrors.push("Username must be at least 3 characters long")
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.push("Username can only contain letters, numbers, hyphens, and underscores")
    }
    
    setErrors(newErrors)
    
    // Simulate username availability check
    if (formData.username.length >= 3 && /^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      setUsernameStatus('checking')
      const timer = setTimeout(() => {
        // Simulate API call - in real app, this would be an actual API call
        const isAvailable = !['admin', 'root', 'user', 'test'].includes(formData.username.toLowerCase())
        setUsernameStatus(isAvailable ? 'available' : 'taken')
        if (!isAvailable) {
          setErrors(prev => [...prev.filter(e => !e.includes('Username')), 'Username is already taken'])
        }
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [formData.fullName, formData.username])

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateUsername = () => {
    if (formData.fullName) {
      const username = formData.fullName
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 20)
      handleInputChange('username', username)
    }
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you'd upload this to your storage service
      const reader = new FileReader()
      reader.onload = (e) => {
        handleInputChange('avatar', e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const isFormValid = isStepValid(1) && usernameStatus === 'available'

  return (
    <StepCard
      title="Let's get to know you"
      description="Set up your personal profile to get started with Unisynk"
      onNext={onNext}
      onPrevious={onPrevious}
      onSkip={onSkip}
      isNextDisabled={!isFormValid}
      showPrevious={false}
      showSkip={true}
      errors={errors}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={cn(
                formData.fullName.length > 0 && formData.fullName.length < 2 && "border-red-500"
              )}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="username" className="text-sm font-medium">
                Username *
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={generateUsername}
                disabled={!formData.fullName}
                className="text-xs"
              >
                Generate from name
              </Button>
            </div>
            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder="john_doe"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className={cn(
                  "pr-10",
                  usernameStatus === 'taken' && "border-red-500",
                  usernameStatus === 'available' && "border-green-500"
                )}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {usernameStatus === 'checking' && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                )}
                {usernameStatus === 'available' && (
                  <Check className="h-4 w-4 text-green-500" />
                )}
                {usernameStatus === 'taken' && (
                  <X className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
            {usernameStatus === 'available' && (
              <p className="text-xs text-green-600">Username is available!</p>
            )}
            {usernameStatus === 'taken' && (
              <p className="text-xs text-red-600">Username is already taken</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar" className="text-sm font-medium">
              Profile Picture (Optional)
            </Label>
            <div className="flex items-center space-x-4">
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('avatar')?.click()}
                className="flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Photo</span>
              </Button>
              {formData.avatar && (
                <span className="text-sm text-green-600">Photo uploaded!</span>
              )}
            </div>
          </div>
        </div>

        {/* Profile Preview */}
        <div className="flex items-center justify-center">
          <Card className="p-6 w-full max-w-sm">
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center overflow-hidden">
                {formData.avatar ? (
                  <img 
                    src={formData.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {formData.fullName || "Your Name"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  @{formData.username || "username"}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                Profile Preview
              </div>
            </div>
          </Card>
        </div>
      </div>
    </StepCard>
  )
}