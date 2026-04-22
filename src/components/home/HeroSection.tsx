'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Store, Truck, RotateCcw, ShieldCheck } from 'lucide-react'
import { PaymentIcons } from '@/components/shared/PaymentIcons'

const PRODUCT_URL = '/produkter'

const trustBadges = [
  { icon: Store, text: 'Norsk nettbutikk' },
  { icon: Truck, text: 'Gratis frakt i hele Norge' },
  { icon: RotateCcw, text: '30 dagers åpent kjøp' },
  { icon: ShieldCheck, text: 'Trygg betaling' },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background" aria-label="Produktpresentasjon">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-8 pt-8 pb-14 md:pt-10 md:pb-16 lg:grid-cols-2 lg:gap-12 lg:pt-12 lg:pb-20">

          {/* Text content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="font-heading text-3xl font-bold tracking-wide text-primary sm:text-4xl md:text-5xl lg:text-6xl"
            >
              En gave som gir ro, håp og styrke
              <br />
              <span className="italic font-normal">– hver eneste dag</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="mt-6 max-w-lg font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Trekk et bibelvers når du trenger det mest. En enkel vane som kan
              gi fred i hjertet – midt i en travel eller tung hverdag.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2"
            >
              {trustBadges.map((badge) => (
                <span
                  key={badge.text}
                  className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground"
                >
                  <badge.icon className="size-3.5 text-accent" aria-hidden />
                  {badge.text}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              className="mt-8"
            >
              <Link
                href={PRODUCT_URL}
                className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-base font-semibold tracking-wide text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Utforsk alle produkter
              </Link>
            </motion.div>
          </div>

          {/* Product image + payment icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="relative aspect-[1112/1415] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/hero-composite.jpg"
                alt="Bibelvers-krukke sammen med Den hellige skrift, eukalyptus og nøkkelring med Ordspråkene 3:5 – med teksten «Små påminnelser. Stor tro. La Guds ord styrke deg – hver eneste dag.»"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Payment icons under product image */}
            <div className="mt-4 flex justify-center">
              <PaymentIcons size="md" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
