"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/layout/navigation"
import { Footer } from "@/layout/navigation"
import { Star, Users, Gift, Trophy, CheckCircle } from "lucide-react"

const benefits = [
  {
    icon: Gift,
    title: "Free Pro Plan",
    description: "Get unlimited access to all Pro features while you're an active ambassador"
  },
  {
    icon: Users,
    title: "Exclusive Community",
    description: "Join our private Discord community with direct access to the product team"
  },
  {
    icon: Trophy,
    title: "Recognition",
    description: "Get featured on our website, social media, and at events"
  },
  {
    icon: Star,
    title: "Early Access",
    description: "Be the first to try new features and provide feedback"
  }
]

const requirements = [
  "Active user of Unisynk with at least 3 successful events",
  "Strong presence in your local event organizing community",
  "Willingness to create content (blog posts, tutorials, case studies)",
  "Available to host workshops or webinars (2-3 times per year)",
  "Passionate about event management and helping others succeed"
]

export default function AmbassadorPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    experience: "",
    community: "",
    motivation: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Submit ambassador application
    console.log("Ambassador application:", formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      
      <div className="container py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Become a Unisynk Ambassador
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join our community of event organizers and help shape the future of event management
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Ambassador Benefits</h2>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <Card key={benefit.title}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <benefit.icon className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold">{benefit.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">What We're Looking For</h2>
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Apply to Become an Ambassador</CardTitle>
              <CardDescription>
                Tell us about yourself and why you'd be a great Unisynk ambassador
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => handleChange("organization", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => handleChange("role", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Event Management Experience</Label>
                  <textarea
                    id="experience"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us about your experience organizing events..."
                    value={formData.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="community">Community Involvement</Label>
                  <textarea
                    id="community"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe your involvement in the event organizing community..."
                    value={formData.community}
                    onChange={(e) => handleChange("community", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation">Why do you want to be an ambassador?</Label>
                  <textarea
                    id="motivation"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="What motivates you to help other event organizers succeed?"
                    value={formData.motivation}
                    onChange={(e) => handleChange("motivation", e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}