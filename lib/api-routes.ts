// This file contains the API route handlers for the application
// In a real Next.js app, these would be in the app/api directory

import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Mock database for medicines
const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    description: "For relief of mild pain and fever",
    price: 5.99,
    discountPrice: 4.99,
    image: "/placeholder.svg?height=200&width=200",
    prescription: false,
    stock: 150,
    reorderLevel: 50,
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    description: "Treats bacterial infections",
    price: 12.99,
    discountPrice: null,
    image: "/placeholder.svg?height=200&width=200",
    prescription: true,
    stock: 80,
    reorderLevel: 25,
  },
  // More medicines...
]

// Mock database for orders
const orders: any[] = []

// Medicine schema
const MedicineSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  category: z.string(),
  description: z.string(),
  price: z.number().positive({ message: "Price must be positive." }),
  discountPrice: z.number().positive().nullable(),
  image: z.string().optional(),
  prescription: z.boolean(),
  stock: z.number().int().positive(),
  reorderLevel: z.number().int().positive(),
})

// Order schema
const OrderSchema = z.object({
  userId: z.string(),
  items: z.array(
    z.object({
      medicineId: z.number(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    }),
  ),
  deliveryAddress: z.string(),
  deliveryOption: z.string(),
  paymentMethod: z.string(),
  status: z.string(),
})

// GET /api/medicines
export async function getMedicines(req: NextRequest) {
  // Get query parameters
  const url = new URL(req.url)
  const category = url.searchParams.get("category")
  const prescription = url.searchParams.get("prescription")
  const search = url.searchParams.get("search")

  let filteredMedicines = [...medicines]

  // Apply filters
  if (category) {
    filteredMedicines = filteredMedicines.filter((m) => m.category.toLowerCase() === category.toLowerCase())
  }

  if (prescription) {
    const isPrescription = prescription === "true"
    filteredMedicines = filteredMedicines.filter((m) => m.prescription === isPrescription)
  }

  if (search) {
    filteredMedicines = filteredMedicines.filter(
      (m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase()) ||
        m.category.toLowerCase().includes(search.toLowerCase()),
    )
  }

  return NextResponse.json({ success: true, data: filteredMedicines })
}

// GET /api/medicines/:id
export async function getMedicineById(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const medicine = medicines.find((m) => m.id === id)

  if (!medicine) {
    return NextResponse.json({ success: false, error: "Medicine not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true, data: medicine })
}

// POST /api/medicines
export async function createMedicine(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate request body
    const validatedData = MedicineSchema.parse(body)

    // Create new medicine
    const newMedicine = {
      id: medicines.length + 1,
      ...validatedData,
    }

    // Add to mock database
    medicines.push(newMedicine)

    return NextResponse.json({ success: true, data: newMedicine }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: "Failed to create medicine" }, { status: 500 })
  }
}

// PUT /api/medicines/:id
export async function updateMedicine(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await req.json()

    // Find medicine index
    const medicineIndex = medicines.findIndex((m) => m.id === id)

    if (medicineIndex === -1) {
      return NextResponse.json({ success: false, error: "Medicine not found" }, { status: 404 })
    }

    // Validate request body
    const validatedData = MedicineSchema.partial().parse(body)

    // Update medicine
    medicines[medicineIndex] = {
      ...medicines[medicineIndex],
      ...validatedData,
    }

    return NextResponse.json({ success: true, data: medicines[medicineIndex] })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: "Failed to update medicine" }, { status: 500 })
  }
}

// DELETE /api/medicines/:id
export async function deleteMedicine(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  // Find medicine index
  const medicineIndex = medicines.findIndex((m) => m.id === id)

  if (medicineIndex === -1) {
    return NextResponse.json({ success: false, error: "Medicine not found" }, { status: 404 })
  }

  // Remove medicine from mock database
  medicines.splice(medicineIndex, 1)

  return NextResponse.json({ success: true })
}

// POST /api/orders
export async function createOrder(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate request body
    const validatedData = OrderSchema.parse(body)

    // Create new order
    const newOrder = {
      id: orders.length + 1,
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add to mock database
    orders.push(newOrder)

    // Update medicine stock
    for (const item of newOrder.items) {
      const medicineIndex = medicines.findIndex((m) => m.id === item.medicineId)
      if (medicineIndex !== -1) {
        medicines[medicineIndex].stock -= item.quantity
      }
    }

    return NextResponse.json({ success: true, data: newOrder }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}

// GET /api/orders
export async function getOrders(req: NextRequest) {
  // Get query parameters
  const url = new URL(req.url)
  const userId = url.searchParams.get("userId")
  const status = url.searchParams.get("status")

  let filteredOrders = [...orders]

  // Apply filters
  if (userId) {
    filteredOrders = filteredOrders.filter((o) => o.userId === userId)
  }

  if (status) {
    filteredOrders = filteredOrders.filter((o) => o.status === status)
  }

  return NextResponse.json({ success: true, data: filteredOrders })
}

// GET /api/orders/:id
export async function getOrderById(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const order = orders.find((o) => o.id === id)

  if (!order) {
    return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true, data: order })
}

// PUT /api/orders/:id
export async function updateOrderStatus(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await req.json()

    // Find order index
    const orderIndex = orders.findIndex((o) => o.id === id)

    if (orderIndex === -1) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    // Update order status
    orders[orderIndex] = {
      ...orders[orderIndex],
      status: body.status,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, data: orders[orderIndex] })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update order status" }, { status: 500 })
  }
}
