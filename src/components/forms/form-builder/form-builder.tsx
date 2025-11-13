'use client'

import { useState, useCallback } from 'react'
import { FieldPalette } from './field-palette'
import { FormPreview } from './form-preview'
import { FormSettings } from './form-settings'
import { FieldEditor } from './field-editor'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Save, Eye, Settings, Palette, MoveUp, MoveDown, Trash2 } from 'lucide-react'

interface FormField {
  id: string
  type: 'text' | 'email' | 'tel' | 'select' | 'checkbox' | 'textarea' | 'file'
  label: string
  required: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

interface FormSettings {
  tokenRequired: boolean
  teamRegistrationEnabled: boolean
  maxTeamSize: number
  redirectUrl: string
  confirmationMessage: string
}

interface FormData {
  fields: FormField[]
  settings: FormSettings
  conditionalLogic: any[]
}

interface FormBuilderProps {
  eventId: string
  initialForm: FormData
  isDraft: boolean
}

export function FormBuilder({ eventId, initialForm, isDraft }: FormBuilderProps) {
  const [form, setForm] = useState<FormData>(initialForm)
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('builder')

  const addField = useCallback((fieldType: string) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type: fieldType as any,
      label: `New ${fieldType} field`,
      required: false,
      placeholder: `Enter ${fieldType}...`
    }

    setForm(prev => ({ ...prev, fields: [...prev.fields, newField] }))
    setSelectedFieldId(newField.id)
  }, [])

  const moveField = useCallback((fieldId: string, direction: 'up' | 'down') => {
    const currentIndex = form.fields.findIndex(field => field.id === fieldId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= form.fields.length) return

    const newFields = [...form.fields]
    const [movedField] = newFields.splice(currentIndex, 1)
    newFields.splice(newIndex, 0, movedField)
    
    setForm(prev => ({ ...prev, fields: newFields }))
  }, [form.fields])

  const updateField = useCallback((fieldId: string, updates: Partial<FormField>) => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }))
  }, [])

  const deleteField = useCallback((fieldId: string) => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId)
    }))
    setSelectedFieldId(null)
  }, [])

  const updateSettings = useCallback((updates: Partial<FormSettings>) => {
    setForm(prev => ({
      ...prev,
      settings: { ...prev.settings, ...updates }
    }))
  }, [])

  const handleSave = async (publish = false) => {
    setIsSaving(true)
    
    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Saving form:', { eventId, form, publish })
      
      // Show success message
      alert(publish ? 'Form published successfully!' : 'Form saved as draft!')
    } catch (error) {
      console.error('Failed to save form:', error)
      alert('Failed to save form. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const selectedField = form.fields.find(field => field.id === selectedFieldId)

  return (
    <div className="h-screen flex">
      {/* Left Sidebar - Field Palette & Settings */}
      <div className="w-80 border-r bg-muted/30">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="border-b p-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="builder" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Fields
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-auto">
            <TabsContent value="builder" className="m-0 h-full">
              <FieldPalette onAddField={addField} />
            </TabsContent>
            <TabsContent value="settings" className="m-0 h-full">
              <FormSettings 
                settings={form.settings}
                onUpdate={updateSettings}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Form Builder */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Form Builder</h2>
                <p className="text-sm text-muted-foreground">
                  Drag fields from the palette to build your registration form
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`/dashboard/events/${eventId}/form/preview`, '_blank')}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSave(false)}
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleSave(true)}
                  disabled={isSaving}
                >
                  Publish Form
                </Button>
              </div>
            </div>

            <div className="min-h-96 p-4 border-2 border-dashed rounded-lg border-muted-foreground/25">
              {form.fields.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg font-medium mb-2">No fields added yet</p>
                  <p className="text-sm">Click on field types in the palette to add them</p>
                </div>
              ) : (
                form.fields.map((field, index) => (
                  <div
                    key={field.id}
                    className={`mb-4 p-4 bg-background border rounded-lg cursor-pointer transition-all ${
                      selectedFieldId === field.id 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedFieldId(field.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            moveField(field.id, 'up')
                          }}
                          disabled={index === 0}
                        >
                          <MoveUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            moveField(field.id, 'down')
                          }}
                          disabled={index === form.fields.length - 1}
                        >
                          <MoveDown className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteField(field.id)
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <FormPreview field={field} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Field Editor */}
        {selectedField && (
          <div className="w-80 border-l bg-muted/30">
            <FieldEditor
              field={selectedField}
              onUpdate={(updates) => updateField(selectedField.id, updates)}
              onDelete={() => deleteField(selectedField.id)}
              onClose={() => setSelectedFieldId(null)}
            />
          </div>
        )}
      </div>
    </div>
  )
}