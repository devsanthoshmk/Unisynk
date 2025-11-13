'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Globe, Code, Palette, Phone, Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { MicrositeMode } from '../../types'

interface MicrositeSetupProps {
  eventId: string
  currentMode?: 'embed' | 'template' | 'custom'
  onModeSelect: (mode: 'embed' | 'template' | 'custom') => void
}

const micrositeModes: MicrositeMode[] = [
  {
    type: 'embed',
    label: 'Use My Own Website',
    description: 'Embed Unisynk features into your existing website using simple code snippets',
    features: [
      'Registration forms',
      'Event calendar',
      'Certificate downloads',
      'Live announcements',
      'Contact forms'
    ]
  },
  {
    type: 'template',
    label: 'Use Unisynk Template',
    description: 'Get a ready-to-use microsite with customizable themes and sections',
    features: [
      'Pre-built templates',
      'Custom branding',
      'Drag & drop sections',
      'Mobile responsive',
      'SEO optimized'
    ],
    recommended: true
  },
  {
    type: 'custom',
    label: 'Request Custom Site',
    description: 'Get a fully custom-built microsite designed by our team',
    features: [
      'Fully custom design',
      'Advanced features',
      'White-label options',
      'Dedicated support',
      'Premium hosting'
    ]
  }
]

const modeIcons = {
  embed: Code,
  template: Palette,
  custom: Phone
}

export function MicrositeSetup({ eventId, currentMode, onModeSelect }: MicrositeSetupProps) {
  const [selectedMode, setSelectedMode] = useState<'embed' | 'template' | 'custom' | null>(currentMode || null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleModeSelect = async (mode: 'embed' | 'template' | 'custom') => {
    setSelectedMode(mode)
    setIsLoading(true)

    try {
      // Save mode selection
      await onModeSelect(mode)
      
      // Navigate to the appropriate setup page
      switch (mode) {
        case 'embed':
          router.push(`/dashboard/events/${eventId}/microsite/embed`)
          break
        case 'template':
          router.push(`/dashboard/events/${eventId}/microsite/editor`)
          break
        case 'custom':
          router.push(`/dashboard/events/${eventId}/microsite/custom-request`)
          break
      }
    } catch (error) {
      console.error('Failed to save microsite mode:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Choose Your Microsite Option</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select how you want to create your event's online presence. Each option is designed for different needs and technical requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {micrositeModes.map((mode) => {
          const Icon = modeIcons[mode.type]
          const isSelected = selectedMode === mode.type
          const isCurrent = currentMode === mode.type

          return (
            <Card 
              key={mode.type}
              className={`relative cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? 'ring-2 ring-primary' : ''
              } ${isCurrent ? 'border-green-500' : ''}`}
              onClick={() => setSelectedMode(mode.type)}
            >
              {mode.recommended && (
                <Badge className="absolute -top-2 left-4 bg-primary">
                  Recommended
                </Badge>
              )}
              
              {isCurrent && (
                <Badge variant="outline" className="absolute -top-2 right-4 bg-green-50 text-green-700 border-green-200">
                  <Check className="w-3 h-3 mr-1" />
                  Current
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{mode.label}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  {mode.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Features included:</h4>
                  <ul className="space-y-1">
                    {mode.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full mt-4"
                  variant={isSelected ? "default" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleModeSelect(mode.type)
                  }}
                  disabled={isLoading}
                >
                  {isCurrent ? 'Manage' : 'Select'} {mode.label}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Feature</th>
                  <th className="text-center py-2">Own Website</th>
                  <th className="text-center py-2">Unisynk Template</th>
                  <th className="text-center py-2">Custom Site</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b">
                  <td className="py-2">Setup Time</td>
                  <td className="text-center">5 minutes</td>
                  <td className="text-center">30 minutes</td>
                  <td className="text-center">1-2 weeks</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Technical Skills Required</td>
                  <td className="text-center">Basic HTML</td>
                  <td className="text-center">None</td>
                  <td className="text-center">None</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Customization Level</td>
                  <td className="text-center">Limited</td>
                  <td className="text-center">High</td>
                  <td className="text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Cost</td>
                  <td className="text-center">Free</td>
                  <td className="text-center">Free</td>
                  <td className="text-center">Premium</td>
                </tr>
                <tr>
                  <td className="py-2">Best For</td>
                  <td className="text-center">Existing websites</td>
                  <td className="text-center">Quick setup</td>
                  <td className="text-center">Premium events</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}