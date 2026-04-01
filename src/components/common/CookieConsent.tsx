"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const STORAGE_KEY = "hellig-ord-cookie-consent"

type ConsentChoice = "all" | "necessary"

export function CookieConsent() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      setVisible(true)
    }
  }, [])

  function handleConsent(choice: ConsentChoice) {
    localStorage.setItem(STORAGE_KEY, choice)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Informasjonskapsler"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
          className="
            fixed
            bottom-0
            left-0
            right-0
            z-50
            border-t
            border-border
            bg-card
            px-4
            py-5
            shadow-lg
            sm:px-6
            md:bottom-6
            md:left-6
            md:right-auto
            md:max-w-md
            md:rounded-xl
            md:border
          "
        >
          <p className="text-sm text-foreground/80 leading-relaxed">
            Vi bruker informasjonskapsler for å forbedre din opplevelse på
            nettsiden vår.{" "}
            <Link
              href="/personvern"
              className="
                font-medium
                text-primary
                underline
                underline-offset-2
                hover:text-primary/80
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                rounded-sm
              "
            >
              Les mer
            </Link>
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleConsent("all")}
              className="
                inline-flex
                items-center
                rounded-md
                bg-primary
                px-4
                py-2.5
                text-sm
                font-semibold
                text-primary-foreground
                shadow-sm
                transition-colors
                duration-200
                hover:bg-primary/90
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
              "
            >
              Godta alle
            </button>

            <button
              type="button"
              onClick={() => handleConsent("necessary")}
              className="
                inline-flex
                items-center
                rounded-md
                border
                border-border
                bg-background
                px-4
                py-2.5
                text-sm
                font-medium
                text-foreground
                transition-colors
                duration-200
                hover:bg-muted
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
              "
            >
              Bare nødvendige
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
