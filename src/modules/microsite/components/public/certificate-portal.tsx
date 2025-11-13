'use client'

import { useState } from 'react'
import { Download, Search, Mail, Hash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface CertificatePortalProps {
  eventSlug: string
}

export function CertificatePortal({ eventSlug }: CertificatePortalProps) {
  const [searchType, setSearchType] = useState<'email' | 'token'>('email')
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [certificate, setCertificate] = useState<{
    found: boolean
    attendeeName?: string
    certificateUrl?: string
    eventName?: string
  } | null>(null)

  const handleSearch = async () => {
    setIsLoading(true)
    
    // Mock API call - replace with actual implementation
    setTimeout(() => {
      if (searchValue.includes('test')) {
        setCertificate({
          found: true,
          attendeeName: 'John Doe',
          certificateUrl: '/certificates/sample.pdf',
          eventName: 'Tech Conference 2024'
        })
      } else {
        setCertificate({
          found: false
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleDownload = () => {
    if (certificate?.certificateUrl) {
      // In a real implementation, this would trigger the download
      window.open(certificate.certificateUrl, '_blank')
    }
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Certificate Portal</h2>
            <p className="text-muted-foreground">
              Download your participation certificate using your email address or certificate token
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Find Your Certificate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={searchType} onValueChange={(value) => setSearchType(value as 'email' | 'token')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="token" className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Token
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="email" className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter the email you used to register"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="token" className="space-y-4">
                  <div>
                    <Label htmlFor="token">Certificate Token</Label>
                    <Input
                      id="token"
                      placeholder="Enter your certificate token"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Check your email for the certificate token sent after the event
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <Button 
                onClick={handleSearch}
                disabled={!searchValue.trim() || isLoading}
                className="w-full"
              >
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? 'Searching...' : 'Find Certificate'}
              </Button>

              {/* Search Results */}
              {certificate && (
                <div className="mt-6 p-4 border rounded-lg">
                  {certificate.found ? (
                    <div className="text-center space-y-4">
                      <div className="text-green-600">
                        <Download className="w-8 h-8 mx-auto mb-2" />
                        <h3 className="font-semibold">Certificate Found!</h3>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Certificate for</p>
                        <p className="font-medium">{certificate.attendeeName}</p>
                        <p className="text-sm text-muted-foreground">{certificate.eventName}</p>
                      </div>
                      <Button onClick={handleDownload} className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download Certificate
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <p>No certificate found with the provided {searchType}.</p>
                      <p className="text-sm mt-1">
                        Please check your {searchType} and try again, or contact support if you believe this is an error.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}