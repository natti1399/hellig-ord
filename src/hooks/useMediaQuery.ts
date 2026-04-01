"use client"

import { useState, useEffect } from "react"

/**
 * SSR-safe hook that tracks whether a CSS media query matches.
 *
 * @param query - A valid CSS media query string, e.g. "(max-width: 768px)"
 * @returns `true` when the query matches, `false` otherwise.
 *          Defaults to `false` on the server and before the first paint so
 *          there is no hydration mismatch.
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)")
 * const prefersMotion = useMediaQuery("(prefers-reduced-motion: no-preference)")
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    // Sync immediately after mount.
    setMatches(media.matches)

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches)

    // Modern browsers support addEventListener on MediaQueryList.
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}

// Convenience shorthands for common breakpoints (Tailwind defaults).
export const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
} as const
