"use client"

import Link from "next/link"
import { useState } from "react"
import { Check, ArrowRight, Calendar, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/layout/navigation"
import { Footer } from "@/layout/navigation"

// Subscription Plans (Monthly/Yearly)
const subscriptionPlans = [
  {
    name: "Free",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    description: "Perfect for small events and getting started",
    features: [
      "Up to 100 attendees per event",
      "Basic registration forms",
      "QR check-in",
      "Certificate generation",
      "Email notifications",
      "Community support"
    ],
    cta: "Get Started",
    href: "/auth/signup",
    popular: false
  },
  {
    name: "Pro",
    monthlyPrice: "$29",
    yearlyPrice: "$290",
    description: "For growing organizations and regular events",
    features: [
      "Up to 1,000 attendees per event",
      "Advanced form builder",
      "Automation workflows",
      "Custom branding",
      "WhatsApp integration",
      "Analytics dashboard",
      "Email support"
    ],
    cta: "Start Free Trial",
    href: "/auth/signup?plan=pro",
    popular: true,
    savings: "Save $58"
  },
  {
    name: "Business",
    monthlyPrice: "$99",
    yearlyPrice: "$990",
    description: "For teams and organizations with multiple events",
    features: [
      "Up to 5,000 attendees per event",
      "Team collaboration",
      "Advanced integrations",
      "Custom domains",
      "Priority support",
      "Advanced analytics",
      "API access"
    ],
    cta: "Start Free Trial",
    href: "/auth/signup?plan=business",
    popular: false,
    savings: "Save $198"
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    description: "For large organizations with complex needs",
    features: [
      "Unlimited attendees",
      "SSO & SCIM",
      "Audit logs",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "On-premise deployment"
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false
  }
]

// Event-wise Plans
const eventPlans = [
  {
    name: "Starter Event",
    price: "$49",
    description: "Perfect for small to medium events",
    attendeeLimit: "Up to 500 attendees",
    features: [
      "Complete event setup",
      "Registration & check-in",
      "Certificate generation",
      "Basic automation",
      "Email notifications",
      "30-day event support"
    ],
    cta: "Create Event",
    href: "/auth/signup?plan=starter-event",
    popular: false
  },
  {
    name: "Professional Event",
    price: "$149",
    description: "For larger events with advanced features",
    attendeeLimit: "Up to 2,000 attendees",
    features: [
      "Everything in Starter",
      "Advanced form builder",
      "WhatsApp integration",
      "Custom branding",
      "Analytics dashboard",
      "Priority support",
      "60-day event support"
    ],
    cta: "Create Event",
    href: "/auth/signup?plan=pro-event",
    popular: true
  },
  {
    name: "Enterprise Event",
    price: "$399",
    description: "For large-scale events and conferences",
    attendeeLimit: "Up to 10,000 attendees",
    features: [
      "Everything in Professional",
      "Dedicated event manager",
      "Custom integrations",
      "Live support during event",
      "Advanced analytics",
      "Post-event reporting",
      "90-day event support"
    ],
    cta: "Create Event",
    href: "/auth/signup?plan=enterprise-event",
    popular: false
  },
  {
    name: "Unlimited Event",
    price: "Custom",
    description: "For massive events and festivals",
    attendeeLimit: "Unlimited attendees",
    features: [
      "Everything in Enterprise",
      "On-site support team",
      "Custom development",
      "White-label solution",
      "24/7 dedicated support",
      "Custom SLA",
      "Unlimited support"
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false
  }
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      
      <div className="container py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose the plan that fits your needs. All plans include our core features.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <Tabs defaultValue="subscription" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="subscription" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Subscription Plans
              </TabsTrigger>
              <TabsTrigger value="event" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Per Event Plans
              </TabsTrigger>
            </TabsList>

            <TabsContent value="subscription" className="mt-8">
              {/* Billing Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <Label htmlFor="billing-toggle" className={!isYearly ? "font-semibold" : ""}>
                  Monthly
                </Label>
                <Switch
                  id="billing-toggle"
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                />
                <Label htmlFor="billing-toggle" className={isYearly ? "font-semibold" : ""}>
                  Yearly
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
                    Save up to 20%
                  </span>
                </Label>
              </div>

              <div className="grid gap-8 lg:grid-cols-4">
                {subscriptionPlans.map((plan) => (
                  <Card key={plan.name} className={plan.popular ? "border-primary shadow-lg relative" : ""}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                          Most Popular
                        </div>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">
                          {plan.name === "Free" || plan.monthlyPrice === "Custom" 
                            ? plan.monthlyPrice 
                            : isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        {plan.monthlyPrice !== "Custom" && plan.name !== "Free" && (
                          <span className="text-muted-foreground">
                            /{isYearly ? "year" : "month"}
                          </span>
                        )}
                      </div>
                      {isYearly && plan.savings && (
                        <div className="text-sm text-green-600 font-medium">
                          {plan.savings}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <Check className="mr-3 h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full" 
                        variant={plan.popular ? "default" : "outline"}
                        asChild
                      >
                        <Link href={plan.href}>
                          {plan.cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="event" className="mt-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Pay Per Event</h3>
                <p className="text-muted-foreground">
                  Perfect for occasional events. Pay only when you need it.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-4">
                {eventPlans.map((plan) => (
                  <Card key={plan.name} className={plan.popular ? "border-primary shadow-lg relative" : ""}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                          Most Popular
                        </div>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        {plan.price !== "Custom" && (
                          <span className="text-muted-foreground">/event</span>
                        )}
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {plan.attendeeLimit}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <Check className="mr-3 h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full" 
                        variant={plan.popular ? "default" : "outline"}
                        asChild
                      >
                        <Link href={plan.href}>
                          {plan.cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h3 className="text-2xl font-bold">Frequently asked questions</h3>
          <div className="mt-8 space-y-6 text-left">
            <div>
              <h4 className="font-semibold">Can I switch between subscription and per-event pricing?</h4>
              <p className="mt-2 text-muted-foreground">
                Yes, you can choose the pricing model that works best for each event. Subscription plans are great for regular events, while per-event pricing is perfect for occasional events.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">What's the difference between monthly and yearly billing?</h4>
              <p className="mt-2 text-muted-foreground">
                Yearly billing offers significant savings (up to 20% off) and includes additional benefits like priority support and early access to new features.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Can I upgrade my event plan after creation?</h4>
              <p className="mt-2 text-muted-foreground">
                Yes, you can upgrade your event plan at any time if you need more attendees or additional features. You'll only pay the difference.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">What payment methods do you accept?</h4>
              <p className="mt-2 text-muted-foreground">
                We accept all major credit cards, PayPal, and bank transfers. Enterprise customers can pay via invoice with NET 30 terms.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Is there a free trial?</h4>
              <p className="mt-2 text-muted-foreground">
                Yes, all paid subscription plans come with a 14-day free trial. Per-event plans include a money-back guarantee if you're not satisfied.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}