'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const CATALOG_URL = '/produkter'

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm p-3 md:hidden">
      <Link
        href={CATALOG_URL}
        className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold tracking-wide text-primary-foreground shadow-lg"
      >
        Se alle produkter
      </Link>
    </div>
  )
}
