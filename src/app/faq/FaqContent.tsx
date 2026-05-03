"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    id: "bestilling",
    question: "Hvordan bestiller jeg?",
    answer:
      "Du kan enkelt bestille gjennom nettbutikken vår. Velg produktene du ønsker, legg dem i handlekurven og følg betalingsprosessen.",
  },
  {
    id: "levering",
    question: "Hvor lang tid tar leveringen?",
    answer:
      "Vi sender bestillinger innen 1–3 virkedager. Normal leveringstid er 5–10 virkedager, avhengig av leveringsadresse.",
  },
  {
    id: "retur",
    question: "Kan jeg returnere et produkt?",
    answer:
      "Ja, du har 14 dagers angrerett i henhold til norsk lov. Produktet må returneres ubrukt og i originalemballasjen.",
  },
  {
    id: "betaling",
    question: "Hvilke betalingsmetoder godtar dere?",
    answer: "Vi godtar Visa, Mastercard, Klarna og Vipps.",
  },
  {
    id: "frakt",
    question: "Sender dere til hele Norge?",
    answer:
      "Ja, vi sender til alle adresser i Norge. Frakt er gratis og inkludert i prisen – du betaler ikke noe ekstra for levering.",
  },
  {
    id: "kontakt",
    question: "Hvordan kan jeg kontakte kundeservice?",
    answer:
      "Du kan nå oss via kontaktskjemaet på nettsiden, eller sende en e-post til kontakt@helligeord.no.",
  },
  {
    id: "gaver",
    question: "Er produktene egnet som gaver?",
    answer:
      "Absolutt! Alle våre produkter er perfekte som gaver. Vi tilbyr også gavepakking ved forespørsel.",
  },
  {
    id: "gavekort",
    question: "Har dere gavekort?",
    answer:
      "Vi jobber med å tilby gavekort. Følg med på nyhetsbrevet vårt for oppdateringer!",
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

export default function FaqContent() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-6 py-24 text-primary-foreground md:px-12 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-cta/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-3 font-sans text-sm uppercase tracking-widest text-cta"
          >
            Hjelp &amp; støtte
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="font-heading text-4xl font-bold leading-tight md:text-5xl"
          >
            Ofte stilte spørsmål
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="mt-5 font-sans text-base text-primary-foreground/70 md:text-lg"
          >
            Finner du ikke svaret du leter etter? Ta gjerne kontakt med oss.
          </motion.p>
        </div>
      </section>

      {/* Accordion */}
      <section className="bg-background px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-2xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <Accordion className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              {faqItems.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <AccordionItem value={item.id} className="px-6 py-1">
                    <AccordionTrigger className="py-5 text-base font-medium text-foreground hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Still need help */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
            className="mt-12 rounded-2xl border border-border bg-muted px-8 py-8 text-center"
          >
            <p className="mb-1 font-heading text-lg font-bold text-primary">
              Fant du ikke svaret?
            </p>
            <p className="mb-5 font-sans text-sm text-muted-foreground">
              Teamet vårt hjelper deg gjerne!
            </p>
            <a
              href="/kontakt"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-cta px-6 font-sans text-sm font-medium text-cta-foreground transition-colors hover:bg-cta/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              Kontakt oss
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
