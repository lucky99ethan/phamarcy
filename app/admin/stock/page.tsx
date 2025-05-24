"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { Layers, BarChart2 } from "lucide-react"

const mockStock = [
  { id: 1, name: "Paracetamol", quantity: 120 },
  { id: 2, name: "Amoxicillin", quantity: 80 },
  { id: 3, name: "Ibuprofen", quantity: 60 },
]

export default function AdminStockPage() {
  const [filter, setFilter] = useState("")
  const filtered = mockStock.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div className="flex flex-col gap-8">
      {/* Header and Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-primary flex items-center gap-2"><Layers className="h-7 w-7 text-green-500" /> Stock Overview</h2>
          <p className="text-muted-foreground mt-1">Monitor and manage your current stock levels.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-green-100 text-green-700 rounded-xl px-6 py-3 flex flex-col items-center shadow">
            <span className="text-xs font-medium">Total Stock Items</span>
            <span className="text-xl font-bold mt-1">{mockStock.length}</span>
          </div>
          <div className="bg-blue-100 text-blue-700 rounded-xl px-6 py-3 flex flex-col items-center shadow">
            <span className="text-xs font-medium">Total Quantity</span>
            <span className="text-xl font-bold mt-1">{mockStock.reduce((a, b) => a + b.quantity, 0)}</span>
          </div>
        </div>
      </div>
      {/* Filter and Table */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <Input placeholder="Filter by name..." value={filter} onChange={e => setFilter(e.target.value)} className="max-w-xs" />
          <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold shadow-lg">Add Stock</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id} className="hover:bg-green-50 transition">
                <TableCell>{item.id}</TableCell>
                <TableCell className="font-semibold">{item.name}</TableCell>
                <TableCell className="font-bold text-green-700">{item.quantity}</TableCell>
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
