import Link from "next/link"
import { Book, ArrowRight, Search, FileText, Zap, Users, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/layout/navigation"
import { Footer } from "@/layout/navigation"

const docSections = [
  {
    title: "Getting Started",
    description: "Learn the basics of Unisynk and create your first event",
    icon: Book,
    articles: [
      { title: "Quick Start Guide", href: "/docs/quick-start" },
      { title: "Creating Your First Event", href: "/docs/first-event" },
      { title: "Understanding Organizations", href: "/docs/organizations" },
      { title: "User Roles and Permissions", href: "/docs/roles" }
    ]
  },
  {
    title: "Event Management",
    description: "Everything about creating and managing events",
    icon: FileText,
    articles: [
      { title: "Event Builder", href: "/docs/event-builder" },
      { title: "Registration Forms", href: "/docs/registration-forms" },
      { title: "Session Management", href: "/docs/sessions" },
      { title: "Venue Configuration", href: "/docs/venues" }
    ]
  },
  {
    title: "Automation",
    description: "Automate your workflows with powerful rules",
    icon: Zap,
    articles: [
      { title: "Automation Builder", href: "/docs/automation-builder" },
      { title: "Triggers and Conditions", href: "/docs/triggers" },
      { title: "Email Automation", href: "/docs/email-automation" },
      { title: "Certificate Generation", href: "/docs/certificates" }
    ]
  },
  {
    title: "Attendee Management",
    description: "Manage registrations, check-ins, and attendee data",
    icon: Users,
    articles: [
      { title: "Registration Management", href: "/docs/registration" },
      { title: "QR Code Check-in", href: "/docs/qr-checkin" },
      { title: "Attendee Directory", href: "/docs/attendee-directory" },
      { title: "Bulk Operations", href: "/docs/bulk-operations" }
    ]
  },
  {
    title: "Integrations",
    description: "Connect Unisynk with your favorite tools",
    icon: Settings,
    articles: [
      { title: "Payment Integration", href: "/docs/payments" },
      { title: "Email Services", href: "/docs/email-services" },
      { title: "Calendar Integration", href: "/docs/calendar" },
      { title: "Webhooks & API", href: "/docs/webhooks" }
    ]
  }
]

const popularArticles = [
  { title: "Setting up WhatsApp Integration", href: "/docs/whatsapp" },
  { title: "Custom Domain Configuration", href: "/docs/custom-domain" },
  { title: "Troubleshooting Check-in Issues", href: "/docs/troubleshooting" },
  { title: "Event Analytics Guide", href: "/docs/analytics" }
]

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      
      <div className="container py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Documentation
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Everything you need to know about using Unisynk
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documentation..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {docSections.map((section) => (
              <Card key={section.title}>
                <CardHeader>
                  <section.icon className="h-8 w-8 text-primary" />
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.articles.map((article) => (
                      <li key={article.href}>
                        <Link
                          href={article.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between group"
                        >
                          {article.title}
                          <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Popular Articles</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {popularArticles.map((article) => (
                <Card key={article.href} className="group cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <Link href={article.href} className="flex items-center justify-between">
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {article.title}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4">Need more help?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/community">Join Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}