'use client'

import { Type, Mail, Phone, ChevronDown, CheckSquare, FileText, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface FieldPaletteProps {
  onAddField: (fieldType: string) => void
}

const fieldTypes = [
  {
    type: 'text',
    label: 'Text Input',
    icon: Type,
    description: 'Single line text input'
  },
  {
    type: 'email',
    label: 'Email',
    icon: Mail,
    description: 'Email address input with validation'
  },
  {
    type: 'tel',
    label: 'Phone',
    icon: Phone,
    description: 'Phone number input'
  },
  {
    type: 'select',
    label: 'Dropdown',
    icon: ChevronDown,
    description: 'Dropdown selection with options'
  },
  {
    type: 'checkbox',
    label: 'Checkbox',
    icon: CheckSquare,
    description: 'Single checkbox for yes/no'
  },
  {
    type: 'textarea',
    label: 'Text Area',
    icon: FileText,
    description: 'Multi-line text input'
  },
  {
    type: 'file',
    label: 'File Upload',
    icon: Upload,
    description: 'File upload input'
  }
]

export function FieldPalette({ onAddField }: FieldPaletteProps) {
  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="font-medium mb-3">Field Types</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click on a field type to add it to your form
        </p>
      </div>

      <div className="space-y-2">
        {fieldTypes.map((fieldType) => {
          const Icon = fieldType.icon
          return (
            <Card 
              key={fieldType.type}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onAddField(fieldType.type)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{fieldType.label}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {fieldType.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="pt-4 border-t">
        <h4 className="font-medium text-sm mb-2">Field Templates</h4>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-xs"
            onClick={() => {
              // Add common student fields
              onAddField('text') // Name
              onAddField('email') // Email
              onAddField('tel') // Phone
              onAddField('text') // College
            }}
          >
            Student Registration Template
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-xs"
            onClick={() => {
              // Add professional fields
              onAddField('text') // Name
              onAddField('email') // Email
              onAddField('text') // Company
              onAddField('text') // Job Title
            }}
          >
            Professional Template
          </Button>
        </div>
      </div>
    </div>
  )
}