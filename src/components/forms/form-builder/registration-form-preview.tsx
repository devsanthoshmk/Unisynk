'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Users, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

interface FormField {
  id: string
  type: 'text' | 'email' | 'tel' | 'select' | 'checkbox' | 'textarea' | 'file'
  label: string
  required: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

interface FormSettings {
  tokenRequired: boolean
  teamRegistrationEnabled: boolean
  maxTeamSize: number
  redirectUrl: string
  confirmationMessage: string
}

interface FormData {
  fields: FormField[]
  settings: FormSettings
  conditionalLogic: any[]
}

interface RegistrationFormPreviewProps {
  form: FormData
}

export function RegistrationFormPreview({ form }: RegistrationFormPreviewProps) {
  const [registrationType, setRegistrationType] = useState<'individual' | 'team'>('individual')
  const { register, handleSubmit, setValue } = useForm()

  const onSubmit = (data: any) => {
    alert('This is preview mode. Form submission is disabled.')
  }

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select onValueChange={(value) => setValue(field.id, value)}>
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      
      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              {...register(field.id)}
            />
          </div>
        )
      
      case 'checkbox':
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <Checkbox id={field.id} {...register(field.id)} />
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
          </div>
        )
      
      case 'file':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                (File upload disabled in preview mode)
              </p>
            </div>
          </div>
        )
      
      default:
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.id)}
            />
          </div>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Registration Form Preview
          <Badge variant="outline">Preview Mode</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          This is how your form will appear to users
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Registration Type Selection */}
          {form.settings.teamRegistrationEnabled && (
            <div>
              <Label className="text-base font-medium">Registration Type</Label>
              <Tabs value={registrationType} onValueChange={(value) => setRegistrationType(value as 'individual' | 'team')}>
                <TabsList className="grid w-full grid-cols-2 mt-2">
                  <TabsTrigger value="individual" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Individual
                  </TabsTrigger>
                  <TabsTrigger value="team" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Team
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {registrationType === 'team' ? 'Team Leader Details' : 'Your Details'}
            </h3>
            {form.fields.map(renderField)}
          </div>

          {/* Team Members Section */}
          {registrationType === 'team' && (
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Team Members</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add up to {form.settings.maxTeamSize - 1} additional team members
                </p>
                
                <Card className="p-4">
                  <h4 className="font-medium mb-3">Member 1</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name *</Label>
                      <Input placeholder="Enter member name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input type="email" placeholder="Enter member email" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" className="w-full" size="lg">
              Complete Registration (Preview Mode)
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Form submissions are disabled in preview mode
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}