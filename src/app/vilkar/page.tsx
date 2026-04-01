import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Vilkår og betingelser",
  description:
    "Les vilkårene og betingelsene som gjelder for kjøp i Hellig Ord nettbutikk, inkludert angrerett, betaling og levering.",
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

export default function VilkarPage() {
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
              Vilkår og betingelser
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
              Disse vilkårene gjelder for alle kjøp foretatt i Hellig Ord
              nettbutikk på helligeord.no. Les dem nøye før du gjennomfører
              en bestilling.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Sist oppdatert: 30. mars 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
          <PolicySection id="generelt" heading="1. Generelt og omfang">
            <p>
              Disse vilkårene og betingelsene regulerer ditt kjøp av varer fra
              Hellig Ord, tilgjengelig på helligeord.no. Ved å gjennomføre en
              bestilling aksepterer du disse vilkårene i sin helhet.
            </p>
            <p>
              Hellig Ord selger kristne produkter, inkludert dekorasjoner,
              gavevarer og andre artikler med kristen tematikk. Vi forbeholder
              oss retten til å endre disse vilkårene uten forhåndsvarsel.
              Endringer trer i kraft fra det tidspunktet de publiseres på
              nettstedet. Kjøp gjennomført før endringen er regulert av
              vilkårene som gjaldt på kjøpstidspunktet.
            </p>
            <p>
              Disse vilkårene er utarbeidet i samsvar med norsk lov, herunder
              kjøpsloven, forbrukerkjøpsloven og angrerettloven.
            </p>
            <div className="rounded-lg border border-border bg-muted/40 px-5 py-4 space-y-1 text-[0.9375rem]">
              <p className="font-semibold text-foreground mb-2">Selgerinformasjon</p>
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
            id="bestilling"
            heading="2. Bestilling og avtaleinngåelse"
          >
            <p>
              En bindende avtale inngås når du mottar en ordrebekreftelse fra
              oss på e-post. Ordrebekreftelsen sendes automatisk etter at
              bestillingen er gjennomført og betaling er godkjent.
            </p>
            <p>
              Du kan kansellere bestillingen kostnadsfritt så lenge varen ikke
              er sendt. Ønsker du å kansellere, kontakt oss snarest på{" "}
              <a
                href="mailto:kundeservice@helligeord.no"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                kundeservice@helligeord.no
              </a>{" "}
              med ditt ordrenummer.
            </p>
            <p>
              Vi forbeholder oss retten til å avvise eller annullere en
              bestilling dersom:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>Varen er utsolgt eller ikke lenger tilgjengelig.</li>
              <li>
                Det har forekommet åpenbare feil i produktinformasjon eller pris.
              </li>
              <li>Betalingen ikke lar seg gjennomføre.</li>
              <li>
                Vi har grunn til å mistenke svindel eller misbruk av tjenesten.
              </li>
            </ul>
            <p>
              Du er ansvarlig for at opplysningene du oppgir ved bestilling er
              korrekte, inkludert leveringsadresse og kontaktinformasjon. Hellig
              Ord kan ikke holdes ansvarlig for forsinkelser eller feillevering
              som skyldes feil i opplysningene du har oppgitt.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="priser-betaling" heading="3. Priser og betaling">
            <p>
              Alle priser på helligeord.no er oppgitt i norske kroner (NOK) og
              inkluderer merverdiavgift (MVA). Fraktkostnader kommer i tillegg
              og vises tydelig i kassen før du bekrefter bestillingen.
            </p>
            <p>
              Vi aksepterer følgende betalingsmetoder:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>Bankkort (Visa og Mastercard)</li>
              <li>Vipps</li>
              <li>Klarna (delbetaling og faktura)</li>
              <li>Apple Pay og Google Pay</li>
            </ul>
            <p>
              Beløpet trekkes når bestillingen bekreftes og betaling er godkjent.
              Ved Klarna faktura trekkes beløpet iht. Klarnas vilkår, som presenteres
              og aksepteres separat under betalingsprosessen.
            </p>
            <p>
              Betalingen behandles av godkjente betalingstjenesteleverandører.
              All betalingsinformasjon er kryptert og behandles sikkert. Hellig
              Ord lagrer ikke kortinformasjon.
            </p>
            <p>
              Hellig Ord forbeholder seg retten til å korrigere prisene dersom
              det forekommer åpenbare feil, eksempelvis tastefeil. Dersom du har
              betalt feil pris, vil vi kontakte deg før vi gjennomfører
              bestillingen.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="levering" heading="4. Levering">
            <p>
              Vi leverer til adresser i Norge. For informasjon om leveringstider
              og fraktkostnader, se vår{" "}
              <Link
                href="/frakt-og-retur"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                Frakt og retur
              </Link>
              -side.
            </p>
            <p>
              Leveringstiden er estimert og kan variere avhengig av
              frakttjenestens kapasitet og ditt sted i landet. Hellig Ord er
              ikke ansvarlig for forsinkelser som skyldes frakttjenesten eller
              forhold utenfor vår kontroll.
            </p>
            <p>
              Du vil motta en e-post med sporingsinformasjon når bestillingen
              din er sendt. Dersom pakken ikke leveres innen rimelig tid, ber
              vi deg kontakte vår kundeservice.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="angrerett" heading="5. Angrerett">
            <p>
              I henhold til{" "}
              <strong className="font-semibold text-foreground">
                angrerettloven
              </strong>{" "}
              har du som forbruker rett til å angre kjøpet ditt innen{" "}
              <strong className="font-semibold text-foreground">
                14 dager
              </strong>{" "}
              etter at du har mottatt varen, uten å oppgi noen grunn.
            </p>
            <p>
              Angrefristen begynner å løpe fra den dagen du mottar varen. For
              å benytte deg av angreretten, må du informere oss om din
              beslutning innen angrefristen utløper. Dette gjøres ved å sende
              en e-post til{" "}
              <a
                href="mailto:retur@helligeord.no"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                retur@helligeord.no
              </a>{" "}
              med ditt ordrenummer og en klar beskjed om at du ønsker å benytte
              angreretten.
            </p>
            <p>
              Varen må returneres i ubrukt stand og i originalemballasjen.
              Returadressen oppgis i returbekreftelsen du mottar på e-post fra{" "}
              <a
                href="mailto:kundeservice@helligeord.no"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                kundeservice@helligeord.no
              </a>
              . Returfraktkostnadene bæres av kunden, med mindre varen er
              mangelfull eller feilsendt.
            </p>
            <p>
              Angreretten gjelder ikke for varer som er spesialtilpasset eller
              tilvirket etter din spesifikasjon, eller for forseglede produkter
              som av hensyn til helse eller hygiene ikke er egnet for retur
              etter at forseglingen er brutt.
            </p>
            <p>
              Refusjon behandles innen{" "}
              <strong className="font-semibold text-foreground">14 virkedager</strong>{" "}
              etter at vi har mottatt varen i retur.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="reklamasjon" heading="6. Reklamasjon og mangler">
            <p>
              Dersom varen du har mottatt er mangelfull, skadet under transport
              eller avviker vesentlig fra beskrivelsen, har du rett til å
              reklamere. Reklamasjon må fremsettes innen rimelig tid etter at
              du oppdaget eller burde ha oppdaget feilen.
            </p>
            <p>
              I henhold til forbrukerkjøpsloven har du reklamasjonsrett i{" "}
              <strong className="font-semibold text-foreground">to år</strong>{" "}
              fra kjøpsdatoen. For varer med forventet levetid på mer enn to
              år, gjelder en reklamasjonsfrist på fem år.
            </p>
            <p>
              Ved reklamasjon ber vi deg kontakte vår kundeservice på{" "}
              <a
                href="mailto:kundeservice@helligeord.no"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                kundeservice@helligeord.no
              </a>{" "}
              med ordrenummer, beskrivelse av feilen og vedlagte bilder dersom
              det er mulig. Vi vil forsøke å løse saken raskt, enten ved
              reparasjon, ombytting eller refusjon.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="personvern" heading="7. Personvern">
            <p>
              Hellig Ord behandler dine personopplysninger i samsvar med
              gjeldende personvernlovgivning. For fullstendig informasjon om
              hvordan vi samler inn, bruker og beskytter dine personopplysninger,
              se vår{" "}
              <Link
                href="/personvern"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                personvernerklæring
              </Link>
              .
            </p>
          </PolicySection>

          <Separator />

          <PolicySection
            id="ansvarsbegrensning"
            heading="8. Ansvarsbegrensning"
          >
            <p>
              Hellig Ord er ikke ansvarlig for indirekte tap, tapte inntekter
              eller følgeskader som oppstår i forbindelse med bruk av
              nettstedet eller kjøp av produkter, utover det som følger av
              ufravikelig forbrukerlovgivning.
            </p>
            <p>
              Vi gjør vårt beste for å sikre at produktbeskrivelser, bilder og
              priser er korrekte. Farge- og materialavvik mellom produktbilder
              og den faktiske varen kan forekomme grunnet forskjeller i
              skjerminnstillinger og lysforhold. Slike avvik gir ikke rett til
              reklamasjon med mindre de er vesentlige.
            </p>
            <p>
              Hellig Ord kan ikke holdes ansvarlig for tekniske feil, midlertidig
              utilgjengelighet av nettstedet eller tap av data som skyldes
              forhold utenfor vår kontroll.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="lovvalg" heading="9. Lovvalg og tvisteløsning">
            <p>
              Disse vilkårene er underlagt norsk rett. Eventuelle tvister søkes
              løst i minnelighet. Dersom dette ikke fører frem, kan saken bringes
              inn for{" "}
              <a
                href="https://www.forbrukerradet.no"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                Forbrukerrådet
              </a>{" "}
              (www.forbrukerradet.no) for mekling, eller du kan benytte EUs
              klageportal for netthandel:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Saken kan også bringes inn for de alminnelige domstoler i henhold
              til tvistelovens regler.
            </p>
          </PolicySection>

          <Separator />

          <PolicySection id="kontakt-vilkar" heading="10. Kontakt">
            <p>
              Har du spørsmål om disse vilkårene, er du velkommen til å ta
              kontakt med oss:
            </p>
            <address className="not-italic space-y-1 mt-2">
              <p className="font-semibold text-foreground">Hellig Ord</p>
              <p>
                E-post:{" "}
                <a
                  href="mailto:kundeservice@helligeord.no"
                  className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors duration-150"
                >
                  kundeservice@helligeord.no
                </a>
              </p>
              <p>Nettsted: helligeord.no</p>
            </address>
          </PolicySection>
        </div>
      </main>

      <Footer />
    </div>
  )
}
