'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Calendar, ExternalLink, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { CustomSiteRequest } from '../../types'

const customSiteSchema = z.object({
  orgName: z.string().min(1, 'Organization name is required'),
  eventName: z.string().min(1, 'Event name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().optional(),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  brandGuidelines: z.string().optional(),
  desiredFeatures: z.array(z.string()).min(1, 'Select at least one feature'),
  budgetRange: z.string().optional(),
  timeline: z.string().min(1, 'Timeline is required'),
  additionalNotes: z.string().optional()
})

type CustomSiteFormData = z.infer<typeof customSiteSchema>

interface CustomSiteRequestProps {
  eventId: string
  existingRequest?: CustomSiteRequest
}

const availableFeatures = [
  'Custom Design & Branding',
  'Advanced Registration System',
  'Payment Integration',
  'Multi-language Support',
  'Live Streaming Integration',
  'Mobile App',
  'Analytics Dashboard',
  'CRM Integration',
  'Email Marketing',
  'Social Media Integration',
  'Custom Domain',
  'White-label Solution'
]

const budgetRanges = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  'Above $50,000',
  'Let\'s discuss'
]

const timelineOptions = [
  '1-2 weeks',
  '3-4 weeks',
  '1-2 months',
  '2-3 months',
  'Flexible'
]

export function CustomSiteRequest({ eventId, existingRequest }: CustomSiteRequestProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(!!existingRequest)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    existingRequest?.desiredFeatures || []
  )

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CustomSiteFormData>({
    resolver: zodResolver(customSiteSchema),
    defaultValues: existingRequest ? {
      orgName: existingRequest.orgName,
      eventName: existingRequest.eventName,
      contactName: existingRequest.contactName,
      contactEmail: existingRequest.contactEmail,
      contactPhone: existingRequest.contactPhone,
      websiteUrl: existingRequest.websiteUrl,
      brandGuidelines: existingRequest.brandGuidelines,
      desiredFeatures: existingRequest.desiredFeatures,
      budgetRange: existingRequest.budgetRange,
      timeline: existingRequest.timeline,
      additionalNotes: existingRequest.additionalNotes
    } : undefined
  })

  const toggleFeature = (feature: string) => {
    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter(f => f !== feature)
      : [...selectedFeatures, feature]
    
    setSelectedFeatures(newFeatures)
    setValue('desiredFeatures', newFeatures)
  }

  const onSubmit = async (data: CustomSiteFormData) => {
    setIsSubmitting(true)
    
    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Custom site request:', { eventId, ...data })
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Failed to submit request:', error)
      alert('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="pt-8 pb-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">
              Request Submitted Successfully!
            </h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest in a custom microsite. Our team will review your request and get back to you within 24 hours.
            </p>
            
            {existingRequest && (
              <div className="bg-muted p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span>Request ID:</span>
                  <Badge variant="outline">{existingRequest.id || 'REQ-' + Date.now()}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span>Status:</span>
                  <Badge variant={existingRequest.status === 'pending' ? 'secondary' : 'default'}>
                    {existingRequest.status}
                  </Badge>
                </div>
              </div>
            )}
            
            <div className="flex gap-3 justify-center">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule a Call
              </Button>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Request Custom Microsite</h1>
        <p className="text-lg text-muted-foreground">
          Get a fully custom-built microsite designed specifically for your event by our expert team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="orgName">Organization Name *</Label>
                      <Input
                        id="orgName"
                        {...register('orgName')}
                        placeholder="Your organization name"
                      />
                      {errors.orgName && (
                        <p className="text-sm text-red-600 mt-1">{errors.orgName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="eventName">Event Name *</Label>
                      <Input
                        id="eventName"
                        {...register('eventName')}
                        placeholder="Your event name"
                      />
                      {errors.eventName && (
                        <p className="text-sm text-red-600 mt-1">{errors.eventName.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        {...register('contactName')}
                        placeholder="Your full name"
                      />
                      {errors.contactName && (
                        <p className="text-sm text-red-600 mt-1">{errors.contactName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="contactEmail">Email Address *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        {...register('contactEmail')}
                        placeholder="your@email.com"
                      />
                      {errors.contactEmail && (
                        <p className="text-sm text-red-600 mt-1">{errors.contactEmail.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactPhone">Phone Number</Label>
                      <Input
                        id="contactPhone"
                        {...register('contactPhone')}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="websiteUrl">Current Website</Label>
                      <Input
                        id="websiteUrl"
                        {...register('websiteUrl')}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Project Requirements</h3>
                  
                  <div>
                    <Label>Desired Features *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {availableFeatures.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature}
                            checked={selectedFeatures.includes(feature)}
                            onCheckedChange={() => toggleFeature(feature)}
                          />
                          <Label htmlFor={feature} className="text-sm">
                            {feature}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.desiredFeatures && (
                      <p className="text-sm text-red-600 mt-1">{errors.desiredFeatures.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budgetRange">Budget Range</Label>
                      <Select onValueChange={(value) => setValue('budgetRange', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="timeline">Timeline *</Label>
                      <Select onValueChange={(value) => setValue('timeline', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map((timeline) => (
                            <SelectItem key={timeline} value={timeline}>
                              {timeline}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.timeline && (
                        <p className="text-sm text-red-600 mt-1">{errors.timeline.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="brandGuidelines">Brand Guidelines / Design References</Label>
                    <Textarea
                      id="brandGuidelines"
                      {...register('brandGuidelines')}
                      placeholder="Share any brand guidelines, color schemes, or design references..."
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      {...register('additionalNotes')}
                      placeholder="Any additional requirements or special requests..."
                      rows={3}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Submitting Request...' : 'Submit Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* What to Expect */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What to Expect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium">Initial Consultation</p>
                  <p className="text-muted-foreground">We'll schedule a call to discuss your requirements in detail</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium">Proposal & Timeline</p>
                  <p className="text-muted-foreground">Receive a detailed proposal with timeline and pricing</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium">Design & Development</p>
                  <p className="text-muted-foreground">Our team creates your custom microsite</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">4</span>
                </div>
                <div>
                  <p className="font-medium">Launch & Support</p>
                  <p className="text-muted-foreground">Go live with ongoing support and maintenance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sample Work */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sample Work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <ExternalLink className="w-4 h-4 mr-2" />
                Tech Conference 2024
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <ExternalLink className="w-4 h-4 mr-2" />
                University Fest
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <ExternalLink className="w-4 h-4 mr-2" />
                Corporate Summit
              </Button>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule a Call
              </Button>
              <p className="text-sm text-muted-foreground">
                Have questions? Schedule a free consultation call with our team.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}