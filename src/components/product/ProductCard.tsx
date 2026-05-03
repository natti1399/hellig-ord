"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import type { Product } from "@/types/product"
import { getProductContent } from "@/data/product-content"
import { formatPrice } from "@/lib/mock-data"
import { createCart, addToCart } from "@/lib/shopify/actions"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false)

  const content = getProductContent(product.handle)

  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  )

  const firstAvailableVariant = product.variants.find(
    (v) => v.availableForSale
  )

  async function handleBuyNow() {
    if (!firstAvailableVariant || loading) return
    setLoading(true)
    try {
      const cart = await createCart()
      const updated = await addToCart(cart.id, firstAvailableVariant.id, 1)
      if (updated.checkoutUrl && updated.checkoutUrl !== "#") {
        window.location.href = updated.checkoutUrl
      }
    } finally {
      setLoading(false)
    }
  }

  // ── Fallback when no editorial content is available ──────────────────────
  if (!content) {
    const truncated =
      product.description.length > 180
        ? product.description.slice(0, 180).trimEnd() + "…"
        : product.description

    return (
      <motion.article
        whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(81,48,74,0.10)" }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden"
      >
        <div className="aspect-square bg-muted w-full relative overflow-hidden">
          {product.images[0]?.url ? (
            <Image
              src={product.images[0].url}
              alt={product.images[0].altText ?? product.title}
              fill
              className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-muted-foreground text-sm font-sans tracking-wide select-none">
                Bilde kommer snart
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 p-5 gap-4">
          <h3 className="font-heading text-base font-bold leading-snug text-foreground line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {truncated}
          </p>
          <div className="mt-auto pt-2">
            <p className="font-sans text-base font-bold text-primary mb-3">{price}</p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={loading || !firstAvailableVariant}
                className="flex h-14 w-full items-center justify-center rounded-xl bg-primary font-sans text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Laster..." : "Kjøp nå"}
              </button>
              <Link
                href={`/produkter/${product.handle}`}
                className="flex h-14 w-full items-center justify-center rounded-xl border border-primary bg-transparent font-sans text-sm font-semibold tracking-wide text-primary transition-all duration-200 hover:bg-primary/5"
              >
                Se produkt
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    )
  }

  // ── Full card with editorial content ─────────────────────────────────────
  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(81,48,74,0.10)" }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden"
    >
      {/* Image */}
      <Link
        href={`/produkter/${product.handle}`}
        aria-label={`Se ${product.title}`}
        className="block"
      >
        <div className="aspect-square bg-muted w-full relative overflow-hidden">
          {product.images[0]?.url ? (
            <Image
              src={product.images[0].url}
              alt={product.images[0].altText ?? product.title}
              fill
              className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-muted-foreground text-sm font-sans tracking-wide select-none">
                Bilde kommer snart
              </span>
            </div>
          )}

          {/* Badge */}
          {content.badge && (
            <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold tracking-wider text-primary-foreground uppercase">
              {content.badge}
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Name + tagline */}
        <div className="flex flex-col gap-1">
          <Link href={`/produkter/${product.handle}`} className="group/title">
            <h3 className="font-heading text-base font-bold leading-snug tracking-wide text-foreground group-hover/title:text-primary transition-colors duration-200 line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs font-sans text-muted-foreground leading-relaxed tracking-wide">
            {content.tagline}
          </p>
        </div>

        {/* Bullet list */}
        <ul className="flex flex-col gap-1.5">
          {content.catalogBullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <Check
                className="mt-0.5 shrink-0 text-primary"
                size={13}
                strokeWidth={2.5}
                aria-hidden
              />
              <span className="font-sans text-[12.5px] text-foreground leading-snug">
                {bullet}
              </span>
            </li>
          ))}
        </ul>

        {/* Price + CTAs */}
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <p className="font-sans text-base font-bold text-primary">{price}</p>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={loading || !firstAvailableVariant}
              className="flex h-14 w-full items-center justify-center rounded-xl bg-primary font-sans text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {loading ? "Laster..." : "Kjøp nå"}
            </button>

            <Link
              href={`/produkter/${product.handle}`}
              className="flex h-14 w-full items-center justify-center gap-1 rounded-xl border border-primary bg-transparent font-sans text-sm font-semibold tracking-wide text-primary transition-all duration-200 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Vis produkt
              <ArrowRight size={13} strokeWidth={2.5} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
