'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const PRODUCT_URL = '/produkter/bible-verse-inspiration-jar'

export function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section
      className="relative overflow-hidden bg-background"
      aria-label="Produktpresentasjon"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid min-h-[75vh] items-center gap-8 py-16 md:py-20 lg:grid-cols-2 lg:gap-12 lg:py-24">

          {/* Text content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Eyebrow label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-accent mb-4"
              aria-label="Produktkategori"
            >
              Kristen gave
            </motion.p>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="font-heading text-4xl font-bold tracking-wide text-primary sm:text-5xl md:text-6xl"
            >
              60 bibelvers
              <br />
              <span className="italic font-normal">for alle livets øyeblikk</span>
            </motion.h1>

            {/* Value proposition */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="mt-6 max-w-md font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              En vakker glaskrukke fylt med 60 håndplukkede bibelvers på
              fargerike kort. Trekk ett vers om dagen — og la Guds ord
              ledsage deg gjennom livet.
            </motion.p>

            {/* Scripture pull-quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: 'easeOut' }}
              className="mt-6 border-l-2 border-accent pl-4 text-left"
              aria-label="Bibelvers"
            >
              <p className="font-heading text-sm italic text-secondary leading-snug">
                «Ordet ditt er en lykt for min fot og et lys for min sti.»
              </p>
              <footer className="mt-1 font-sans text-xs tracking-wide text-muted-foreground">
                Salme 119:105
              </footer>
            </motion.blockquote>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href={PRODUCT_URL}
                className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium tracking-wide text-accent-foreground transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Bestill nå
              </Link>
              <a
                href="#produkt"
                className="inline-flex h-12 items-center justify-center rounded-full border border-primary/20 bg-transparent px-8 text-sm font-medium tracking-wide text-primary transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Se mer
              </a>
            </motion.div>
          </div>

          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: imageLoaded ? 1 : 0, x: imageLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
            aria-hidden="true"
          >
            <div className="relative aspect-square w-full bg-background">
              <Image
                src="/images/hero-product.png"
                alt="Bibelvers-krukke – en vakker glaskrukke fylt med 60 fargekodede bibelvers, med gaveeske og kort"
                fill
                className="object-contain mix-blend-multiply"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
