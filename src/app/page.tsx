import type { Metadata } from "next"
import { HeroSection } from "@/components/home/HeroSection"
import { SocialProofSection } from "@/components/home/SocialProofSection"
import { GiftOccasionsSection } from "@/components/home/GiftOccasionsSection"
import { EmotionalSection } from "@/components/home/EmotionalSection"
import { BottomCTASection } from "@/components/home/BottomCTASection"
import { StickyMobileCTA } from "@/components/home/StickyMobileCTA"

export const metadata: Metadata = {
  title: "Hellig Ord – En gave som gir ro, håp og styrke",
  description:
    "Ord som bærer deg gjennom hverdagen. Hellig Ord bringer deg bibelvers med varme og håp — utforsk vår samling og finn den rette gaven.",
  openGraph: {
    title: "Hellig Ord – En gave som gir ro, håp og styrke",
    description:
      "Ord som bærer deg gjennom hverdagen. Utforsk Hellig Ords samling av bibelvers-produkter.",
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <EmotionalSection />
      <GiftOccasionsSection />
      <BottomCTASection />
      <StickyMobileCTA />
    </>
  )
}
