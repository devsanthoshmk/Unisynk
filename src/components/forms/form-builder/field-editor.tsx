'use client'

import { useState } from 'react'
import { X, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface FormField {
  id: string
  type: 'text' | 'email' | 'tel' | 'select' | 'checkbox' | 'textarea' | 'file'
  label: string
  required: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

interface FieldEditorProps {
  field: FormField
  onUpdate: (updates: Partial<FormField>) => void
  onDelete: () => void
  onClose: () => void
}

export function FieldEditor({ field, onUpdate, onDelete, onClose }: FieldEditorProps) {
  const [options, setOptions] = useState(field.options || [])

  const handleAddOption = () => {
    const newOptions = [...options, { value: `option_${Date.now()}`, label: 'New Option' }]
    setOptions(newOptions)
    onUpdate({ options: newOptions })
  }

  const handleUpdateOption = (index: number, updates: Partial<{ value: string; label: string }>) => {
    const newOptions = options.map((option, i) => 
      i === index ? { ...option, ...updates } : option
    )
    setOptions(newOptions)
    onUpdate({ options: newOptions })
  }

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index)
    setOptions(newOptions)
    onUpdate({ options: newOptions })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-medium">Edit Field</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Basic Properties */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Basic Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="field-label" className="text-sm font-medium">
                Field Label
              </Label>
              <Input
                id="field-label"
                value={field.label}
                onChange={(e) => onUpdate({ label: e.target.value })}
                placeholder="Enter field label"
              />
            </div>

            {field.type !== 'checkbox' && (
              <div className="space-y-2">
                <Label htmlFor="field-placeholder" className="text-sm font-medium">
                  Placeholder Text
                </Label>
                <Input
                  id="field-placeholder"
                  value={field.placeholder || ''}
                  onChange={(e) => onUpdate({ placeholder: e.target.value })}
                  placeholder="Enter placeholder text"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Required Field</Label>
                <p className="text-xs text-muted-foreground">
                  Users must fill this field to submit
                </p>
              </div>
              <Switch
                checked={field.required}
                onCheckedChange={(checked) => onUpdate({ required: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Options for Select Fields */}
        {field.type === 'select' && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                Options
                <Button variant="outline" size="sm" onClick={handleAddOption}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {options.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No options added yet. Click "Add" to create options.
                </p>
              ) : (
                options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Option label"
                        value={option.label}
                        onChange={(e) => handleUpdateOption(index, { label: e.target.value })}
                      />
                      <Input
                        placeholder="Option value"
                        value={option.value}
                        onChange={(e) => handleUpdateOption(index, { value: e.target.value })}
                        className="text-xs"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveOption(index)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        )}

        {/* Field Type Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Field Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium capitalize">{field.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span className="font-mono text-xs">{field.id}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={onDelete}
          className="w-full"
        >
          Delete Field
        </Button>
      </div>
    </div>
  )
}