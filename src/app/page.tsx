import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedProductSection } from '@/components/home/FeaturedProductSection'
import { ValuePropsSection } from '@/components/home/ValuePropsSection'
import { BibleQuoteSection } from '@/components/home/BibleQuoteSection'
import { AboutSection } from '@/components/home/AboutSection'
import { NewsletterSection } from '@/components/home/NewsletterSection'
import { TestimonialSection } from '@/components/social-proof/TestimonialSection'
import { StickyMobileCTA } from '@/components/home/StickyMobileCTA'
import { getProducts } from '@/lib/shopify/actions'

export const metadata: Metadata = {
  title: 'Hellig Ord – Ord som berører hjertet',
  description:
    'Vakre kristne produkter som inspirerer tro, håp og kjærlighet. Utforsk vår Bibelvers-krukke og andre unike gaver, håndplukket med omtanke.',
  openGraph: {
    title: 'Hellig Ord – Ord som berører hjertet',
    description:
      'Vakre kristne produkter som inspirerer tro, håp og kjærlighet. Utforsk vår Bibelvers-krukke og andre unike gaver.',
  },
}

const KRUKKE_HANDLES = [
  'bible-verse-jar-ornament',
  'bible-verse-inspiration-jar',
  'bibelvers-krukke',
]

export default async function HomePage() {
  const products = await getProducts()
  const krukke = products.find((p) => KRUKKE_HANDLES.includes(p.handle))
  const krukkeVariantId = krukke?.variants.edges[0]?.node.id

  return (
    <>
      <HeroSection variantId={krukkeVariantId} />
      <ValuePropsSection />
      <BibleQuoteSection />
      <TestimonialSection />
      <FeaturedProductSection />
      <AboutSection />
      <NewsletterSection />
      <StickyMobileCTA variantId={krukkeVariantId} />
    </>
  )
}
