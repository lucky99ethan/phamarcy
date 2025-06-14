"use client"

import React from "react"
import AdminSidebar from "@/components/admin/sidebar"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Hide sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <AdminSidebar />
      <main className="flex-1 p-8">

        {children}
      </main>
    </div>
  )
}
