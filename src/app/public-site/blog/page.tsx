import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/layout/navigation"
import { Footer } from "@/layout/navigation"

const blogPosts = [
  {
    id: 1,
    title: "Introducing Unisynk: The Future of Event Management",
    excerpt: "Learn how Unisynk is revolutionizing event management with automation, integrations, and modular architecture.",
    author: "Team Unisynk",
    date: "2024-12-01",
    readTime: "5 min read",
    category: "Product",
    slug: "introducing-unisynk"
  },
  {
    id: 2,
    title: "10 Ways to Automate Your Event Workflows",
    excerpt: "Discover powerful automation strategies that can save you hours of manual work for every event.",
    author: "Sarah Johnson",
    date: "2024-11-28",
    readTime: "8 min read",
    category: "Tips",
    slug: "automate-event-workflows"
  },
  {
    id: 3,
    title: "Building Successful College Events: A Complete Guide",
    excerpt: "Everything you need to know about organizing memorable college events, from hackathons to cultural fests.",
    author: "Mike Chen",
    date: "2024-11-25",
    readTime: "12 min read",
    category: "Guide",
    slug: "college-events-guide"
  },
  {
    id: 4,
    title: "The Power of QR Code Check-ins",
    excerpt: "How QR code technology is streamlining event check-ins and improving attendee experience.",
    author: "Alex Rivera",
    date: "2024-11-22",
    readTime: "6 min read",
    category: "Technology",
    slug: "qr-code-checkins"
  }
]

const categories = ["All", "Product", "Tips", "Guide", "Technology"]

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      
      <div className="container py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Insights, tips, and updates from the Unisynk team
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      By {post.author}
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Posts
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}