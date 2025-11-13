"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Bell, 
  Search, 
  User, 
  LogOut, 
  Settings, 
  HelpCircle,
  MessageSquare,
  ExternalLink,
  Copy,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/buttons/theme-toggle"
import { Breadcrumb } from "./breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function TopNav() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [projectUrlCopied, setProjectUrlCopied] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("onboardingComplete")
    router.push("/auth/login")
  }

  const copyProjectUrl = async () => {
    const url = `${window.location.origin}/dashboard`
    await navigator.clipboard.writeText(url)
    setProjectUrlCopied(true)
    setTimeout(() => setProjectUrlCopied(false), 2000)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Left side - Breadcrumb */}
        <div className="flex items-center space-x-4">
          <Breadcrumb />
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Project URL */}
          <Button
            variant="ghost"
            size="sm"
            onClick={copyProjectUrl}
            className="hidden lg:flex items-center space-x-2 text-muted-foreground hover:text-foreground"
          >
            {projectUrlCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="text-xs">
              {projectUrlCopied ? "Copied!" : "Copy URL"}
            </span>
          </Button>

          {/* Environment Badge */}
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Production
          </Badge>

          {/* Feedback */}
          <Button variant="ghost" size="sm" className="hidden lg:flex">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">Feedback</span>
          </Button>

          {/* Help */}
          <Button variant="ghost" size="sm">
            <HelpCircle className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <User className="h-3 w-3 text-white" />
                </div>
                <span className="hidden sm:inline text-sm">admin@unisynk.com</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@unisynk.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button
                  onClick={() => router.push("/profile")}
                  className="w-full flex items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button
                  onClick={() => router.push("/dashboard/settings")}
                  className="w-full flex items-center"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Documentation
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}