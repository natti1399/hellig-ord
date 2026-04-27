import Image from 'next/image'
import { FadeInSection } from './FadeInSection'

export function EmotionalSection() {
  return (
    <section
      className="bg-secondary py-20 md:py-28 lg:py-32"
      aria-labelledby="emotional-heading"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeInSection direction="left" delay={0}>
            <div className="relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden rounded-2xl shadow-lg lg:max-w-none">
              <Image
                src="/images/bibel-kaffe-solnedgang.jpg"
                alt="Åpen bibel ved siden av en kopp kaffe i varm solnedgang ved fjellvann – med Filipperne 4:6-7."
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeInSection>

          <FadeInSection direction="right" delay={0.1} className="text-center lg:text-left">
            <h2
              id="emotional-heading"
              className="font-heading text-3xl font-bold tracking-wide text-secondary-foreground sm:text-4xl md:text-[2.6rem] md:leading-tight"
            >
              Mer enn bare en gave
            </h2>

            <div className="mx-auto mt-6 h-px w-12 bg-secondary-foreground/20 lg:mx-0" aria-hidden="true" />

            <p className="mt-6 font-sans text-base leading-relaxed text-secondary-foreground/85 sm:text-lg">
              Dette er ikke bare en krukke med bibelvers – det er en daglig
              påminnelse om håp.
            </p>

            <p className="mt-4 font-sans text-base leading-relaxed text-secondary-foreground/85 sm:text-lg">
              En gave som kan løfte, trøste og gi styrke – igjen og igjen.
            </p>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
