'use client'

import { useState } from 'react'
import { X, Monitor, Tablet, Smartphone, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { MicrositeSettings } from '../../types'

interface MicrositePreviewProps {
  settings: MicrositeSettings
  eventSlug: string
  onClose: () => void
}

export function MicrositePreview({ settings, eventSlug, onClose }: MicrositePreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const getPreviewUrl = () => {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://unisynk.com' 
      : 'http://localhost:3000'
    return `${baseUrl}/events/${eventSlug}?preview=true`
  }

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-[375px] h-[667px]'
      case 'tablet':
        return 'w-[768px] h-[1024px]'
      default:
        return 'w-full h-full'
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Microsite Preview</h1>
          
          {/* Viewport Controls */}
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
            <TabsList>
              <TabsTrigger value="desktop" className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Desktop
              </TabsTrigger>
              <TabsTrigger value="tablet" className="flex items-center gap-2">
                <Tablet className="w-4 h-4" />
                Tablet
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Mobile
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in New Tab
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4 bg-muted/30 overflow-auto">
        <div className="flex justify-center">
          <div className={`${getViewportClass()} bg-white border rounded-lg shadow-lg overflow-hidden`}>
            {/* Mock Microsite Content */}
            <div className="h-full overflow-auto">
              <MockMicrositeContent settings={settings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MockMicrositeContentProps {
  settings: MicrositeSettings
}

function MockMicrositeContent({ settings }: MockMicrositeContentProps) {
  const enabledSections = settings.sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order)

  return (
    <div style={{ fontFamily: settings.branding.font }}>
      {enabledSections.map((section) => (
        <MockSection 
          key={section.id} 
          section={section} 
          branding={settings.branding}
        />
      ))}
    </div>
  )
}

interface MockSectionProps {
  section: any
  branding: any
}

function MockSection({ section, branding }: MockSectionProps) {
  const getSectionContent = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div 
            className="relative h-96 flex items-center justify-center text-white"
            style={{ backgroundColor: branding.primaryColor }}
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                {section.content.title || 'Event Name'}
              </h1>
              <p className="text-xl mb-6">
                {section.content.description || 'Join us for an amazing event'}
              </p>
              <button 
                className="px-6 py-3 bg-white text-black rounded-lg font-medium"
              >
                Register Now
              </button>
            </div>
          </div>
        )

      case 'about':
        return (
          <div className="py-16 px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                {section.content.title || 'About the Event'}
              </h2>
              <p className="text-lg text-gray-600">
                {section.content.description || 'Learn more about our amazing event and what we have planned for you.'}
              </p>
            </div>
          </div>
        )

      case 'schedule':
        return (
          <div className="py-16 px-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                {section.content.title || 'Event Schedule'}
              </h2>
              <div className="space-y-4">
                {[
                  { time: '09:00 AM', title: 'Registration & Welcome' },
                  { time: '10:00 AM', title: 'Opening Keynote' },
                  { time: '11:30 AM', title: 'Panel Discussion' },
                  { time: '01:00 PM', title: 'Lunch Break' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg">
                    <div className="text-sm font-mono text-gray-500 w-20">
                      {item.time}
                    </div>
                    <div className="font-medium">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'speakers':
        return (
          <div className="py-16 px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                {section.content.title || 'Our Speakers'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <h3 className="font-bold">Speaker {i}</h3>
                    <p className="text-gray-600">Speaker Title</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="py-16 px-8 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                {section.content.title || 'Get in Touch'}
              </h2>
              <p className="text-lg mb-8">
                Have questions? We're here to help!
              </p>
              <div className="flex justify-center gap-4">
                {branding.socialLinks.website && (
                  <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                )}
                {branding.socialLinks.facebook && (
                  <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                )}
                {branding.socialLinks.twitter && (
                  <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="py-16 px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                {section.content.title || section.label}
              </h2>
              <p className="text-lg text-gray-600">
                {section.content.description || `This is the ${section.label.toLowerCase()} section.`}
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <section>
      {getSectionContent()}
    </section>
  )
}