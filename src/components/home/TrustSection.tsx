import { FadeInSection } from './FadeInSection'
import { RotateCcw, Truck, ShieldCheck, Headphones } from 'lucide-react'
import { PaymentIcons } from '@/components/shared/PaymentIcons'

const trustPoints = [
  { icon: RotateCcw, text: '30 dagers åpent kjøp' },
  { icon: Truck, text: 'Rask levering' },
  { icon: ShieldCheck, text: 'Sikker betaling med Vipps og Klarna' },
  { icon: Headphones, text: 'Norsk kundeservice' },
]

export function TrustSection() {
  return (
    <section className="bg-background py-16 md:py-24" aria-labelledby="trust-heading">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <FadeInSection className="text-center mb-10" delay={0}>
          <h2
            id="trust-heading"
            className="font-heading text-2xl font-bold tracking-wider text-primary sm:text-3xl"
          >
            Trygg handel – helt uten risiko
          </h2>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trustPoints.map((point) => (
              <div
                key={point.text}
                className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center shadow-sm"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-accent/10">
                  <point.icon className="size-5 text-accent" aria-hidden />
                </div>
                <p className="font-sans text-xs font-medium leading-snug text-foreground/80">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection delay={0.25} className="mt-8 flex justify-center">
          <PaymentIcons size="md" />
        </FadeInSection>
      </div>
    </section>
  )
}
