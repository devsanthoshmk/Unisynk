'use client'

import Image from 'next/image'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Event {
  id: string
  name: string
  description: string
  date: string
  time: string
  venue: string
  logo?: string
  bannerImage?: string
  organizer: {
    name: string
    logo?: string
    primaryColor?: string
  }
}

interface MicrositeHeroProps {
  event: Event
}

export function MicrositeHero({ event }: MicrositeHeroProps) {
  const eventDate = new Date(event.date)
  const isUpcoming = eventDate > new Date()

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      {event.bannerImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={event.bannerImage}
            alt={`${event.name} banner`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Event Logo */}
          {event.logo && (
            <div className="mb-6">
              <Image
                src={event.logo}
                alt={`${event.name} logo`}
                width={120}
                height={120}
                className="mx-auto rounded-lg shadow-lg"
              />
            </div>
          )}
          
          {/* Event Status Badge */}
          <div className="mb-4">
            <Badge 
              variant={isUpcoming ? "default" : "secondary"}
              className="text-sm px-3 py-1"
            >
              {isUpcoming ? 'Upcoming Event' : 'Past Event'}
            </Badge>
          </div>
          
          {/* Event Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {event.name}
          </h1>
          
          {/* Event Description */}
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            {event.description}
          </p>
          
          {/* Event Details */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{eventDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{event.venue}</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isUpcoming && (
              <Button 
                size="lg" 
                className="text-lg px-8 py-3"
                style={{ backgroundColor: event.organizer.primaryColor }}
              >
                Register Now
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-black"
            >
              Learn More
            </Button>
          </div>
          
          {/* Organizer Info */}
          <div className="mt-12 flex items-center justify-center gap-3 text-sm text-gray-300">
            <span>Organized by</span>
            {event.organizer.logo && (
              <Image
                src={event.organizer.logo}
                alt={event.organizer.name}
                width={24}
                height={24}
                className="rounded"
              />
            )}
            <span className="font-medium">{event.organizer.name}</span>
          </div>
        </div>
      </div>
    </section>
  )
}