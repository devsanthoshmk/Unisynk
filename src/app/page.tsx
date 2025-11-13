import Link from "next/link"
import { ArrowRight, Calendar, Users, Zap, Shield, Globe, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/layout/navigation"
import { Footer } from "@/layout/navigation"

const features = [
  {
    icon: Calendar,
    title: "Event Builder",
    description: "Create events with sessions, venues, and ticket types. Support for college, corporate, nonprofit, and community events."
  },
  {
    icon: Users,
    title: "Attendee Management",
    description: "Registration forms, QR check-in, certificate generation, and automated attendee lifecycle management."
  },
  {
    icon: Zap,
    title: "Automation Engine",
    description: "Visual automation builder with trigger â†’ condition â†’ action flows. Automate 80% of manual workflows."
  },
  {
    icon: Shield,
    title: "Role Management",
    description: "Granular permissions, SSO support, SCIM provisioning, and audit logs for enterprise compliance."
  },
  {
    icon: Globe,
    title: "Public Microsites",
    description: "Customizable event landing pages with registration, schedules, announcements, and certificate downloads."
  },
  {
    icon: Smartphone,
    title: "Mobile Experience",
    description: "Progressive Web App for organizers and participants. Offline QR check-in and real-time updates."
  }
]

const verticals = [
  {
    title: "College Events",
    description: "Fests, hackathons, workshops with team registration and mentor matching",
    features: ["Team Registration", "Mentor Matching", "Certificate Rules", "Campus Integration"]
  },
  {
    title: "Corporate Events",
    description: "Conferences, trainings, town halls with SSO and audit logs",
    features: ["SSO Integration", "Audit Logs", "Hybrid Sessions", "Enterprise Security"]
  },
  {
    title: "Community Events",
    description: "Meetups, workshops, pop-ups with campaign management",
    features: ["Campaign Manager", "Referral Tracking", "Social Sharing", "Local Promotion"]
  },
  {
    title: "Nonprofit Events",
    description: "Blood camps, awareness drives, fundraisers with volunteer scheduling",
    features: ["Volunteer Scheduling", "Consent Forms", "Donation Tracking", "Impact Reports"]
  }
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center space-y-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Event Management
            <span className="text-primary"> Reimagined</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Modular SaaS platform that automates 80% of manual workflows. 
            Organizers manage events, participants interact via customizable microsites.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to manage events
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From registration to certificates, automate your entire event workflow
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-8 w-8 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Verticals Section */}
      <section className="bg-muted/50 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for every event type
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Specialized feature packs for different verticals and use cases
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
            {verticals.map((vertical) => (
              <Card key={vertical.title}>
                <CardHeader>
                  <CardTitle>{vertical.title}</CardTitle>
                  <CardDescription>{vertical.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {vertical.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to transform your events?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of organizers who trust Unisynk for their events
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
