import {
  HeartCrack,
  Wind,
  BookOpen,
  Heart,
} from 'lucide-react'
import { FadeInSection } from './FadeInSection'

interface GiftOccasion {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  title: string
}

const occasions: GiftOccasion[] = [
  { icon: HeartCrack, title: 'Når livet føles tungt' },
  { icon: Wind, title: 'Når du trenger ro' },
  { icon: BookOpen, title: 'Når du trenger Guds ord i løpet av dagen' },
  { icon: Heart, title: 'Som en meningsfull gave til noen du er glad i' },
]

export function GiftOccasionsSection() {
  return (
    <section
      className="bg-background py-20 md:py-28"
      aria-labelledby="gift-occasions-heading"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section header — centered */}
        <FadeInSection className="mb-12 text-center" delay={0} direction="up">
          <h2
            id="gift-occasions-heading"
            className="font-heading text-3xl font-bold tracking-wide text-primary sm:text-4xl md:text-[2.6rem] md:leading-tight"
          >
            Perfekt for alle anledninger
          </h2>
          <div
            className="mx-auto mt-6 h-px w-12 bg-primary/20"
            aria-hidden="true"
          />
        </FadeInSection>

        {/* 4 even, centered, balanced occasion boxes */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {occasions.map((occasion, index) => {
            const Icon = occasion.icon

            return (
              <FadeInSection
                key={occasion.title}
                delay={index * 0.08}
                direction="up"
                className="h-full"
              >
                <article className="group flex h-full flex-col items-center justify-start rounded-2xl border border-border bg-card p-6 text-center transition-shadow duration-300 hover:shadow-md md:p-7">
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 transition-colors duration-300 group-hover:bg-primary/14"
                    aria-hidden="true"
                  >
                    <Icon
                      className="h-5 w-5 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="font-heading text-base font-semibold tracking-wide text-primary leading-snug sm:text-[1.05rem]">
                    {occasion.title}
                  </h3>
                </article>
              </FadeInSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
