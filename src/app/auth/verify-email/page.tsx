"use client"

import Link from "next/link"
import { Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthLayout } from "@/modules/auth"

export default function VerifyEmailPage() {
  return (
    <AuthLayout 
      title="Check your email" 
      subtitle="We've sent you a verification link"
      showBackButton={false}
    >
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        
        <div className="space-y-2">
          <p className="text-muted-foreground">
            We've sent a verification link to your email address.
          </p>
          <p className="text-sm text-muted-foreground">
            Please check your inbox and click the link to verify your account.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Email sent successfully</span>
          </div>
        </div>

        <div className="pt-4">
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