"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Activity,
  AlertCircle,
  CreditCard,
  File,
  FilePlus,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Users,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/auth-context"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ["admin", "doctor", "customer"],
  },
  {
    title: "Medicine Inventory",
    href: "/dashboard/inventory",
    icon: <Package className="h-5 w-5" />,
    roles: ["admin", "doctor"],
  },
  {
    title: "Medicine Requests",
    href: "/dashboard/requests",
    icon: <FilePlus className="h-5 w-5" />,
    roles: ["admin", "doctor", "customer"],
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: <ShoppingBag className="h-5 w-5" />,
    roles: ["admin", "doctor", "customer"],
  },
  {
    title: "Prescriptions",
    href: "/dashboard/prescriptions",
    icon: <File className="h-5 w-5" />,
    roles: ["admin", "doctor", "customer"],
  },
  {
    title: "User Management",
    href: "/dashboard/users",
    icon: <Users className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: <Activity className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: <CreditCard className="h-5 w-5" />,
    roles: ["admin", "customer"],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
    roles: ["admin", "doctor", "customer"],
  },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login")
      return
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    router.replace("/auth/login")
  }

  if (!isAuthenticated) {
    return null
  }

  const filteredSidebarItems = sidebarItems.filter((item) => item.roles.includes(user?.role || "customer"))

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">MediStore</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {user?.avatar?.initials || user?.name?.[0] || "U"}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-background transition-transform duration-200 ease-in-out md:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="flex h-full flex-col gap-2 p-4">
            {filteredSidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-4 md:ml-64">{children}</main>
      </div>
    </div>
  )
}
