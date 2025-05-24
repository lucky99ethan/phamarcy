"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { loginUserApi, registerUserApi } from "@/lib/utils/auth"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  })

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      router.push(user.role === "customer" ? "/" : "/dashboard")
    }
  }, [router])

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))
  }
  const handleRoleChange = (value: string) => {
    setRegisterData((prev) => ({ ...prev, role: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await loginUserApi(loginData)
      const user = response.data.user || response.data.data || response.data
      
      if (user && (user.role === "customer" || user.role === "admin" || user.role === "doctor")) {
        // Store user in localStorage
        localStorage.setItem("user", JSON.stringify(user))
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name || user.email}!`,
          variant: "default",
        })
        
        // Redirect based on role
        window.location.href = user.role === "admin" ? "/admin" : (user.role === "customer" ? "/" : "/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials or account not found",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      let errorMessage = "Login failed. Please try again."
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error?.message) {
        errorMessage = error.message
      }
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate passwords match
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const response = await registerUserApi(registerData)

      if (response.data) {
        toast({
          title: "Registration successful",
          description: "Your account has been created. You can now log in.",
          variant: "default",
        })

        // Switch to login tab
        setActiveTab("login")

        // Pre-fill login form with registered email
        setLoginData((prev) => ({ ...prev, email: registerData.email }))

        // Reset register form
        setRegisterData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "customer",
        })
      }
    } catch (error: any) {
      let errorMessage = "Registration failed. Please try again."
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error
      } else if (error?.message) {
        errorMessage = error.message
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container relative flex-col items-center justify-center grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-8 py-10">
      <div className="col-span-1 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] lg:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to MediStore</h1>
          <p className="text-sm text-muted-foreground">Your trusted online pharmacy</p>
        </div>
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <div className="grid gap-4">
              <form onSubmit={handleLogin}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      required
                      value={loginData.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/auth/reset-password"
                        className="text-sm text-primary underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="current-password"
                      disabled={isLoading}
                      required
                      minLength={6}
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" disabled={isLoading}>
                  Google
                </Button>
                <Button variant="outline" disabled={isLoading}>
                  Facebook
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="register">
            <div className="grid gap-4">
              <form onSubmit={handleRegister}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      disabled={isLoading}
                      required
                      minLength={2}
                      value={registerData.name}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      required
                      value={registerData.email}
                      onChange={handleRegisterChange}
                    />
                  </div>
                        <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <select
                      id="role"
                      name="role"
                      value={registerData.role}
                      onChange={handleRegisterChange}
                      disabled={isLoading}
                      required
                      className="block w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-primary shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="customer">Customer</option>
                      <option value="doctor">Doctor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoCapitalize="none"
                      disabled={isLoading}
                      required
                      minLength={6}
                      value={registerData.password}
                      onChange={handleRegisterChange}
                    />
                  </div>
            
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      autoCapitalize="none"
                      disabled={isLoading}
                      required
                      minLength={6}
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </div>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" disabled={isLoading}>
                  Google
                </Button>
                <Button variant="outline" disabled={isLoading}>
                  Facebook
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="hidden lg:col-span-1 lg:block">
        <div className="h-full rounded-lg bg-muted p-8 flex flex-col justify-center">
          <div className="mx-auto max-w-md space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-8">
                <Heart className="h-16 w-16 text-primary" />
              </div>
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold">Trusted by thousands</h2>
              <p className="text-muted-foreground">
                Join thousands of customers who trust MediStore for their medication and healthcare needs.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Fast Delivery</div>
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "MediStore delivered my medication within 30 minutes. Amazing service!"
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Quality Products</div>
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Always receive genuine products. Great customer service too!"
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Reliable Service</div>
                  <div className="flex">
                    {Array(4)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    <Star className="h-4 w-4 text-muted" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Been using MediStore for over a year. Never had any issues."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
