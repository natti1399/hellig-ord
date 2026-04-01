import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedProductSection } from '@/components/home/FeaturedProductSection'
import { ValuePropsSection } from '@/components/home/ValuePropsSection'
import { BibleQuoteSection } from '@/components/home/BibleQuoteSection'
import { AboutSection } from '@/components/home/AboutSection'
import { NewsletterSection } from '@/components/home/NewsletterSection'

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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProductSection />
      <ValuePropsSection />
      <BibleQuoteSection />
      <AboutSection />
      <NewsletterSection />
    </>
  )
}
