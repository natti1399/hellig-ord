"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

interface ValueCardProps {
  title: string;
  description: string;
  delay: number;
}

function ValueCard({ title, description, delay }: ValueCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={delay}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-8 shadow-sm"
    >
      <span className="font-heading text-xl font-bold text-primary">
        {title}
      </span>
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

const values: ValueCardProps[] = [
  {
    title: "Tro",
    description:
      "Vi tror på kraften i Guds ord og ønsker å dele den med verden.",
    delay: 0,
  },
  {
    title: "Kvalitet",
    description: "Hvert produkt er nøye utvalgt og laget med omtanke.",
    delay: 0.1,
  },
  {
    title: "Kjærlighet",
    description:
      "Alt vi gjør er drevet av kjærlighet til Gud og medmennesker.",
    delay: 0.2,
  },
];

export default function OmOssContent() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-6 py-28 text-primary-foreground md:px-12 md:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cta/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-warm/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-4 font-sans text-sm uppercase tracking-widest text-cta"
          >
            Vår historie
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
          >
            Om Hellig Ord
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
            className="mb-6 font-heading text-2xl font-bold text-primary md:text-3xl"
          >
            Vår historie
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0.1}
            className="font-sans text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Hellig Ord ble født ut av et ønske om å gjøre Guds ord tilgjengelig
            for alle. Vi tror at bibelens visdom har kraft til å forandre liv,
            og at vakre produkter kan bære dette budskapet videre.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-muted px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-16">
            <div
              aria-hidden="true"
              className="hidden h-px w-16 bg-cta md:mt-3 md:block md:h-auto md:w-px md:shrink-0 md:self-stretch"
            />
            <div className="text-center md:text-left">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={0}
                className="mb-5 font-heading text-2xl font-bold text-primary md:text-3xl"
              >
                Vår misjon
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={0.1}
                className="font-sans text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                Vår misjon er å inspirere tro, håp og kjærlighet gjennom nøye
                utvalgte produkter som minner oss om Guds kjærlighet i
                hverdagen.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
            className="mb-12 text-center font-heading text-2xl font-bold text-primary md:text-3xl"
          >
            Våre verdier
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <ValueCard key={v.title} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* Bible verse */}
      <section className="bg-primary px-6 py-20 text-primary-foreground md:px-12 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
          >
            <p className="mb-4 font-heading text-2xl font-bold italic leading-snug md:text-3xl">
              &ldquo;La alt dere gjør, skje i kjærlighet.&rdquo;
            </p>
            <cite className="font-sans text-sm not-italic text-cta">
              1. Korinterbrev 16:14
            </cite>
          </motion.blockquote>
        </div>
      </section>
    </div>
  );
}
