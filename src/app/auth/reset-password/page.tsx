"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "@/modules/auth"
import { cn } from "@/lib/utils"
import { auth } from "@/lib/supabase"

interface PasswordStrength {
  score: number
  feedback: string[]
  color: string
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isValidToken, setIsValidToken] = useState(true)
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    token: ""
  })
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    // Check if we have the necessary URL parameters for password reset
    if (!token) {
      setIsValidToken(false)
      setErrors(prev => ({ ...prev, token: "Invalid or missing reset token" }))
      return
    }

    // The token validation will happen when the user submits the form
    setIsValidToken(true)
  }, [token])

  const getPasswordStrength = (password: string): PasswordStrength => {
    let score = 0
    const feedback: string[] = []

    if (password.length >= 8) score += 1
    else feedback.push("At least 8 characters")

    if (/[a-z]/.test(password)) score += 1
    else feedback.push("One lowercase letter")

    if (/[A-Z]/.test(password)) score += 1
    else feedback.push("One uppercase letter")

    if (/\d/.test(password)) score += 1
    else feedback.push("One number")

    if (/[^a-zA-Z0-9]/.test(password)) score += 1
    else feedback.push("One special character")

    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]
    const color = colors[Math.min(score, 4)]

    return { score, feedback, color }
  }

  const passwordStrength = getPasswordStrength(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({ password: "", confirmPassword: "", token: "" })

    // Validation
    const newErrors = { password: "", confirmPassword: "", token: "" }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (passwordStrength.score < 3) {
      newErrors.password = "Password is too weak"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match"
    }

    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      const { error } = await auth.updatePassword(password)
      
      if (error) {
        setErrors(prev => ({ ...prev, token: error.message }))
      } else {
        setIsSuccess(true)
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/auth/login")
        }, 3000)
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, token: "Failed to reset password. Please try again." }))
    } finally {
      setIsLoading(false)
    }
  }

  // Invalid token state
  if (!isValidToken) {
    return (
      <AuthLayout 
        title="Invalid reset link" 
        subtitle="This password reset link is invalid or has expired"
        showBackButton={false}
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
            <X className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          
          <div className="space-y-2">
            <p className="text-muted-foreground">
              The password reset link you used is either invalid or has expired.
            </p>
          </div>

          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/auth/forgot-password">
                Request new reset link
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/auth/login">
                Back to login
              </Link>
            </Button>
          </div>
        </div>
      </AuthLayout>
    )
  }

  // Success state
  if (isSuccess) {
    return (
      <AuthLayout 
        title="Password reset successful" 
        subtitle="Your password has been successfully updated"
        showBackButton={false}
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          
          <div className="space-y-2">
            <p className="text-muted-foreground">
              You can now sign in with your new password.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to login page in 3 seconds...
            </p>
          </div>

          <Button asChild className="w-full">
            <Link href="/auth/login">
              Continue to login
            </Link>
          </Button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout 
      title="Reset your password" 
      subtitle="Enter your new password below"
    >
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.token && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300">{errors.token}</p>
            </div>
          )}

          {/* New Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Password Strength Meter */}
            {password && (
              <div className="space-y-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={cn(
                        "h-1 flex-1 rounded-full transition-colors",
                        level <= passwordStrength.score ? passwordStrength.color : "bg-muted"
                      )}
                    />
                  ))}
                </div>
                {passwordStrength.feedback.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    <p className="mb-1">Password must contain:</p>
                    <div className="space-y-1">
                      {passwordStrength.feedback.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <X className="w-3 h-3 text-red-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm new password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword && password === confirmPassword && (
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircle className="w-3 h-3" />
                <span>Passwords match</span>
              </div>
            )}
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base" 
            disabled={isLoading}
          >
            {isLoading ? "Resetting password..." : "Reset password"}
          </Button>
        </form>

        <div className="text-center">
          <Link 
            href="/auth/login"
            className="text-sm text-primary hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}