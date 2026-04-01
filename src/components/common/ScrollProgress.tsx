"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

interface ScrollProgressProps {
  /**
   * Height of the progress bar in pixels.
   * @default 3
   */
  height?: number
  /**
   * Tailwind / inline color. Defaults to the brand primary #51304A.
   */
  color?: string
  /**
   * z-index for the bar. Should sit above most content but below modals.
   * @default 50
   */
  zIndex?: number
}

/**
 * A thin horizontal bar fixed at the very top of the viewport that tracks
 * how far the user has scrolled down the page.
 *
 * Designed for product detail pages and long-form content. Mount it once
 * inside the page layout; it will not render anything on the server.
 *
 * @example
 * // app/produkter/[handle]/page.tsx
 * import { ScrollProgress } from "@/components/common/ScrollProgress"
 * ...
 * <ScrollProgress />
 */
export function ScrollProgress({
  height = 3,
  color = "#51304A",
  zIndex = 50,
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Spring for buttery-smooth motion without layout thrash.
  const springProgress = useSpring(progress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const calculate = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, pct)))
    }

    // Seed on mount.
    calculate()

    window.addEventListener("scroll", calculate, { passive: true })
    return () => window.removeEventListener("scroll", calculate)
  }, [mounted])

  if (!mounted) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height,
        backgroundColor: color,
        zIndex,
        // scaleX from 0→1 based on progress, always originating from the left edge.
        transformOrigin: "0% 50%",
        scaleX: springProgress,
        // Use full viewport width as the base; scaleX handles the fill.
        width: "100%",
      }}
    />
  )
}
