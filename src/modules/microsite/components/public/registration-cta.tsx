'use client'

import Link from 'next/link'
import { ArrowRight, Users, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface RegistrationCTAProps {
  eventSlug: string
  enabled: boolean
  className?: string
}

export function RegistrationCTA({ eventSlug, enabled, className }: RegistrationCTAProps) {
  if (!enabled) {
    return (
      <section className={cn("py-16 bg-muted/50", className)}>
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Registration Closed</h2>
              <p className="text-muted-foreground">
                Registration for this event is currently closed. 
                Check back later or contact the organizers for more information.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className={cn("py-16 bg-primary text-primary-foreground", className)}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Secure your spot at this amazing event. Registration is quick and easy!
          </p>
          
          {/* Registration Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-5 h-5" />
              <span>Quick 2-minute signup</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Users className="w-5 h-5" />
              <span>Team registration available</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <ArrowRight className="w-5 h-5" />
              <span>Instant confirmation</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-4 h-auto"
            asChild
          >
            <Link href={`/events/${eventSlug}/register`}>
              Register Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          
          <p className="text-sm mt-4 opacity-75">
            Free registration • No hidden fees • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}