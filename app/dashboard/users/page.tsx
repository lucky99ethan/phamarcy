"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Search, Filter, Eye, Edit, Trash2, Lock, UserPlus } from "lucide-react"

// Mock user data
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "customer",
    status: "active",
    lastLogin: "2023-05-20",
    registeredOn: "2023-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "customer",
    status: "active",
    lastLogin: "2023-05-21",
    registeredOn: "2023-02-22",
  },
  {
    id: 3,
    name: "Dr. Michael Johnson",
    email: "michael.johnson@example.com",
    role: "doctor",
    status: "active",
    lastLogin: "2023-05-22",
    registeredOn: "2022-11-10",
  },
  {
    id: 4,
    name: "Emily Williams",
    email: "emily.williams@example.com",
    role: "customer",
    status: "inactive",
    lastLogin: "2023-04-05",
    registeredOn: "2023-03-18",
  },
  {
    id: 5,
    name: "Dr. Robert Brown",
    email: "robert.brown@example.com",
    role: "doctor",
    status: "active",
    lastLogin: "2023-05-19",
    registeredOn: "2022-08-30",
  },
  {
    id: 6,
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2023-05-22",
    registeredOn: "2022-06-15",
  },
  {
    id: 7,
    name: "Mark Wilson",
    email: "mark.wilson@example.com",
    role: "customer",
    status: "blocked",
    lastLogin: "2023-03-12",
    registeredOn: "2023-02-01",
  },
  {
    id: 8,
    name: "Dr. Jennifer Miller",
    email: "jennifer.miller@example.com",
    role: "doctor",
    status: "active",
    lastLogin: "2023-05-21",
    registeredOn: "2022-09-25",
  },
  {
    id: 9,
    name: "David Anderson",
    email: "david.anderson@example.com",
    role: "customer",
    status: "active",
    lastLogin: "2023-05-18",
    registeredOn: "2023-04-10",
  },
  {
    id: 10,
    name: "Laura Thomas",
    email: "laura.thomas@example.com",
    role: "customer",
    status: "inactive",
    lastLogin: "2023-04-22",
    registeredOn: "2023-03-05",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "customer",
    password: "",
    confirmPassword: "",
  })

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddUser = () => {
    if (newUser.password !== newUser.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    const userToAdd = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      lastLogin: "Never",
      registeredOn: new Date().toISOString().split("T")[0],
    }

    setUsers([...users, userToAdd])
    setNewUser({
      name: "",
      email: "",
      role: "customer",
      password: "",
      confirmPassword: "",
    })
    setShowAddDialog(false)
  }

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId))
    }
  }

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage users and their access levels.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user account with the appropriate role.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">User Role</Label>
                  <Select
                    defaultValue="customer"
                    onValueChange={(value) =>
                      setNewUser({
                        ...newUser,
                        role: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="doctor">Doctor/Pharmacist</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={newUser.confirmPassword}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>User List</CardTitle>
          <CardDescription>View and manage all users in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="doctor">Doctor/Pharmacist</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Last Login</TableHead>
                  <TableHead className="hidden lg:table-cell">Registered On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.role === "admin" ? "default" : user.role === "doctor" ? "outline" : "secondary"}
                      >
                        {user.role === "admin"
                          ? "Administrator"
                          : user.role === "doctor"
                            ? "Doctor/Pharmacist"
                            : "Customer"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "active" ? "success" : user.status === "inactive" ? "outline" : "destructive"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{user.lastLogin}</TableCell>
                    <TableCell className="hidden lg:table-cell">{user.registeredOn}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Select
                          defaultValue={user.status}
                          onValueChange={(value) => handleStatusChange(user.id, value)}
                        >
                          <SelectTrigger className="h-8 w-8 p-0">
                            <SelectValue>
                              <Lock className="h-4 w-4" />
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Set Active</SelectItem>
                            <SelectItem value="inactive">Set Inactive</SelectItem>
                            <SelectItem value="blocked">Block User</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDeleteUser(user.id)}
                        >
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
        </CardContent>
      </Card>
    </div>
  )
}
