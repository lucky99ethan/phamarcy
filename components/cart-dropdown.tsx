"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart, Trash2 } from "lucide-react"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function CartDropdown() {
  const { cart, removeFromCart, getCartTotal, getCartCount } = useCart()
  const [open, setOpen] = useState(false)

  const cartCount = getCartCount()
  const cartTotal = getCartTotal()

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {cartCount}
            </Badge>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">My Cart</h3>
            <span className="text-sm text-muted-foreground">{cartCount} items</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        {cart.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="max-h-80 overflow-auto">
              {cart.map((item) => (
                <DropdownMenuItem key={item.id} className="flex cursor-default p-4" asChild>
                  <div>
                    <div className="flex gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src={item.image || "/placeholder.svg?height=64&width=64"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <div className="text-sm">
                            {item.quantity} x ${item.price.toFixed(2)}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full" asChild onClick={() => setOpen(false)}>
                  <Link href="/cart">View Cart</Link>
                </Button>
                <Button size="sm" className="w-full" asChild onClick={() => setOpen(false)}>
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
