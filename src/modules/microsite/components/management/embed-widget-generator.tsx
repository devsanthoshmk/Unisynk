'use client'

import { useState } from 'react'
import { Copy, Eye, Code, Settings, ExternalLink, QrCode, CheckCircle, Book } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import type { EmbedWidget } from '../../types'

interface EmbedWidgetGeneratorProps {
  eventId: string
  eventSlug: string
}

const availableWidgets: Omit<EmbedWidget, 'enabled' | 'config'>[] = [
  {
    id: 'registration',
    type: 'registration',
    label: 'Registration Form'
  },
  {
    id: 'enquiry',
    type: 'enquiry',
    label: 'Enquiry Form'
  },
  {
    id: 'calendar',
    type: 'calendar',
    label: 'Event Calendar'
  },
  {
    id: 'certificate',
    type: 'certificate',
    label: 'Certificate Download'
  },
  {
    id: 'announcements',
    type: 'announcements',
    label: 'Live Announcements'
  }
]

export function EmbedWidgetGenerator({ eventId, eventSlug }: EmbedWidgetGeneratorProps) {
  const [widgets, setWidgets] = useState<EmbedWidget[]>(
    availableWidgets.map(widget => ({
      ...widget,
      enabled: widget.type === 'registration', // Enable registration by default
      config: {
        width: '100%',
        height: '600px',
        theme: 'light',
        language: 'en'
      }
    }))
  )
  
  const [selectedWidget, setSelectedWidget] = useState<string>('registration')
  const [copiedWidget, setCopiedWidget] = useState<string | null>(null)

  const updateWidget = (widgetId: string, updates: Partial<EmbedWidget>) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId ? { ...widget, ...updates } : widget
    ))
  }

  const updateWidgetConfig = (widgetId: string, configUpdates: Partial<EmbedWidget['config']>) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, config: { ...widget.config, ...configUpdates } }
        : widget
    ))
  }

  const generateEmbedCode = (widget: EmbedWidget, type: 'iframe' | 'script' = 'iframe') => {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://unisynk.com' 
      : 'http://localhost:3000'
    
    const widgetUrl = `${baseUrl}/embed/${eventSlug}/${widget.type}`
    const params = new URLSearchParams({
      theme: widget.config.theme || 'light',
      lang: widget.config.language || 'en'
    })

    if (type === 'iframe') {
      return `<iframe 
  src="${widgetUrl}?${params.toString()}"
  width="${widget.config.width || '100%'}"
  height="${widget.config.height || '600px'}"
  frameborder="0"
  scrolling="auto">
</iframe>`
    } else {
      return `<script>
  (function() {
    var script = document.createElement('script');
    script.src = '${baseUrl}/embed/widget.js';
    script.setAttribute('data-widget', '${widget.type}');
    script.setAttribute('data-event', '${eventSlug}');
    script.setAttribute('data-theme', '${widget.config.theme}');
    script.setAttribute('data-width', '${widget.config.width}');
    script.setAttribute('data-height', '${widget.config.height}');
    document.head.appendChild(script);
  })();
</script>`
    }
  }

  const copyToClipboard = async (text: string, widgetId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedWidget(widgetId)
      setTimeout(() => setCopiedWidget(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const selectedWidgetData = widgets.find(w => w.id === selectedWidget)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Embed Widgets</h1>
        <p className="text-lg text-muted-foreground">
          Generate embed codes to integrate Unisynk features into your existing website
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Widget Selector */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Widgets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {widgets.map((widget) => (
                <div 
                  key={widget.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedWidget === widget.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedWidget(widget.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Label className="font-medium">{widget.label}</Label>
                    <Switch
                      checked={widget.enabled}
                      onCheckedChange={(enabled) => updateWidget(widget.id, { enabled })}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  {widget.enabled && (
                    <Badge variant="secondary" className="text-xs">
                      Ready to embed
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Documentation Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Book className="w-4 h-4" />
                Integration Guides
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <a href="/docs/integrations/wordpress" target="_blank">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  WordPress Guide
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <a href="/docs/integrations/wix" target="_blank">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Wix Integration
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <a href="/docs/integrations/html" target="_blank">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  HTML/CSS Guide
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <a href="/docs/integrations/react" target="_blank">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  React Component
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Preview Sandbox */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-muted/30 min-h-[200px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <QrCode className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Widget preview will appear here</p>
                  <p className="text-xs">Enable a widget to see the preview</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Widget Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {selectedWidgetData && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Configure {selectedWidgetData.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="width">Width</Label>
                      <Input
                        id="width"
                        value={selectedWidgetData.config.width}
                        onChange={(e) => updateWidgetConfig(selectedWidget, { width: e.target.value })}
                        placeholder="100% or 400px"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        value={selectedWidgetData.config.height}
                        onChange={(e) => updateWidgetConfig(selectedWidget, { height: e.target.value })}
                        placeholder="600px"
                      />
                    </div>
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <Select 
                        value={selectedWidgetData.config.theme}
                        onValueChange={(theme) => updateWidgetConfig(selectedWidget, { theme: theme as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select 
                        value={selectedWidgetData.config.language}
                        onValueChange={(language) => updateWidgetConfig(selectedWidget, { language })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="custom-css">Custom CSS (Optional)</Label>
                    <textarea
                      id="custom-css"
                      className="w-full mt-1 p-2 border rounded-md font-mono text-sm"
                      rows={4}
                      placeholder=".unisynk-widget { border-radius: 8px; }"
                      value={selectedWidgetData.config.customCSS || ''}
                      onChange={(e) => updateWidgetConfig(selectedWidget, { customCSS: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Embed Code Generation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Embed Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="iframe">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="iframe">IFrame</TabsTrigger>
                      <TabsTrigger value="script">JavaScript</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="iframe" className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>IFrame Embed Code</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(generateEmbedCode(selectedWidgetData, 'iframe'), `${selectedWidget}-iframe`)}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            {copiedWidget === `${selectedWidget}-iframe` ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          <code>{generateEmbedCode(selectedWidgetData, 'iframe')}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="script" className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>JavaScript Embed Code</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(generateEmbedCode(selectedWidgetData, 'script'), `${selectedWidget}-script`)}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            {copiedWidget === `${selectedWidget}-script` ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          <code>{generateEmbedCode(selectedWidgetData, 'script')}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Widget
                    </Button>
                    <Button variant="outline" size="sm">
                      <QrCode className="w-4 h-4 mr-2" />
                      QR Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}