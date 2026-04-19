/**
 * Editorial product copy keyed by Shopify product handle.
 *
 * Source: Lorena's Messenger message Sat 05:49 — her verbatim Norwegian copy
 * for the Bibelvers-krukke. Catalog bullets feed the ProductCard; section copy
 * feeds the 4 collapsible rows on the product detail page.
 */

export interface ProductDescriptionBlock {
  heading?: string
  body?: string
  bullets?: readonly string[]
}

export interface ProductContent {
  /** Short tagline shown under the product name in the catalog card. */
  tagline: string
  /** Longer emotional hook — shown on product detail page under the title. */
  hook: string
  /** 6–7 benefit bullets for the catalog ProductCard. */
  catalogBullets: readonly string[]
  /** Optional "Bestselger" / "Nyhet" badge shown on the catalog card. */
  badge?: string
  /** Rich Beskrivelse section — multiple blocks with headings. */
  description: readonly ProductDescriptionBlock[]
  /** Short Bruksveileder (usage) text. */
  usage: string
  /** Pleie og vedlikehold bullets. */
  care: readonly string[]
  /** Spesifikasjoner bullets. */
  specs: readonly string[]
  /** Disclaimer line shown below specs. */
  specsNote?: string
}

const bibelversKrukke: ProductContent = {
  tagline: "Bibelvers – fargekodede følelser",
  hook: "Når følelsene tar over – finn ro i Guds ord på sekunder",
  badge: "Bestselger",
  catalogBullets: [
    "Gir umiddelbar ro, trøst og oppmuntring",
    "60 fargekodede bibelvers – finn riktig ord for følelsen din",
    "Enkel rutine: trekk et vers og kjenn roen senke seg",
    "Hjelper deg å møte uro, stress og tunge tanker",
    "Stilren glasskrukke – perfekt i hjemmet",
    "En meningsfull gave som faktisk betyr noe",
    "Leveres klar til gave med eske og gavelapp",
  ],
  description: [
    {
      heading: "✨ Finn ro – ett vers av gangen",
      body: "Noen dager blir alt litt for mye. Tankene går i sirkler, og følelsene tar over.\n\nDenne krukken gir deg en enkel vei tilbake til ro.\n\nTrekk ett vers. Les. Pust.\nLa Guds ord møte deg akkurat der du er.",
    },
    {
      heading: "💛 Hvorfor denne er annerledes",
      bullets: [
        "Du slipper å lete – fargekodene leder deg rett til riktig budskap",
        "Skaper en daglig vane som gir indre ro og trygghet",
        "Gjør det enkelt å koble av i en hektisk hverdag",
        "Perfekt både i gode og krevende perioder",
      ],
    },
    {
      heading: "🎁 En gave med mening",
      body: "Ikke alle gaver føles like viktige. Denne gjør det.\n\nPerfekt til:",
      bullets: [
        "Noen som går gjennom en tøff tid",
        "\u201CGod bedring\u201D-gave",
        "Bursdag, jul eller dåp",
        "Eller som en stille påminnelse: du er ikke alene",
      ],
    },
  ],
  usage:
    "Åpne krukken. Velg fargen som passer følelsen din. Trekk ett bibelvers, les i ro og kjenn på Guds ord.",
  care: [
    "Håndteres forsiktig – laget av glass",
    "Oppbevar lappene unna direkte sollys",
    "Unngå bruk med våte eller fuktige hender",
  ],
  specs: [
    "Materiale: Glass",
    "Farge: Gjennomsiktig",
    "Vekt: ca. 120 g",
    "60 fargekodede bibelvers",
    "Gaveeske og gavelapp inkludert",
  ],
  specsNote:
    "Små måleavvik kan forekomme. Farger kan variere noe etter skjerm og lysforhold.",
}

const bibelversBokmerke: ProductContent = {
  tagline: "Bibelvers – bokmerke i legering",
  hook: "Et elegant bokmerke som holder på siden din – og hjelper deg tilbake til ordet.",
  catalogBullets: [
    "Bokmerke som merker siden du er kommet til",
    "Elegant og tidløst design",
    "Inspirerende bibelvers gir mening i hverdagen",
    "Slitesterkt materiale med lang levetid",
    "Lett og skånsomt mot boksider",
    "Perfekt gave til familie, venner og menighet",
    "Kombinerer funksjon og tro på en vakker måte",
  ],
  description: [
    {
      heading: "Et bokmerke med sjel",
      body: "Hold plassen din med stil med vårt elegante Family Bible Verse bokmerke i legering. Dette vakre bokmerket er laget av slitesterk metall-legering med en glatt og eksklusiv finish som passer perfekt til både Bibelen og andre bøker.\n\nMed et inspirerende bibelvers inngravert, fungerer bokmerket som en daglig påminnelse om tro, håp og familieverdier. Det er ikke bare praktisk – det gir også en dypere mening til lesestunden din.",
    },
    {
      heading: "🎁 En gjennomtenkt gave",
      body: "Perfekt som en personlig detalj eller en gjennomtenkt gave til noen du er glad i.",
    },
  ],
  usage:
    "Plasser bokmerket mellom sidene der du ønsker å markere. La det hvile lett uten å presse, for å unngå merker i papiret. Ta det enkelt ut når du fortsetter lesingen. Perfekt for daglig bruk – både hjemme, i kirken eller på farten.",
  care: [
    "Tørk av med en myk, tørr klut ved behov",
    "Unngå kontakt med vann og kjemikalier for å bevare finishen",
    "Oppbevares tørt når det ikke er i bruk",
    "Unngå bøying for å bevare formen",
  ],
  specs: [
    "Materiale: Høykvalitets metall-legering",
    "Overflate: Polert og slitesterk finish",
    "Design: Inngravert bibelvers",
    "Størrelse: Slankt og lett design",
    "Vekt: Lett – skader ikke sider",
    "Bruksområde: Passer til Bibel, bøker, notatbøker og dagbøker",
  ],
}

/**
 * Lookup table keyed by Shopify product handle. Add new products here.
 * Handle values match the Shopify storefront handle exactly.
 */
export const productContentByHandle: Readonly<Record<string, ProductContent>> = {
  "bible-verse-inspiration-jar": bibelversKrukke,
  // Norwegian handle variant (fallback)
  "bibelvers-krukke": bibelversKrukke,
  "family-bible-verse-alloy-bookmark": bibelversBokmerke,
}

export function getProductContent(handle: string): ProductContent | null {
  return productContentByHandle[handle] ?? null
}
