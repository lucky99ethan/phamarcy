"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
  product: {
    id: number | string
    name: string
    price: number
    image?: string
    category?: string
    description?: string
    prescription?: boolean
  }
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function AddToCartButton({
  product,
  variant = "default",
  size = "default",
  className,
}: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = () => {
    setIsAdding(true)

    // Add a small delay to show loading state
    setTimeout(() => {
      addToCart({
        ...product,
        quantity: 1,
      })

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })

      setIsAdding(false)
    }, 500)
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleAddToCart} disabled={isAdding}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      {isAdding ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
