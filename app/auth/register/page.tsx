"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { registerUserApi } from "@/lib/utils/auth"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await registerUserApi(formData)
      toast({
        title: "Registration successful",
        description: "You can now log in.",
        variant: "default",
      })
      router.push("/auth/login")
    } catch (error: any) {
      let errorMessage = "Registration failed. Please try again."
      const extractMessage = (err: any): string => {
        if (!err) return errorMessage
        if (typeof err === "string") return err
        if (Array.isArray(err)) return err.map(extractMessage).join("; ")
        if (typeof err.message === "string") return err.message
        if (typeof err === "object") {
          // Try to join all string values in the object
          return Object.values(err).map(extractMessage).join("; ")
        }
        return JSON.stringify(err)
      }
      if (error?.response?.data?.message) {
        errorMessage = extractMessage(error.response.data.message)
      } else if (error?.response?.data?.error) {
        errorMessage = extractMessage(error.response.data.error)
      } else if (error?.response?.data) {
        errorMessage = extractMessage(error.response.data)
      } else if (error?.message) {
        errorMessage = extractMessage(error.message)
      }
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 py-12">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="block w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-primary shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="customer">Customer</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-white text-lg font-bold py-3 rounded-xl shadow-lg hover:bg-primary/90 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account? <a href="/auth/login" className="text-primary underline">Login</a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
