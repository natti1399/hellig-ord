import type { LucideProps } from 'lucide-react'
import {
  BookOpen,
  Layers,
  BookMarked,
  GlassWater,
  Gift,
} from 'lucide-react'
import { FadeInSection } from './FadeInSection'

interface IncludedItem {
  icon: React.ComponentType<LucideProps>
  title: string
  description: string
  highlight?: boolean
}

const includedItems: readonly IncludedItem[] = [
  {
    icon: BookOpen,
    title: '60 fargerike bibelvers-kort',
    description:
      'Hvert kort er skrevet for hånd med et vers fra Bibelen — vakre, personlige og fylt med mening.',
  },
  {
    icon: Layers,
    title: 'Fargekodede kategorier',
    description:
      'Kortene er sortert etter kategori slik at du enkelt finner det verset du trenger akkurat nå.',
  },
  {
    icon: BookMarked,
    title: 'Etikett: «Les meg når...»',
    description:
      'Krukken leveres med en etikett som hjelper deg å trekke det verset som passer øyeblikket.',
  },
  {
    icon: GlassWater,
    title: 'Vakker glaskrukke med korklokk',
    description:
      'En elegant og holdbar glaskrukke med naturlig korklokk — laget for å stå fremme og inspirere daglig.',
  },
  {
    icon: Gift,
    title: 'Gaveeske med kors',
    description:
      'Gavevarianten leveres i en nydelig eske prydet med et kors — klar til å gis bort slik den er.',
    highlight: true,
  },
]

export function WhatsIncludedSection() {
  return (
    <section
      className="bg-muted/50 py-16 md:py-24"
      aria-labelledby="whats-included-heading"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section header */}
        <FadeInSection className="mb-14 text-center" delay={0}>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-accent font-medium mb-3">
            Produktinnhold
          </p>
          <h2
            id="whats-included-heading"
            className="font-heading text-2xl font-bold tracking-wider text-primary sm:text-3xl md:text-4xl"
          >
            Dette er inkludert
          </h2>
          <p className="mt-4 mx-auto max-w-xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
            Alt du trenger for å gi — eller ta imot — Guds ord, samlet i én vakker krukke.
          </p>
          <div
            className="mx-auto mt-8 h-px w-16 bg-primary/20"
            aria-hidden="true"
          />
        </FadeInSection>

        {/* Items grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {includedItems.map((item, index) => {
            const Icon = item.icon
            return (
              <FadeInSection
                key={item.title}
                delay={index * 0.1}
                direction="up"
              >
                <article
                  className={[
                    'flex flex-col gap-4 rounded-2xl border p-6 transition-shadow duration-300',
                    item.highlight
                      ? 'border-accent/40 bg-card shadow-sm'
                      : 'border-border bg-card shadow-sm',
                  ].join(' ')}
                >
                  {/* Icon container */}
                  <div
                    className={[
                      'flex h-11 w-11 items-center justify-center rounded-xl',
                      item.highlight
                        ? 'bg-accent/15 text-accent'
                        : 'bg-primary/10 text-primary',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="font-heading text-base font-bold tracking-wide text-primary sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlight badge for gift box variant */}
                  {item.highlight && (
                    <p className="mt-auto font-sans text-xs font-medium tracking-wide text-accent">
                      Kun i gavevarianten
                    </p>
                  )}
                </article>
              </FadeInSection>
            )
          })}
        </div>

        <FadeInSection delay={0.55} className="mt-14 flex justify-center" direction="none">
          <div
            className="mx-auto h-px w-16 bg-primary/20"
            aria-hidden="true"
          />
        </FadeInSection>
      </div>
    </section>
  )
}
