"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardNav } from "@/layout/navigation"
import { User, Mail, Lock, Bell } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@unisynk.com",
    avatar: "",
    timezone: "UTC",
    notifications: {
      email: true,
      push: false,
      marketing: false
    }
  })

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  })

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated")
    const userEmail = localStorage.getItem("userEmail")
    
    if (authStatus !== "true") {
      router.push("/auth/login")
      return
    }

    // Update profile with stored email
    if (userEmail) {
      setProfile(prev => ({ ...prev, email: userEmail }))
    }
  }, [router])

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Update profile
    console.log("Profile updated:", profile)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Change password
    console.log("Password change requested")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={profile.timezone}
                    onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                  />
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-4 w-4" />
                Change Password
              </CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                  />
                </div>
                <Button type="submit">Change Password</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about events and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your events
                    </p>
                  </div>
                  <Button
                    variant={profile.notifications.email ? "default" : "outline"}
                    size="sm"
                    onClick={() => setProfile(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, email: !prev.notifications.email }
                    }))}
                  >
                    {profile.notifications.email ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your devices
                    </p>
                  </div>
                  <Button
                    variant={profile.notifications.push ? "default" : "outline"}
                    size="sm"
                    onClick={() => setProfile(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, push: !prev.notifications.push }
                    }))}
                  >
                    {profile.notifications.push ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Marketing Communications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new features and tips
                    </p>
                  </div>
                  <Button
                    variant={profile.notifications.marketing ? "default" : "outline"}
                    size="sm"
                    onClick={() => setProfile(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, marketing: !prev.notifications.marketing }
                    }))}
                  >
                    {profile.notifications.marketing ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}