"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MailIcon, PhoneIcon, ClockIcon, CheckCircleIcon } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

interface ContactInfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  delay: number;
}

function ContactInfoCard({
  icon,
  label,
  value,
  href,
  delay,
}: ContactInfoCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={delay}
      className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {href ? (
          <a
            href={href}
            className="font-sans text-sm font-medium text-foreground underline-offset-2 hover:underline"
          >
            {value}
          </a>
        ) : (
          <span className="font-sans text-sm font-medium text-foreground">
            {value}
          </span>
        )}
      </div>
    </motion.div>
  );
}

interface FormState {
  navn: string;
  epost: string;
  emne: string;
  melding: string;
}

const initialForm: FormState = { navn: "", epost: "", emne: "", melding: "" };

export default function KontaktContent() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm(initialForm);
    }, 900);
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-6 py-24 text-primary-foreground md:px-12 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-cta/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-warm/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-3 font-sans text-sm uppercase tracking-widest text-cta"
          >
            Vi er her for deg
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="font-heading text-4xl font-bold leading-tight md:text-5xl"
          >
            Kontakt oss
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="mt-4 font-sans text-base text-primary-foreground/70 md:text-lg"
          >
            Har du spørsmål? Vi hjelper deg gjerne!
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-background px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_auto] lg:items-start">
          {/* Contact form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
          >
            <h2 className="mb-6 font-heading text-2xl font-bold text-primary">
              Send oss en melding
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted px-8 py-14 text-center">
                <CheckCircleIcon
                  className="size-12 text-cta"
                  aria-hidden="true"
                />
                <p className="font-heading text-xl font-bold text-primary">
                  Takk for din henvendelse!
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  Vi svarer deg så snart som mulig, vanligvis innen én virkedag.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 font-sans text-sm text-cta underline underline-offset-2 hover:no-underline"
                >
                  Send en ny melding
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="navn"
                      className="font-sans text-sm font-medium text-foreground"
                    >
                      Navn
                    </label>
                    <Input
                      id="navn"
                      name="navn"
                      type="text"
                      placeholder="Ditt fulle navn"
                      value={form.navn}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="h-11"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="epost"
                      className="font-sans text-sm font-medium text-foreground"
                    >
                      E-post
                    </label>
                    <Input
                      id="epost"
                      name="epost"
                      type="email"
                      placeholder="din@epost.no"
                      value={form.epost}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="emne"
                    className="font-sans text-sm font-medium text-foreground"
                  >
                    Emne
                  </label>
                  <Input
                    id="emne"
                    name="emne"
                    type="text"
                    placeholder="Hva gjelder henvendelsen?"
                    value={form.emne}
                    onChange={handleChange}
                    required
                    className="h-10"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="melding"
                    className="font-sans text-sm font-medium text-foreground"
                  >
                    Melding
                  </label>
                  <Textarea
                    id="melding"
                    name="melding"
                    placeholder="Skriv din melding her..."
                    value={form.melding}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="min-h-[140px] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="mt-1 w-full bg-cta text-cta-foreground hover:bg-cta/80 sm:w-auto sm:self-start"
                >
                  {loading ? "Sender\u2026" : "Send melding"}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <div className="flex flex-col gap-4 lg:w-72">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={0}
              className="font-heading text-2xl font-bold text-primary"
            >
              Kontaktinformasjon
            </motion.h2>

            <ContactInfoCard
              icon={<MailIcon className="size-5" aria-hidden="true" />}
              label="E-post"
              value="kontakt@helligeord.no"
              href="mailto:kontakt@helligeord.no"
              delay={0.05}
            />
            <ContactInfoCard
              icon={<PhoneIcon className="size-5" aria-hidden="true" />}
              label="Telefon"
              value="+47 XXX XX XXX"
              href="tel:+47XXXXXXXXX"
              delay={0.1}
            />
            <ContactInfoCard
              icon={<ClockIcon className="size-5" aria-hidden="true" />}
              label="Åpningstider"
              value="Man\u2013Fre 09:00\u201317:00"
              delay={0.15}
            />
          </div>
        </div>
      </section>

      {/* Bible verse */}
      <section className="bg-muted px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
          >
            <p className="mb-4 font-heading text-2xl font-bold italic leading-snug text-primary md:text-3xl">
              &ldquo;Be, så skal dere få. Let, så skal dere finne.
              Bank på, så skal det lukkes opp for dere.&rdquo;
            </p>
            <cite className="font-sans text-sm not-italic text-warm">
              Matteus 7:7
            </cite>
          </motion.blockquote>
        </div>
      </section>
    </div>
  );
}
