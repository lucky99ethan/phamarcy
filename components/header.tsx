"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Heart, Menu, Phone, X, User, LogOut, Settings, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"
import CartDropdown from "./cart-dropdown"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()

  const routes = [
    { href: "/", label: "Home" },
    { href: "/medicine", label: "Medicine" },
    { href: "/delivery", label: "Delivery" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ]

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      // Assuming the user data is stored in localStorage
      // You might want to implement a more secure way to handle this
      // For example, using a state management library like Redux or Zustand
      // or a backend session to handle user authentication
      // Here, we'll just use localStorage for simplicity
      // You should replace this with a more secure method in a production environment
      // For example, using a state management library like Redux or Zustand
      // or a backend session to handle user authentication
      // Here, we'll just use localStorage for simplicity
      // You should replace this with a more secure method in a production environment
    }
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>MediStore</SheetTitle>
                <SheetDescription>Your trusted online pharmacy</SheetDescription>
              </SheetHeader>
              <nav className="grid gap-4 py-6">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center text-lg font-medium hover:text-primary",
                      pathname === route.href ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
                {isAuthenticated && user?.role !== "customer" && (
                  <Link
                    href="/admin"
                    className="flex items-center text-lg font-medium hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MediStore</span>
          </Link>
        </div>
        <nav className="hidden gap-6 md:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
          {isAuthenticated && user?.role !== "customer" && (
            <Link href="/admin" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center mr-2">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm">+255677927107</span>
          </div>
          {isAuthenticated && <CartDropdown />}
          <ModeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative h-10 w-10 rounded-full overflow-hidden">
                  {user?.avatar ? (
                    <div 
                      className="h-full w-full flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: user.avatar.color }}
                    >
                      {user.avatar.initials}
                    </div>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <div 
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white font-medium"
                    style={{ backgroundColor: user?.avatar?.color || '#666' }}
                  >
                    {user?.avatar?.initials || user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="grid gap-0.5 text-sm">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-xs text-muted-foreground">{user?.email}</div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/orders")}>
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button variant="outline" className="hidden md:inline-flex">
                Login / Register
              </Button>
            </Link>
          )}
 
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="container flex flex-col gap-4 py-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href ? "text-primary" : "text-muted-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            {isAuthenticated && user?.role !== "customer" && (
              <Link
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
