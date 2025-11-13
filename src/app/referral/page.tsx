"use client"

import { useState } from "react"
import { Copy, Share2, Gift, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/layout/navigation"
import { Footer } from "@/layout/navigation"

const referralStats = [
  { label: "Total Referrals", value: "12", icon: Users },
  { label: "Successful Signups", value: "8", icon: TrendingUp },
  { label: "Credits Earned", value: "$240", icon: Gift },
]

export default function ReferralPage() {
  const [email, setEmail] = useState("")
  const [referralCode] = useState("UNISYNK-ABC123")
  const [referralLink] = useState("https://unisynk.com/signup?ref=ABC123")

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Send referral invitation
    console.log("Sending invitation to:", email)
    setEmail("")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // TODO: Show toast notification
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      
      <div className="container py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Refer Friends, Earn Rewards
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Share Unisynk with your network and earn credits for every successful referral
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {referralStats.map((stat) => (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Referral Code</CardTitle>
                <CardDescription>
                  Share this code with friends to earn rewards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Referral Code</Label>
                  <div className="flex">
                    <Input value={referralCode} readOnly className="rounded-r-none" />
                    <Button
                      variant="outline"
                      className="rounded-l-none"
                      onClick={() => copyToClipboard(referralCode)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Referral Link</Label>
                  <div className="flex">
                    <Input value={referralLink} readOnly className="rounded-r-none" />
                    <Button
                      variant="outline"
                      className="rounded-l-none"
                      onClick={() => copyToClipboard(referralLink)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share on Social Media
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invite by Email</CardTitle>
                <CardDescription>
                  Send a personal invitation to your contacts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInvite} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="friend@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Invitation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>
                Earn rewards for every friend who joins Unisynk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Share2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">1. Share Your Link</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Share your unique referral link with friends and colleagues
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">2. They Sign Up</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your friends create an account using your referral code
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">3. Earn Rewards</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Get $30 credit for each successful referral to Pro plan
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}