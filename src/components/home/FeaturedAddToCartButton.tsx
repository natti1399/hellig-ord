"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"

interface FeaturedBuyNowButtonProps {
  variantId: string
  productName: string
}

export function FeaturedAddToCartButton({
  variantId,
  productName,
}: FeaturedBuyNowButtonProps) {
  const { addItem } = useCart()
  const [buying, setBuying] = useState(false)

  async function handleClick() {
    if (buying) return
    setBuying(true)
    try {
      const cart = await addItem(variantId)
      if (cart?.checkoutUrl) {
        window.location.href = cart.checkoutUrl
        return
      }
    } catch {
      // fall through to re-enable button on error
    }
    setBuying(false)
  }

  return (
    <Button
      onClick={handleClick}
      disabled={buying}
      className="bg-accent text-accent-foreground hover:bg-accent/90 h-11 flex-1 rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-md hover:shadow-accent/20 disabled:opacity-70"
      aria-label={`Kjøp ${productName} – gå rett til kassen`}
    >
      {buying ? "Sender til kassen…" : "Kjøp nå"}
    </Button>
  )
}
