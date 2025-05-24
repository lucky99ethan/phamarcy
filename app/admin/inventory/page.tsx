"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

const mockInventory = [
  { id: 1, name: "Paracetamol", category: "Pain Relief", stock: 120 },
  { id: 2, name: "Amoxicillin", category: "Antibiotic", stock: 80 },
  { id: 3, name: "Ibuprofen", category: "Pain Relief", stock: 60 },
]

export default function AdminInventoryPage() {
  const [filter, setFilter] = useState("")
  const filtered = mockInventory.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div className="flex gap-8">
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Inventory</h2>
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
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" className="mr-2">Edit</Button>
                  <Button size="sm" variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-80 flex flex-col gap-4">
        <Input placeholder="Filter by name..." value={filter} onChange={e => setFilter(e.target.value)} />
        <Button className="w-full">Add Inventory</Button>
      </div>
    </div>
  )
}
