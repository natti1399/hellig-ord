'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Store, Truck, RotateCcw, ShieldCheck } from 'lucide-react'
import { PaymentIcons } from '@/components/shared/PaymentIcons'
import { useCart } from '@/context/CartContext'

interface HeroSectionProps {
  featuredVariantId: string | null
  featuredHandle: string
}

const trustBadges = [
  { icon: Store, text: 'Norsk nettbutikk' },
  { icon: Truck, text: 'Gratis frakt i Norge' },
  { icon: RotateCcw, text: '30 dagers åpent kjøp' },
  { icon: ShieldCheck, text: 'Trygg betaling' },
]

export function HeroSection({ featuredVariantId, featuredHandle }: HeroSectionProps) {
  const { addItem } = useCart()
  const [buying, setBuying] = useState(false)

  async function handleBuyNow() {
    if (!featuredVariantId || buying) return
    setBuying(true)
    try {
      const cart = await addItem(featuredVariantId)
      if (cart?.checkoutUrl) {
        window.location.href = cart.checkoutUrl
      }
    } catch {
      setBuying(false)
    }
  }

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
              className="font-heading text-3xl font-bold tracking-wide text-primary sm:text-4xl md:text-5xl lg:text-[3.4rem] lg:leading-[1.1]"
            >
              Kristne produkter som gir
              <br />
              <span className="italic font-normal">ro, styrke og trøst</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="mt-6 max-w-lg font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Oppdag vår populære bibelvers-krukke – et ord fra Gud, akkurat
              når du trenger det.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: 'easeOut' }}
              className="mt-3 max-w-lg font-sans text-sm leading-relaxed text-muted-foreground/85"
            >
              90 bibelvers – sortert etter følelser du kjenner deg igjen i.
            </motion.p>

            {/* Trust badges — even spacing, perfectly centered, premium */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="mt-7 flex w-full max-w-xl flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start"
              aria-label="Tillit"
            >
              {trustBadges.map((badge) => (
                <li
                  key={badge.text}
                  className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground"
                >
                  <badge.icon className="size-3.5 text-accent" aria-hidden />
                  {badge.text}
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:w-auto"
            >
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!featuredVariantId || buying}
                className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-base font-semibold tracking-wide text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Kjøp nå – gå rett til kassen"
              >
                {buying ? 'Sender til kassen…' : 'Kjøp nå'}
              </button>
              <Link
                href={`/produkter/${featuredHandle}`}
                className="inline-flex h-14 items-center justify-center rounded-full border border-primary/25 bg-transparent px-10 text-base font-semibold tracking-wide text-primary transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Se produkt
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
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/hero-composite.jpg"
                alt="Bibelvers-krukke «Read Me When…» med fargekodede vers, sammen med den sorte gaveesken og brudeslør i varmt naturlys."
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
