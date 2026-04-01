'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product } from '@/types/product'
import { cn } from '@/lib/utils'

interface RelatedProductsProps {
  products: Product[]
  className?: string
}

export function RelatedProducts({ products, className }: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (products.length === 0) return null

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.75
    el.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <section
      className={cn('bg-background py-14 md:py-20', className)}
      aria-labelledby="related-products-heading"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Heading row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8 flex items-end justify-between gap-4"
        >
          <div>
            <p className="mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Lignende produkter
            </p>
            <h2
              id="related-products-heading"
              className="font-heading text-xl font-normal italic tracking-wide text-primary sm:text-2xl"
            >
              Du vil kanskje også like
            </h2>
          </div>

          {/* Scroll controls — only visible on md+ */}
          <div className="hidden shrink-0 items-center gap-2 md:flex" aria-label="Bla gjennom produkter">
            <button
              onClick={() => scroll('left')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Bla til venstre"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Bla til høyre"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="list"
          aria-label="Relaterte produkter"
        >
          {products.slice(0, 4).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="w-[260px] shrink-0 sm:w-[280px]"
              role="listitem"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
