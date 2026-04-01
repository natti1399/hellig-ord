import type { Metadata } from "next"
import { HeroSection } from "@/components/home/HeroSection"
import { WhatsIncludedSection } from "@/components/home/WhatsIncludedSection"
import { FeaturedProductSection } from "@/components/home/FeaturedProductSection"
import { GiftOccasionsSection } from "@/components/home/GiftOccasionsSection"
import { BibleQuoteSection } from "@/components/home/BibleQuoteSection"
import { AboutSection } from "@/components/home/AboutSection"

export const metadata: Metadata = {
  title: "Hellig Ord – 60 bibelvers for alle livets øyeblikk",
  description:
    "En vakker glaskrukke fylt med 60 håndplukkede bibelvers. Perfekt som gave til konfirmasjon, bursdag, jul — eller til deg selv som daglig inspirasjon.",
  openGraph: {
    title: "Hellig Ord – 60 bibelvers for alle livets øyeblikk",
    description:
      "En vakker glaskrukke fylt med 60 håndplukkede bibelvers. Perfekt gave til alle anledninger.",
  },
}

export default function HomePage() {
  return (
    <>
      {/* Hook: Product-focused hero with direct CTA */}
      <HeroSection />

      {/* Story: What's in the box */}
      <WhatsIncludedSection />

      {/* Offer: Product card with price and buy button */}
      <FeaturedProductSection />

      {/* Emotional anchor */}
      <BibleQuoteSection />

      {/* Who it's for */}
      <GiftOccasionsSection />

      {/* Trust signals */}
      <AboutSection />
    </>
  )
}
