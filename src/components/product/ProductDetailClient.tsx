"use client"

import { useState } from "react"
import type { Product } from "@/types/product"
import type { ProductContent } from "@/data/product-content"
import { formatPrice } from "@/lib/mock-data"
import { QuantitySelector } from "./QuantitySelector"
import { PaymentIcons } from "@/components/shared/PaymentIcons"
import { useCart } from "@/context/CartContext"
import { showAddToCartToast } from "@/components/notifications/AddToCartToast"
import {
  ShoppingBagIcon,
  Truck,
  RotateCcw,
  ShieldCheck,
  Heart,
} from "lucide-react"

interface ProductDetailClientProps {
  product: Product
  content?: ProductContent | null
}

/** Returns today + n business days (Mon–Fri). */
function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date)
  let added = 0
  while (added < days) {
    result.setDate(result.getDate() + 1)
    const dow = result.getDay()
    if (dow !== 0 && dow !== 6) added++
  }
  return result
}

function formatNorwegian(date: Date): string {
  return date.toLocaleDateString("nb-NO", { day: "numeric", month: "long" })
}

const TRUST_CARDS = [
  {
    icon: Truck,
    title: "Gratis frakt",
    desc: "Til hele Norge",
  },
  {
    icon: RotateCcw,
    title: "30 dagers retur",
    desc: "Helt risikofritt",
  },
  {
    icon: ShieldCheck,
    title: "Åpent kjøp",
    desc: "Ingen spørsmål stilt",
  },
  {
    icon: Heart,
    title: "Fornøydgaranti",
    desc: "Vi stiller opp for deg",
  },
] as const

export function ProductDetailClient({ product, content: _content }: ProductDetailClientProps) {
  const { addItem, mutating } = useCart()

  // Hide variants priced at 0 — those are half-configured placeholders in
  // Shopify (e.g. a newly-added option without a real price). Showing them
  // would let a customer check out for 0 kr.
  const buyableVariants = product.variants.filter(
    (v) => parseFloat(v.price.amount) > 0
  )
  const variantsToShow =
    buyableVariants.length > 0 ? buyableVariants : product.variants

  const [selectedVariantId, setSelectedVariantId] = useState(
    variantsToShow[0]?.id ?? ""
  )
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const selectedVariant =
    variantsToShow.find((v) => v.id === selectedVariantId) ??
    variantsToShow[0]

  const price = selectedVariant
    ? formatPrice(
        selectedVariant.price.amount,
        selectedVariant.price.currencyCode
      )
    : formatPrice(
        product.priceRange.minVariantPrice.amount,
        product.priceRange.minVariantPrice.currencyCode
      )

  const hasMultipleVariants = variantsToShow.length > 1

  const today = new Date()
  const deliveryStart = formatNorwegian(addBusinessDays(today, 5))
  const deliveryEnd = formatNorwegian(addBusinessDays(today, 10))

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

      {/* Trust sub-line */}
      <p className="font-sans text-xs text-muted-foreground -mt-2">
        Inkl. mva · Gratis frakt · Ingen abonnement
      </p>

      {/* Variant chips */}
      {hasMultipleVariants && (
        <div className="flex flex-col gap-2">
          <p className="font-sans text-sm font-semibold text-foreground">
            {variantsToShow[0]?.selectedOptions[0]?.name ?? "Variant"}
          </p>
          <div className="flex flex-wrap gap-2">
            {variantsToShow.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedVariantId(variant.id)}
                aria-pressed={variant.id === selectedVariantId}
                disabled={!variant.availableForSale}
                className={[
                  "rounded-full border px-4 py-1.5 font-sans text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed",
                  variant.id === selectedVariantId
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted",
                ].join(" ")}
              >
                {variant.title}
                {!variant.availableForSale && (
                  <span className="ml-1.5 text-xs opacity-70">(utsolgt)</span>
                )}
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
        className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent py-4 font-sans text-sm font-semibold text-accent-foreground tracking-wide transition-all duration-200 hover:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        <ShoppingBagIcon className="size-4" aria-hidden />
        {mutating
          ? "Legger til..."
          : addedToCart
          ? "Lagt i handlekurven!"
          : "Legg i handlekurv"}
      </button>

      {!selectedVariant?.availableForSale && (
        <p className="text-center font-sans text-sm text-muted-foreground">
          Dette produktet er for øyeblikket ikke tilgjengelig.
        </p>
      )}

      {/* Payment icons */}
      <div className="flex items-center justify-center">
        <PaymentIcons size="md" />
      </div>

      {/* Delivery estimate */}
      <p className="text-center font-sans text-xs text-muted-foreground">
        Kjøp i dag – forventet levering{" "}
        <span className="font-medium text-foreground">
          {deliveryStart}–{deliveryEnd}
        </span>
      </p>

      {/* 2×2 trust cards */}
      <div className="grid grid-cols-2 gap-3 mt-1">
        {TRUST_CARDS.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-background p-3 text-center"
          >
            <Icon className="size-5 text-accent" aria-hidden />
            <p className="font-sans text-xs font-semibold text-foreground leading-snug">
              {title}
            </p>
            <p className="font-sans text-xs text-muted-foreground leading-snug">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
