import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Frakt og retur",
  description:
    "Informasjon om fraktalternativer, leveringstider, returprosedyre og refusjon hos Hellig Ord.",
}

interface PolicySectionProps {
  id: string
  heading: string
  children: React.ReactNode
}

function PolicySection({ id, heading, children }: PolicySectionProps) {
  return (
    <section aria-labelledby={id}>
      <h2
        id={id}
        className="font-heading text-xl font-bold text-primary mb-4 leading-snug"
      >
        {heading}
      </h2>
      <div className="text-foreground/80 leading-[1.85] space-y-3 text-[0.9375rem]">
        {children}
      </div>
    </section>
  )
}

interface InfoCardProps {
  label: string
  value: string
}

function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border bg-card px-5 py-4">
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
        {label}
      </span>
      <span className="font-heading text-lg font-bold text-primary leading-tight">
        {value}
      </span>
    </div>
  )
}

export default function FraktOgReturPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1 bg-background" id="main-content">
        {/* Page header */}
        <div className="bg-primary/5 border-b border-border/50">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
              Kundeservice
            </p>
            <h1 className="font-heading text-4xl font-bold text-primary leading-tight">
              Frakt og retur
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
              Alt du trenger å vite om levering, frakt og returprosedyren hos
              Hellig Ord.
            </p>
          </div>
        </div>

        {/* Quick summary cards */}
        <div className="border-b border-border/50 bg-muted/40">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <InfoCard label="Leveringstid" value="5–10 virkedager" />
              <InfoCard label="Standardfrakt" value="79 kr" />
              <InfoCard label="Gratis frakt" value="Over 499 kr" />
              <InfoCard label="Angrerett" value="14 dager" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
          <PolicySection id="fraktinformasjon" heading="1. Fraktinformasjon">
            <p>
              Vi sender alle bestillinger fra vårt lager med pålitelige
              frakttjenester. Pakken vil bli sendt til adressen du oppgir ved
              bestilling.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Leveringstid:
              </strong>{" "}
              Forventet leveringstid er{" "}
              <strong className="font-semibold text-foreground">
                5–10 virkedager
              </strong>{" "}
              etter at bestillingen er bekreftet og betaling er godkjent.
              Leveringstiden kan variere avhengig av din posisjon i landet og
              frakttjenestens kapasitet.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Fraktkostnader:
              </strong>
            </p>
            <ul className="list-disc list-inside space-y-2 pl-1">
              <li>
                <strong className="font-semibold text-foreground">
                  Gratis frakt
                </strong>{" "}
                ved bestillinger over{" "}
                <strong className="font-semibold text-foreground">499 kr</strong>.
              </li>
              <li>
                <strong className="font-semibold text-foreground">79 kr</strong>{" "}
                for standardfrakt ved bestillinger under 499 kr.
              </li>
            </ul>
            <p>
              Alle priser er oppgitt inkludert MVA.
            </p>
            <p>
              Du vil motta en e-postbekreftelse med sporingsnummer når
              bestillingen din er sendt. Bruk sporingsnummeret for å følge
              pakken din frem til levering.
            </p>
            <p>
              Hellig Ord er ikke ansvarlig for forsinkelser som skyldes
              frakttjenesten, ekstraordinære situasjoner eller offentlige
              helligdager.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="internasjonal" heading="2. Internasjonal frakt">
            <p>
              Per i dag tilbyr vi dessverre{" "}
              <strong className="font-semibold text-foreground">
                ikke internasjonal frakt
              </strong>
              . Vi leverer kun til adresser i Norge.
            </p>
            <p>
              Vi jobber med å utvide våre leveringsmuligheter, og håper å
              kunne tilby internasjonal frakt i fremtiden. Hold deg oppdatert
              ved å abonnere på{" "}
              <Link
                href="/nyhetsbrev"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                nyhetsbrevet vårt
              </Link>
              .
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="returpolicy" heading="3. Returpolicy">
            <p>
              Vi ønsker at du skal være helt fornøyd med kjøpet ditt. Dersom
              du av en eller annen grunn ikke er fornøyd, har du rett til å
              returnere varen i henhold til{" "}
              <strong className="font-semibold text-foreground">
                angrerettloven
              </strong>
              .
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Angrefristen er 14 dager
              </strong>{" "}
              fra den dagen du mottar varen. For å benytte deg av angreretten
              må du informere oss innen fristen utløper.
            </p>
            <p>
              For at vi skal kunne godkjenne returen, må følgende betingelser
              være oppfylt:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>
                Varen er{" "}
                <strong className="font-semibold text-foreground">
                  ubrukt og i sin originale stand
                </strong>
                .
              </li>
              <li>
                Varen er pakket i{" "}
                <strong className="font-semibold text-foreground">
                  originalemballasjen
                </strong>
                .
              </li>
              <li>
                Alle medfølgende tilbehør, etiketter og dokumenter er inkludert.
              </li>
            </ul>
            <p>
              Vi kan ikke akseptere retur av varer som er brukt, skadet av
              kunden, eller som mangler originalemballasje. Spesialtilpassede
              eller personaliserte produkter kan heller ikke returneres med
              mindre de er mangelfulle.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Varer som ikke kan returneres:
              </strong>{" "}
              Forseglede produkter der forseglingen er brutt, og varer som er
              tilvirket eller tilpasset etter din spesifikasjon, kan ikke
              returneres i henhold til angrerettloven § 22, med mindre varen
              har en mangel.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="slik-returnerer" heading="4. Slik returnerer du">
            <p>
              Følg disse stegene for å gjennomføre en retur:
            </p>
            <ol className="list-decimal list-inside space-y-3 pl-1">
              <li>
                <strong className="font-semibold text-foreground">
                  Kontakt kundeservice
                </strong>{" "}
                via e-post til{" "}
                <a
                  href="mailto:retur@helligeord.no"
                  className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
                >
                  retur@helligeord.no
                </a>{" "}
                innen 14 dager etter mottak av varen. Oppgi ordrenummeret ditt
                og beskriv årsaken til returen.
              </li>
              <li>
                <strong className="font-semibold text-foreground">
                  Motta returinstruksjoner
                </strong>{" "}
                — vi vil svare deg innen 2 virkedager med en returgodkjenning.
                Du vil motta returadressen i en egen e-post fra{" "}
                <a
                  href="mailto:kundeservice@helligeord.no"
                  className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
                >
                  kundeservice@helligeord.no
                </a>{" "}
                etter at du har meldt inn returen.
              </li>
              <li>
                <strong className="font-semibold text-foreground">
                  Pakk varen forsvarlig
                </strong>{" "}
                i originalemballasjen. Merk pakken tydelig med ordrenummeret.
              </li>
              <li>
                <strong className="font-semibold text-foreground">
                  Send pakken
                </strong>{" "}
                til returadressen vi har oppgitt. Du er ansvarlig for pakken
                under transport, så vi anbefaler å bruke en sporbar
                frakttjeneste.
              </li>
            </ol>
            <p>
              <strong className="font-semibold text-foreground">
                Returfraktkostnader
              </strong>{" "}
              bæres av kunden, med mindre returen skyldes en feil fra vår side
              (feilsendt vare, mangelfull vare eller skade under transport fra
              oss).
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="skadet-vare" heading="5. Skadet vare ved levering">
            <p>
              Dersom varen er skadet ved levering, ta kontakt med oss innen{" "}
              <strong className="font-semibold text-foreground">48 timer</strong>{" "}
              etter at du mottok pakken. Send en e-post til{" "}
              <a
                href="mailto:kundeservice@helligeord.no"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                kundeservice@helligeord.no
              </a>{" "}
              med ditt ordrenummer og bilder av skaden på varen og emballasjen.
            </p>
            <p>
              Vi vil da vurdere saken og tilby ombytting, reparasjon eller
              refusjon etter gjeldende regler. Du bærer ikke returfraktkostnadene
              ved skader som oppsto under transport fra oss.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="refusjon" heading="6. Refusjon">
            <p>
              Refusjon behandles innen{" "}
              <strong className="font-semibold text-foreground">
                14 virkedager
              </strong>{" "}
              etter at vi har mottatt og kontrollert den returnerte varen.
            </p>
            <p>
              Refusjonen vil bli utbetalt til samme betalingsmetode som ble
              brukt ved kjøpet. Behandlingstiden hos din bank eller
              betalingstjeneste kan variere.
            </p>
            <p>
              Opprinnelige fraktkostnader refunderes dersom du benytter
              angreretten og hele bestillingen returneres. Dersom du kun
              returnerer deler av en bestilling, refunderes ikke frakt.
            </p>
            <p>
              Dersom varen er skadet eller brukt, forbeholder vi oss retten
              til å trekke fra en rimelig kompensasjon for verdiforringelse
              før refusjon utbetales.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="kontakt-frakt" heading="7. Kontakt oss">
            <p>
              Har du spørsmål om frakt, levering eller retur? Ikke nøl med å
              ta kontakt med oss:
            </p>
            <address className="not-italic space-y-1 mt-2">
              <p className="font-semibold text-foreground">Hellig Ord — Kundeservice</p>
              <p>
                E-post:{" "}
                <a
                  href="mailto:kundeservice@helligeord.no"
                  className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
                >
                  kundeservice@helligeord.no
                </a>
              </p>
              <p>
                Retur:{" "}
                <a
                  href="mailto:retur@helligeord.no"
                  className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
                >
                  retur@helligeord.no
                </a>
              </p>
            </address>
            <p className="mt-3">
              Vi besvarer henvendelser innen{" "}
              <strong className="font-semibold text-foreground">2 virkedager</strong>.
            </p>
            <p>
              Du kan også lese mer om dine rettigheter som kjøper i vår{" "}
              <Link
                href="/vilkar"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                vilkår og betingelser
              </Link>
              -side.
            </p>
          </PolicySection>
        </div>
      </main>

      <Footer />
    </div>
  )
}
