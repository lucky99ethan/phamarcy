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
  avatar?: {
    initials: string
    color: string
  }
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

      if (result.success && result.data) {
        // Create avatar with initials and random color
        const initials = result.data.name.split(' ').map(n => n[0]).join('').toUpperCase()
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB']
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        
        const userData: User = {
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          role: result.data.role as "admin" | "doctor" | "customer",
          avatar: {
            initials,
            color: randomColor
          }
        }

        // Update state and localStorage
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))

        toast({
          title: "Login successful",
          description: `Welcome back, ${result.data.name}!`,
          variant: "default",
        })

        return true
      } else {
        toast({
          title: "Login failed",
          description: typeof result.error === 'string' ? result.error : 'Login failed. Please try again.',
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
        // Create avatar with initials and random color
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB']
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        
        const userData = {
          ...result.data,
          avatar: {
            initials,
            color: randomColor
          }
        }

        // Store user in localStorage with avatar
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData as User)

        toast({
          title: "Registration successful",
          description: "Your account has been created. You can now log in.",
          variant: "default",
        })

        return true
      } else {
        toast({
          title: "Registration failed",
          description: typeof result.error === 'string' ? result.error : 'Registration failed. Please try again.',
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
