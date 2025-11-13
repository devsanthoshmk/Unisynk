"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  HelpCircle,
  Database,
  Shield,
  Zap,
  BarChart3,
  Puzzle,
  FileText,
  ChevronLeft,
  ChevronRight,
  Home,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ]
  },
  {
    title: "Events",
    items: [
      { name: "All Events", href: "/dashboard/events", icon: Calendar },
      { name: "Microsites", href: "/dashboard/microsites", icon: Globe },
      { name: "Attendees", href: "/dashboard/attendees", icon: Users },
      { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    ]
  },
  {
    title: "Tools",
    items: [
      { name: "Automation", href: "/dashboard/automation", icon: Zap },
      { name: "Certificates", href: "/dashboard/certificates", icon: FileText },
      { name: "Integrations", href: "/dashboard/integrations", icon: Puzzle },
    ]
  },
  {
    title: "Configuration",
    items: [
      { name: "Database", href: "/dashboard/database", icon: Database },
      { name: "Authentication", href: "/dashboard/auth", icon: Shield },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ]
  },
  {
    title: "Support",
    items: [
      { name: "Help & Support", href: "/dashboard/help", icon: HelpCircle },
    ]
  }
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn(
      "relative flex flex-col h-full bg-background border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <Link className="flex items-center space-x-2" href="/dashboard">
            <div className="h-6 w-6 rounded bg-primary" />
            <span className="font-bold text-lg">unisynk</span>
          </Link>
        )}
        {isCollapsed && (
          <Link className="flex items-center justify-center w-full" href="/dashboard">
            <div className="h-6 w-6 rounded bg-primary" />
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-6">
          {navigationItems.map((section) => (
            <div key={section.title}>
              {!isCollapsed && (
                <div className="px-4 mb-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h3>
                </div>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center px-4 py-2 text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        isActive 
                          ? "bg-accent text-accent-foreground border-r-2 border-primary" 
                          : "text-muted-foreground",
                        isCollapsed && "justify-center px-2"
                      )}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn(
            "w-full justify-start",
            isCollapsed && "justify-center px-2"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}