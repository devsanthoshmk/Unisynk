"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Phone, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthLayout } from "@/modules/auth"
import { cn } from "@/lib/utils"
import { auth } from "@/lib/supabase"

interface PasswordStrength {
  score: number
  feedback: string[]
  color: string
}

export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [signupMethod, setSignupMethod] = useState<"email" | "phone">("email")
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: "",
    auth: ""
  })
  const router = useRouter()

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
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: "",
      auth: ""
    })

    // Validation
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: "",
      auth: ""
    }

    if (!firstName.trim()) newErrors.firstName = "First name is required"
    if (!lastName.trim()) newErrors.lastName = "Last name is required"
    
    if (signupMethod === "email") {
      if (!email) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid"
    } else {
      if (!phone) newErrors.phone = "Phone number is required"
      else if (!/^\+?[\d\s-()]+$/.test(phone)) newErrors.phone = "Phone number is invalid"
    }

    if (!password) newErrors.password = "Password is required"
    else if (passwordStrength.score < 3) newErrors.password = "Password is too weak"

    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password"
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match"

    if (!agreeToTerms) newErrors.terms = "You must agree to the terms and conditions"

    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      const userEmail = signupMethod === "email" ? email : undefined
      const userPhone = signupMethod === "phone" ? phone : undefined
      
      const { data, error } = await auth.signUp(
        userEmail || userPhone!,
        password,
        {
          full_name: `${firstName} ${lastName}`,
          first_name: firstName,
          last_name: lastName,
          phone: userPhone
        }
      )

      if (error) {
        setErrors(prev => ({ ...prev, auth: error.message }))
      } else if (data.user) {
        // Check if email confirmation is required
        if (data.user.email_confirmed_at) {
          router.push("/onboarding")
        } else {
          // Show email confirmation message
          router.push("/auth/verify-email")
        }
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, auth: "Failed to create account. Please try again." }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    try {
      const { error } = await auth.signInWithGoogle()
      if (error) {
        setErrors(prev => ({ ...prev, auth: error.message }))
      }
      // Note: The redirect will be handled by the OAuth flow
    } catch (error) {
      setErrors(prev => ({ ...prev, auth: "Failed to sign up with Google" }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Get started with your free Unisynk account"
    >
      <div className="space-y-6">
        {/* OAuth Buttons */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full h-12 text-base"
            onClick={handleGoogleAuth}
            disabled={isLoading}
          >
            <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or register with
            </span>
          </div>
        </div>

        {/* Manual Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Authentication Error */}
          {errors.auth && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300">{errors.auth}</p>
            </div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Fletcher"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoFocus
                className="h-12"
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="h-12"
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Contact Method Tabs */}
          <Tabs value={signupMethod} onValueChange={(value) => setSignupMethod(value as "email" | "phone")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-12"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone}</p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
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
                <Check className="w-3 h-3" />
                <span>Passwords match</span>
              </div>
            )}
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={setAgreeToTerms}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            {errors.terms && (
              <p className="text-xs text-red-500">{errors.terms}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full h-12 text-base" 
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}