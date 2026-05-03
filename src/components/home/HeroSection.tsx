'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BuyNowButton } from '@/components/shared/BuyNowButton'
import { TrustPaymentGrid } from '@/components/shared/TrustPaymentGrid'

interface HeroSectionProps {
  variantId?: string
}

export function HeroSection({ variantId }: HeroSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section
      className="overflow-hidden bg-background py-10 md:py-16"
      aria-label="Velkomst"
    >
      <div className="mx-auto max-w-2xl px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center"
        >
          <h1 className="font-heading text-3xl font-bold tracking-wide text-primary sm:text-4xl md:text-5xl">
            Kristne produkter som gir
            <br />
            <span className="italic font-normal">ro, styrke og trøst</span>
          </h1>
          <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
            Oppdag vår populære bibelvers-krukke – et ord fra Gud, akkurat når du trenger det.
          </p>
        </motion.div>

        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 16 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mt-7 w-full"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white">
            <Image
              src="/images/hero-product.png"
              alt="Bibelvers-krukke – en vakker glaskrukke fylt med 60 fargekodede bibelvers, med gaveeske og kort"
              fill
              className="object-contain mix-blend-multiply p-4"
              priority
              sizes="(max-width: 768px) 100vw, 672px"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </motion.div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="mx-auto mt-5 w-full max-w-[600px]"
        >
          {variantId ? (
            <BuyNowButton variantId={variantId} label="Kjøp nå" />
          ) : (
            <Link
              href="/produkter"
              className="flex h-14 w-full items-center justify-center rounded-xl bg-primary font-sans text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]"
            >
              Kjøp nå
            </Link>
          )}

          <Link
            href="/produkter"
            className="mt-2 flex h-14 w-full items-center justify-center rounded-xl border border-primary bg-transparent font-sans text-sm font-semibold tracking-wide text-primary transition-all duration-200 hover:bg-primary/5"
          >
            Se produkter
          </Link>

          <div className="mt-3">
            <TrustPaymentGrid />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
