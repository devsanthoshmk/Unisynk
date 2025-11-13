'use client'

import { useState } from 'react'
import { Eye, EyeOff, GripVertical, Settings, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import type { MicrositeSection } from '../../types'

interface SectionManagerProps {
  sections: MicrositeSection[]
  onSectionsUpdate: (sections: MicrositeSection[]) => void
}

export function SectionManager({ sections, onSectionsUpdate }: SectionManagerProps) {
  const [editingSection, setEditingSection] = useState<MicrositeSection | null>(null)

  const toggleSection = (sectionId: string) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId ? { ...section, enabled: !section.enabled } : section
    )
    onSectionsUpdate(updatedSections)
  }

  const updateSectionOrder = (sectionId: string, direction: 'up' | 'down') => {
    const currentIndex = sections.findIndex(s => s.id === sectionId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= sections.length) return

    const updatedSections = [...sections]
    const [movedSection] = updatedSections.splice(currentIndex, 1)
    updatedSections.splice(newIndex, 0, movedSection)

    // Update order values
    const reorderedSections = updatedSections.map((section, index) => ({
      ...section,
      order: index
    }))

    onSectionsUpdate(reorderedSections)
  }

  const updateSectionContent = (sectionId: string, content: Partial<MicrositeSection['content']>) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId 
        ? { ...section, content: { ...section.content, ...content } }
        : section
    )
    onSectionsUpdate(updatedSections)
  }

  const getSectionIcon = (type: MicrositeSection['type']) => {
    const icons = {
      hero: '🎯',
      about: 'ℹ️',
      schedule: '📅',
      speakers: '🎤',
      sponsors: '🤝',
      faq: '❓',
      contact: '📞'
    }
    return icons[type] || '📄'
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Sections</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enable, disable, and reorder sections for your microsite. Click the settings icon to edit content.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sections
              .sort((a, b) => a.order - b.order)
              .map((section, index) => (
                <div
                  key={section.id}
                  className={`flex items-center gap-3 p-3 border rounded-lg transition-colors ${
                    section.enabled ? 'bg-background' : 'bg-muted/50'
                  }`}
                >
                  {/* Drag Handle */}
                  <div className="cursor-grab">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                  </div>

                  {/* Section Info */}
                  <div className="flex-1 flex items-center gap-3">
                    <span className="text-lg">{getSectionIcon(section.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{section.label}</span>
                        {!section.enabled && (
                          <Badge variant="secondary" className="text-xs">
                            Hidden
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {section.content.title || `Configure ${section.label.toLowerCase()} content`}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    {/* Visibility Toggle */}
                    <Switch
                      checked={section.enabled}
                      onCheckedChange={() => toggleSection(section.id)}
                    />

                    {/* Edit Content */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingSection(section)}
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit {section.label}</DialogTitle>
                        </DialogHeader>
                        <SectionEditor
                          section={section}
                          onUpdate={(content) => updateSectionContent(section.id, content)}
                        />
                      </DialogContent>
                    </Dialog>

                    {/* Reorder Buttons */}
                    <div className="flex flex-col">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 p-0"
                        onClick={() => updateSectionOrder(section.id, 'up')}
                        disabled={index === 0}
                      >
                        ▲
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 p-0"
                        onClick={() => updateSectionOrder(section.id, 'down')}
                        disabled={index === sections.length - 1}
                      >
                        ▼
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface SectionEditorProps {
  section: MicrositeSection
  onUpdate: (content: Partial<MicrositeSection['content']>) => void
}

function SectionEditor({ section, onUpdate }: SectionEditorProps) {
  const [content, setContent] = useState(section.content)

  const handleSave = () => {
    onUpdate(content)
  }

  const updateContent = (updates: Partial<typeof content>) => {
    const newContent = { ...content, ...updates }
    setContent(newContent)
    onUpdate(newContent)
  }

  return (
    <div className="space-y-4">
      {/* Common Fields */}
      <div>
        <Label htmlFor="section-title">Section Title</Label>
        <Input
          id="section-title"
          value={content.title || ''}
          onChange={(e) => updateContent({ title: e.target.value })}
          placeholder={`Enter ${section.label.toLowerCase()} title`}
        />
      </div>

      <div>
        <Label htmlFor="section-description">Description</Label>
        <Textarea
          id="section-description"
          value={content.description || ''}
          onChange={(e) => updateContent({ description: e.target.value })}
          placeholder={`Enter ${section.label.toLowerCase()} description`}
          rows={3}
        />
      </div>

      {/* Section-specific Fields */}
      {section.type === 'hero' && (
        <div>
          <Label htmlFor="hero-image">Hero Image URL</Label>
          <Input
            id="hero-image"
            value={content.image || ''}
            onChange={(e) => updateContent({ image: e.target.value })}
            placeholder="https://example.com/hero-image.jpg"
          />
        </div>
      )}

      {(section.type === 'speakers' || section.type === 'sponsors') && (
        <div>
          <Label>Items</Label>
          <p className="text-sm text-muted-foreground mb-2">
            {section.type === 'speakers' ? 'Speakers' : 'Sponsors'} will be automatically populated from your event data.
          </p>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">
              Configure {section.type} in the main event settings to see them here.
            </p>
          </div>
        </div>
      )}

      {section.type === 'faq' && (
        <div>
          <Label>FAQ Items</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Add frequently asked questions and answers.
          </p>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ Item
          </Button>
        </div>
      )}

      {section.type === 'contact' && (
        <div className="space-y-3">
          <div>
            <Label htmlFor="contact-email">Contact Email</Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="contact@example.com"
            />
          </div>
          <div>
            <Label htmlFor="contact-phone">Contact Phone</Label>
            <Input
              id="contact-phone"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      )}

      {/* Custom HTML for advanced users */}
      <div>
        <Label htmlFor="custom-html">Custom HTML (Advanced)</Label>
        <Textarea
          id="custom-html"
          value={content.customHTML || ''}
          onChange={(e) => updateContent({ customHTML: e.target.value })}
          placeholder="<div>Custom HTML content...</div>"
          rows={4}
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Add custom HTML for advanced customization. Use with caution.
        </p>
      </div>
    </div>
  )
}