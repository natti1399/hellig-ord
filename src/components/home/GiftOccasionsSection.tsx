import Link from 'next/link'
import {
  Heart,
  Gift,
  Star,
  Church,
  Sparkles,
  Sun,
} from 'lucide-react'
import { FadeInSection } from './FadeInSection'

interface GiftOccasion {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  title: string
  description: string
}

const occasions: GiftOccasion[] = [
  {
    icon: Church,
    title: 'Konfirmasjon',
    description:
      'Et minneverdig og meningsfylt gave til den store dagen — bibelvers som inspirerer på veien videre.',
  },
  {
    icon: Gift,
    title: 'Bursdag',
    description:
      'Gi noe som varer lengre enn blomster. En gave med Guds ord som gir glede dag etter dag.',
  },
  {
    icon: Star,
    title: 'Jul og høytider',
    description:
      'Perfekt under juletreet eller som adventsgave — ord som varmer hjertet i høytiden.',
  },
  {
    icon: Sparkles,
    title: 'Dåp',
    description:
      'Feir et nytt liv med en gave som bærer velsignelse og Guds løfter inn i hjemmet.',
  },
  {
    icon: Heart,
    title: 'Bryllup',
    description:
      'Et vakkert symbol på kjærlighet og tro — bibelvers som kan bære paret gjennom livet sammen.',
  },
  {
    icon: Sun,
    title: 'Til deg selv',
    description:
      'Som daglig inspirasjon — trekk et vers hver morgen og start dagen forankret i noe større.',
  },
]

export function GiftOccasionsSection() {
  return (
    <section
      className="bg-background py-16 md:py-24"
      aria-labelledby="gift-occasions-heading"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section header */}
        <FadeInSection className="mb-14 text-center" delay={0} direction="up">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-accent font-medium mb-3">
            Passer for alle anledninger
          </p>

          <h2
            id="gift-occasions-heading"
            className="font-heading text-2xl font-bold tracking-wider text-primary sm:text-3xl md:text-4xl"
          >
            Den perfekte gaven
          </h2>

          <p className="mt-4 mx-auto max-w-xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
            Bibelvers-krukken er laget for å gi — og for å beholde. Enten du
            feirer en milepæl eller ønsker å berike hverdagen, finnes det en
            anledning som passer.
          </p>

          <div
            className="mx-auto mt-8 h-px w-12 bg-primary/20"
            aria-hidden="true"
          />
        </FadeInSection>

        {/* Occasion cards grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
          {occasions.map((occasion, index) => {
            const Icon = occasion.icon

            return (
              <FadeInSection
                key={occasion.title}
                delay={index * 0.1}
                direction="up"
              >
                <article className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-shadow duration-300 hover:shadow-md md:p-6">
                  {/* Icon container */}
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary/8 transition-colors duration-300 group-hover:bg-primary/14"
                    aria-hidden="true"
                  >
                    <Icon
                      className="h-5 w-5 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="font-heading text-base font-bold tracking-wide text-primary sm:text-lg">
                    {occasion.title}
                  </h3>

                  <p className="mt-2 font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {occasion.description}
                  </p>
                </article>
              </FadeInSection>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <FadeInSection
          className="mt-14 flex flex-col items-center gap-4 text-center"
          delay={0.55}
          direction="up"
        >
          <div
            className="mx-auto h-px w-12 bg-primary/20"
            aria-hidden="true"
          />

          <p className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed">
            Uansett anledning — det finnes alltid rom for et ord fra Guds hjerte.
          </p>

          <Link
            href="/produkter/bible-verse-inspiration-jar"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-sans text-sm font-medium tracking-wide text-primary-foreground transition-opacity duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            aria-label="Bestill din Bibelvers-krukke i dag"
          >
            Bestill din i dag
          </Link>
        </FadeInSection>
      </div>
    </section>
  )
}
