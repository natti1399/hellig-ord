import Link from 'next/link'
import { FadeInSection } from './FadeInSection'

export function AboutSection() {
  return (
    <section
      className="bg-background py-16 md:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-center">
          {/* Decorative element */}
          <FadeInSection direction="left" delay={0}>
            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-2xl bg-muted overflow-hidden flex items-center justify-center border border-border">
                {/* Decorative brand illustration placeholder */}
                <div className="flex flex-col items-center gap-5 p-10 text-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                    aria-hidden="true"
                  >
                    <span className="text-primary text-2xl">✝</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-32 rounded-full bg-primary/10 mx-auto" />
                    <div className="h-2 w-24 rounded-full bg-primary/10 mx-auto" />
                    <div className="h-2 w-28 rounded-full bg-primary/10 mx-auto" />
                  </div>
                  <p className="font-heading italic text-primary/30 text-sm tracking-wide">
                    Hellig Ord
                  </p>
                </div>
              </div>

              {/* Floating accent card */}
              <div
                className="absolute -bottom-4 -right-4 rounded-xl bg-card border border-border p-4 shadow-md max-w-[160px]"
                aria-hidden="true"
              >
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  Grunnlagt med tro og kjærlighet
                </p>
                <div className="mt-2 flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 rounded-full bg-accent/40" />
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Text content */}
          <FadeInSection direction="right" delay={0.15}>
            <div>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-accent font-medium mb-3">
                Om oss
              </p>

              <h2
                id="about-heading"
                className="font-heading text-2xl font-bold tracking-wider text-primary sm:text-3xl md:text-4xl"
              >
                Vår historie
              </h2>

              <div className="mt-6 space-y-4 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  Hellig Ord ble skapt av en dyp overbevisning: at Guds ord har
                  kraften til å forvandle hverdagen. Vi tror at vakre produkter
                  med bibelsk budskap kan bringe trøst, håp og glede til dem som
                  trenger det aller mest.
                </p>
                <p>
                  Hvert produkt vi velger ut, bærer med seg et hjerte som ønsker
                  å spre Guds kjærlighet. Fra bibelvers-krukker til inspirerende
                  gaver — alt er laget for å minne oss på det som virkelig
                  betyr noe.
                </p>
              </div>

              {/* Brand values */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: '✝', label: 'Grunnlagt i tro' },
                  { icon: '📖', label: '60 bibelvers per krukke' },
                  { icon: '🎁', label: 'Vakker gaveinnpakning' },
                  { icon: '♡', label: 'Laget med kjærlighet' },
                ].map((value) => (
                  <div key={value.label} className="rounded-xl bg-muted/60 p-4 border border-border/50">
                    <p className="text-lg" aria-hidden="true">{value.icon}</p>
                    <p className="mt-1 font-sans text-xs text-muted-foreground leading-tight">
                      {value.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/om-oss"
                  className="group inline-flex items-center gap-2 font-sans text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                  aria-label="Les mer om Hellig Ord sin historie"
                >
                  <span className="underline underline-offset-4 decoration-primary/30 group-hover:decoration-primary/60 transition-all duration-200">
                    Les mer om oss
                  </span>
                  <span
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
