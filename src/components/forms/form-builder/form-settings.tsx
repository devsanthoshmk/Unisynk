'use client'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface FormSettings {
  tokenRequired: boolean
  teamRegistrationEnabled: boolean
  maxTeamSize: number
  redirectUrl: string
  confirmationMessage: string
}

interface FormSettingsProps {
  settings: FormSettings
  onUpdate: (updates: Partial<FormSettings>) => void
}

export function FormSettings({ settings, onUpdate }: FormSettingsProps) {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="font-medium mb-3">Form Settings</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Configure how your registration form behaves
        </p>
      </div>

      {/* Access Control */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Access Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Require Access Token</Label>
              <p className="text-xs text-muted-foreground">
                Only users with valid tokens can register
              </p>
            </div>
            <Switch
              checked={settings.tokenRequired}
              onCheckedChange={(checked) => onUpdate({ tokenRequired: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Team Registration */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Team Registration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Enable Team Registration</Label>
              <p className="text-xs text-muted-foreground">
                Allow users to register as teams
              </p>
            </div>
            <Switch
              checked={settings.teamRegistrationEnabled}
              onCheckedChange={(checked) => onUpdate({ teamRegistrationEnabled: checked })}
            />
          </div>

          {settings.teamRegistrationEnabled && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Maximum Team Size: {settings.maxTeamSize}
                </Label>
                <Slider
                  value={[settings.maxTeamSize]}
                  onValueChange={([value]) => onUpdate({ maxTeamSize: value })}
                  min={2}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Including team leader (2-10 members)
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Post-Registration */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Post-Registration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="redirect-url" className="text-sm font-medium">
              Redirect URL (Optional)
            </Label>
            <Input
              id="redirect-url"
              placeholder="https://example.com/thank-you"
              value={settings.redirectUrl}
              onChange={(e) => onUpdate({ redirectUrl: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Redirect users to this URL after successful registration
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmation-message" className="text-sm font-medium">
              Confirmation Message
            </Label>
            <Textarea
              id="confirmation-message"
              placeholder="Thank you for registering! We'll send you more details soon."
              value={settings.confirmationMessage}
              onChange={(e) => onUpdate({ confirmationMessage: e.target.value })}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Message shown to users after successful registration
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Form Behavior */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Form Behavior</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Auto-save Progress</Label>
            <p className="text-xs text-muted-foreground">
              Automatically save user progress as they fill the form (enabled by default)
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Email Notifications</Label>
            <p className="text-xs text-muted-foreground">
              Send confirmation emails to registrants (enabled by default)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}