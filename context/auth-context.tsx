"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { loginUser, registerUser } from "@/lib/actions"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "doctor" | "customer"
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would check session/token validity here
        const storedUser = localStorage.getItem("user")

        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const result = await loginUser({ email, password })

      if (result.success) {
        setUser(result.data as User)

        // Store user in localStorage (in a real app, you'd use secure cookies/session)
        localStorage.setItem("user", JSON.stringify(result.data))

        toast({
          title: "Login successful",
          description: `Welcome back, ${result.data.name}!`,
          variant: "success",
        })

        return true
      } else {
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive",
        })

        return false
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })

      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    try {
      const result = await registerUser({ name, email, password, confirmPassword: password })

      if (result.success) {
        toast({
          title: "Registration successful",
          description: "Your account has been created. You can now log in.",
          variant: "success",
        })

        return true
      } else {
        toast({
          title: "Registration failed",
          description: result.error,
          variant: "destructive",
        })

        return false
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })

      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/auth/login")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
