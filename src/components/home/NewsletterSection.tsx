'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FadeInSection } from './FadeInSection'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setStatus('error')
      return
    }

    setStatus('loading')

    // Simulate async submission — replace with real API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1000)
  }

  return (
    <section
      className="bg-primary py-16 md:py-24"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
        <FadeInSection direction="none" delay={0}>
          <h2
            id="newsletter-heading"
            className="font-heading text-2xl font-bold tracking-wider text-primary-foreground sm:text-3xl"
          >
            Hold deg oppdatert
          </h2>

          <p className="mt-4 font-sans text-sm leading-relaxed text-primary-foreground/70 sm:text-base max-w-md mx-auto">
            Meld deg på vårt nyhetsbrev og få eksklusive tilbud og
            inspirasjonsvers rett i innboksen.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-2"
            noValidate
            aria-label="Nyhetsbrevpåmelding"
          >
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                E-postadresse
              </label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="din@epost.no"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === 'error') setStatus('idle')
                }}
                className="h-11 rounded-full border-primary-foreground/20 bg-primary-foreground/10 px-5 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-primary-foreground/40 focus-visible:ring-primary-foreground/20"
                aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                aria-invalid={status === 'error'}
                disabled={status === 'loading' || status === 'success'}
                autoComplete="email"
              />
            </div>

            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="h-11 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-7 font-sans text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60"
            >
              {status === 'loading' ? 'Melder på...' : status === 'success' ? 'Påmeldt!' : 'Meld meg på'}
            </Button>
          </form>

          {/* Feedback messages */}
          {status === 'error' && (
            <p
              id="newsletter-error"
              role="alert"
              className="mt-3 font-sans text-xs text-rose-300"
            >
              Vennligst skriv inn en gyldig e-postadresse.
            </p>
          )}

          {status === 'success' && (
            <p
              role="status"
              className="mt-3 font-sans text-sm text-primary-foreground/80"
            >
              Takk! Du er nå påmeldt nyhetsbrevet vårt.
            </p>
          )}

          <p className="mt-5 font-sans text-xs text-primary-foreground/40">
            Vi respekterer ditt personvern. Ingen spam — det lover vi.
          </p>
        </FadeInSection>
      </div>
    </section>
  )
}
