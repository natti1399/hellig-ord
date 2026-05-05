"use client"

import { useState } from "react"
import type { Product } from "@/types/product"
import { formatPrice } from "@/lib/mock-data"
import { QuantitySelector } from "./QuantitySelector"
import { ShoppingBagIcon } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { showAddToCartToast } from "@/components/notifications/AddToCartToast"
import { TrustPaymentGrid } from "@/components/shared/TrustPaymentGrid"

interface ProductDetailClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem, mutating } = useCart()
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? ""
  )
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ??
    product.variants[0]

  const price = selectedVariant
    ? formatPrice(
        selectedVariant.price.amount,
        selectedVariant.price.currencyCode
      )
    : formatPrice(
        product.priceRange.minVariantPrice.amount,
        product.priceRange.minVariantPrice.currencyCode
      )

  const hasMultipleVariants = product.variants.length > 1

  async function handleAddToCart() {
    if (!selectedVariantId) return

    await addItem(selectedVariantId, quantity)

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)

    showAddToCartToast({
      productName: product.title,
      productImage: product.images[0]?.url,
      variantTitle:
        selectedVariant && product.variants.length > 1
          ? selectedVariant.title
          : undefined,
    })
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Price */}
      <p className="font-heading text-3xl font-bold text-primary tracking-wide">
        {price}
      </p>

      {/* Variant selector */}
      {hasMultipleVariants && (
        <div className="flex flex-col gap-2">
          <p className="font-sans text-sm font-semibold text-foreground">
            {product.variants[0]?.selectedOptions[0]?.name ?? "Variant"}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedVariantId(variant.id)}
                aria-pressed={variant.id === selectedVariantId}
                className={[
                  "rounded-lg border px-4 py-2 font-sans text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                  variant.id === selectedVariantId
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted",
                ].join(" ")}
              >
                {variant.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex flex-col gap-2">
        <p className="font-sans text-sm font-semibold text-foreground">Antall</p>
        <QuantitySelector onChange={setQuantity} />
      </div>

      {/* Add to cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!selectedVariant?.availableForSale || mutating}
        aria-label={`Legg ${quantity} stk av ${product.title} i handlekurven`}
        className="flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-primary font-sans text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ShoppingBagIcon className="size-4" aria-hidden />
        {mutating ? "Legger til..." : addedToCart ? "Lagt i handlekurven!" : "Legg i handlekurv"}
      </button>

      {!selectedVariant?.availableForSale && (
        <p className="text-center font-sans text-sm text-muted-foreground">
          Dette produktet er for øyeblikket ikke tilgjengelig.
        </p>
      )}

      {/* Trust + payment grid (8 boxes — locked design system) */}
      <div className="mt-2">
        <TrustPaymentGrid />
      </div>
    </div>
  )
}
