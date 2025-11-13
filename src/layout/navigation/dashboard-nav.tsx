"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  HelpCircle,
  Bell,
  Search,
  User,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/buttons/theme-toggle"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Attendees", href: "/dashboard/attendees", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link className="flex items-center space-x-2" href="/dashboard">
          <div className="h-6 w-6 rounded bg-primary" />
          <span className="font-bold">Unisynk</span>
        </Link>
        
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] lg:w-[300px]"
            />
          </div>
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <HelpCircle className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </div>
  )
}

function UserMenu() {
  const router = useRouter()
  
  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    
    // Redirect to login
    router.push("/auth/login")
  }

  return (
    <div className="relative group">
      <Button variant="ghost" size="sm" className="flex items-center space-x-2">
        <User className="h-4 w-4" />
        <span className="hidden sm:inline text-sm">admin@unisynk.com</span>
      </Button>
      
      {/* Dropdown Menu */}
      <div className="absolute right-0 top-full mt-2 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          <Link 
            href="/profile" 
            className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
          <Link 
            href="/dashboard/settings" 
            className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
          <div className="border-t my-1" />
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}