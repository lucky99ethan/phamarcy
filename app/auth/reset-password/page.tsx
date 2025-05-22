"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would call an API to send a password reset email
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)

      toast({
        title: "Reset link sent",
        description: "Check your email for a link to reset your password.",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Failed to send reset link",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container flex h-screen max-w-md flex-col items-center justify-center">
      <Card className="w-full">
        {!isSubmitted ? (
          <>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center">Check Your Email</CardTitle>
              <CardDescription className="text-center">
                We've sent a password reset link to <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-sm text-muted-foreground">
                If you don't see the email in your inbox, please check your spam folder. The link will expire in 24
                hours.
              </p>
            </CardContent>
          </>
        )}
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/auth/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
