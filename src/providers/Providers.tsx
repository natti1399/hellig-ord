"use client"

import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "@/context/CartContext"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CartProvider>
      {children}

      <Toaster
        position="bottom-right"
        expand={false}
        visibleToasts={4}
        closeButton={false}
        style={
          {
            "--normal-bg": "#F7F4EF",
            "--normal-text": "#161515",
            "--normal-border": "#DDD5CB",
            "--success-bg": "#F7F4EF",
            "--success-text": "#161515",
            "--success-border": "#8AA29E",
            "--border-radius": "0.75rem",
            fontFamily: "var(--font-montserrat, sans-serif)",
          } as React.CSSProperties
        }
      />

    </CartProvider>
  )
}
