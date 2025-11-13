"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "@/modules/auth"
import { auth } from "@/lib/supabase"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!email) {
      setError("Email is required")
      setIsLoading(false)
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await auth.resetPassword(email)
      
      if (error) {
        setError(error.message)
      } else {
        setIsSubmitted(true)
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsLoading(true)
    try {
      const { error } = await auth.resetPassword(email)
      if (error) {
        setError(error.message)
        setIsSubmitted(false)
      }
    } catch (error) {
      setError("Failed to resend email. Please try again.")
      setIsSubmitted(false)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <AuthLayout 
        title="Check your email" 
        subtitle="We've sent a password reset link to your email"
        showBackButton={false}
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          
          <div className="space-y-2">
            <p className="text-muted-foreground">
              We've sent a password reset link to:
            </p>
            <p className="font-medium text-foreground">{email}</p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            
            <Button 
              variant="outline" 
              onClick={handleResend}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Resending..." : "Resend email"}
            </Button>
          </div>

          <div className="pt-4">
            <Link 
              href="/auth/login"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Link>
          </div>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout 
      title="Forgot your password?" 
      subtitle="Enter your email address and we'll send you a link to reset your password"
    >
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="h-12 pl-10"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base" 
            disabled={isLoading}
          >
            {isLoading ? "Sending reset link..." : "Send reset link"}
          </Button>
        </form>

        <div className="text-center">
          <Link 
            href="/auth/login"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>
            Remember your password?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}