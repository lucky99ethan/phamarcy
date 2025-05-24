"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Package, ShoppingCart, Users, TrendingUp, ArrowDownRight, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login")
      return
    }
    if (user && user.role === "admin") {
      router.replace("/admin")
      return
    }
  }, [isAuthenticated, router, user])

  if (!isAuthenticated || !user || user.role === "admin") {
    return null
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}! Here's what's happening with your store today.</p>
        </div>
        <Button>
          <ShoppingCart className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">+20.1%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">+12.2%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">+3.1%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              <span className="text-red-500">+8</span> from last week
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent-orders">
        <TabsList>
          <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="medicine-requests">Medicine Requests</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
        </TabsList>
        <TabsContent value="recent-orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>You have 12 orders today.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "ORD-001",
                      customer: "John Doe",
                      date: "2023-05-22",
                      status: "Delivered",
                      total: "$129.99",
                    },
                    {
                      id: "ORD-002",
                      customer: "Jane Smith",
                      date: "2023-05-22",
                      status: "Processing",
                      total: "$79.99",
                    },
                    {
                      id: "ORD-003",
                      customer: "Robert Johnson",
                      date: "2023-05-21",
                      status: "Shipped",
                      total: "$54.50",
                    },
                    {
                      id: "ORD-004",
                      customer: "Emily Davis",
                      date: "2023-05-21",
                      status: "Processing",
                      total: "$219.99",
                    },
                    {
                      id: "ORD-005",
                      customer: "Michael Wilson",
                      date: "2023-05-20",
                      status: "Delivered",
                      total: "$45.75",
                    },
                  ].map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order.status === "Delivered"
                              ? "bg-green-500 text-white"
                              : order.status === "Shipped"
                                ? "bg-gray-300 text-gray-800"
                                : "bg-yellow-400 text-gray-900"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="medicine-requests">
          <Card>
            <CardHeader>
              <CardTitle>Medicine Requests</CardTitle>
              <CardDescription>You have 8 pending medicine requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Medicine</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "REQ-001",
                      requester: "Dr. Smith",
                      medicine: "Amoxicillin 500mg",
                      date: "2023-05-22",
                      status: "Pending",
                    },
                    {
                      id: "REQ-002",
                      requester: "Dr. Williams",
                      medicine: "Metformin 850mg",
                      date: "2023-05-22",
                      status: "Approved",
                    },
                    {
                      id: "REQ-003",
                      requester: "Dr. Johnson",
                      medicine: "Lisinopril 20mg",
                      date: "2023-05-21",
                      status: "Pending",
                    },
                    {
                      id: "REQ-004",
                      requester: "Dr. Brown",
                      medicine: "Atorvastatin 40mg",
                      date: "2023-05-21",
                      status: "Rejected",
                    },
                    {
                      id: "REQ-005",
                      requester: "Dr. Davis",
                      medicine: "Omeprazole 20mg",
                      date: "2023-05-20",
                      status: "Approved",
                    },
                  ].map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.requester}</TableCell>
                      <TableCell>{request.medicine}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            request.status === "Approved"
                              ? "bg-green-500 text-white"
                              : request.status === "Rejected"
                                ? "bg-red-500 text-white"
                                : "bg-yellow-400 text-gray-900"
                          }
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="low-stock">
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
              <CardDescription>These items need to be restocked soon.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Reorder Level</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "MED-001",
                      name: "Paracetamol 500mg",
                      category: "Pain Relief",
                      stock: 15,
                      reorderLevel: 50,
                    },
                    {
                      id: "MED-002",
                      name: "Amoxicillin 250mg",
                      category: "Antibiotics",
                      stock: 8,
                      reorderLevel: 25,
                    },
                    {
                      id: "MED-003",
                      name: "Omeprazole 20mg",
                      category: "Digestive Health",
                      stock: 12,
                      reorderLevel: 30,
                    },
                    {
                      id: "MED-004",
                      name: "Metformin 500mg",
                      category: "Diabetes",
                      stock: 5,
                      reorderLevel: 20,
                    },
                    {
                      id: "MED-005",
                      name: "Atorvastatin 10mg",
                      category: "Cholesterol",
                      stock: 10,
                      reorderLevel: 25,
                    },
                  ].map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-destructive font-medium">{item.stock}</TableCell>
                      <TableCell>{item.reorderLevel}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Restock
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Placeholder for analytics and profit/loss graph */}
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {/* <Chart /> */}
        <div className="bg-muted p-4 rounded mb-4">Dashboard analytics and profit/loss graph coming soon...</div>
        {/* Add stats cards, recent activity, etc. */}
      </div>
    </div>
  )
}
