import type { Metadata } from "next"
import { HeroSection } from "@/components/home/HeroSection"
import { SocialProofSection } from "@/components/home/SocialProofSection"
import { EmotionalSection } from "@/components/home/EmotionalSection"
import { GiftOccasionsSection } from "@/components/home/GiftOccasionsSection"
import { FeaturedProductSection } from "@/components/home/FeaturedProductSection"
import { StickyMobileCTA } from "@/components/home/StickyMobileCTA"
import { getProducts } from "@/lib/shopify/actions"

export const metadata: Metadata = {
  title: "Hellig Ord – Kristne produkter som gir ro, styrke og trøst",
  description:
    "Oppdag vår populære bibelvers-krukke – et ord fra Gud, akkurat når du trenger det. Norsk nettbutikk med gratis frakt og 30 dagers åpent kjøp.",
  openGraph: {
    title: "Hellig Ord – Kristne produkter som gir ro, styrke og trøst",
    description:
      "Oppdag vår populære bibelvers-krukke – et ord fra Gud, akkurat når du trenger det.",
  },
}

const FEATURED_HANDLES = [
  "bible-verse-jar-ornament",
  "bible-verse-inspiration-jar",
  "bibelvers-krukke",
] as const

export default async function HomePage() {
  const products = await getProducts()
  const featured =
    FEATURED_HANDLES.map((h) => products.find((p) => p.handle === h)).find(
      (p): p is (typeof products)[number] => Boolean(p)
    ) ??
    products[0] ??
    null
  const featuredVariantId = featured?.variants.edges[0]?.node.id ?? null
  const featuredHandle = featured?.handle ?? "bible-verse-jar-ornament"

  return (
    <>
      <HeroSection
        featuredVariantId={featuredVariantId}
        featuredHandle={featuredHandle}
      />
      <SocialProofSection />
      <EmotionalSection />
      <GiftOccasionsSection />
      <FeaturedProductSection />
      <StickyMobileCTA />
    </>
  )
}
