"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Layers, Users, ShoppingCart, DollarSign, BarChart2, UserCog, Home, CreditCard } from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard Overview", icon: <Home className="h-5 w-5" /> },
  { href: "/admin/users", label: "User Management", icon: <Users className="h-5 w-5" /> },
  { href: "/admin/inventory", label: "Inventorys", icon: <Package className="h-5 w-5" /> },
  { href: "/admin/purchases", label: "Purchases", icon: <ShoppingCart className="h-5 w-5" /> },
  { href: "/admin/sells", label: "Sells", icon: <DollarSign className="h-5 w-5" /> },
  { href: "/admin/cashflow", label: "Cash Flow", icon: <BarChart2 className="h-5 w-5" /> },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-72 bg-gradient-to-b from-blue-100 via-white to-purple-100 border-r shadow-xl flex flex-col py-8 px-6 min-h-screen">
      {/* User Profile Section */}
      <div className="flex flex-col items-center mb-10">
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/30 to-purple-300 flex items-center justify-center text-primary font-extrabold text-3xl shadow-lg border-4 border-white">A</div>
        <div className="mt-3 text-xl font-bold text-primary">Admin</div>
        <div className="text-xs text-muted-foreground">admin@pharmacy.com</div>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-4 px-5 py-3 rounded-xl transition-all font-semibold text-lg hover:bg-primary/10 hover:text-primary ${pathname === item.href ? "bg-primary/10 text-primary shadow" : "text-gray-700"}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
