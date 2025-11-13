"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Calendar, Users, TrendingUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Events",
    value: "12",
    change: "+2 from last month",
    icon: Calendar
  },
  {
    title: "Total Attendees",
    value: "2,847",
    change: "+15% from last month",
    icon: Users
  },
  {
    title: "Active Events",
    value: "3",
    change: "2 ending this week",
    icon: Clock
  },
  {
    title: "Conversion Rate",
    value: "68%",
    change: "+5% from last month",
    icon: TrendingUp
  }
]

const recentEvents = [
  {
    name: "Tech Conference 2024",
    status: "Active",
    attendees: 450,
    date: "Dec 15, 2024"
  },
  {
    name: "Annual Hackathon",
    status: "Draft",
    attendees: 0,
    date: "Jan 20, 2025"
  },
  {
    name: "Workshop Series",
    status: "Completed",
    attendees: 120,
    date: "Nov 30, 2024"
  }
]

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    // Get user email from localStorage
    const email = localStorage.getItem("userEmail")
    if (email) {
      setUserEmail(email)
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          {userEmail && (
            <p className="text-muted-foreground">Welcome back, {userEmail}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/dashboard/events/new">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>
              Your latest events and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.name} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {event.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.attendees} attendees • {event.date}
                    </p>
                  </div>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    event.status === "Active" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : event.status === "Draft"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                  }`}>
                    {event.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to get you started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/events/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Event
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/attendees">
                <Users className="mr-2 h-4 w-4" />
                Manage Attendees
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/settings">
                <Calendar className="mr-2 h-4 w-4" />
                Organization Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}