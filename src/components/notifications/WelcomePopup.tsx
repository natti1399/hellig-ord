"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2 } from "lucide-react"
import { showNewsletterToast } from "@/components/notifications/NewsletterToast"

const STORAGE_KEY = "hellig-ord-welcome-seen"

export function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only show on first visit
    const alreadySeen =
      typeof window !== "undefined" &&
      localStorage.getItem(STORAGE_KEY) === "true"

    if (alreadySeen) return

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Focus trap: move focus into dialog when it opens
  useEffect(() => {
    if (isVisible) {
      inputRef.current?.focus()
    }
  }, [isVisible])

  // Close on Escape key
  useEffect(() => {
    if (!isVisible) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        dismiss()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])

  function markSeen() {
    localStorage.setItem(STORAGE_KEY, "true")
  }

  function dismiss() {
    markSeen()
    setIsVisible(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Vennligst skriv inn en gyldig e-postadresse.")
      return
    }

    setIsSubmitting(true)

    // Simulate async newsletter signup — replace with real API call
    await new Promise<void>((resolve) => setTimeout(resolve, 800))

    setIsSubmitting(false)
    markSeen()
    setIsVisible(false)
    showNewsletterToast()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="welcome-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#161515]/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={dismiss}
          />

          {/* Dialog */}
          <motion.div
            key="welcome-dialog"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            aria-describedby="welcome-description"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md rounded-2xl border border-[#DDD5CB] bg-[#F7F4EF] shadow-2xl overflow-hidden pointer-events-auto"
              style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative top band */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#51304A] via-[#8AA29E] to-[#AA998F]" />

              {/* Close button */}
              <button
                onClick={dismiss}
                aria-label="Lukk velkomstvindu"
                className="absolute top-4 right-4 flex items-center justify-center size-8 rounded-full text-[#6B5E57] hover:text-[#161515] hover:bg-[#DDD5CB]/60 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#51304A]"
              >
                <X className="size-4" />
              </button>

              <div className="px-8 pb-8 pt-7 flex flex-col items-center text-center">
                {/* Dove / Brand mark */}
                <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-[#51304A]/8 text-3xl select-none">
                  🕊
                </div>

                {/* Heading */}
                <h2
                  id="welcome-title"
                  className="text-2xl font-bold text-[#51304A] leading-snug mb-2"
                  style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
                >
                  Velkommen til Hellig Ord!
                </h2>

                {/* Discount callout */}
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#8AA29E]/15 px-4 py-1.5 text-sm font-semibold text-[#51304A]">
                  Få 10% rabatt på din første bestilling
                </div>

                {/* Description */}
                <p
                  id="welcome-description"
                  className="text-sm text-[#6B5E57] leading-relaxed mb-6 max-w-xs"
                >
                  Meld deg på nyhetsbrevet og motta rabattkoden direkte på
                  e-post — pluss inspirasjonsvers og eksklusive tilbud.
                </p>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="w-full flex flex-col gap-3"
                >
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="welcome-email"
                      className="sr-only"
                    >
                      E-postadresse
                    </label>
                    <input
                      ref={inputRef}
                      id="welcome-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="din@epost.no"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError("")
                      }}
                      disabled={isSubmitting}
                      aria-invalid={error ? "true" : undefined}
                      aria-describedby={error ? "welcome-email-error" : undefined}
                      className="w-full rounded-lg border border-[#DDD5CB] bg-white px-4 py-2.5 text-sm text-[#161515] placeholder:text-[#AA998F] focus:border-[#51304A] focus:outline-none focus:ring-2 focus:ring-[#51304A]/20 disabled:opacity-60 transition"
                    />
                    {error && (
                      <p
                        id="welcome-email-error"
                        role="alert"
                        className="text-xs text-red-600 text-left"
                      >
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#51304A] px-4 py-2.5 text-sm font-semibold text-[#F7F4EF] transition-opacity hover:opacity-85 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#51304A]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        Melder på…
                      </>
                    ) : (
                      "Meld meg på"
                    )}
                  </button>
                </form>

                {/* Dismiss link */}
                <button
                  onClick={dismiss}
                  className="mt-4 text-xs text-[#AA998F] underline-offset-2 hover:text-[#6B5E57] hover:underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#51304A] rounded"
                >
                  Nei takk, jeg ønsker ikke rabatt
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
