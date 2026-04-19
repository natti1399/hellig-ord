"use client"

import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  Package,
  ArrowLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/CartContext"
import type { CartItem } from "@/lib/shopify/types"
import { isAllowedCheckoutUrl } from "@/lib/shopify/checkout"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FREE_SHIPPING_THRESHOLD = 499

function formatNOK(amount: string | number): string {
  return `kr ${Number(amount).toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center gap-6 py-24 text-center"
    >
      {/* Illustration */}
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-muted">
        <ShoppingBag className="size-12 text-muted-foreground/50" />
        <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-sm">
          <span className="text-lg leading-none" aria-hidden>
            ✝
          </span>
        </div>
      </div>

      <div className="space-y-2 max-w-xs">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Handlekurven din er tom
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Utforsk vårt utvalg av vakre kristne produkter og finn noe som berører
          hjertet ditt.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/produkter"
          className="inline-flex h-10 items-center justify-center gap-1 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Utforsk produkter
          <ChevronRight className="size-4" />
        </Link>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Tilbake til forsiden
        </Link>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Cart row
// ---------------------------------------------------------------------------

interface CartRowProps {
  item: CartItem
  onRemove: (lineId: string) => void
  onUpdate: (lineId: string, qty: number) => void
  disabled: boolean
}

function CartRow({ item, onRemove, onUpdate, disabled }: CartRowProps) {
  const lineTotal = (Number(item.price) * item.quantity).toFixed(2)

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25 }}
      className="group border-b border-border"
    >
      {/* Product */}
      <td className="py-5 pr-4">
        <div className="flex items-start gap-4">
          <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.imageAlt ?? item.productTitle}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Package className="size-6 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="min-w-0 pt-0.5">
            <Link
              href={`/produkter/${item.productHandle}`}
              className="font-heading text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
            >
              {item.productTitle}
            </Link>
            {item.variantTitle !== "Default Title" && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {item.variantTitle}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* Unit price */}
      <td className="hidden py-5 pr-4 text-right text-sm text-muted-foreground md:table-cell tabular-nums">
        {formatNOK(item.price)}
      </td>

      {/* Quantity */}
      <td className="py-5 pr-4">
        <div className="flex items-center justify-center gap-1.5 rounded-md border border-border bg-background px-2 py-1.5 w-fit mx-auto">
          <button
            type="button"
            aria-label="Reduser antall"
            disabled={disabled || item.quantity <= 1}
            onClick={() => onUpdate(item.lineId, item.quantity - 1)}
            className="rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="w-6 text-center text-sm font-medium tabular-nums">
            {item.quantity}
          </span>
          <button
            type="button"
            aria-label="Øk antall"
            disabled={disabled}
            onClick={() => onUpdate(item.lineId, item.quantity + 1)}
            className="rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      </td>

      {/* Line total */}
      <td className="py-5 pr-4 text-right text-sm font-semibold text-foreground tabular-nums">
        {formatNOK(lineTotal)}
      </td>

      {/* Remove */}
      <td className="py-5 text-right">
        <button
          type="button"
          aria-label={`Fjern ${item.productTitle}`}
          disabled={disabled}
          onClick={() => onRemove(item.lineId)}
          className="rounded p-1.5 text-muted-foreground transition-colors hover:text-destructive disabled:opacity-40"
        >
          <Trash2 className="size-4" />
        </button>
      </td>
    </motion.tr>
  )
}

// ---------------------------------------------------------------------------
// Order summary
// ---------------------------------------------------------------------------

interface OrderSummaryProps {
  subtotal: number
  checkoutUrl: string | null
  mutating: boolean
}

function OrderSummary({ subtotal, checkoutUrl, mutating }: OrderSummaryProps) {
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99
  const total = subtotal + shippingCost
  const missingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
        Ordresammendrag
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delsum</span>
          <span className="tabular-nums font-medium">{formatNOK(subtotal.toFixed(2))}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Frakt</span>
          <span className="tabular-nums font-medium">
            {shippingCost === 0 ? (
              <span className="text-accent">Gratis</span>
            ) : (
              formatNOK(shippingCost)
            )}
          </span>
        </div>

        {missingForFreeShipping > 0 && (
          <p className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground leading-relaxed">
            Legg til varer for{" "}
            <span className="font-semibold text-foreground">
              {formatNOK(missingForFreeShipping.toFixed(2))}
            </span>{" "}
            til for å få gratis frakt.
          </p>
        )}

        <Separator />

        <div className="flex justify-between text-base">
          <span className="font-semibold text-foreground">Totalt</span>
          <span className="tabular-nums font-bold text-foreground">
            {formatNOK(total.toFixed(2))}
          </span>
        </div>
      </div>

      <a
        href={checkoutUrl && isAllowedCheckoutUrl(checkoutUrl) ? checkoutUrl : "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 transition-colors"
      >
        Gå til kassen
      </a>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Sikker betaling med Vipps, Klarna og kort
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main page client component
// ---------------------------------------------------------------------------

export function CartPageClient() {
  const { items, subtotal, cart, mutating, loading, removeItem, updateQuantity } =
    useCart()

  const handleUpdate = (lineId: string, qty: number) => {
    if (qty < 1) {
      removeItem(lineId)
    } else {
      updateQuantity(lineId, qty)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/produkter"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground mb-8"
        >
          <ArrowLeft className="size-4" />
          Fortsett å handle
        </Link>

        {/* Page title */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Handlekurv
          </h1>
          {items.length > 0 && (
            <p className="mt-1 text-sm text-muted-foreground">
              {items.length} {items.length === 1 ? "vare" : "varer"} i
              handlekurven
            </p>
          )}
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
            <div className="h-64 animate-pulse rounded-xl bg-muted" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
            {/* Items table */}
            <div className="relative overflow-x-auto">
              {/* Mutating overlay */}
              <AnimatePresence>
                {mutating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg"
                  >
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Produkt
                    </th>
                    <th className="hidden pb-3 pr-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                      Pris
                    </th>
                    <th className="pb-3 pr-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Antall
                    </th>
                    <th className="pb-3 pr-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Total
                    </th>
                    <th className="pb-3 text-right">
                      <span className="sr-only">Handlinger</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartRow
                        key={item.lineId}
                        item={item}
                        onRemove={removeItem}
                        onUpdate={handleUpdate}
                        disabled={mutating}
                      />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Order summary */}
            <div className="lg:sticky lg:top-8">
              <OrderSummary
                subtotal={Number(subtotal)}
                checkoutUrl={cart?.checkoutUrl ?? null}
                mutating={mutating}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
