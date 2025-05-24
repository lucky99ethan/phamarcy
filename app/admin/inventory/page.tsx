"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { Package, BarChart2 } from "lucide-react"

const mockInventory = [
  { id: 1, name: "Paracetamol", category: "Pain Relief", stock: 120 },
  { id: 2, name: "Amoxicillin", category: "Antibiotic", stock: 80 },
  { id: 3, name: "Ibuprofen", category: "Pain Relief", stock: 60 },
]

export default function AdminInventoryPage() {
  const [filter, setFilter] = useState("")
  const filtered = mockInventory.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div className="flex flex-col gap-8">
      {/* Header and Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-primary flex items-center gap-2"><Package className="h-7 w-7 text-blue-500" /> Inventory Overview</h2>
          <p className="text-muted-foreground mt-1">Track and manage all medicines in stock.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-blue-100 text-blue-700 rounded-xl px-6 py-3 flex flex-col items-center shadow">
            <span className="text-xs font-medium">Total Medicines</span>
            <span className="text-xl font-bold mt-1">{mockInventory.length}</span>
          </div>
          <div className="bg-green-100 text-green-700 rounded-xl px-6 py-3 flex flex-col items-center shadow">
            <span className="text-xs font-medium">Total Stock</span>
            <span className="text-xl font-bold mt-1">{mockInventory.reduce((a, b) => a + b.stock, 0)}</span>
          </div>
        </div>
      </div>
      {/* Filter and Table */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <Input placeholder="Filter by name..." value={filter} onChange={e => setFilter(e.target.value)} className="max-w-xs" />
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg">Add Inventory</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id} className="hover:bg-blue-50 transition">
                <TableCell>{item.id}</TableCell>
                <TableCell className="font-semibold">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="font-bold text-blue-700">{item.stock}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" className="mr-2">Edit</Button>
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
