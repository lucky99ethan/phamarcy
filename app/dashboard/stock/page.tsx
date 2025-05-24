"use client"

import React from "react"
import { Button } from "@/components/ui/button"

export default function StockPage() {
  // TODO: Fetch stock data and implement add/edit/delete logic
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Stock</h1>
      <Button className="mb-4">Add Stock</Button>
      {/* Stock table/list goes here */}
      <div className="bg-muted p-4 rounded">Stock management coming soon...</div>
    </div>
  )
}
