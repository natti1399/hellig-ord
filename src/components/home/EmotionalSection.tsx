import { FadeInSection } from './FadeInSection'

export function EmotionalSection() {
  return (
    <section className="bg-secondary py-16 md:py-24" aria-labelledby="emotional-heading">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <FadeInSection direction="none" delay={0}>
          <h2
            id="emotional-heading"
            className="font-heading text-2xl font-bold tracking-wider text-secondary-foreground sm:text-3xl"
          >
            Mer enn bare vers – en daglig påminnelse
          </h2>

          <div className="mt-8 space-y-4 font-sans text-base leading-relaxed text-secondary-foreground/80 sm:text-lg">
            <p>
              Når du trenger styrke.<br />
              Når du søker fred.<br />
              Når du vil takke.
            </p>

            <p className="font-heading text-lg italic text-secondary-foreground sm:text-xl">
              Trekk ett kort – og la ordene møte deg der du er.
            </p>
          </div>

          <div className="mx-auto mt-10 h-px w-16 bg-secondary-foreground/20" aria-hidden="true" />

          <div className="mt-10 space-y-3 font-sans text-sm leading-relaxed text-secondary-foreground/70 sm:text-base">
            <p>Når livet er tungt, kan ett lite vers gi ro.</p>
            <p>Når du er glad, kan det gi takknemlighet.</p>
            <p className="font-medium text-secondary-foreground/90">
              Dette er mer enn en krukke – det er en daglig påminnelse om håp.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
