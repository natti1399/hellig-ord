"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Product } from "@/types/product"
import { formatPrice } from "@/lib/mock-data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  )

  const hasVariantPriceRange =
    product.priceRange.minVariantPrice.amount !==
    product.priceRange.maxVariantPrice.amount

  const shortDescription =
    product.description.length > 120
      ? product.description.slice(0, 120).trimEnd() + "…"
      : product.description

  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(81,48,74,0.10)" }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group flex flex-col rounded-xl bg-card border border-border overflow-hidden"
    >
      {/* Image area */}
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
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-muted-foreground text-sm font-sans tracking-wide select-none">
                Bilde kommer snart
              </span>
            </div>
          )}
          <div
            aria-hidden
            className="absolute inset-0 bg-primary/0 group-hover:bg-primary/4 transition-colors duration-300"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex flex-col gap-1.5">
          <Link href={`/produkter/${product.handle}`} className="group/title">
            <h3 className="font-heading text-base font-bold leading-snug tracking-wide text-foreground group-hover/title:text-primary transition-colors duration-200 line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {shortDescription}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="font-sans text-base font-semibold text-primary">
            {hasVariantPriceRange ? `Fra ${price}` : price}
          </p>
          <Link
            href={`/produkter/${product.handle}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground tracking-wide transition-all duration-200 hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Se produkt
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
