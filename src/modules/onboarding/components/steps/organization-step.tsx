"use client"

import { useState, useEffect } from "react"
import { Building2, Upload, Check, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { StepCard } from "../step-card"
// TODO: Rebuild onboarding store`n// import { useOnboardingStore } from "@/lib/stores/onboarding-store"
import { cn } from "@/lib/utils"

interface OrganizationStepProps {
  onNext: () => void
  onPrevious: () => void
  onSkip?: () => void
}

export function OrganizationStep({ onNext, onPrevious, onSkip }: OrganizationStepProps) {
  const { data, updateOrganizationData, isStepValid } = useOnboardingStore()
  const [formData, setFormData] = useState(data.organization)
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
  const [errors, setErrors] = useState<string[]>([])

  // Update store when form data changes
  useEffect(() => {
    updateOrganizationData(formData)
  }, [formData, updateOrganizationData])

  // Validate form and check slug availability
  useEffect(() => {
    const newErrors: string[] = []
    
    if (formData.name.length < 2) {
      newErrors.push("Organization name must be at least 2 characters long")
    }
    
    if (formData.slug.length < 3) {
      newErrors.push("Slug must be at least 3 characters long")
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.slug)) {
      newErrors.push("Slug can only contain letters, numbers, hyphens, and underscores")
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.push("Website URL must start with http:// or https://")
    }
    
    setErrors(newErrors)
    
    // Simulate slug availability check
    if (formData.slug.length >= 3 && /^[a-zA-Z0-9_-]+$/.test(formData.slug)) {
      setSlugStatus('checking')
      const timer = setTimeout(() => {
        // Simulate API call - in real app, this would be an actual API call
        const isAvailable = !['admin', 'root', 'api', 'www', 'test'].includes(formData.slug.toLowerCase())
        setSlugStatus(isAvailable ? 'available' : 'taken')
        if (!isAvailable) {
          setErrors(prev => [...prev.filter(e => !e.includes('Slug')), 'Slug is already taken'])
        }
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [formData.name, formData.slug, formData.website])

  const handleInputChange = (field: keyof typeof formData, value: string) => {
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

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you'd upload this to your storage service
      const reader = new FileReader()
      reader.onload = (e) => {
        handleInputChange('logo', e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const isFormValid = isStepValid(2) && slugStatus === 'available'

  return (
    <StepCard
      title="Set up your organization"
      description="Tell us about your organization to create your workspace"
      onNext={onNext}
      onPrevious={onPrevious}
      onSkip={onSkip}
      isNextDisabled={!isFormValid}
      showSkip={true}
      errors={errors}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="orgName" className="text-sm font-medium">
              Organization Name *
            </Label>
            <Input
              id="orgName"
              type="text"
              placeholder="Acme University"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={cn(
                formData.name.length > 0 && formData.name.length < 2 && "border-red-500"
              )}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="orgSlug" className="text-sm font-medium">
                Organization Slug *
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
                id="orgSlug"
                type="text"
                placeholder="acme-university"
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
              Your organization will be available at: unisynk.com/{formData.slug || 'your-slug'}
            </p>
            {slugStatus === 'available' && (
              <p className="text-xs text-green-600">Slug is available!</p>
            )}
            {slugStatus === 'taken' && (
              <p className="text-xs text-red-600">Slug is already taken</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="orgLogo" className="text-sm font-medium">
              Organization Logo (Optional)
            </Label>
            <div className="flex items-center space-x-4">
              <input
                id="orgLogo"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('orgLogo')?.click()}
                className="flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Logo</span>
              </Button>
              {formData.logo && (
                <span className="text-sm text-green-600">Logo uploaded!</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="website" className="text-sm font-medium">
                Website URL (Optional)
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleInputChange('website', '')}
                className="text-xs"
              >
                Skip
              </Button>
            </div>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="website"
                type="url"
                placeholder="https://acme-university.edu"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Organization Preview */}
        <div className="flex items-center justify-center">
          <Card className="p-6 w-full max-w-sm">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center overflow-hidden">
                {formData.logo ? (
                  <img 
                    src={formData.logo} 
                    alt="Organization Logo" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {formData.name || "Your Organization"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  unisynk.com/{formData.slug || "your-slug"}
                </p>
                {formData.website && (
                  <p className="text-xs text-blue-600 hover:underline cursor-pointer mt-1">
                    {formData.website}
                  </p>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                Organization Preview
              </div>
            </div>
          </Card>
        </div>
      </div>
    </StepCard>
  )
}