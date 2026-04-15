import type { Metadata } from "next"
import { HeroSection } from "@/components/home/HeroSection"
import { SocialProofSection } from "@/components/home/SocialProofSection"
import { ProductIntroSection } from "@/components/home/ProductIntroSection"
import { WhatsIncludedSection } from "@/components/home/WhatsIncludedSection"
import { HowItWorksSection } from "@/components/home/HowItWorksSection"
import { GiftOccasionsSection } from "@/components/home/GiftOccasionsSection"
import { EmotionalSection } from "@/components/home/EmotionalSection"
import { FeaturedProductSection } from "@/components/home/FeaturedProductSection"
import { BottomCTASection } from "@/components/home/BottomCTASection"
import { StickyMobileCTA } from "@/components/home/StickyMobileCTA"

export const metadata: Metadata = {
  title: "Hellig Ord – En gave som gir ro, håp og styrke",
  description:
    "Bibelvers-krukken: 60 håndplukkede bibelvers i en vakker glaskrukke. Gratis frakt i hele Norge. Perfekt gave til konfirmasjon, bursdag, jul — eller til deg selv.",
  openGraph: {
    title: "Hellig Ord – En gave som gir ro, håp og styrke",
    description:
      "Trekk et bibelvers når du trenger det mest. Gratis frakt. 30 dagers åpent kjøp.",
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <ProductIntroSection />
      <WhatsIncludedSection />
      <HowItWorksSection />
      <FeaturedProductSection />
      <GiftOccasionsSection />
      <EmotionalSection />
      <BottomCTASection />
      <StickyMobileCTA />
    </>
  )
}
