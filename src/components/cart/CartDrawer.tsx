"use client"

import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ShoppingBag, Minus, Plus, Trash2, Package } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/CartContext"
import type { CartItem } from "@/lib/shopify/types"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatNOK(amount: string): string {
  const num = Number(amount)
  const digits = Number.isInteger(num) ? 0 : 2
  return `kr ${num.toLocaleString("nb-NO", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`
}

function isMeaningfulVariantTitle(title: string | null | undefined): boolean {
  if (!title) return false
  const trimmed = title.trim()
  if (!trimmed) return false
  const lowered = trimmed.toLowerCase()
  return lowered !== "default title" && lowered !== "n/a" && lowered !== "standard"
}

// ---------------------------------------------------------------------------
// CartLineItem
// ---------------------------------------------------------------------------

interface CartLineItemProps {
  item: CartItem
  onRemove: (lineId: string) => void
  onUpdate: (lineId: string, qty: number) => void
  disabled: boolean
}

function CartLineItem({
  item,
  onRemove,
  onUpdate,
  disabled,
}: CartLineItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25 }}
      className="flex gap-3 py-4"
    >
      {/* Image */}
      <div className="relative h-[72px] w-14 shrink-0 overflow-hidden rounded-md bg-muted">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.imageAlt ?? item.productTitle}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package className="size-5 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium leading-snug text-foreground">
              {item.productTitle}
            </p>
            {isMeaningfulVariantTitle(item.variantTitle) && (
              <p className="text-xs text-muted-foreground">{item.variantTitle}</p>
            )}
          </div>
          <button
            type="button"
            aria-label={`Fjern ${item.productTitle}`}
            onClick={() => onRemove(item.lineId)}
            disabled={disabled}
            className="shrink-0 rounded p-2 text-muted-foreground transition-colors hover:text-destructive disabled:opacity-40"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity stepper */}
          <div className="flex items-center gap-1 rounded-md border border-border bg-background px-1 py-0.5">
            <button
              type="button"
              aria-label="Reduser antall"
              disabled={disabled || item.quantity <= 1}
              onClick={() => onUpdate(item.lineId, item.quantity - 1)}
              className="rounded p-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-5 text-center text-xs font-medium tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label="Øk antall"
              disabled={disabled}
              onClick={() => onUpdate(item.lineId, item.quantity + 1)}
              className="rounded p-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <span className="text-sm font-semibold text-foreground tabular-nums">
            {formatNOK(
              (Number(item.price) * item.quantity).toFixed(2)
            )}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// EmptyState
// ---------------------------------------------------------------------------

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <ShoppingBag className="size-7 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="font-heading text-base font-medium text-foreground">
          Handlekurven din er tom
        </p>
        <p className="text-sm text-muted-foreground">
          Legg til noen vakre produkter for å komme i gang.
        </p>
      </div>
      <Link
        href="/produkter"
        className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        Utforsk produkter
      </Link>
    </div>
  )
}

// ---------------------------------------------------------------------------
// MutatingOverlay
// ---------------------------------------------------------------------------

function MutatingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm"
    >
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// CartDrawer
// ---------------------------------------------------------------------------

export function CartDrawer() {
  const { items, totalQuantity, subtotal, cart, mutating, removeItem, updateQuantity } =
    useCart()

  const handleUpdate = (lineId: string, qty: number) => {
    if (qty < 1) {
      removeItem(lineId)
    } else {
      updateQuantity(lineId, qty)
    }
  }

  return (
    <Sheet>
      {/* Trigger */}
      <SheetTrigger>
        <button
          type="button"
          aria-label={`Handlekurv – ${totalQuantity} varer`}
          className="relative inline-flex items-center justify-center rounded-lg p-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ShoppingBag className="size-5" />
          <AnimatePresence>
            {totalQuantity > 0 && (
              <motion.span
                key="badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center bg-primary px-1 text-[10px] leading-none text-primary-foreground"
                >
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </Badge>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        {/* Mutating overlay */}
        <AnimatePresence>{mutating && <MutatingOverlay />}</AnimatePresence>

        {/* Header */}
        <SheetHeader className="border-b border-border px-6 pb-4 pt-2">
          <div className="flex items-center gap-2">
            <SheetTitle className="font-heading text-lg font-semibold text-foreground">
              Handlekurv
            </SheetTitle>
            {totalQuantity > 0 && (
              <Badge variant="secondary" className="text-xs">
                {totalQuantity} {totalQuantity === 1 ? "vare" : "varer"}
              </Badge>
            )}
          </div>
        </SheetHeader>

        {/* Body */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          {items.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex-1 overflow-y-auto px-6">
              <ul role="list" aria-label="Handlekurv">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <li key={item.lineId} className="border-b border-border last:border-0">
                      <CartLineItem
                        item={item}
                        onRemove={removeItem}
                        onUpdate={handleUpdate}
                        disabled={mutating}
                      />
                    </li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <SheetFooter className="border-t border-border px-6 pt-4">
            <div className="w-full space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Delsum</span>
                <span className="font-semibold text-foreground tabular-nums">
                  {formatNOK(subtotal)}
                </span>
              </div>

              <Separator />

              {/* CTA */}
              <a
                href={cart?.checkoutUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Gå til kassen
              </a>

              {/* Shipping note */}
              <p className="text-center text-xs text-muted-foreground">
                Gratis frakt i hele Norge – inkludert i prisen
              </p>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
