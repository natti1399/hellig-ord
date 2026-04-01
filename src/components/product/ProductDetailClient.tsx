"use client"

import { useState } from "react"
import type { Product } from "@/types/product"
import { formatPrice } from "@/lib/mock-data"
import { QuantitySelector } from "./QuantitySelector"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { ShoppingBagIcon } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { showAddToCartToast } from "@/components/notifications/AddToCartToast"

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
    <div className="flex flex-col gap-6">
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
        className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent py-4 font-sans text-sm font-semibold text-accent-foreground tracking-wide transition-all duration-200 hover:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        <ShoppingBagIcon className="size-4" aria-hidden />
        {mutating ? "Legger til..." : addedToCart ? "Lagt i handlekurven!" : "Legg i handlekurv"}
      </button>

      {!selectedVariant?.availableForSale && (
        <p className="text-center font-sans text-sm text-muted-foreground">
          Dette produktet er for øyeblikket ikke tilgjengelig.
        </p>
      )}

      {/* Product details accordion */}
      <div className="mt-2 border-t border-border pt-6">
        <Accordion>
          <AccordionItem value="produktdetaljer">
            <AccordionTrigger className="font-sans text-sm font-semibold text-foreground py-4">
              Produktdetaljer
            </AccordionTrigger>
            <AccordionContent>
              <div className="font-sans text-sm text-muted-foreground leading-relaxed space-y-2 pb-2">
                <p>{product.description}</p>
                {product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="frakt">
            <AccordionTrigger className="font-sans text-sm font-semibold text-foreground py-4">
              Frakt og levering
            </AccordionTrigger>
            <AccordionContent>
              <div className="font-sans text-sm text-muted-foreground leading-relaxed space-y-2 pb-2">
                <p>
                  Vi sender alle bestillinger innen 1–3 virkedager. Levering til
                  hele Norge via Posten og PostNord.
                </p>
                <ul className="space-y-1 mt-2">
                  <li>Standardlevering (3–7 virkedager): kr 69</li>
                  <li>Ekspress (1–3 virkedager): kr 129</li>
                  <li>Gratis frakt på bestillinger over kr 599</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="retur">
            <AccordionTrigger className="font-sans text-sm font-semibold text-foreground py-4">
              Returpolicy
            </AccordionTrigger>
            <AccordionContent>
              <div className="font-sans text-sm text-muted-foreground leading-relaxed space-y-2 pb-2">
                <p>
                  Vi ønsker at du skal være helt fornøyd med ditt kjøp. Dersom
                  du ikke er det, kan du returnere varen innen 30 dager fra
                  mottaksdato.
                </p>
                <p>
                  Varen må være i original emballasje og ubrukt tilstand. Ta
                  kontakt med oss på hei@helligeord.no for å starte en
                  retursak.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
