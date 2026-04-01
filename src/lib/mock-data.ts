import type { Product, Collection } from "@/types/product"

export const mockProducts: Product[] = [
  {
    id: "gid://shopify/Product/1",
    title: "Bibelvers-krukke – 60 vers for alle livets øyeblikk",
    description:
      "En vakker keramisk krukke fylt med 60 nøye utvalgte bibelvers — ett for hvert øyeblikk i livet. Trekk et vers om morgenen, la Guds ord ledsage deg gjennom dagen. Et tidløst gaveidé til konfirmasjon, bursdag eller bare fordi.",
    handle: "bibelvers-krukke-60-vers",
    priceRange: {
      minVariantPrice: { amount: "299.00", currencyCode: "NOK" },
      maxVariantPrice: { amount: "299.00", currencyCode: "NOK" },
    },
    images: [
      {
        url: "/images/hero-product.png",
        altText: "Bibelvers-krukke i hvit keramikk med gyldne detaljer",
        width: 800,
        height: 800,
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/101",
        title: "Standard",
        price: { amount: "299.00", currencyCode: "NOK" },
        availableForSale: true,
        selectedOptions: [{ name: "Størrelse", value: "Standard" }],
      },
    ],
    productType: "Dekorasjon",
    tags: ["gave", "bibelvers", "keramikk", "inspirasjon"],
  },
  {
    id: "gid://shopify/Product/2",
    title: "Bibelvers-gaveeske – Luksusutgave",
    description:
      "Luksusutgaven av vår populære bibelvers-gaveeske er nøye pakket med 60 bibelvers på premium kortpapir, en liten dagbok og et bokmerke med Salme 23. Alt presentert i en elegant eske av resirkulert papir. Perfekt til å glede en du er glad i.",
    handle: "bibelvers-gaveeske-luksus",
    priceRange: {
      minVariantPrice: { amount: "499.00", currencyCode: "NOK" },
      maxVariantPrice: { amount: "499.00", currencyCode: "NOK" },
    },
    images: [
      {
        url: "/images/hero-product.png",
        altText: "Luksus gaveeske med bibelvers, dagbok og bokmerke",
        width: 800,
        height: 800,
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/201",
        title: "Standard",
        price: { amount: "499.00", currencyCode: "NOK" },
        availableForSale: true,
        selectedOptions: [{ name: "Størrelse", value: "Standard" }],
      },
    ],
    productType: "Gaveesker",
    tags: ["gave", "luksus", "gaveeske", "bibelvers"],
  },
  {
    id: "gid://shopify/Product/3",
    title: "Korssmykke – Tro, Håp og Kjærlighet",
    description:
      "Et tidløst korssmykke i sterlingsølv med inskripsjonen «Tro, Håp og Kjærlighet» på baksiden. Leveres i en vakker gaveeske med et personlig hilsenkort. Perfekt som gave til dåp, konfirmasjon eller bryllup.",
    handle: "korssmykke-tro-hap-kjaerlighet",
    priceRange: {
      minVariantPrice: { amount: "349.00", currencyCode: "NOK" },
      maxVariantPrice: { amount: "349.00", currencyCode: "NOK" },
    },
    images: [
      {
        url: "/images/hero-product.png",
        altText: "Korssmykke i sterlingsølv med inskripsjonen Tro, Håp og Kjærlighet",
        width: 800,
        height: 800,
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/301",
        title: "Standard",
        price: { amount: "349.00", currencyCode: "NOK" },
        availableForSale: true,
        selectedOptions: [{ name: "Størrelse", value: "Standard" }],
      },
    ],
    productType: "Smykker",
    tags: ["smykke", "kors", "gave", "tro", "håp", "kjærlighet"],
  },
  {
    id: "gid://shopify/Product/4",
    title: "Bønnedagbok – 365 dager med Gud",
    description:
      "Start hvert år tettere med Gud. Denne vakre dagboken gir deg plass til bønner, takknemlighet og refleksjon — én side per dag, med et inspirerende bibelvers øverst. Laget av FSC-sertifisert papir i et format som passer perfekt i håndbagen.",
    handle: "bonnedagbok-365-dager",
    priceRange: {
      minVariantPrice: { amount: "249.00", currencyCode: "NOK" },
      maxVariantPrice: { amount: "249.00", currencyCode: "NOK" },
    },
    images: [
      {
        url: "/images/hero-product.png",
        altText: "Bønnedagbok med linnet omslag og gullpregede detaljer",
        width: 800,
        height: 800,
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/401",
        title: "Standard",
        price: { amount: "249.00", currencyCode: "NOK" },
        availableForSale: true,
        selectedOptions: [{ name: "Størrelse", value: "Standard" }],
      },
    ],
    productType: "Dagbøker",
    tags: ["dagbok", "bønn", "tro", "gave"],
  },
  {
    id: "gid://shopify/Product/5",
    title: "Bibelsk veggkunst – Salme 23",
    description:
      "«Herren er min hyrde, jeg mangler ikke noe.» Salme 23 gjengitt i vakker håndlettering på akvarell-bakgrunn. Trykket på 300g kunstpapir med arkivkvalitet, klar til innramming. Finnes i A4 og A3.",
    handle: "bibelsk-veggkunst-salme-23",
    priceRange: {
      minVariantPrice: { amount: "399.00", currencyCode: "NOK" },
      maxVariantPrice: { amount: "499.00", currencyCode: "NOK" },
    },
    images: [
      {
        url: "/images/hero-product.png",
        altText: "Veggkunst med Salme 23 i håndlettering på akvarell-bakgrunn",
        width: 800,
        height: 800,
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/501",
        title: "A4",
        price: { amount: "399.00", currencyCode: "NOK" },
        availableForSale: true,
        selectedOptions: [{ name: "Størrelse", value: "A4" }],
      },
      {
        id: "gid://shopify/ProductVariant/502",
        title: "A3",
        price: { amount: "499.00", currencyCode: "NOK" },
        availableForSale: true,
        selectedOptions: [{ name: "Størrelse", value: "A3" }],
      },
    ],
    productType: "Veggkunst",
    tags: ["kunst", "salme", "gave", "veggdekor", "bibelvers"],
  },
  {
    id: "gid://shopify/Product/6",
    title: "Kristent armbånd – Guds løfter",
    description:
      "Et vakkert flettet armbånd i ekte skinn med en liten sølvfarget plate gravert med «Guds løfter». Et diskret og meningsfullt smykke som minner deg om troen din gjennom hverdagen. Justerbart for de fleste håndleddsstørrelser.",
    handle: "kristent-armbnd-guds-lofter",
    priceRange: {
      minVariantPrice: { amount: "199.00", currencyCode: "NOK" },
      maxVariantPrice: { amount: "199.00", currencyCode: "NOK" },
    },
    images: [
      {
        url: "/images/hero-product.png",
        altText: "Flettet skinn-armbånd med sølvfarget plate gravert med Guds løfter",
        width: 800,
        height: 800,
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/601",
        title: "Justerbar",
        price: { amount: "199.00", currencyCode: "NOK" },
        availableForSale: true,
        selectedOptions: [{ name: "Størrelse", value: "Justerbar" }],
      },
    ],
    productType: "Smykker",
    tags: ["armbånd", "skinn", "gave", "tro"],
  },
]

export const mockCollection: Collection = {
  id: "gid://shopify/Collection/1",
  title: "Alle produkter",
  description:
    "Utforsk vårt utvalg av vakre kristne gaver — skapt med kjærlighet og omtanke for å berike troen din og glede de du er glad i.",
  handle: "alle-produkter",
  image: null,
  products: mockProducts,
}

export function getProductByHandle(handle: string): Product | undefined {
  return mockProducts.find((p) => p.handle === handle)
}

export function getRelatedProducts(currentHandle: string, limit = 3): Product[] {
  return mockProducts.filter((p) => p.handle !== currentHandle).slice(0, limit)
}

export function formatPrice(amount: string, currencyCode: string): string {
  const num = parseFloat(amount)
  if (currencyCode === "NOK") {
    return `kr ${Math.round(num).toLocaleString("nb-NO")}`
  }
  return `${currencyCode} ${num.toFixed(2)}`
}
