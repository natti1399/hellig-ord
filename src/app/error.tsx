'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps) {
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
        {/* Decorative motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 flex justify-center"
          aria-hidden="true"
        >
          <span className="font-heading text-primary/30 text-xl tracking-[0.6em]">
            ✦ ✦ ✦
          </span>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6 flex justify-center"
          aria-hidden="true"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/10 bg-primary/5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7 text-primary/50"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-heading text-2xl font-bold tracking-wide text-primary sm:text-3xl"
        >
          Noe gikk galt
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
          Beklager, det oppstod en uventet feil. Vennligst prøv igjen.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Button
            onClick={reset}
            className="h-12 rounded-full bg-primary px-8 font-sans text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            Prøv igjen
          </Button>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-primary/20 px-8 font-sans text-sm font-medium tracking-wide text-primary transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
          >
            Gå til forsiden
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
          «Vær ikke bekymret for noen ting» — Fil 4,6
        </motion.p>
      </div>
    </div>
  )
}
