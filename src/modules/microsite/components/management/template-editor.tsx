'use client'

import { useState } from 'react'
import { Save, Eye, EyeOff, Palette, Layout, Settings, Globe, ExternalLink, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ThemeSelector } from '../shared/theme-selector'
import { SectionManager } from '../shared/section-manager'
import { BrandingPanel } from '../shared/branding-panel'
import { MicrositePreview } from './microsite-preview'
import type { MicrositeSettings, MicrositeTheme, MicrositeSection, MicrositeBranding } from '../../types'

interface TemplateEditorProps {
  eventId: string
  eventSlug: string
  initialSettings?: MicrositeSettings
}

const defaultSections: MicrositeSection[] = [
  {
    id: 'hero',
    type: 'hero',
    label: 'Hero Section',
    enabled: true,
    order: 0,
    content: {
      title: 'Welcome to Our Event',
      description: 'Join us for an amazing experience'
    }
  },
  {
    id: 'about',
    type: 'about',
    label: 'About Event',
    enabled: true,
    order: 1,
    content: {
      title: 'About the Event',
      description: 'Learn more about what we have planned'
    }
  },
  {
    id: 'schedule',
    type: 'schedule',
    label: 'Event Schedule',
    enabled: true,
    order: 2,
    content: {
      title: 'Schedule',
      items: []
    }
  },
  {
    id: 'speakers',
    type: 'speakers',
    label: 'Speakers',
    enabled: false,
    order: 3,
    content: {
      title: 'Our Speakers',
      items: []
    }
  },
  {
    id: 'sponsors',
    type: 'sponsors',
    label: 'Sponsors',
    enabled: false,
    order: 4,
    content: {
      title: 'Our Sponsors',
      items: []
    }
  },
  {
    id: 'faq',
    type: 'faq',
    label: 'FAQ',
    enabled: false,
    order: 5,
    content: {
      title: 'Frequently Asked Questions',
      items: []
    }
  },
  {
    id: 'contact',
    type: 'contact',
    label: 'Contact',
    enabled: true,
    order: 6,
    content: {
      title: 'Get in Touch'
    }
  }
]

export function TemplateEditor({ eventId, eventSlug, initialSettings }: TemplateEditorProps) {
  const [settings, setSettings] = useState<MicrositeSettings>(initialSettings || {
    mode: 'template',
    theme: 'college',
    sections: defaultSections,
    branding: {
      primaryColor: '#3b82f6',
      font: 'Inter',
      socialLinks: {}
    },
    widgets: [],
    seoSettings: {
      title: 'Event Name - Register Now',
      description: 'Join us for an amazing event experience',
      keywords: []
    }
  })

  const [activeTab, setActiveTab] = useState('theme')
  const [isSaving, setIsSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [publishStatus, setPublishStatus] = useState<'draft' | 'published' | 'expired'>('draft')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const updateTheme = (theme: string) => {
    setSettings(prev => ({ ...prev, theme }))
    setHasUnsavedChanges(true)
  }

  const updateSections = (sections: MicrositeSection[]) => {
    setSettings(prev => ({ ...prev, sections }))
    setHasUnsavedChanges(true)
  }

  const updateBranding = (branding: MicrositeBranding) => {
    setSettings(prev => ({ ...prev, branding }))
    setHasUnsavedChanges(true)
  }

  const updateSEOSettings = (seoSettings: Partial<typeof settings.seoSettings>) => {
    setSettings(prev => ({
      ...prev,
      seoSettings: { ...prev.seoSettings, ...seoSettings }
    }))
    setHasUnsavedChanges(true)
  }

  const getMicrositeUrl = () => {
    return `https://${eventSlug}.unisynk.com`
  }

  const handleSave = async (publish = false) => {
    setIsSaving(true)
    
    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Saving microsite settings:', { eventId, settings, publish })
      
      if (publish) {
        setPublishStatus('published')
      }
      setHasUnsavedChanges(false)
      
      alert(publish ? 'Microsite published successfully!' : 'Microsite saved as draft!')
    } catch (error) {
      console.error('Failed to save microsite:', error)
      alert('Failed to save microsite. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (showPreview) {
    return (
      <MicrositePreview
        settings={settings}
        eventSlug={eventSlug}
        onClose={() => setShowPreview(false)}
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Microsite Editor</h1>
            <Badge 
              variant={publishStatus === 'published' ? 'default' : 'secondary'}
              className="flex items-center gap-1"
            >
              {publishStatus === 'published' && <CheckCircle className="w-3 h-3" />}
              {publishStatus === 'published' ? 'Published' : 'Draft'}
            </Badge>
            {hasUnsavedChanges && (
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                Unsaved Changes
              </Badge>
            )}
          </div>
          <p className="text-lg text-muted-foreground mb-2">
            Customize your event microsite with themes, sections, and branding
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4" />
            <span>Your microsite will be available at:</span>
            <code className="bg-muted px-2 py-1 rounded text-xs">
              {getMicrositeUrl()}
            </code>
            {publishStatus === 'published' && (
              <Button variant="ghost" size="sm" asChild>
                <a href={getMicrositeUrl()} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {showPreview ? 'Hide Preview' : 'Live Preview'}
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button 
            onClick={() => handleSave(true)}
            disabled={isSaving}
            className={publishStatus === 'published' ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            <Globe className="w-4 h-4 mr-2" />
            {isSaving ? 'Publishing...' : publishStatus === 'published' ? 'Update Live Site' : 'Publish Site'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Editor Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
                <TabsList className="grid w-full grid-rows-4">
                  <TabsTrigger value="theme" className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Theme
                  </TabsTrigger>
                  <TabsTrigger value="sections" className="flex items-center gap-2">
                    <Layout className="w-4 h-4" />
                    Sections
                  </TabsTrigger>
                  <TabsTrigger value="branding" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Branding
                  </TabsTrigger>
                  <TabsTrigger value="seo" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    SEO
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Editor Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="theme">
              <ThemeSelector
                selectedTheme={settings.theme}
                onThemeSelect={updateTheme}
              />
            </TabsContent>
            
            <TabsContent value="sections">
              <SectionManager
                sections={settings.sections}
                onSectionsUpdate={updateSections}
              />
            </TabsContent>
            
            <TabsContent value="branding">
              <BrandingPanel
                branding={settings.branding}
                onBrandingUpdate={updateBranding}
              />
            </TabsContent>
            
            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Page Title</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={settings.seoSettings.title}
                      onChange={(e) => updateSEOSettings({ title: e.target.value })}
                      placeholder="Event Name - Register Now"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Meta Description</label>
                    <textarea
                      className="w-full p-2 border rounded-md"
                      rows={3}
                      value={settings.seoSettings.description}
                      onChange={(e) => updateSEOSettings({ description: e.target.value })}
                      placeholder="Brief description of your event"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Keywords (comma-separated)</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={settings.seoSettings.keywords.join(', ')}
                      onChange={(e) => updateSEOSettings({ 
                        keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                      })}
                      placeholder="event, conference, tech, registration"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}