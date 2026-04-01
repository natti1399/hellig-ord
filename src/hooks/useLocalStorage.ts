"use client"

import { useState, useEffect, useCallback } from "react"

type SetValue<T> = (value: T | ((prev: T) => T)) => void

/**
 * SSR-safe generic hook for reading and writing a value to localStorage.
 * On the server (or before hydration) it returns `initialValue` without
 * attempting to access `window`.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // Initialise lazily so we only read localStorage once on the client.
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue
    try {
      const raw = window.localStorage.getItem(key)
      return raw !== null ? (JSON.parse(raw) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  // Keep other tabs / windows in sync.
  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.key !== key) return
      try {
        setStoredValue(
          event.newValue !== null
            ? (JSON.parse(event.newValue) as T)
            : initialValue
        )
      } catch {
        // Ignore malformed values from other tabs.
      }
    }
    window.addEventListener("storage", handler)
    return () => window.removeEventListener("storage", handler)
  }, [key, initialValue])

  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        const nextValue =
          typeof value === "function"
            ? (value as (prev: T) => T)(storedValue)
            : value
        setStoredValue(nextValue)
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(nextValue))
        }
      } catch {
        // Quota exceeded or other write errors — silently ignore.
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue]
}
