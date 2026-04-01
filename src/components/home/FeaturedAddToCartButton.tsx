"use client"

import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { showAddToCartToast } from "@/components/notifications/AddToCartToast"

interface FeaturedAddToCartButtonProps {
  variantId: string
  productName: string
  productImage?: string
}

export function FeaturedAddToCartButton({
  variantId,
  productName,
  productImage,
}: FeaturedAddToCartButtonProps) {
  const { addItem, mutating } = useCart()

  async function handleClick() {
    await addItem(variantId)
    showAddToCartToast({ productName, productImage })
  }

  return (
    <Button
      onClick={handleClick}
      disabled={mutating}
      className="bg-accent text-accent-foreground hover:bg-accent/90 h-11 flex-1 rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-md hover:shadow-accent/20"
      aria-label={`Legg ${productName} i handlekurven`}
    >
      {mutating ? "Legger til..." : "Legg i handlekurv"}
    </Button>
  )
}
