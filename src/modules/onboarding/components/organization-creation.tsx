"use client"

import { useState, useEffect } from "react"
import { Building2, Upload, Check, X, Globe, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface OrganizationCreationProps {
  onOrgCreated: (orgData: any) => void
  onSkip: () => void
}

interface OrgFormData {
  name: string
  slug: string
  logo?: File | string
  website?: string
  timezone: string
  language: string
}

const timezones = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Europe/Paris", label: "Paris (CET)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)" },
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "Australia/Sydney", label: "Sydney (AEDT)" },
]

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "hi", label: "Hindi" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
]

export function OrganizationCreation({ onOrgCreated, onSkip }: OrganizationCreationProps) {
  const [formData, setFormData] = useState<OrgFormData>({
    name: "",
    slug: "",
    logo: undefined,
    website: "",
    timezone: "UTC",
    language: "en"
  })
  
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validate form
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
        const isAvailable = !['admin', 'root', 'api', 'www', 'test', 'app'].includes(formData.slug.toLowerCase())
        setSlugStatus(isAvailable ? 'available' : 'taken')
        if (!isAvailable) {
          setErrors(prev => [...prev.filter(e => !e.includes('Slug')), 'Slug is already taken'])
        }
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [formData.name, formData.slug, formData.website])

  const handleInputChange = (field: keyof OrgFormData, value: string) => {
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
        setFormData(prev => ({ ...prev, logo: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (errors.length > 0 || slugStatus !== 'available') {
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/orgs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        onOrgCreated(result.organization)
      } else {
        setErrors([result.error || 'Failed to create organization'])
      }
    } catch (error) {
      console.error('Failed to create organization:', error)
      setErrors(['Failed to create organization. Please try again.'])
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.name.length >= 2 && 
                     formData.slug.length >= 3 && 
                     slugStatus === 'available' && 
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
              Step 1 of 2: Organization Setup
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold">Create Your Organization</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Set up your organization to get started with Unisynk
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
                      Your organization will be available at: {formData.slug || 'your-slug'}.unisynk.com
                    </p>
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
                    <Label htmlFor="website" className="text-sm font-medium">
                      Website URL (Optional)
                    </Label>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Timezone
                      </Label>
                      <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Language</Label>
                      <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                          {formData.slug || "your-slug"}.unisynk.com
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

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  variant="ghost"
                  onClick={onSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Skip for now
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Creating Organization...
                    </>
                  ) : (
                    'Create Organization'
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