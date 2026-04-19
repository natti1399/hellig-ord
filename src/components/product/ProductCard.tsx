"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import type { Product } from "@/types/product"
import { getProductContent } from "@/data/product-content"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/mock-data"
import { showAddToCartToast } from "@/components/notifications/AddToCartToast"
import { isAllowedCheckoutUrl } from "@/lib/shopify/checkout"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { addItem, cart, mutating } = useCart()
  const [adding, setAdding] = useState(false)

  const content = getProductContent(product.handle)

  const firstAvailableVariant = product.variants.find(
    (v) => v.availableForSale
  )

  // Prefer the first available variant's price. Shopify's priceRange can include
  // zero-priced placeholder variants (e.g. after a merchant edits variants) which
  // would display "kr 0" — that's worse UX than showing an actual buyable price.
  const priceSource =
    firstAvailableVariant?.price ?? product.priceRange.minVariantPrice
  const price = formatPrice(priceSource.amount, priceSource.currencyCode)

  async function handleBuyNow() {
    if (!firstAvailableVariant) return
    setAdding(true)
    try {
      const updatedCart = await addItem(firstAvailableVariant.id, 1)
      const checkoutUrl = updatedCart?.checkoutUrl
      if (checkoutUrl && isAllowedCheckoutUrl(checkoutUrl)) {
        window.location.href = checkoutUrl
      } else {
        router.push("/handlekurv")
      }
    } catch (err: unknown) {
      console.error("[ProductCard] handleBuyNow failed:", err)
      showAddToCartToast({
        productName: "Feil",
        variantTitle: "Kunne ikke starte kjøp. Prøv igjen.",
      })
      router.push("/handlekurv")
    } finally {
      setAdding(false)
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
        <div className="aspect-square bg-background w-full relative overflow-hidden">
          {product.images[0]?.url ? (
            <Image
              src={product.images[0].url}
              alt={product.images[0].altText ?? `${product.title} – kristen gave fra Hellig Ord`}
              fill
              className="object-contain p-6 mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.03]"
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
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="font-sans text-base font-semibold text-primary">
              {price}
            </span>
            <Link
              href={`/produkter/${product.handle}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary px-4 py-2 text-xs font-semibold text-primary tracking-wide transition-colors duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Se produkt
            </Link>
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
        <div className="aspect-square bg-background w-full relative overflow-hidden">
          {product.images[0]?.url ? (
            <Image
              src={product.images[0].url}
              alt={product.images[0].altText ?? `${product.title} – kristen gave fra Hellig Ord`}
              fill
              className="object-contain p-6 mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.03]"
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
                className="mt-0.5 shrink-0 text-accent"
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
          <p className="font-sans text-base font-bold text-primary">
            {price}
          </p>

          {/* Stacked on mobile, side-by-side on sm+ */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={adding || mutating || !firstAvailableVariant}
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold tracking-wide text-accent-foreground transition-all duration-200 hover:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {adding || mutating ? "Legger til…" : "Kjøp nå"}
            </button>

            <Link
              href={`/produkter/${product.handle}`}
              className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-primary px-4 py-2.5 text-xs font-semibold tracking-wide text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Vis produkt
              <ArrowRight size={12} strokeWidth={2.5} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
