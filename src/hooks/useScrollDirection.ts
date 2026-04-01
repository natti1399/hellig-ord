"use client"

import { useState, useEffect, useRef } from "react"

type ScrollDirection = "up" | "down" | null

interface UseScrollDirectionOptions {
  /**
   * Minimum number of pixels the user must scroll before a direction change
   * is registered. Prevents jitter on small scroll wiggles.
   * @default 8
   */
  threshold?: number
  /**
   * Whether detection is active. Set to `false` to pause tracking.
   * @default true
   */
  enabled?: boolean
}

/**
 * SSR-safe hook that detects the user's scroll direction.
 *
 * Returns `"up"` when scrolling toward the top of the page,
 * `"down"` when scrolling away from it, and `null` before the first scroll
 * event fires.
 *
 * Commonly used to show/hide a sticky mobile header:
 *
 * @example
 * const direction = useScrollDirection()
 * // hide header when scrolling down, reveal when scrolling up
 * <header className={direction === "down" ? "-translate-y-full" : "translate-y-0"}>
 */
export function useScrollDirection({
  threshold = 8,
  enabled = true,
}: UseScrollDirectionOptions = {}): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>(null)
  const lastScrollY = useRef<number>(0)
  const ticking = useRef<boolean>(false)

  useEffect(() => {
    if (!enabled) return

    // Seed the ref so the first event compares against the real position.
    lastScrollY.current = window.scrollY

    const update = () => {
      const current = window.scrollY
      const delta = current - lastScrollY.current

      if (Math.abs(delta) >= threshold) {
        setDirection(delta > 0 ? "down" : "up")
        lastScrollY.current = current
      }

      ticking.current = false
    }

    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true
      window.requestAnimationFrame(update)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold, enabled])

  return direction
}
