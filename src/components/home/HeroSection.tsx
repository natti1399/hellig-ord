'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section
      className="relative overflow-hidden bg-background"
      aria-label="Velkomst"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid min-h-[75vh] items-center gap-8 py-16 md:py-20 lg:grid-cols-2 lg:gap-12 lg:py-24">
          {/* Text content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="font-heading text-4xl font-bold tracking-wide text-primary sm:text-5xl md:text-6xl"
            >
              Ord som berører
              <br />
              <span className="italic font-normal">hjertet</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="mt-6 max-w-md font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Vakre kristne gaver som inspirerer tro, håp og kjærlighet.
              En glaskrukke fylt med 60 håndplukkede bibelvers — for alle
              livets øyeblikk.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/produkter"
                className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium tracking-wide text-accent-foreground transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
              >
                Utforsk butikken
              </Link>
              <Link
                href="/om-oss"
                className="inline-flex h-12 items-center justify-center rounded-full border border-primary/20 bg-transparent px-8 text-sm font-medium tracking-wide text-primary transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
              >
                Vår historie
              </Link>
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
