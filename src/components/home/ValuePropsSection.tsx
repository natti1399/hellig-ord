import { FadeInSection } from './FadeInSection'

interface ValueProp {
  icon: string
  title: string
  description: string
}

const valueProps: ValueProp[] = [
  {
    icon: '🕊',
    title: 'Håndplukket med omtanke',
    description:
      'Hvert produkt er nøye utvalgt for å styrke troen din og bringe Guds ord nærmere hjertet ditt.',
  },
  {
    icon: '📦',
    title: 'Rask og trygg levering',
    description:
      'Vi sender innen 1–3 virkedager til hele Norge, pakket med kjærlighet og omsorg.',
  },
  {
    icon: '💛',
    title: 'Inspirert av Guds ord',
    description:
      'Alle produkter er laget med kjærlighet og bibelsk inspirasjon — for å berike hverdagen din.',
  },
]

export function ValuePropsSection() {
  return (
    <section
      className="bg-muted/50 py-16 md:py-24"
      aria-labelledby="value-props-heading"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <FadeInSection className="mb-12 text-center" delay={0}>
          <h2
            id="value-props-heading"
            className="sr-only"
          >
            Hvorfor velge Hellig Ord
          </h2>
          <div className="mx-auto h-px w-16 bg-primary/20" aria-hidden="true" />
        </FadeInSection>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {valueProps.map((prop, index) => (
            <FadeInSection key={prop.title} delay={index * 0.15} direction="up">
              <article className="flex flex-col items-center text-center">
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-background shadow-sm border border-border"
                  aria-hidden="true"
                >
                  <span className="text-2xl leading-none" role="img" aria-label={prop.title}>
                    {prop.icon}
                  </span>
                </div>

                <h3 className="font-heading text-base font-bold tracking-wide text-primary sm:text-lg">
                  {prop.title}
                </h3>

                <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground max-w-xs">
                  {prop.description}
                </p>
              </article>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.5} className="mt-12 flex justify-center" direction="none">
          <div className="mx-auto h-px w-16 bg-primary/20" aria-hidden="true" />
        </FadeInSection>
      </div>
    </section>
  )
}
