import { FadeInSection } from './FadeInSection'

export function BibleQuoteSection() {
  return (
    <section
      className="bg-secondary py-16 md:py-24"
      aria-label="Bibelsitat"
    >
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <FadeInSection direction="none" delay={0}>
          {/* Decorative quotation mark */}
          <div
            className="mb-6 font-heading text-6xl font-bold leading-none text-secondary-foreground/20 select-none"
            aria-hidden="true"
          >
            "
          </div>

          <blockquote>
            <p className="font-heading text-xl font-normal italic leading-relaxed tracking-wide text-secondary-foreground sm:text-2xl md:text-3xl md:leading-relaxed">
              For så høyt har Gud elsket verden at han ga sin Sønn,
              den enbårne, for at hver den som tror på ham,
              ikke skal gå fortapt, men ha evig liv.
            </p>

            <footer className="mt-8">
              <cite className="font-sans text-sm font-medium tracking-widest text-secondary-foreground/70 not-italic uppercase">
                — Johannes 3:16
              </cite>
            </footer>
          </blockquote>

          {/* Simple divider */}
          <div
            className="mx-auto mt-8 h-px w-12 bg-secondary-foreground/20"
            aria-hidden="true"
          />
        </FadeInSection>
      </div>
    </section>
  )
}
