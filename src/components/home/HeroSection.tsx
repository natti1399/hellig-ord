'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Truck, ShieldCheck, RotateCcw } from 'lucide-react'

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

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-accent mb-4"
            >
              Basert på utvalgte bibelvers
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="font-heading text-4xl font-bold tracking-wide text-primary sm:text-5xl md:text-6xl"
            >
              Finn ro i Guds ord
              <br />
              <span className="italic font-normal">– hver dag</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="mt-6 max-w-md font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              En vakker krukke med 60 bibelvers for trøst, håp og styrke
              i alle livets øyeblikk.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href={PRODUCT_URL}
                className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-base font-semibold tracking-wide text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Bestill nå – kr 384
              </Link>
              <span className="font-sans text-sm text-muted-foreground">
                Populær gave i kristne hjem
              </span>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
              className="mt-8 flex flex-wrap items-center gap-5 text-muted-foreground"
            >
              <span className="flex items-center gap-1.5 font-sans text-xs">
                <Truck className="size-3.5" aria-hidden />
                Gratis levering
              </span>
              <span className="flex items-center gap-1.5 font-sans text-xs">
                <RotateCcw className="size-3.5" aria-hidden />
                30 dagers åpent kjøp
              </span>
              <span className="flex items-center gap-1.5 font-sans text-xs">
                <ShieldCheck className="size-3.5" aria-hidden />
                Trygg betaling
              </span>
            </motion.div>
          </div>

          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: imageLoaded ? 1 : 0, x: imageLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
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
