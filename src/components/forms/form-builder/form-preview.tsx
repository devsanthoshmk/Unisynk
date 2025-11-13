'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

interface FormField {
  id: string
  type: 'text' | 'email' | 'tel' | 'select' | 'checkbox' | 'textarea' | 'file'
  label: string
  required: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

interface FormPreviewProps {
  field: FormField
}

export function FormPreview({ field }: FormPreviewProps) {
  const renderField = () => {
    switch (field.type) {
      case 'select':
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              )) || (
                <SelectItem value="option1">Option 1</SelectItem>
              )}
            </SelectContent>
          </Select>
        )
      
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            disabled
            rows={3}
          />
        )
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox disabled />
            <Label>{field.label}</Label>
          </div>
        )
      
      case 'file':
        return (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
          </div>
        )
      
      default:
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            disabled
          />
        )
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium">
          {field.label}
        </Label>
        {field.required && (
          <Badge variant="secondary" className="text-xs">
            Required
          </Badge>
        )}
        <Badge variant="outline" className="text-xs capitalize">
          {field.type}
        </Badge>
      </div>
      {field.type !== 'checkbox' && renderField()}
      {field.type === 'checkbox' && (
        <div className="pl-4">
          {renderField()}
        </div>
      )}
    </div>
  )
}