"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthLayout } from "@/modules/auth"
import { auth } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [errors, setErrors] = useState({ email: "", phone: "", password: "", auth: "" })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({ email: "", phone: "", password: "", auth: "" })

    // Basic validation
    const newErrors = { email: "", phone: "", password: "", auth: "" }
    if (loginMethod === "email" && !email) newErrors.email = "Email is required"
    if (loginMethod === "phone" && !phone) newErrors.phone = "Phone number is required"
    if (!password) newErrors.password = "Password is required"

    if (newErrors.email || newErrors.phone || newErrors.password) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      let result
      if (loginMethod === "email") {
        result = await auth.signInWithPassword(email, password)
      } else {
        result = await auth.signInWithPhone(phone, password)
      }

      if (result.error) {
        setErrors({ 
          email: "", 
          phone: "",
          password: "", 
          auth: result.error.message || "Invalid credentials. Please try again." 
        })
      } else if (result.data.user) {
        // Check if user needs onboarding (you can implement this logic)
        router.push("/dashboard")
      }
    } catch (error) {
      setErrors({ 
        email: "", 
        phone: "",
        password: "", 
        auth: "An unexpected error occurred. Please try again." 
      })
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
      setErrors(prev => ({ ...prev, auth: "Failed to sign in with Google" }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to your account to continue"
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
              Or sign in with
            </span>
          </div>
        </div>

        {/* Manual Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Authentication Error */}
          {errors.auth && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300">{errors.auth}</p>
            </div>
          )}

          {/* Login Method Tabs */}
          <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as "email" | "phone")}>
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
                  autoFocus
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
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="remember"
                checked={rememberMe}
                onCheckedChange={setRememberMe}
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me
              </Label>
            </div>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full h-12 text-base" 
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in to Unisynk"}
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:underline font-medium">
            Create account
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}