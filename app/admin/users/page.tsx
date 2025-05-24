"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { Users, UserPlus } from "lucide-react"

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Admin User", email: "admin@example.com" },
]

export default function AdminUsersPage() {
  const [filter, setFilter] = useState("")
  const filtered = mockUsers.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div className="flex flex-col gap-8">
      {/* Header and Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-primary flex items-center gap-2"><Users className="h-7 w-7 text-purple-500" /> User Management</h2>
          <p className="text-muted-foreground mt-1">Manage all users with ease and control.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-purple-100 text-purple-700 rounded-xl px-6 py-3 flex flex-col items-center shadow">
            <span className="text-xs font-medium">Total Users</span>
            <span className="text-xl font-bold mt-1">{mockUsers.length}</span>
          </div>
        </div>
      </div>
      {/* Filter and Table */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <Input placeholder="Filter by name..." value={filter} onChange={e => setFilter(e.target.value)} className="max-w-xs" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id} className="hover:bg-purple-50 transition">
                <TableCell>{user.id}</TableCell>
                <TableCell className="font-semibold">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
