'use client'

import { motion } from 'framer-motion'

export function TestimonialSection() {
  return (
    <section
      className="bg-background py-16 md:py-24"
      aria-labelledby="community-heading"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Fellesskapet
          </p>
          <h2
            id="community-heading"
            className="font-heading text-2xl font-normal italic tracking-wide text-primary sm:text-3xl"
          >
            Vi gleder oss til å høre fra deg!
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
            Hellig Ord er en ny butikk, og vi ser frem til å bygge et fellesskap
            med deg. Del opplevelsen din med oss — vi setter stor pris på alle
            tilbakemeldinger.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
