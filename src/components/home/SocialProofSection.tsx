import { Star } from 'lucide-react'
import { FadeInSection } from './FadeInSection'

interface Review {
  readonly text: string
  readonly name: string
  readonly city: string
  readonly stars: number
}

const reviews: readonly Review[] = [
  {
    text: 'Ga denne til mamma – hun ble faktisk rørt til tårer. Veldig fin og meningsfull gave.',
    name: 'Mina',
    city: 'Bergen',
    stars: 5,
  },
  {
    text: 'Jeg trekker et vers nesten hver morgen. Det gir en rolig start på dagen.',
    name: 'Anne',
    city: 'Trondheim',
    stars: 5,
  },
  {
    text: 'Kjøpte den som gave, men endte med å bestille en til meg selv også. Veldig fornøyd.',
    name: 'Silje',
    city: 'Oslo',
    stars: 5,
  },
  {
    text: 'Veldig fin idé og hyggelig gave. Bruker den ofte når jeg trenger litt ro i hverdagen.',
    name: 'Lotte',
    city: 'Tromsø',
    stars: 5,
  },
  {
    text: 'Fin krukke og fine vers. Anbefales.',
    name: 'Stian',
    city: 'Stavanger',
    stars: 4,
  },
]

export function SocialProofSection() {
  return (
    <section className="bg-muted/50 py-10 md:py-14" aria-labelledby="social-proof-heading">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <FadeInSection className="text-center mb-8" delay={0}>
          <h2
            id="social-proof-heading"
            className="font-heading text-2xl font-bold tracking-wider text-primary sm:text-3xl"
          >
            Elsket av kunder over hele Norge
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <FadeInSection key={review.name} delay={index * 0.08} direction="up">
              <blockquote className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex gap-0.5" aria-label={`${review.stars} av 5 stjerner`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < review.stars
                          ? 'size-4 fill-amber-400 text-amber-400'
                          : 'size-4 text-amber-400/30'
                      }
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="font-sans text-sm leading-relaxed text-foreground/80 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <footer className="mt-auto font-sans text-xs font-medium text-muted-foreground not-italic">
                  — {review.name}, {review.city}
                </footer>
              </blockquote>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.3} className="mt-8 text-center">
          <p className="font-sans text-xs text-muted-foreground">
            Over 500 solgt
          </p>
        </FadeInSection>
      </div>
    </section>
  )
}
