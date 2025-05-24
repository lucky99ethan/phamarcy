"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Search, Plus, Filter, FileUp, Download, Pencil, Trash2 } from "lucide-react"

// Mock data for medications
const initialMedications = [
  {
    id: "MED-001",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    description: "For relief of mild pain and fever",
    stock: 150,
    reorderLevel: 50,
    price: 5.99,
    prescription: false,
  },
  {
    id: "MED-002",
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    description: "Treats bacterial infections",
    stock: 8,
    reorderLevel: 25,
    price: 12.99,
    prescription: true,
  },
  {
    id: "MED-003",
    name: "Loratadine 10mg",
    category: "Allergy",
    description: "Provides 24-hour relief from allergy symptoms",
    stock: 75,
    reorderLevel: 30,
    price: 8.99,
    prescription: false,
  },
  {
    id: "MED-004",
    name: "Ibuprofen 200mg",
    category: "Pain Relief",
    description: "Reduces inflammation and relieves pain",
    stock: 60,
    reorderLevel: 30,
    price: 6.99,
    prescription: false,
  },
  {
    id: "MED-005",
    name: "Omeprazole 20mg",
    category: "Digestive Health",
    description: "Decreases stomach acid production",
    stock: 12,
    reorderLevel: 30,
    price: 14.99,
    prescription: false,
  },
  {
    id: "MED-006",
    name: "Lisinopril 10mg",
    category: "Blood Pressure",
    description: "Treats high blood pressure",
    stock: 35,
    reorderLevel: 20,
    price: 18.99,
    prescription: true,
  },
  {
    id: "MED-007",
    name: "Metformin 500mg",
    category: "Diabetes",
    description: "Controls blood sugar levels",
    stock: 5,
    reorderLevel: 20,
    price: 11.99,
    prescription: true,
  },
  {
    id: "MED-008",
    name: "Atorvastatin 10mg",
    category: "Cholesterol",
    description: "Lowers cholesterol levels",
    stock: 10,
    reorderLevel: 25,
    price: 24.99,
    prescription: true,
  },
  {
    id: "MED-009",
    name: "Cetirizine 10mg",
    category: "Allergy",
    description: "Relieves allergy symptoms",
    stock: 45,
    reorderLevel: 25,
    price: 7.99,
    prescription: false,
  },
  {
    id: "MED-010",
    name: "Simvastatin 20mg",
    category: "Cholesterol",
    description: "Reduces cholesterol levels",
    stock: 28,
    reorderLevel: 15,
    price: 22.99,
    prescription: true,
  },
]

export default function InventoryPage() {
  const [medications, setMedications] = useState(initialMedications)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newMedication, setNewMedication] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    stock: 0,
    reorderLevel: 0,
    price: 0,
    prescription: false,
  })

  // Filter medications based on search query
  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddMedication = () => {
    const newId = `MED-${String(medications.length + 1).padStart(3, "0")}`
    const medicationToAdd = {
      ...newMedication,
      id: newId,
    }

    setMedications([...medications, medicationToAdd])
    setNewMedication({
      id: "",
      name: "",
      category: "",
      description: "",
      stock: 0,
      reorderLevel: 0,
      price: 0,
      prescription: false,
    })
    setShowAddDialog(false)
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Inventory</h1>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-muted-foreground">Manage your pharmacy's medicine stock and inventory.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Medicine
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Medicine</DialogTitle>
                <DialogDescription>Enter the details of the new medicine to add to your inventory.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Medicine Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Paracetamol 500mg"
                      value={newMedication.name}
                      onChange={(e) =>
                        setNewMedication({
                          ...newMedication,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      onValueChange={(value) =>
                        setNewMedication({
                          ...newMedication,
                          category: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pain Relief">Pain Relief</SelectItem>
                        <SelectItem value="Antibiotics">Antibiotics</SelectItem>
                        <SelectItem value="Allergy">Allergy</SelectItem>
                        <SelectItem value="Digestive Health">Digestive Health</SelectItem>
                        <SelectItem value="Blood Pressure">Blood Pressure</SelectItem>
                        <SelectItem value="Diabetes">Diabetes</SelectItem>
                        <SelectItem value="Cholesterol">Cholesterol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Brief description of the medicine"
                    value={newMedication.description}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Initial Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={newMedication.stock}
                      onChange={(e) =>
                        setNewMedication({
                          ...newMedication,
                          stock: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reorderLevel">Reorder Level</Label>
                    <Input
                      id="reorderLevel"
                      type="number"
                      min="0"
                      value={newMedication.reorderLevel}
                      onChange={(e) =>
                        setNewMedication({
                          ...newMedication,
                          reorderLevel: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newMedication.price}
                      onChange={(e) =>
                        setNewMedication({
                          ...newMedication,
                          price: Number.parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="prescription">Prescription Required</Label>
                    <Select
                      onValueChange={(value) =>
                        setNewMedication({
                          ...newMedication,
                          prescription: value === "yes",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMedication}>Add Medicine</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <FileUp className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search medicines..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="pain-relief">Pain Relief</SelectItem>
              <SelectItem value="antibiotics">Antibiotics</SelectItem>
              <SelectItem value="allergy">Allergy</SelectItem>
              <SelectItem value="digestive-health">Digestive Health</SelectItem>
              <SelectItem value="blood-pressure">Blood Pressure</SelectItem>
              <SelectItem value="diabetes">Diabetes</SelectItem>
              <SelectItem value="cholesterol">Cholesterol</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="hidden lg:table-cell">Reorder Level</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Prescription</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMedications.map((medication) => (
              <TableRow key={medication.id}>
                <TableCell className="font-medium">{medication.id}</TableCell>
                <TableCell>{medication.name}</TableCell>
                <TableCell>{medication.category}</TableCell>
                <TableCell className="hidden max-w-[200px] truncate md:table-cell">
                  {medication.description}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      medication.stock <= medication.reorderLevel / 2
                        ? "destructive"
                        : medication.stock <= medication.reorderLevel
                          ? "outline"
                          : "default"
                    }
                  >
                    {medication.stock}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{medication.reorderLevel}</TableCell>
                <TableCell>${medication.price.toFixed(2)}</TableCell>
                <TableCell className="hidden md:table-cell">{medication.prescription ? "Yes" : "No"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
