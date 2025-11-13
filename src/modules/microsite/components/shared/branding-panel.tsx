'use client'

import { useState } from 'react'
import { Upload, Palette, Type, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import type { MicrositeBranding } from '../../types'

interface BrandingPanelProps {
  branding: MicrositeBranding
  onBrandingUpdate: (branding: MicrositeBranding) => void
}

const fontOptions = [
  { value: 'Inter', label: 'Inter (Default)' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Nunito', label: 'Nunito' },
  { value: 'Source Sans Pro', label: 'Source Sans Pro' }
]

const presetColors = [
  '#3b82f6', // Blue
  '#ef4444', // Red
  '#10b981', // Green
  '#f59e0b', // Yellow
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#f97316', // Orange
  '#6366f1', // Indigo
  '#14b8a6', // Teal
  '#1f2937'  // Gray
]

export function BrandingPanel({ branding, onBrandingUpdate }: BrandingPanelProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [faviconFile, setFaviconFile] = useState<File | null>(null)

  const updateBranding = (updates: Partial<MicrositeBranding>) => {
    onBrandingUpdate({ ...branding, ...updates })
  }

  const updateSocialLinks = (platform: string, url: string) => {
    updateBranding({
      socialLinks: {
        ...branding.socialLinks,
        [platform]: url
      }
    })
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
      // In a real implementation, you would upload the file and get a URL
      const mockUrl = URL.createObjectURL(file)
      updateBranding({ logo: mockUrl })
    }
  }

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFaviconFile(file)
      // In a real implementation, you would upload the file and get a URL
      const mockUrl = URL.createObjectURL(file)
      updateBranding({ favicon: mockUrl })
    }
  }

  return (
    <div className="space-y-6">
      {/* Logo & Favicon */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Logo & Favicon
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="logo-upload">Logo</Label>
              <div className="mt-2">
                {branding.logo ? (
                  <div className="flex items-center gap-3">
                    <img 
                      src={branding.logo} 
                      alt="Logo preview" 
                      className="w-12 h-12 object-contain border rounded"
                    />
                    <Button variant="outline" size="sm" onClick={() => updateBranding({ logo: undefined })}>
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Upload your logo</p>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('logo-upload')?.click()}>
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="favicon-upload">Favicon</Label>
              <div className="mt-2">
                {branding.favicon ? (
                  <div className="flex items-center gap-3">
                    <img 
                      src={branding.favicon} 
                      alt="Favicon preview" 
                      className="w-8 h-8 object-contain border rounded"
                    />
                    <Button variant="outline" size="sm" onClick={() => updateBranding({ favicon: undefined })}>
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Upload favicon (16x16)</p>
                    <input
                      id="favicon-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFaviconUpload}
                      className="hidden"
                    />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('favicon-upload')?.click()}>
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Colors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex items-center gap-3 mt-2">
              <input
                id="primary-color"
                type="color"
                value={branding.primaryColor}
                onChange={(e) => updateBranding({ primaryColor: e.target.value })}
                className="w-12 h-10 border rounded cursor-pointer"
              />
              <Input
                value={branding.primaryColor}
                onChange={(e) => updateBranding({ primaryColor: e.target.value })}
                placeholder="#3b82f6"
                className="font-mono"
              />
            </div>
            
            {/* Preset Colors */}
            <div className="mt-3">
              <Label className="text-sm">Quick Colors</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded border-2 border-white shadow-sm hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => updateBranding({ primaryColor: color })}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="secondary-color">Secondary Color (Optional)</Label>
            <div className="flex items-center gap-3 mt-2">
              <input
                id="secondary-color"
                type="color"
                value={branding.secondaryColor || '#6b7280'}
                onChange={(e) => updateBranding({ secondaryColor: e.target.value })}
                className="w-12 h-10 border rounded cursor-pointer"
              />
              <Input
                value={branding.secondaryColor || ''}
                onChange={(e) => updateBranding({ secondaryColor: e.target.value })}
                placeholder="#6b7280"
                className="font-mono"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Typography
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="font-family">Font Family</Label>
            <Select 
              value={branding.font} 
              onValueChange={(font) => updateBranding({ font })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Preview */}
          <div className="p-4 border rounded-lg" style={{ fontFamily: branding.font }}>
            <h3 className="text-lg font-bold mb-2">Font Preview</h3>
            <p className="text-sm text-muted-foreground">
              This is how your text will appear on the microsite using the selected font family.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Social Links
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="website-url">Website</Label>
              <Input
                id="website-url"
                value={branding.socialLinks.website || ''}
                onChange={(e) => updateSocialLinks('website', e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <Label htmlFor="facebook-url">Facebook</Label>
              <Input
                id="facebook-url"
                value={branding.socialLinks.facebook || ''}
                onChange={(e) => updateSocialLinks('facebook', e.target.value)}
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div>
              <Label htmlFor="twitter-url">Twitter</Label>
              <Input
                id="twitter-url"
                value={branding.socialLinks.twitter || ''}
                onChange={(e) => updateSocialLinks('twitter', e.target.value)}
                placeholder="https://twitter.com/youraccount"
              />
            </div>

            <div>
              <Label htmlFor="instagram-url">Instagram</Label>
              <Input
                id="instagram-url"
                value={branding.socialLinks.instagram || ''}
                onChange={(e) => updateSocialLinks('instagram', e.target.value)}
                placeholder="https://instagram.com/youraccount"
              />
            </div>

            <div>
              <Label htmlFor="linkedin-url">LinkedIn</Label>
              <Input
                id="linkedin-url"
                value={branding.socialLinks.linkedin || ''}
                onChange={(e) => updateSocialLinks('linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}