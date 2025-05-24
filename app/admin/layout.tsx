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
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-primary drop-shadow-sm">Welcome, Admin!</h1>
            <p className="text-muted-foreground text-lg mt-1">Manage your pharmacy with powerful tools and insights.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shadow">A</div>
            <span className="font-semibold text-primary">Admin</span>
          </div>
        </div>
        {/* Dashboard Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start border-l-4 border-blue-400">
            <span className="text-sm text-muted-foreground">Total Medicines</span>
            <span className="text-2xl font-bold text-blue-600 mt-2">120</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start border-l-4 border-green-400">
            <span className="text-sm text-muted-foreground">Total Stock</span>
            <span className="text-2xl font-bold text-green-600 mt-2">2,500</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start border-l-4 border-purple-400">
            <span className="text-sm text-muted-foreground">Total Users</span>
            <span className="text-2xl font-bold text-purple-600 mt-2">15</span>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}
