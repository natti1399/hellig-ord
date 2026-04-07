import { FadeInSection } from './FadeInSection'

const steps = [
  {
    number: '1',
    title: 'Trekk et kort',
    description: 'Når du trenger det – morgen, kveld eller i en vanskelig stund.',
  },
  {
    number: '2',
    title: 'Les verset',
    description: 'La ordene synke inn.',
  },
  {
    number: '3',
    title: 'Kjenn roen',
    description: 'Et lite øyeblikk som kan gjøre en stor forskjell.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-muted/50 py-16 md:py-24" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <FadeInSection className="text-center mb-12" delay={0}>
          <h2
            id="how-it-works-heading"
            className="font-heading text-2xl font-bold tracking-wider text-primary sm:text-3xl"
          >
            Hvordan det fungerer
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <FadeInSection key={step.title} delay={index * 0.12} direction="up">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="font-heading text-base font-bold tracking-wide text-primary sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground max-w-xs">
                  {step.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
