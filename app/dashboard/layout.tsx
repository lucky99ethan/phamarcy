"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // For demo purposes, let's assume the user is admin
  // In a real app, you would get this from your auth context
  const userRole = "admin"

  const filteredSidebarItems = sidebarItems.filter((item) => item.roles.includes(userRole))

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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/notifications">
                <AlertCircle className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative h-9 w-9 rounded-full">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">A</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center gap-2 p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">A</div>
                  <div className="grid gap-0.5 text-sm">
                    <div className="font-medium">Admin User</div>
                    <div className="text-xs text-muted-foreground">admin@medistore.com</div>
                  </div>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" asChild>
                  <Link href="/auth/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 mt-16 w-64 shrink-0 border-r bg-background transition-transform md:static md:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-[calc(100vh-4rem)] flex-col gap-2 overflow-auto p-4">
            <nav className="grid gap-1">
              {filteredSidebarItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/dashboard")
                      ? "bg-accent text-accent-foreground"
                      : "transparent",
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
