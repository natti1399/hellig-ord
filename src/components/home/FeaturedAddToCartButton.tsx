"use client"

import { BuyNowButton } from "@/components/shared/BuyNowButton"

interface FeaturedAddToCartButtonProps {
  variantId: string
  productName: string
  productImage?: string
}

export function FeaturedAddToCartButton({
  variantId,
}: FeaturedAddToCartButtonProps) {
  return <BuyNowButton variantId={variantId} label="Kjøp nå" />
}
