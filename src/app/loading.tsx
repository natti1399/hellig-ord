'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-background"
      aria-label="Laster inn siden"
      role="status"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6"
      >
        {/* Spinning ring */}
        <div className="relative h-12 w-12" aria-hidden="true">
          {/* Track */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/10" />
          {/* Spinner arc */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
          />
          {/* Inner dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
          </div>
        </div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground"
          aria-live="polite"
        >
          Laster inn...
        </motion.p>
      </motion.div>
    </div>
  )
}
