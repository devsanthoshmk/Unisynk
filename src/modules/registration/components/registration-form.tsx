'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Minus, Users, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

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

interface RegistrationFormProps {
  form: RegistrationFormData
  token: string
  onSubmitted: (data: any) => void
}

export function RegistrationForm({ form, token, onSubmitted }: RegistrationFormProps) {
  const [registrationType, setRegistrationType] = useState<'individual' | 'team'>('individual')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Create dynamic schema based on form fields
  const createSchema = () => {
    const schemaFields: Record<string, z.ZodTypeAny> = {}
    
    form.fields.forEach(field => {
      let fieldSchema: z.ZodTypeAny
      
      switch (field.type) {
        case 'email':
          fieldSchema = z.string().email('Invalid email address')
          break
        case 'tel':
          fieldSchema = z.string().min(10, 'Phone number must be at least 10 digits')
          break
        case 'checkbox':
          fieldSchema = z.boolean()
          break
        default:
          fieldSchema = z.string().min(1, `${field.label} is required`)
      }
      
      if (!field.required) {
        fieldSchema = fieldSchema.optional()
      }
      
      schemaFields[field.id] = fieldSchema
    })

    // Add team members schema if team registration is enabled
    if (form.teamRegistrationEnabled) {
      schemaFields.teamMembers = z.array(z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email address')
      })).optional()
    }

    return z.object(schemaFields)
  }

  const schema = createSchema()
  type FormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const { fields: teamMembers, append: addTeamMember, remove: removeTeamMember } = useFieldArray({
    control,
    name: 'teamMembers' as any
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const submissionData = {
        ...data,
        registrationType,
        token,
        eventId: form.eventId,
        submittedAt: new Date().toISOString()
      }
      
      onSubmitted(submissionData)
    } catch (error) {
      console.error('Registration failed:', error)
      // Handle error appropriately
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: FormField) => {
    const error = errors[field.id as keyof FormData]
    
    switch (field.type) {
      case 'select':
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>{field.label} {field.required && '*'}</Label>
            <Select onValueChange={(value) => setValue(field.id as any, value)}>
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
            {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
          </div>
        )
      
      case 'textarea':
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>{field.label} {field.required && '*'}</Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              {...register(field.id as any)}
            />
            {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
          </div>
        )
      
      case 'checkbox':
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              {...register(field.id as any)}
            />
            <Label htmlFor={field.id}>{field.label} {field.required && '*'}</Label>
            {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
          </div>
        )
      
      default:
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>{field.label} {field.required && '*'}</Label>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.id as any)}
            />
            {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
          </div>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration Details</CardTitle>
        <p className="text-sm text-muted-foreground">
          Please fill out all required fields to complete your registration
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Registration Type Selection */}
          {form.teamRegistrationEnabled && (
            <div>
              <Label className="text-base font-medium">Registration Type</Label>
              <Tabs value={registrationType} onValueChange={(value) => setRegistrationType(value as 'individual' | 'team')}>
                <TabsList className="grid w-full grid-cols-2">
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

          {/* Main Registration Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {registrationType === 'team' ? 'Team Leader Details' : 'Your Details'}
            </h3>
            {form.fields.map(renderField)}
          </div>

          {/* Team Members Section */}
          {registrationType === 'team' && (
            <div className="space-y-4">
              <Separator />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Team Members</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addTeamMember({ name: '', email: '' })}
                  disabled={teamMembers.length >= form.maxTeamSize - 1}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Add up to {form.maxTeamSize - 1} additional team members (excluding team leader)
              </p>

              {teamMembers.map((member, index) => (
                <Card key={member.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Member {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTeamMember(index)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`teamMembers.${index}.name`}>Name *</Label>
                      <Input
                        {...register(`teamMembers.${index}.name` as any)}
                        placeholder="Enter member name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`teamMembers.${index}.email`}>Email *</Label>
                      <Input
                        type="email"
                        {...register(`teamMembers.${index}.email` as any)}
                        placeholder="Enter member email"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? 'Submitting Registration...' : 'Complete Registration'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}