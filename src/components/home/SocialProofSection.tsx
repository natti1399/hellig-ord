import { Star } from 'lucide-react'
import { FadeInSection } from './FadeInSection'

const reviews = [
  {
    text: 'Ga denne til mamma – hun ble rørt til tårer.',
    stars: 5,
  },
  {
    text: 'Jeg trekker et vers hver morgen. Det gir meg ro.',
    stars: 5,
  },
  {
    text: 'Perfekt gave med mening. Anbefales!',
    stars: 5,
  },
]

export function SocialProofSection() {
  return (
    <section className="bg-muted/50 py-14 md:py-20" aria-labelledby="social-proof-heading">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <FadeInSection className="text-center mb-10" delay={0}>
          <h2
            id="social-proof-heading"
            className="font-heading text-2xl font-bold tracking-wider text-primary sm:text-3xl"
          >
            Elsket av kunder over hele Norge
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {reviews.map((review, index) => (
            <FadeInSection key={review.text} delay={index * 0.1} direction="up">
              <blockquote className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                <div className="flex gap-0.5" aria-label={`${review.stars} av 5 stjerner`}>
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="font-sans text-sm leading-relaxed text-foreground/80 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </blockquote>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.35} className="mt-8 text-center">
          <p className="font-sans text-xs text-muted-foreground">
            Over 500 solgt
          </p>
        </FadeInSection>
      </div>
    </section>
  )
}
