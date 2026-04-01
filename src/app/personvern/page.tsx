import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Personvernerklæring",
  description:
    "Les om hvordan Hellig Ord samler inn, bruker og beskytter dine personopplysninger i henhold til GDPR.",
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

export default function PersonvernPage() {
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
              Personvernerklæring
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
              Denne erklæringen forklarer hvordan vi håndterer dine
              personopplysninger når du bruker helligeord.no.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Sist oppdatert: 30. mars 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
          <PolicySection id="hvem-vi-er" heading="1. Hvem vi er">
            <p>
              Hellig Ord er en norsk nettbutikk som selger kristne produkter,
              inkludert dekorasjoner med bibelvers, gavekort og andre religiøse
              artikler. Nettstedet vårt er tilgjengelig på{" "}
              <a
                href="https://helligeord.no"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                helligeord.no
              </a>
              .
            </p>
            <p>
              Hellig Ord er behandlingsansvarlig for personopplysningene du oppgir
              når du handler hos oss eller kontakter oss. Vi er forpliktet til å
              behandle dine personopplysninger i samsvar med personopplysningsloven
              og EUs personvernforordning (GDPR).
            </p>
            <div className="rounded-lg border border-border bg-muted/40 px-5 py-4 space-y-1 text-[0.9375rem]">
              <p className="font-semibold text-foreground mb-2">Virksomhetsinformasjon</p>
              <p><span className="font-medium text-foreground">Handelsnavn:</span> Hellig Ord</p>
              <p><span className="font-medium text-foreground">Organisasjonsnummer:</span> 936 635 261</p>
              <p><span className="font-medium text-foreground">Forretningsadresse:</span> Hoveveien 12, 4306 Sandnes</p>
              <p><span className="font-medium text-foreground">Telefon:</span> +47 998 69 641</p>
              <p>
                <span className="font-medium text-foreground">E-post:</span>{" "}
                <span className="text-muted-foreground italic">
                  [E-postadresse opprettes]
                </span>
              </p>
            </div>
          </PolicySection>

          <Separator />

          <PolicySection
            id="hvilke-opplysninger"
            heading="2. Hvilke personopplysninger vi samler inn"
          >
            <p>
              Vi samler inn opplysninger du gir oss direkte, samt opplysninger
              som genereres automatisk når du bruker nettstedet vårt.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Opplysninger du gir oss:
              </strong>
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>Navn og etternavn</li>
              <li>E-postadresse</li>
              <li>Leveringsadresse og faktureringsadresse</li>
              <li>Telefonnummer</li>
              <li>Betalingsinformasjon (behandles av betalingstjeneste, ikke lagret av oss)</li>
              <li>Meldinger du sender til vår kundeservice</li>
              <li>Nyhetsbrev-preferanser</li>
            </ul>
            <p>
              <strong className="font-semibold text-foreground">
                Opplysninger som samles inn automatisk:
              </strong>
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>IP-adresse</li>
              <li>Nettlesertype og -versjon</li>
              <li>Enhetstype og operativsystem</li>
              <li>Sider du besøker og lenker du klikker på</li>
              <li>Tidspunkt og varighet for besøk</li>
            </ul>
          </PolicySection>

          <Separator />

          <PolicySection
            id="hvorfor-samler-vi-inn"
            heading="3. Hvorfor vi samler inn personopplysninger"
          >
            <p>Vi behandler dine personopplysninger for følgende formål:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>
                <strong className="font-semibold text-foreground">Gjennomføring av kjøp:</strong>{" "}
                Behandling av bestillinger, betaling og levering.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Kundeservice:</strong>{" "}
                Besvare henvendelser, håndtere reklamasjoner og returer.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Nyhetsbrev:</strong>{" "}
                Sende deg tilbud og informasjon dersom du har samtykket til dette.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Forbedring av tjenester:</strong>{" "}
                Analysere bruk av nettstedet for å forbedre brukeropplevelsen.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Juridiske forpliktelser:</strong>{" "}
                Oppfylle bokføringskrav og andre lovpålagte plikter.
              </li>
            </ul>
          </PolicySection>

          <Separator />

          <PolicySection
            id="hvordan-bruker-vi"
            heading="4. Rettslig grunnlag for behandling"
          >
            <p>
              Behandlingen av dine personopplysninger er basert på ett av følgende
              rettslige grunnlag:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>
                <strong className="font-semibold text-foreground">Avtale (GDPR art. 6 nr. 1 b):</strong>{" "}
                Behandling som er nødvendig for å gjennomføre et kjøp eller en tjeneste.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Samtykke (GDPR art. 6 nr. 1 a):</strong>{" "}
                For eksempel abonnement på nyhetsbrev eller aksept av
                informasjonskapsler.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Rettslig forpliktelse (GDPR art. 6 nr. 1 c):</strong>{" "}
                Bokføring og andre lovpålagte krav.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Berettiget interesse (GDPR art. 6 nr. 1 f):</strong>{" "}
                Forbedring av nettstedet og forebygging av misbruk.
              </li>
            </ul>
          </PolicySection>

          <Separator />

          <PolicySection
            id="informasjonskapsler"
            heading="5. Informasjonskapsler (cookies)"
          >
            <p>
              Vi bruker informasjonskapsler for å forbedre funksjonaliteten på
              nettstedet og for å forstå hvordan besøkende bruker siden vår.
              Informasjonskapsler er små tekstfiler som lagres i nettleseren din.
            </p>
            <p>
              Når du besøker nettstedet for første gang, vil du bli bedt om å
              samtykke til bruk av ikke-nødvendige informasjonskapsler gjennom vår
              cookie-banner. Du kan når som helst trekke tilbake eller endre ditt
              samtykke via lenken &laquo;Administrer informasjonskapsler&raquo; i
              bunnteksten.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Vi bruker følgende informasjonskapsler:
              </strong>
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>
                <strong className="font-semibold text-foreground">Nødvendige informasjonskapsler (Shopify):</strong>{" "}
                Kreves for at nettstedet skal fungere, inkludert handlekurv,
                innlogging og sikker betaling. Disse kan ikke deaktiveres.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Analyseverktøy (Meta Pixel):</strong>{" "}
                Hjelper oss å måle effekten av markedsføring og forstå hvordan
                besøkende finner og bruker nettstedet. Aktiveres kun med ditt
                samtykke.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Preferanser (samtykkevalg):</strong>{" "}
                Lagrer dine valg knyttet til informasjonskapsler slik at du ikke
                blir spurt på nytt ved hvert besøk.
              </li>
            </ul>
            <p>
              Du kan også administrere eller avvise informasjonskapsler i
              nettleserinnstillingene dine. Merk at deaktivering av nødvendige
              informasjonskapsler kan påvirke funksjonaliteten til nettstedet.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection
            id="tredjepart"
            heading="6. Tredjeparts tjenester og dataoverføring"
          >
            <p>
              Vi benytter pålitelige tredjepartsleverandører som behandler
              personopplysninger på vegne av oss. Disse leverandørene er bundet
              av databehandleravtaler og har ikke lov til å bruke opplysningene
              for egne formål.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>
                <strong className="font-semibold text-foreground">Shopify:</strong>{" "}
                E-handelsplattform for drift av nettbutikken. Shopify er sertifisert
                i henhold til internasjonale sikkerhets- og personvernstandarder.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Betalingstjenester:</strong>{" "}
                Betalinger behandles via sikre betalingsportaler (f.eks. Klarna,
                Vipps, Stripe). Vi lagrer aldri kortinformasjon selv.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Frakttjenester:</strong>{" "}
                Leveringsadresse deles med fraktselskaper for å gjennomføre levering.
              </li>
              <li>
                <strong className="font-semibold text-foreground">E-postmarkedsføring:</strong>{" "}
                Nyhetsbrev sendes via godkjente e-postplattformer der du har
                samtykket.
              </li>
            </ul>
            <p>
              <strong className="font-semibold text-foreground">Overføring utenfor EØS:</strong>{" "}
              Shopify Inc. overfører data til servere utenfor EØS. Overføringen
              er sikret gjennom EUs standardkontraktsklausuler (SCCs) i tråd med
              GDPR artikkel 46.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="lagring" heading="7. Lagring og sletting">
            <p>
              Vi lagrer dine personopplysninger kun så lenge det er nødvendig for
              de formålene de ble samlet inn for, eller så lenge lovgivningen krever
              det.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>
                Ordrehistorikk og tilhørende opplysninger oppbevares i minimum{" "}
                <strong className="font-semibold text-foreground">5 år</strong> i
                henhold til bokføringsloven.
              </li>
              <li>
                E-postadresser for nyhetsbrev slettes ved avmelding eller ved
                opphør av samtykke.
              </li>
              <li>
                Brukerkontoer slettes etter forespørsel, med unntak av opplysninger
                vi er lovpålagt å beholde.
              </li>
            </ul>
          </PolicySection>

          <Separator />

          <PolicySection id="dine-rettigheter" heading="8. Dine rettigheter (GDPR)">
            <p>
              I henhold til GDPR har du følgende rettigheter vedrørende dine
              personopplysninger:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-1">
              <li>
                <strong className="font-semibold text-foreground">Innsyn (art. 15):</strong>{" "}
                Du kan be om en kopi av de personopplysningene vi har om deg.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Retting (art. 16):</strong>{" "}
                Du kan be oss om å rette feilaktige eller ufullstendige opplysninger.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Sletting (art. 17):</strong>{" "}
                Du kan be om at vi sletter dine personopplysninger, med de
                begrensningene som følger av loven.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Begrensning (art. 18):</strong>{" "}
                Du kan be om at behandlingen av dine opplysninger begrenses i visse
                situasjoner.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Dataportabilitet (art. 20):</strong>{" "}
                Du kan be om å få utlevert dine opplysninger i et maskinlesbart
                format.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Innsigelse (art. 21):</strong>{" "}
                Du har rett til å protestere mot behandling av dine
                personopplysninger der behandlingsgrunnlaget er berettiget
                interesse (GDPR art. 6 nr. 1 f), herunder profilering basert på
                dette grunnlaget. Du kan også til enhver tid protestere mot
                behandling av dine opplysninger til direkte markedsføring.
                Dersom du fremsetter en innsigelse, vil vi stanse behandlingen
                med mindre vi kan påvise tvingende berettigede grunner som
                går foran dine interesser, rettigheter og friheter.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Tilbaketrekking av samtykke (art. 7):</strong>{" "}
                Der behandlingen er basert på samtykke, kan du når som helst trekke
                dette tilbake uten at det påvirker lovligheten av behandlingen som
                fant sted før tilbaketrekkingen.
              </li>
            </ul>
            <p>
              For å utøve noen av disse rettighetene, ta kontakt med oss på{" "}
              <a
                href="mailto:personvern@helligeord.no"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                personvern@helligeord.no
              </a>
              . Vi vil besvare din henvendelse innen{" "}
              <strong className="font-semibold text-foreground">30 dager</strong>.
            </p>
            <p>
              Dersom du mener vi behandler dine personopplysninger i strid med
              GDPR, har du rett til å klage til{" "}
              <a
                href="https://www.datatilsynet.no"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                Datatilsynet
              </a>
              .
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="sikkerhet" heading="9. Sikkerhet og varsling ved sikkerhetsbrudd">
            <p>
              Vi tar sikkerheten til dine personopplysninger alvorlig og
              gjennomfører tekniske og organisatoriske tiltak for å beskytte dem
              mot uautorisert tilgang, endring, avsløring eller sletting. Alle
              transaksjoner på nettstedet er kryptert med SSL/TLS.
            </p>
            <p>
              Ved brudd på personopplysningssikkerheten vil vi varsle{" "}
              <a
                href="https://www.datatilsynet.no"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                Datatilsynet
              </a>{" "}
              innen 72 timer etter at vi ble kjent med bruddet, i tråd med GDPR
              artikkel 33. Dersom bruddet sannsynligvis vil medføre høy risiko
              for de registrertes rettigheter og friheter, vil vi også varsle de
              berørte personene uten ugrunnet opphold, jf. GDPR artikkel 34.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="kontakt" heading="10. Kontaktinformasjon">
            <p>
              Dersom du har spørsmål om denne personvernerklæringen eller ønsker
              å utøve noen av dine rettigheter, kan du kontakte oss:
            </p>
            <address className="not-italic space-y-1 mt-2">
              <p className="font-semibold text-foreground">Hellig Ord</p>
              <p>
                E-post:{" "}
                <a
                  href="mailto:personvern@helligeord.no"
                  className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
                >
                  personvern@helligeord.no
                </a>
              </p>
              <p>Nettsted: helligeord.no</p>
            </address>
            <p className="mt-3">
              Vi vil besvare din henvendelse innen{" "}
              <strong className="font-semibold text-foreground">30 dager</strong> i
              tråd med GDPR-kravene.
            </p>
          </PolicySection>
        </div>
      </main>

      <Footer />
    </div>
  )
}
