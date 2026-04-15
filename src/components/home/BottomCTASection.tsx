import Link from 'next/link'
import { FadeInSection } from './FadeInSection'

const PRODUCT_URL = '/produkter/bible-verse-inspiration-jar'

export function BottomCTASection() {
  return (
    <section className="bg-primary py-16 md:py-24" aria-labelledby="bottom-cta-heading">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
        <FadeInSection direction="none" delay={0}>
          <h2
            id="bottom-cta-heading"
            className="font-heading text-2xl font-bold tracking-wider text-primary-foreground sm:text-3xl"
          >
            Klar for å gi en gave med mening?
          </h2>

          <div className="mt-8">
            <Link
              href={PRODUCT_URL}
              className="inline-flex h-14 items-center justify-center rounded-full bg-accent px-10 text-base font-semibold tracking-wide text-accent-foreground shadow-lg transition-all duration-300 hover:bg-accent/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Bestill din krukke nå
            </Link>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
