"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, ShoppingCart, Trash2, CreditCard, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [deliveryOption, setDeliveryOption] = useState("standard")

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calculate delivery fee based on selected option
  const getDeliveryFee = () => {
    switch (deliveryOption) {
      case "express":
        return 5.99
      case "standard":
        return subtotal >= 30 ? 0 : 2.99
      case "scheduled":
        return subtotal >= 40 ? 0 : 3.99
      default:
        return 2.99
    }
  }

  const deliveryFee = getDeliveryFee()
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + deliveryFee + tax

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-4 rounded-full bg-muted p-6">
            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
          <p className="mb-6 text-center text-muted-foreground">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild>
            <Link href="/medicine">Browse Medicines</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Cart Items ({cart.length})</CardTitle>
                <CardDescription>Review and modify your selected items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="h-20 w-20 overflow-hidden rounded-md">
                        <Image
                          src={item.image || "/placeholder.svg?height=80&width=80"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                            <div className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-muted-foreground"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button asChild>
                  <Link href="/medicine">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div>
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="coupon">Coupon Code</Label>
                      <div className="flex gap-2">
                        <Input
                          id="coupon"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button variant="outline">Apply</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Proceed to Checkout</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Delivery Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        id="express"
                        name="delivery"
                        value="express"
                        checked={deliveryOption === "express"}
                        onChange={() => setDeliveryOption("express")}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor="express" className="flex items-center gap-2 font-medium">
                          <Truck className="h-4 w-4" /> Express Delivery
                        </Label>
                        <p className="text-sm text-muted-foreground">Get your order within 45 minutes</p>
                        <p className="text-sm font-medium">$5.99</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        id="standard"
                        name="delivery"
                        value="standard"
                        checked={deliveryOption === "standard"}
                        onChange={() => setDeliveryOption("standard")}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor="standard" className="flex items-center gap-2 font-medium">
                          <Truck className="h-4 w-4" /> Standard Delivery
                        </Label>
                        <p className="text-sm text-muted-foreground">Get your order within 24 hours</p>
                        <p className="text-sm font-medium">{subtotal >= 30 ? "Free" : "$2.99"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        id="scheduled"
                        name="delivery"
                        value="scheduled"
                        checked={deliveryOption === "scheduled"}
                        onChange={() => setDeliveryOption("scheduled")}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor="scheduled" className="flex items-center gap-2 font-medium">
                          <Truck className="h-4 w-4" /> Scheduled Delivery
                        </Label>
                        <p className="text-sm text-muted-foreground">Choose your preferred delivery time</p>
                        <p className="text-sm font-medium">{subtotal >= 40 ? "Free" : "$3.99"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <span>Credit/Debit Card</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-muted-foreground"
                      >
                        <path d="M19 7.5h-14v9h14v-9z" />
                        <path d="M19 7.5l-7 5.5-7-5.5" />
                      </svg>
                      <span>Net Banking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-muted-foreground"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                      <span>UPI / Wallet</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-muted-foreground"
                      >
                        <path d="M17 8h4a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h4" />
                        <path d="M12 16v-8" />
                        <path d="m9 11 3-3 3 3" />
                      </svg>
                      <span>Cash on Delivery</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
