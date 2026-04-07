'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FadeInSection } from './FadeInSection'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Hvor lang leveringstid?',
    answer:
      'Vi sender alle bestillinger med gratis frakt til hele Norge. Forventet leveringstid er ca. 10 dager.',
  },
  {
    question: 'Er dette en kristen gave?',
    answer:
      'Ja, bibelvers-krukken inneholder 60 utvalgte vers fra Bibelen. Den passer perfekt for alle som setter pris på Guds ord — uansett alder eller anledning.',
  },
  {
    question: 'Kan jeg gi den bort?',
    answer:
      'Absolutt! Bibelvers-krukken er laget for å gis bort. Gavevarianten leveres i en vakker eske med kors — klar til å gi bort slik den er.',
  },
  {
    question: 'Hva hvis jeg ikke er fornøyd?',
    answer:
      'Vi tilbyr 30 dagers åpent kjøp. Hvis du ikke er fornøyd, kan du returnere varen uten å oppgi grunn. Ta kontakt med oss, så hjelper vi deg.',
  },
]

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-5 text-left font-sans text-sm font-semibold text-foreground hover:text-primary transition-colors"
        aria-expanded={isOpen}
      >
        {item.question}
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>
      {isOpen && (
        <div className="pb-5 font-sans text-sm leading-relaxed text-muted-foreground">
          {item.answer}
        </div>
      )}
    </div>
  )
}

export function HomepageFAQ() {
  return (
    <section className="bg-muted/50 py-16 md:py-24" aria-labelledby="homepage-faq-heading">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <FadeInSection className="text-center mb-10" delay={0}>
          <h2
            id="homepage-faq-heading"
            className="font-heading text-2xl font-bold tracking-wider text-primary sm:text-3xl"
          >
            Ofte stilte spørsmål
          </h2>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            {faqs.map((faq) => (
              <FAQAccordionItem key={faq.question} item={faq} />
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
