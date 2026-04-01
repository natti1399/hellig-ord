"use client"

import { useState } from "react"
import { MinusIcon, PlusIcon } from "lucide-react"

interface QuantitySelectorProps {
  initialQuantity?: number
  min?: number
  max?: number
  onChange?: (quantity: number) => void
}

export function QuantitySelector({
  initialQuantity = 1,
  min = 1,
  max = 99,
  onChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  function decrement() {
    const next = Math.max(min, quantity - 1)
    setQuantity(next)
    onChange?.(next)
  }

  function increment() {
    const next = Math.min(max, quantity + 1)
    setQuantity(next)
    onChange?.(next)
  }

  return (
    <div
      className="inline-flex items-center rounded-lg border border-border bg-background"
      role="group"
      aria-label="Velg antall"
    >
      <button
        type="button"
        onClick={decrement}
        disabled={quantity <= min}
        aria-label="Reduser antall"
        className="flex h-10 w-10 items-center justify-center rounded-l-lg text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
      >
        <MinusIcon className="size-4" aria-hidden />
      </button>

      <output
        aria-live="polite"
        aria-label={`Antall: ${quantity}`}
        className="w-12 text-center font-sans text-sm font-semibold text-foreground select-none tabular-nums"
      >
        {quantity}
      </output>

      <button
        type="button"
        onClick={increment}
        disabled={quantity >= max}
        aria-label="Øk antall"
        className="flex h-10 w-10 items-center justify-center rounded-r-lg text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
      >
        <PlusIcon className="size-4" aria-hidden />
      </button>
    </div>
  )
}
