import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Informasjonskapsler (cookies)",
  description:
    "Les om hvilke informasjonskapsler Hellig Ord bruker, hva de er til for, og hvordan du administrerer dem i nettleseren din.",
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

export default function InformasjonskapslerPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1 bg-background" id="main-content">
        {/* Page header */}
        <div className="bg-primary/5 border-b border-border/50">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
              Juridisk informasjon
            </p>
            <h1 className="font-heading text-4xl font-bold text-primary leading-tight">
              Informasjonskapsler (cookies)
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
              Her forklarer vi hva informasjonskapsler er, hvilke vi bruker på
              helligeord.no, og hvordan du kan styre dem selv.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Sist oppdatert: 30. mars 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
          <PolicySection id="hva-er-cookies" heading="1. Hva er informasjonskapsler?">
            <p>
              Informasjonskapsler (på engelsk «cookies») er små tekstfiler som
              lagres i nettleseren din når du besøker et nettsted. De brukes
              til å huske valg du har gjort, holde deg innlogget, og forstå
              hvordan besøkende bruker nettstedet.
            </p>
            <p>
              Informasjonskapsler er ikke skadelige programmer og kan ikke
              gi tilgang til informasjon på datamaskinen din utover det som
              er lagret i selve filen. De fleste nettlesere aksepterer
              informasjonskapsler automatisk, men du kan endre dette i
              nettleserinnstillingene dine.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="hvilke-bruker-vi" heading="2. Informasjonskapsler vi bruker">
            <p>
              Vi bruker tre kategorier informasjonskapsler på helligeord.no:
            </p>

            <div className="rounded-lg border border-border bg-muted/40 px-5 py-5 space-y-5">
              <div>
                <p className="font-semibold text-foreground mb-1">
                  Nødvendige informasjonskapsler (Shopify)
                </p>
                <p>
                  Disse er nødvendige for at nettstedet skal fungere og kan
                  ikke slås av. De settes av Shopify og håndterer grunnleggende
                  funksjoner som:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                  <li>Økt-håndtering (session management)</li>
                  <li>Handlekurv — husker varene du har lagt til</li>
                  <li>Sikker gjennomføring av betaling</li>
                  <li>Beskyttelse mot svindel og uautorisert tilgang</li>
                </ul>
                <p className="mt-2 text-xs text-muted-foreground italic">
                  Rettslig grunnlag: Nødvendig for oppfyllelse av tjenesten
                  (GDPR art.&nbsp;6 nr.&nbsp;1&nbsp;b).
                </p>
              </div>

              <Separator />

              <div>
                <p className="font-semibold text-foreground mb-1">
                  Analyseinformasjonskapsler (Meta Pixel)
                </p>
                <p>
                  Vi bruker Meta Pixel for å måle effekten av markedsføring og
                  forstå anonymt hvordan besøkende bruker nettstedet. Disse
                  kapslene er kun aktive dersom du har gitt ditt samtykke.
                  Dataene er anonymisert og brukes til å:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                  <li>Telle sidevisninger og hendelser (f.eks. kjøp)</li>
                  <li>Forbedre relevansen til annonser vist på Facebook og Instagram</li>
                  <li>Måle konverteringsrate og kampanjeeffekt</li>
                </ul>
                <p className="mt-2 text-xs text-muted-foreground italic">
                  Rettslig grunnlag: Ditt samtykke (GDPR art.&nbsp;6 nr.&nbsp;1&nbsp;a).
                  Du kan trekke samtykket tilbake når som helst.
                </p>
              </div>

              <Separator />

              <div>
                <p className="font-semibold text-foreground mb-1">
                  Preferanseinformasjonskapsler (samtykkevalg)
                </p>
                <p>
                  Disse husker valgene du har gjort i cookie-banneret vårt,
                  slik at du ikke blir spurt på nytt ved hvert besøk. De
                  lagrer kun ett stykke informasjon: hvilke kategorier av
                  informasjonskapsler du har akseptert eller avvist.
                </p>
                <p className="mt-2 text-xs text-muted-foreground italic">
                  Rettslig grunnlag: Berettiget interesse — nødvendig for å
                  overholde ditt samtykkevalg (GDPR art.&nbsp;6 nr.&nbsp;1&nbsp;f).
                </p>
              </div>
            </div>
          </PolicySection>

          <Separator />

          <PolicySection id="administrer" heading="3. Slik administrerer du informasjonskapsler">
            <p>
              Du kan når som helst endre eller trekke tilbake ditt samtykke
              til ikke-nødvendige informasjonskapsler via lenken
              «Administrer informasjonskapsler» i bunnteksten på nettstedet.
            </p>
            <p>
              Du kan også administrere informasjonskapsler direkte i
              nettleseren din. Nedenfor finner du veiledning for de vanligste
              nettleserne:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>
                <strong className="font-semibold text-foreground">Google Chrome:</strong>{" "}
                Innstillinger → Personvern og sikkerhet → Informasjonskapsler
                og andre nettstedsdata
              </li>
              <li>
                <strong className="font-semibold text-foreground">Mozilla Firefox:</strong>{" "}
                Innstillinger → Personvern og sikkerhet → Informasjonskapsler
                og nettstedsdata
              </li>
              <li>
                <strong className="font-semibold text-foreground">Apple Safari:</strong>{" "}
                Innstillinger → Personvern → Blokkér alle informasjonskapsler
              </li>
              <li>
                <strong className="font-semibold text-foreground">Microsoft Edge:</strong>{" "}
                Innstillinger → Informasjonskapsler og nettstedstillatelser →
                Behandle og slett informasjonskapsler
              </li>
            </ul>
            <p>
              Merk at hvis du deaktiverer nødvendige informasjonskapsler, kan
              deler av nettstedet slutte å fungere — blant annet handlekurven
              og betalingssiden.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="mer-info" heading="4. Mer informasjon">
            <p>
              Informasjonskapsler er én del av hvordan vi håndterer dine
              personopplysninger. For fullstendig informasjon om hvilke
              opplysninger vi samler inn, hvorfor vi samler dem inn, og
              rettighetene du har etter GDPR, se vår{" "}
              <Link
                href="/personvern"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                personvernerklæring
              </Link>
              .
            </p>
            <p>
              Har du spørsmål om vår bruk av informasjonskapsler, ta gjerne
              kontakt med oss på{" "}
              <a
                href="mailto:personvern@helligeord.no"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                personvern@helligeord.no
              </a>
              .
            </p>
          </PolicySection>
        </div>
      </main>

      <Footer />
    </div>
  )
}
