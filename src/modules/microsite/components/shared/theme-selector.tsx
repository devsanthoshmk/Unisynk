'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { MicrositeTheme } from '../../types'

interface ThemeSelectorProps {
  selectedTheme?: string
  onThemeSelect: (themeId: string) => void
}

const availableThemes: MicrositeTheme[] = [
  {
    id: 'college',
    name: 'College Fest',
    category: 'college',
    preview: '/themes/college-preview.jpg',
    colors: {
      primary: '#3b82f6',
      secondary: '#1e40af',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    }
  },
  {
    id: 'corporate',
    name: 'Corporate Summit',
    category: 'corporate',
    preview: '/themes/corporate-preview.jpg',
    colors: {
      primary: '#1f2937',
      secondary: '#374151',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#111827'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    }
  },
  {
    id: 'creative',
    name: 'Creative Conference',
    category: 'creative',
    preview: '/themes/creative-preview.jpg',
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    category: 'minimal',
    preview: '/themes/minimal-preview.jpg',
    colors: {
      primary: '#000000',
      secondary: '#374151',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#1f2937'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    }
  },
  {
    id: 'nonprofit',
    name: 'Nonprofit Event',
    category: 'nonprofit',
    preview: '/themes/nonprofit-preview.jpg',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    }
  }
]

export function ThemeSelector({ selectedTheme, onThemeSelect }: ThemeSelectorProps) {
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Choose a Theme</CardTitle>
          <p className="text-sm text-muted-foreground">
            Select a pre-designed theme that matches your event style. You can customize colors and fonts later.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableThemes.map((theme) => {
              const isSelected = selectedTheme === theme.id
              const isHovered = hoveredTheme === theme.id

              return (
                <div
                  key={theme.id}
                  className={`relative cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => onThemeSelect(theme.id)}
                  onMouseEnter={() => setHoveredTheme(theme.id)}
                  onMouseLeave={() => setHoveredTheme(null)}
                >
                  <Card className={`overflow-hidden ${isHovered ? 'shadow-lg' : ''}`}>
                    {/* Theme Preview */}
                    <div className="aspect-video relative bg-gradient-to-br from-gray-100 to-gray-200">
                      {/* Mock preview with theme colors */}
                      <div 
                        className="absolute inset-0"
                        style={{ backgroundColor: theme.colors.background }}
                      >
                        <div 
                          className="h-1/3 w-full"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div className="p-4 space-y-2">
                          <div 
                            className="h-3 w-3/4 rounded"
                            style={{ backgroundColor: theme.colors.text }}
                          />
                          <div 
                            className="h-2 w-1/2 rounded"
                            style={{ backgroundColor: theme.colors.secondary }}
                          />
                          <div 
                            className="h-6 w-20 rounded mt-3"
                            style={{ backgroundColor: theme.colors.accent }}
                          />
                        </div>
                      </div>
                      
                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{theme.name}</h3>
                        <Badge variant="outline" className="text-xs capitalize">
                          {theme.category}
                        </Badge>
                      </div>
                      
                      {/* Color Palette */}
                      <div className="flex gap-1">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: theme.colors.primary }}
                          title="Primary Color"
                        />
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: theme.colors.secondary }}
                          title="Secondary Color"
                        />
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: theme.colors.accent }}
                          title="Accent Color"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Theme Customization Preview */}
      {selectedTheme && (
        <Card>
          <CardHeader>
            <CardTitle>Theme Customization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Selected theme: <strong>{availableThemes.find(t => t.id === selectedTheme)?.name}</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                You can customize colors, fonts, and other styling options in the Branding section.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}