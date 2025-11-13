'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Download, Share2, Calendar, Mail, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface ConfirmationScreenProps {
  eventName: string
  registrationData: any
  eventSlug: string
}

export function ConfirmationScreen({ eventName, registrationData, eventSlug }: ConfirmationScreenProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  
  const registrationId = `REG-${Date.now()}`
  const qrCodeUrl = `/api/qr/${registrationId}` // Mock QR code URL
  
  const handleDownloadTicket = async () => {
    setIsDownloading(true)
    // Mock download - replace with actual implementation
    setTimeout(() => {
      setIsDownloading(false)
      // In real implementation, this would generate and download the ticket
      alert('Ticket downloaded successfully!')
    }, 1000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I'm registered for ${eventName}!`,
          text: `Just registered for ${eventName}. Looking forward to it!`,
          url: window.location.origin + `/events/${eventSlug}`
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.origin + `/events/${eventSlug}`)
      alert('Event link copied to clipboard!')
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="text-center">
        <CardContent className="pt-8 pb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            Registration Successful!
          </h1>
          <p className="text-muted-foreground">
            You're all set for {eventName}
          </p>
        </CardContent>
      </Card>

      {/* Registration Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Registration Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Registration ID:</span>
              <p className="font-mono font-medium">{registrationId}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Registration Type:</span>
              <p className="font-medium capitalize">{registrationData.registrationType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Registered At:</span>
              <p className="font-medium">
                {new Date(registrationData.submittedAt).toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <Badge variant="default">Confirmed</Badge>
            </div>
          </div>

          <Separator />

          {/* Attendee Information */}
          <div>
            <h3 className="font-medium mb-3">Attendee Information</h3>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <p className="font-medium">{registrationData.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <p className="font-medium">{registrationData.email}</p>
                </div>
              </div>
              {registrationData.phone && (
                <div>
                  <span className="text-muted-foreground">Phone:</span>
                  <p className="font-medium">{registrationData.phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Team Members (if applicable) */}
          {registrationData.registrationType === 'team' && registrationData.teamMembers?.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="font-medium mb-3">Team Members</h3>
                <div className="space-y-2">
                  {registrationData.teamMembers.map((member: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{member.name}</span>
                      <span className="text-muted-foreground">{member.email}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          onClick={handleDownloadTicket}
          disabled={isDownloading}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          {isDownloading ? 'Generating...' : 'Download Ticket'}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleShare}
          className="w-full"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Event
        </Button>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Check Your Email</p>
                <p className="text-sm text-muted-foreground">
                  We've sent a confirmation email with your ticket and event details.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Add to Calendar</p>
                <p className="text-sm text-muted-foreground">
                  Don't forget to add the event to your calendar so you don't miss it!
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium">Join Event Updates</p>
                <p className="text-sm text-muted-foreground">
                  Stay updated with event announcements and last-minute changes.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Back to Event */}
      <div className="text-center">
        <Button variant="outline" asChild>
          <Link href={`/events/${eventSlug}`}>
            Back to Event Page
          </Link>
        </Button>
      </div>
    </div>
  )
}