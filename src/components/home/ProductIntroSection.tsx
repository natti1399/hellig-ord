import { FadeInSection } from './FadeInSection'
import { Heart, Shield, Gift, BookOpen } from 'lucide-react'

const benefits = [
  { icon: Heart, text: 'Gir ro i en stressende hverdag' },
  { icon: Shield, text: 'Perfekt når du trenger trøst eller styrke' },
  { icon: Gift, text: 'En meningsfull gave som faktisk betyr noe' },
  { icon: BookOpen, text: 'Hjelper deg å koble deg på Guds ord daglig' },
]

export function ProductIntroSection() {
  return (
    <section className="bg-background py-16 md:py-24" aria-labelledby="product-intro-heading">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <FadeInSection className="text-center" delay={0}>
          <h2
            id="product-intro-heading"
            className="font-heading text-2xl font-bold tracking-wider text-primary sm:text-3xl"
          >
            Bibelvers-krukken – en daglig påminnelse om håp
          </h2>

          <p className="mt-6 mx-auto max-w-2xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
            Denne vakre krukken er fylt med håndskrevne bibelvers som gir trøst,
            styrke og glede – akkurat når du trenger det. Enten du går gjennom en
            vanskelig tid eller ønsker mer ro i hverdagen, er dette en enkel måte
            å komme nærmere Guds ord.
          </p>
        </FadeInSection>

        {/* Hvorfor du vil elske den */}
        <FadeInSection className="mt-12" delay={0.15}>
          <h3 className="text-center font-heading text-lg font-bold tracking-wide text-primary mb-8">
            Hvorfor du vil elske den
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.text}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                  <benefit.icon className="size-4 text-accent" aria-hidden />
                </div>
                <p className="font-sans text-sm leading-relaxed text-foreground/80 pt-1.5">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
