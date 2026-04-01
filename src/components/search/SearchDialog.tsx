"use client"

import * as React from "react"
import { useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Clock, TrendingUp, ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { mockProducts, formatPrice } from "@/lib/mock-data"
import type { Product } from "@/types/product"

// ─── Constants ───────────────────────────────────────────────────────────────

const POPULAR_SEARCHES = ["Bibelvers", "Gaveeske", "Smykke", "Dagbok"]
const MAX_RECENT_SEARCHES = 6
const DEBOUNCE_MS = 160

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalise(str: string): string {
  return str.toLowerCase().trim()
}

function matchesQuery(product: Product, query: string): boolean {
  const q = normalise(query)
  if (!q) return false
  return (
    normalise(product.title).includes(q) ||
    normalise(product.description).includes(q) ||
    normalise(product.productType).includes(q) ||
    product.tags.some((tag) => normalise(tag).includes(q))
  )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface ProductHitProps {
  product: Product
  onSelect: () => void
}

function ProductHit({ product, onSelect }: ProductHitProps) {
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  )

  return (
    <Link
      href={`/produkter/${product.handle}`}
      onClick={onSelect}
      className="group flex items-center gap-4 rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      {/* Placeholder thumbnail */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted ring-1 ring-border/40">
        <span className="text-lg select-none" aria-hidden="true">
          {product.productType === "Smykker"
            ? "✦"
            : product.productType === "Dagbøker"
            ? "📖"
            : product.productType === "Gaveesker"
            ? "🎁"
            : product.productType === "Veggkunst"
            ? "🖼"
            : "✝"}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-150">
          {product.title}
        </span>
        <span className="text-xs text-muted-foreground">
          {product.productType}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className="text-sm font-semibold text-primary">{price}</span>
        <ArrowRight className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 text-muted-foreground" />
      </div>
    </Link>
  )
}

interface ChipProps {
  label: string
  icon: React.ReactNode
  onClick: () => void
  onRemove?: () => void
}

function Chip({ label, icon, onClick, onRemove }: ChipProps) {
  return (
    <div className="group flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/60 pl-2.5 pr-1.5 py-1 text-xs text-muted-foreground transition-colors duration-150 hover:border-primary/30 hover:text-foreground">
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-1.5 focus-visible:outline-none"
        aria-label={`Søk etter ${label}`}
      >
        {icon}
        {label}
      </button>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          aria-label={`Fjern "${label}" fra nylige søk`}
          className="ml-0.5 rounded-full p-0.5 opacity-0 transition-opacity duration-100 hover:bg-border group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
        >
          <X className="size-2.5" />
        </button>
      )}
    </div>
  )
}

// ─── Public API ──────────────────────────────────────────────────────────────

interface SearchDialogProps {
  /** Whether the dialog is currently open. */
  open: boolean
  /** Called when the dialog wants to close itself. */
  onOpenChange: (open: boolean) => void
}

/**
 * Full-featured search dialog for Hellig Ord.
 *
 * - Real-time product filtering against mock data
 * - Recent searches stored in localStorage (max 6)
 * - Popular search chips
 * - Keyboard shortcut Cmd+K / Ctrl+K (wire up globally in the Header or layout)
 * - Framer Motion entrance / exit animations
 * - Fully accessible: focus trap via base-ui Dialog, aria-labels in Norwegian
 *
 * @example
 * const [open, setOpen] = React.useState(false)
 * <SearchDialog open={open} onOpenChange={setOpen} />
 */
export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = React.useState("")
  const [debouncedQuery, setDebouncedQuery] = React.useState("")
  const [results, setResults] = React.useState<Product[]>([])
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    "hellig-ord:recent-searches",
    []
  )
  const inputRef = useRef<HTMLInputElement>(null)

  // ── Debounce the query for filtering ────────────────────────────────────
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => clearTimeout(id)
  }, [query])

  // ── Filter products ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      return
    }
    setResults(mockProducts.filter((p) => matchesQuery(p, debouncedQuery)))
  }, [debouncedQuery])

  // ── Focus input when dialog opens ────────────────────────────────────────
  useEffect(() => {
    if (open) {
      // Small delay to let the Dialog animation settle before stealing focus.
      const id = setTimeout(() => inputRef.current?.focus(), 80)
      return () => clearTimeout(id)
    }
    // Reset state on close so the next open feels fresh.
    setQuery("")
    setDebouncedQuery("")
    setResults([])
  }, [open])

  // ── Cmd+K / Ctrl+K global shortcut ──────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(true)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onOpenChange])

  // ── Actions ──────────────────────────────────────────────────────────────
  const handleClose = useCallback(() => onOpenChange(false), [onOpenChange])

  const commitSearch = useCallback(
    (term: string) => {
      const trimmed = term.trim()
      if (!trimmed) return
      setRecentSearches((prev) => {
        const next = [trimmed, ...prev.filter((s) => s !== trimmed)]
        return next.slice(0, MAX_RECENT_SEARCHES)
      })
    },
    [setRecentSearches]
  )

  const handleSelectProduct = useCallback(() => {
    commitSearch(query)
    handleClose()
  }, [commitSearch, handleClose, query])

  const handleChipClick = useCallback(
    (term: string) => {
      setQuery(term)
      setDebouncedQuery(term)
      inputRef.current?.focus()
    },
    []
  )

  const removeRecentSearch = useCallback(
    (term: string) => {
      setRecentSearches((prev) => prev.filter((s) => s !== term))
    },
    [setRecentSearches]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commitSearch(query)
    if (e.key === "Escape") handleClose()
  }

  // ── Derived state ────────────────────────────────────────────────────────
  const hasQuery = query.trim().length > 0
  const hasResults = results.length > 0
  const showEmpty = hasQuery && debouncedQuery === query && !hasResults
  const showRecent = !hasQuery && recentSearches.length > 0
  const showPopular = !hasQuery

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent
        showCloseButton={false}
        className="flex w-full max-w-xl flex-col gap-0 overflow-hidden rounded-2xl p-0 shadow-2xl ring-1 ring-border/40 top-[12%] translate-y-0"
        aria-label="Produktsøk"
      >
        {/* Visually hidden title for screen readers */}
        <DialogTitle className="sr-only">Søk etter produkter</DialogTitle>

        {/* ── Search input bar ── */}
        <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
          <Search
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Søk etter produkter..."
            className="h-auto flex-1 border-0 bg-transparent px-0 py-0 text-base ring-0 focus-visible:ring-0 focus-visible:border-0 placeholder:text-muted-foreground/70"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Søkefelt"
            aria-autocomplete="list"
            aria-controls="search-results"
          />
          <AnimatePresence>
            {hasQuery && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
              >
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setQuery("")}
                  aria-label="Tøm søk"
                >
                  <X className="size-3.5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleClose}
            className="text-muted-foreground"
            aria-label="Lukk søk"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* ── Results / suggestions panel ── */}
        <div
          id="search-results"
          role="listbox"
          aria-label="Søkeresultater"
          className="min-h-0 overflow-y-auto overscroll-contain"
          style={{ maxHeight: "min(60vh, 440px)" }}
        >
          <AnimatePresence mode="wait">
            {/* ── Product results ── */}
            {hasQuery && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="p-2"
              >
                {hasResults ? (
                  <>
                    <p className="px-3 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                      Produkter
                    </p>
                    {results.map((product) => (
                      <div key={product.id} role="option" aria-selected="false">
                        <ProductHit
                          product={product}
                          onSelect={handleSelectProduct}
                        />
                      </div>
                    ))}
                  </>
                ) : showEmpty ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-2 py-10 text-center"
                  >
                    <span className="text-3xl" aria-hidden="true">
                      🔍
                    </span>
                    <p className="text-sm font-medium text-foreground">
                      Ingen resultater for{" "}
                      <span className="text-primary">
                        &ldquo;{query}&rdquo;
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Prøv et annet søkeord eller utforsk produktene våre.
                    </p>
                  </motion.div>
                ) : null}
              </motion.div>
            )}

            {/* ── Empty state (no query) ── */}
            {!hasQuery && (
              <motion.div
                key="suggestions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-4 p-4"
              >
                {/* Recent searches */}
                {showRecent && (
                  <section aria-label="Nylige søk">
                    <h3 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                      Nylige søk
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term) => (
                        <Chip
                          key={term}
                          label={term}
                          icon={<Clock className="size-3" aria-hidden="true" />}
                          onClick={() => handleChipClick(term)}
                          onRemove={() => removeRecentSearch(term)}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Popular searches */}
                {showPopular && (
                  <section aria-label="Populære søk">
                    <h3 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                      Populære søk
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((term) => (
                        <Chip
                          key={term}
                          label={term}
                          icon={
                            <TrendingUp
                              className="size-3"
                              aria-hidden="true"
                            />
                          }
                          onClick={() => handleChipClick(term)}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Footer hint ── */}
        <div className="border-t border-border/60 px-4 py-2 flex items-center justify-between text-[11px] text-muted-foreground/60">
          <span>
            Trykk{" "}
            <kbd className="rounded border border-border/60 bg-muted px-1 py-0.5 font-mono text-[10px]">
              Enter
            </kbd>{" "}
            for å søke
          </span>
          <span>
            <kbd className="rounded border border-border/60 bg-muted px-1 py-0.5 font-mono text-[10px]">
              Esc
            </kbd>{" "}
            for å lukke
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Trigger button ───────────────────────────────────────────────────────────

interface SearchTriggerProps {
  onClick: () => void
  className?: string
}

/**
 * The search icon button shown in the Header.
 * Displays the keyboard shortcut hint on desktop.
 */
export function SearchTrigger({ onClick, className }: SearchTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Åpne søk (Cmd+K)"
      className={cn(
        "group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground/70 transition-colors duration-200 hover:text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className
      )}
    >
      <Search className="size-4 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-150">
        Søk...
      </span>
      <kbd
        className="hidden md:inline-flex items-center gap-0.5 rounded border border-border/60 bg-muted px-1 py-0.5 font-mono text-[10px] text-muted-foreground/50"
        aria-hidden="true"
      >
        ⌘K
      </kbd>
    </button>
  )
}
