'use client'

import { useState } from 'react'
import { Key, Mail, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface TokenGateProps {
  eventSlug: string
  onTokenValidated: (token: string) => void
}

export function TokenGate({ eventSlug, onTokenValidated }: TokenGateProps) {
  const [accessType, setAccessType] = useState<'token' | 'email'>('token')
  const [value, setValue] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState('')

  const handleValidate = async () => {
    if (!value.trim()) {
      setError(`Please enter your ${accessType}`)
      return
    }

    setIsValidating(true)
    setError('')

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock validation logic
      if (accessType === 'token' && value.toLowerCase().includes('valid')) {
        onTokenValidated(value)
      } else if (accessType === 'email' && value.includes('@')) {
        // In real implementation, this would send an email with token
        onTokenValidated(`email-token-${Date.now()}`)
      } else {
        setError(
          accessType === 'token' 
            ? 'Invalid token. Please check and try again.'
            : 'Email not found in our invitation list.'
        )
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsValidating(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Key className="w-5 h-5" />
          Access Required
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          This event requires an access token or email invitation to register
        </p>
      </CardHeader>
      <CardContent>
        <Tabs value={accessType} onValueChange={(value) => setAccessType(value as 'token' | 'email')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="token" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              Token
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="token" className="space-y-4">
            <div>
              <Label htmlFor="token">Access Token</Label>
              <Input
                id="token"
                placeholder="Enter your access token"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Check your email or contact the organizers for your access token
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your invited email address"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
              />
              <p className="text-xs text-muted-foreground mt-1">
                We'll verify if this email was invited to the event
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <Button 
          onClick={handleValidate}
          disabled={!value.trim() || isValidating}
          className="w-full mt-4"
        >
          {isValidating ? 'Validating...' : 'Continue'}
        </Button>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700">
            <strong>Need help?</strong> Contact the event organizers if you don't have an access token or weren't invited via email.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}