"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Layers, Users } from "lucide-react"

const navItems = [
  { href: "/admin/inventory", label: "Inventory", icon: <Package className="h-5 w-5" /> },
  { href: "/admin/stock", label: "Stock", icon: <Layers className="h-5 w-5" /> },
  { href: "/admin/users", label: "Users", icon: <Users className="h-5 w-5" /> },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col py-8 px-4">
      <div className="mb-8 text-2xl font-bold text-primary">Admin Panel</div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium text-base hover:bg-primary/10 hover:text-primary ${pathname === item.href ? "bg-primary/10 text-primary" : "text-gray-700"}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
