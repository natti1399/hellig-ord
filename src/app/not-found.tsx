'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24">
      {/* Decorative dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #51304A 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative mx-auto max-w-xl text-center">
        {/* Decorative cross motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 flex justify-center"
          aria-hidden="true"
        >
          <span className="font-heading text-primary/30 text-xl tracking-[0.6em]">
            ✦ ✝ ✦
          </span>
        </motion.div>

        {/* 404 number */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-heading text-[7rem] font-bold leading-none tracking-tight text-primary/15 sm:text-[9rem]"
          aria-hidden="true"
        >
          404
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-heading -mt-4 text-2xl font-bold tracking-wide text-primary sm:text-3xl"
        >
          Siden ble ikke funnet
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className="mx-auto my-6 h-px w-16 bg-primary/20"
          aria-hidden="true"
        />

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-sans text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          Beklager, vi finner ikke siden du leter etter. Den kan ha blitt
          flyttet eller slettet.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10"
        >
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 font-sans text-sm font-medium tracking-wide text-accent-foreground transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
          >
            Tilbake til forsiden
          </Link>
        </motion.div>

        {/* Subtle verse footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 font-heading text-xs italic text-primary/30 tracking-wide"
          aria-label="Bibelvers"
        >
          «Jeg er veien, sannheten og livet» — Joh 14,6
        </motion.p>
      </div>
    </div>
  )
}
