"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Heart, Menu, Phone, User } from "lucide-react"
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout, isAuthenticated } = useAuth()

  const routes = [
    { href: "/", label: "Home" },
    { href: "/medicine", label: "Medicine" },
    { href: "/delivery", label: "Delivery" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
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
                    href="/dashboard"
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
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center mr-2">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm">(123) 456-7890</span>
          </div>
          <CartDropdown />
          <ModeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center gap-2 p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="grid gap-0.5 text-sm">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-xs text-muted-foreground">{user?.email}</div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders">My Orders</Link>
                </DropdownMenuItem>
                {user?.role !== "customer" && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
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
    </header>
  )
}
