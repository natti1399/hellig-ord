"use client"

import { BuyNowButton } from "@/components/shared/BuyNowButton"

interface StickyMobileCTAProps {
  variantId?: string
}

export function StickyMobileCTA({ variantId }: StickyMobileCTAProps) {
  if (!variantId) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 px-4 pb-6 pt-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm md:hidden"
      role="region"
      aria-label="Kjøp nå"
    >
      <BuyNowButton variantId={variantId} label="Kjøp nå" />
    </div>
  )
}
