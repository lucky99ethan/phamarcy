"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Truck, CheckCircle2, Clock, AlertCircle } from "lucide-react"

// Mock data for orders
const orders = [
  {
    id: "ORD-001",
    date: "2024-03-15",
    status: "delivered",
    total: 125.99,
    items: [
      { name: "Paracetamol 500mg", quantity: 2, price: 15.99 },
      { name: "Vitamin C 1000mg", quantity: 1, price: 24.99 },
      { name: "First Aid Kit", quantity: 1, price: 69.02 },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-03-10",
    status: "processing",
    total: 89.99,
    items: [
      { name: "Ibuprofen 400mg", quantity: 1, price: 12.99 },
      { name: "Bandages (Pack of 50)", quantity: 2, price: 38.50 },
    ],
  },
  {
    id: "ORD-003",
    date: "2024-03-05",
    status: "cancelled",
    total: 45.99,
    items: [
      { name: "Antiseptic Solution", quantity: 1, price: 15.99 },
      { name: "Cotton Wool (100g)", quantity: 2, price: 15.00 },
    ],
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "processing":
      return <Truck className="h-5 w-5 text-blue-500" />
    case "cancelled":
      return <AlertCircle className="h-5 w-5 text-red-500" />
    default:
      return <Clock className="h-5 w-5 text-gray-500" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "delivered":
      return <Badge className="bg-green-500">Delivered</Badge>
    case "processing":
      return <Badge className="bg-blue-500">Processing</Badge>
    case "cancelled":
      return <Badge className="bg-red-500">Cancelled</Badge>
    default:
      return <Badge className="bg-gray-500">Unknown</Badge>
  }
}

export default function OrdersPage() {
  return (
    <div className="container max-w-5xl py-8">
      <div className="grid gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Orders</h1>
            <p className="text-muted-foreground">Track and manage your orders</p>
          </div>
          <Button>
            <Package className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        Order {order.id}
                      </CardTitle>
                      <CardDescription>
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border-b pb-2 last:border-0"
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                      <p className="font-medium">Total</p>
                      <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status === "processing" && (
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          Cancel Order
                        </Button>
                      )}
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="processing" className="space-y-4">
            {orders
              .filter((order) => order.status === "processing")
              .map((order) => (
                <Card key={order.id}>
                  {/* Same card content as above */}
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            {orders
              .filter((order) => order.status === "delivered")
              .map((order) => (
                <Card key={order.id}>
                  {/* Same card content as above */}
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {orders
              .filter((order) => order.status === "cancelled")
              .map((order) => (
                <Card key={order.id}>
                  {/* Same card content as above */}
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 