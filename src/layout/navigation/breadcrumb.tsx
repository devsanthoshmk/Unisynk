"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const pathNameMap: Record<string, string> = {
  dashboard: "Dashboard",
  events: "Events",
  attendees: "Attendees",
  analytics: "Analytics",
  automation: "Automation",
  certificates: "Certificates",
  integrations: "Integrations",
  database: "Database",
  auth: "Authentication",
  settings: "Settings",
  help: "Help & Support",
  profile: "Profile",
  new: "New",
  edit: "Edit"
}

export function Breadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  // Remove 'dashboard' from segments if it's the first one
  const segments = pathSegments[0] === "dashboard" ? pathSegments.slice(1) : pathSegments

  const breadcrumbItems = [
    { name: "Home", href: "/dashboard", isHome: true }
  ]

  // Build breadcrumb items from path segments
  let currentPath = "/dashboard"
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const name = pathNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    breadcrumbItems.push({
      name,
      href: currentPath,
      isHome: false
    })
  })

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
          )}
          {index === breadcrumbItems.length - 1 ? (
            // Current page - not clickable
            <span className="flex items-center font-medium text-foreground">
              {item.isHome && <Home className="h-4 w-4 mr-1" />}
              {item.name}
            </span>
          ) : (
            // Previous pages - clickable
            <Link
              href={item.href}
              className={cn(
                "flex items-center hover:text-foreground transition-colors",
                item.isHome && "hover:text-primary"
              )}
            >
              {item.isHome && <Home className="h-4 w-4 mr-1" />}
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}