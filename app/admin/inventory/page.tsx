"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Users, UserPlus } from "lucide-react"
import axios from "axios"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { v4 as uuidv4 } from "uuid"

export default function AdminInventoryPage() {
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ name: "", manufacturer: "", category: "", dosage: "", quantity: 0, unit: "" });

  // Create inventory state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createData, setCreateData] = useState({ name: '', manufacturer: '', category: '', dosage: '', quantity: 0, unit: '' });
  const [creating, setCreating] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase()) ||
    item.manufacturer.toLowerCase().includes(filter.toLowerCase()) ||
    item.category.toLowerCase().includes(filter.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3000/api/inventory")
      .then(res => setItems(res.data.items || res.data))
      .catch(() => toast({ title: "Failed to fetch inventory", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, []);

  const handleReview = (item: any) => {
    setSelectedItem(item);
    setEditData({
      name: item.name,
      manufacturer: item.manufacturer,
      category: item.category,
      dosage: item.dosage,
      quantity: item.quantity,
      unit: item.unit
    });
    setEditMode(false);
    setModalOpen(true);
  };

  const handleEdit = () => setEditMode(true);
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditData({
      name: selectedItem.name,
      manufacturer: selectedItem.manufacturer,
      category: selectedItem.category,
      dosage: selectedItem.dosage,
      quantity: selectedItem.quantity,
      unit: selectedItem.unit
    });
  };
  const handleSaveEdit = async () => {
    try {
      const itemId = selectedItem._id || selectedItem.id;
      const res = await axios.put(`http://localhost:3000/api/inventory/${itemId}`, editData);
      if (res.data && (res.data.success || res.status === 200)) {
        setSelectedItem({ ...selectedItem, ...editData });
        setItems(items.map(u => (u._id || u.id) === itemId ? { ...u, ...editData } : u));
        setEditMode(false);
        setModalOpen(false);
        toast({ title: "Inventory updated!", variant: "default" });
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      toast({ title: "Failed to update inventory", description: err instanceof Error ? err.message : String(err), variant: "destructive" });
    }
  };
  const handleDelete = async () => {
    try {
      const itemId = selectedItem._id || selectedItem.id;
      const res = await axios.delete(`http://localhost:3000/api/inventory/${itemId}`);
      if (res.data && (res.data.success || res.status === 200)) {
        setItems(items.filter(u => (u._id || u.id) !== itemId));
        setModalOpen(false);
        toast({ title: "Inventory deleted!", variant: "destructive" });
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      toast({ title: "Failed to delete inventory", description: err instanceof Error ? err.message : String(err), variant: "destructive" });
    }
  };

  const handleOpenCreate = () => {
    setCreateData({ name: '', manufacturer: '', category: '', dosage: '', quantity: 0, unit: '' });
    setCreateModalOpen(true);
  };

  useEffect(() => {
    if (!createModalOpen) {
      setCreateData({ name: '', manufacturer: '', category: '', dosage: '', quantity: 0, unit: '' });
    }
  }, [createModalOpen]);

  const handleCreateInventory = async () => {
    setCreating(true);
    try {
      const dataWithId = { ...createData, id: uuidv4() };
      const res = await axios.post('http://localhost:3000/api/inventory', dataWithId);
      window.location.reload(); // Refresh page to show changes
      if (res.data && (res.data.success || res.status === 200)) {
        setItems(prev => [...prev, res.data.item || dataWithId]);
        toast({ title: 'Inventory created!', variant: 'default' });
        setCreateModalOpen(false); // Close modal
        setCreateData({ name: '', manufacturer: '', category: '', dosage: '', quantity: 0, unit: '' }); // Clear form
      } else {
        throw new Error('Create failed');
      }
    } catch (err) {
      toast({ title: 'Failed to create inventory', description: err instanceof Error ? err.message : String(err), variant: 'destructive' });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="">
      {/* Header and Stats */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 flex items-center gap-3 drop-shadow-lg">
              Inventory Management
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">Manage all inventory items with ease and control.</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-2xl px-8 py-4 flex flex-col items-center shadow-xl">
              <span className="text-xs font-medium opacity-80">Total Items</span>
              <span className="text-2xl font-bold mt-1 flex items-center gap-1">{items.length}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Filter and Table */}
      <div className="max-w-9xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <Input placeholder="Filter by name, manufacturer, or category..." value={filter} onChange={e => setFilter(e.target.value)} className="max-w-xs border-2 border-blue-200 focus:border-blue-400" />
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold" onClick={handleOpenCreate}>
            + Add Inventory
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-100 to-blue-200">
              <TableHead className="text-blue-700 font-bold">N/O</TableHead>
              <TableHead className="text-blue-700 font-bold">Name</TableHead>
              <TableHead className="text-blue-700 font-bold">Manufacturer</TableHead>
              <TableHead className="text-blue-700 font-bold">Category</TableHead>
              <TableHead className="text-blue-700 font-bold">Dosage</TableHead>
              <TableHead className="text-blue-700 font-bold">Quantity</TableHead>
              <TableHead className="text-blue-700 font-bold">Unit</TableHead>
              <TableHead className="text-right text-blue-700 font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-400 text-lg">Loading...</TableCell></TableRow>
            ) : paginated.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-400 text-lg">No items found.</TableCell></TableRow>
            ) : (
              paginated.map((item, idx) => (
                <TableRow key={item._id || item.id || idx} className="hover:bg-blue-50/60 transition group">
                  <TableCell className="font-semibold text-blue-600">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                  <TableCell className="font-semibold">{item.name}</TableCell>
                  <TableCell className="text-gray-600">{item.manufacturer}</TableCell>
                  <TableCell className="text-gray-600">{item.category}</TableCell>
                  <TableCell className="text-gray-600">{item.dosage}</TableCell>
                  <TableCell className="text-gray-600">{item.quantity}</TableCell>
                  <TableCell className="text-gray-600">{item.unit}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="mr-2 border-blue-200 group-hover:border-blue-400" onClick={() => handleReview(item)}>Review</Button>
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
              &larr;
            </Button>
            <span className="font-semibold text-blue-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full font-bold bg-gradient-to-r from-blue-400 to-blue-400 text-white disabled:opacity-50"
            >
              &rarr;
            </Button>
          </div>
        )}
      </div>
      {/* Modal for review/edit/delete */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              Inventory Details
            </DialogTitle>
          </DialogHeader>
          {selectedItem && !editMode && (
            <div className="space-y-2 py-2">
              <div><span className="font-semibold">Name:</span> {selectedItem.name}</div>
              <div><span className="font-semibold">Manufacturer:</span> {selectedItem.manufacturer}</div>
              <div><span className="font-semibold">Category:</span> {selectedItem.category}</div>
              <div><span className="font-semibold">Dosage:</span> {selectedItem.dosage}</div>
              <div><span className="font-semibold">Quantity:</span> {selectedItem.quantity}</div>
              <div><span className="font-semibold">Unit:</span> {selectedItem.unit}</div>
            </div>
          )}
          {selectedItem && editMode && (
            <div className="space-y-4 py-2">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Manufacturer</label>
                <Input value={editData.manufacturer} onChange={e => setEditData({ ...editData, manufacturer: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Input value={editData.category} onChange={e => setEditData({ ...editData, category: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dosage</label>
                <Input value={editData.dosage} onChange={e => setEditData({ ...editData, dosage: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <Input type="number" value={editData.quantity} onChange={e => setEditData({ ...editData, quantity: Number(e.target.value) })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Unit</label>
                <Input value={editData.unit} onChange={e => setEditData({ ...editData, unit: e.target.value })} />
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
      {/* Create Inventory Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-md bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              + Add Inventory
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input value={createData.name} onChange={e => setCreateData({ ...createData, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Manufacturer</label>
              <Input value={createData.manufacturer} onChange={e => setCreateData({ ...createData, manufacturer: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Input value={createData.category} onChange={e => setCreateData({ ...createData, category: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dosage</label>
              <Input value={createData.dosage} onChange={e => setCreateData({ ...createData, dosage: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <Input type="number" value={createData.quantity} onChange={e => setCreateData({ ...createData, quantity: Number(e.target.value) })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Unit</label>
              <Input value={createData.unit} onChange={e => setCreateData({ ...createData, unit: e.target.value })} />
            </div>
          </div>
          <DialogFooter className="flex flex-col gap-2 mt-4">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold" onClick={handleCreateInventory} disabled={creating}>
              {creating ? 'Creating...' : 'Create'}
            </Button>
            <Button className="" variant="outline" onClick={() => setCreateModalOpen(false)} disabled={creating}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
