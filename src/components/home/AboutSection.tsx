import Link from "next/link"
import { FadeInSection } from "./FadeInSection"
import { ShieldCheck, Truck, Heart } from "lucide-react"

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Trygg handel",
    description: "Sikker betaling med Vipps og Klarna. Norsk nettbutikk med org.nr.",
  },
  {
    icon: Truck,
    title: "Gratis levering",
    description: "Gratis frakt til hele Norge. Leveringstid ca. 10 dager.",
  },
  {
    icon: Heart,
    title: "Laget med kjærlighet",
    description:
      "Hvert produkt er håndplukket for å bringe Guds ord nærmere hjertet ditt.",
  },
]

export function AboutSection() {
  return (
    <section
      className="bg-background py-16 md:py-24"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <FadeInSection className="mb-12 text-center" delay={0}>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-accent font-medium mb-3">
            Hvorfor velge oss
          </p>
          <h2
            id="trust-heading"
            className="font-heading text-2xl font-bold tracking-wider text-primary sm:text-3xl"
          >
            Trygg og inspirerende handel
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {trustPoints.map((point, index) => (
            <FadeInSection key={point.title} delay={index * 0.12} direction="up">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-accent/10">
                  <point.icon className="size-5 text-accent" aria-hidden />
                </div>
                <h3 className="font-heading text-base font-bold tracking-wide text-primary">
                  {point.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground max-w-xs">
                  {point.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.4} className="mt-10 text-center">
          <Link
            href="/om-oss"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <span className="underline underline-offset-4 decoration-primary/30 hover:decoration-primary/60">
              Les mer om Hellig Ord
            </span>
            <span aria-hidden>→</span>
          </Link>
        </FadeInSection>
      </div>
    </section>
  )
}
