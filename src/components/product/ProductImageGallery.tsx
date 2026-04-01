"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import type { ProductImage } from "@/types/product"

interface ProductImageGalleryProps {
  images: ProductImage[]
  productTitle: string
}

export function ProductImageGallery({
  images,
  productTitle,
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const goTo = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  if (images.length === 0) {
    return (
      <div className="aspect-square w-full rounded-2xl bg-muted border border-border flex items-center justify-center">
        <span className="font-sans text-sm text-muted-foreground">
          Bilde kommer snart
        </span>
      </div>
    )
  }

  const activeImage = images[activeIndex]

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square w-full rounded-2xl bg-muted overflow-hidden border border-border">
        <Image
          src={activeImage.url}
          alt={activeImage.altText ?? productTitle}
          fill
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />

        {/* Navigation arrows (only if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Forrige bilde"
              className="absolute left-2 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/80 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Neste bilde"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/80 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Produktbilder">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Bilde ${index + 1} av ${images.length}`}
              onClick={() => goTo(index)}
              className={[
                "relative size-16 flex-shrink-0 rounded-lg border overflow-hidden transition-all duration-150",
                index === activeIndex
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/40",
              ].join(" ")}
            >
              <Image
                src={image.url}
                alt={image.altText ?? `${productTitle} bilde ${index + 1}`}
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
