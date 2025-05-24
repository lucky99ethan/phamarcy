"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Admin User", email: "admin@example.com" },
]

export default function AdminUsersPage() {
  const [filter, setFilter] = useState("")
  const filtered = mockUsers.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div className="flex gap-8">
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
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
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-80 flex flex-col gap-4">
        <Input placeholder="Filter by name..." value={filter} onChange={e => setFilter(e.target.value)} />
      </div>
    </div>
  )
}
