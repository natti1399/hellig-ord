"use client"

import { useState } from "react"
import { createCart, addToCart } from "@/lib/shopify/actions"

interface BuyNowButtonProps {
  variantId: string
  label?: string
  className?: string
}

export function BuyNowButton({
  variantId,
  label = "Kjøp nå",
  className,
}: BuyNowButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleBuyNow() {
    if (!variantId || loading) return
    setLoading(true)
    try {
      const cart = await createCart()
      const updatedCart = await addToCart(cart.id, variantId, 1)
      if (updatedCart.checkoutUrl && updatedCart.checkoutUrl !== "#") {
        window.location.href = updatedCart.checkoutUrl
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleBuyNow}
      disabled={loading}
      className={
        className ??
        "flex h-14 w-full items-center justify-center rounded-xl bg-primary font-sans text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      }
    >
      {loading ? "Laster..." : label}
    </button>
  )
}
