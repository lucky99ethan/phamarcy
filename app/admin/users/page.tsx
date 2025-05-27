"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Users, UserPlus } from "lucide-react"
import axios from "axios"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

export default function AdminUsersPage() {
  const [filter, setFilter] = useState("")
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({ name: "", email: "", role: "" })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase()) ||
    user.email.toLowerCase().includes(filter.toLowerCase()) ||
    (user.role || "").toLowerCase().includes(filter.toLowerCase())
  )
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  // Calculate paginated data
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const hasMore = filtered.length > paginated.length

  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:3000/api/user")
      .then(res => setUsers(res.data.users || res.data))
      .catch(() => toast({ title: "Failed to fetch users", variant: "destructive" }))
      .finally(() => setLoading(false))
  }, [])

  const handleReview = (user: any) => {
    setSelectedUser(user)
    setEditData({ name: user.name, email: user.email, role: user.role || "" })
    setEditMode(false)
    setModalOpen(true)
  }

  const handleEdit = () => setEditMode(true)
  const handleCancelEdit = () => {
    setEditMode(false)
    setEditData({ name: selectedUser.name, email: selectedUser.email, role: selectedUser.role || "" })
  }
  const handleSaveEdit = async () => {
    try {
      const userId = selectedUser._id || selectedUser.id;
      const res = await axios.put(`http://localhost:3000/api/user/${userId}`, editData)
      if (res.data && (res.data.success || res.status === 200)) {
        setSelectedUser({ ...selectedUser, ...editData })
        setUsers(users.map(u => (u._id || u.id) === userId ? { ...u, ...editData } : u))
        setEditMode(false)
        setModalOpen(false) // Close modal on success
        toast({ title: "User updated!", variant: "default" })
      } else {
        throw new Error("Update failed")
      }
    } catch (err) {
      toast({ title: "Failed to update user", description: err instanceof Error ? err.message : String(err), variant: "destructive" })
    }
  }
const handleDelete = async () => {
  try {
    const userId = selectedUser._id || selectedUser.id;
    const res = await axios.delete(`http://localhost:3000/api/user/${userId}`);
    if (res.data && (res.data.success || res.status === 200)) {
      setUsers(users.filter(u => (u._id || u.id) !== userId));
      setModalOpen(false);
      toast({ title: "User deleted!", variant: "destructive" });
    } else {
      throw new Error("Delete failed");
    }
  } catch (err) {
    toast({ title: "Failed to delete user", description: err instanceof Error ? err.message : String(err), variant: "destructive" });
  }
};

  return (
    <div className="">
      {/* Header and Stats */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 flex items-center gap-3 drop-shadow-lg">
              <Users className="h-10 w-10 text-blue-400 drop-shadow" /> User Management
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">Manage all users with ease and control.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-2xl px-8 py-4 flex flex-col items-center shadow-xl">
              <span className="text-xs font-medium opacity-80">Total Users</span>
              <span className="text-2xl font-bold mt-1 flex items-center gap-1"><Users className="h-5 w-5" />{users.length}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Filter and Table */}
      <div className="max-w-9xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <Input placeholder="Filter by name..." value={filter} onChange={e => setFilter(e.target.value)} className="max-w-xs border-2 border-blue-200 focus:border-blue-400" />
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-100 to-blue-200">
              <TableHead className="text-blue-700 font-bold">N/O</TableHead>
              <TableHead className="text-blue-700 font-bold">Name</TableHead>
              <TableHead className="text-blue-700 font-bold">Email</TableHead>
              <TableHead className="text-blue-700 font-bold">Role</TableHead>
              <TableHead className="text-right text-blue-700 font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-400 text-lg">Loading...</TableCell></TableRow>
            ) : paginated.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-400 text-lg">No users found.</TableCell></TableRow>
            ) : (
              paginated.map((user, idx) => (
                <TableRow key={user._id || user.id || user.email || idx} className="hover:bg-blue-50/60 transition group">
                  <TableCell className="font-semibold text-blue-600">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                  <TableCell className="font-semibold">{user.name}</TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell className="text-gray-600">{user.role || '-'}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="mr-2 border-blue-200 group-hover:border-blue-400" onClick={() => handleReview(user)}>Review</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {/* Pagination Controls */}
        {totalPages > 1 && filtered.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full font-bold bg-gradient-to-r from-blue-400 to-blue-400 text-white disabled:opacity-50"
            >
              &larr; Previous
            </Button>
            <span className="font-semibold text-blue-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full font-bold bg-gradient-to-r from-blue-400 to-blue-400 text-white disabled:opacity-50"
            >
              Next &rarr;
            </Button>
          </div>
        )}
      </div>
      {/* Modal for review/edit/delete */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-500" />
              {editMode ? "Edit User" : "User Details"}
            </DialogTitle>
          </DialogHeader>
          {selectedUser && !editMode && (
            <div className="space-y-2 py-2">
              <div><span className="font-semibold">Name:</span> {selectedUser.name}</div>
              <div><span className="font-semibold">Email:</span> {selectedUser.email}</div>
            </div>
          )}
          {selectedUser && editMode && (
            <div className="space-y-4 py-2">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <Input value={editData.role} onChange={e => setEditData({ ...editData, role: e.target.value })} />
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col gap-2 mt-4">
            {!editMode ? (
              <div className="flex gap-2 w-full">
                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-500 text-white font-bold" onClick={handleEdit}>Edit</Button>
                <Button className="flex-1" variant="destructive" onClick={handleDelete}>Delete</Button>
              </div>
            ) : (
              <div className="flex gap-2 w-full">
                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-500 text-white font-bold" onClick={handleSaveEdit}>Save</Button>
                <Button className="flex-1" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
