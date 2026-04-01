import type { Metadata } from "next"
import { CartPageClient } from "./CartPageClient"

export const metadata: Metadata = {
  title: "Handlekurv",
  description: "Se og rediger varene i handlekurven din.",
  robots: { index: false, follow: false },
}

export default function HandlekurvPage() {
  return <CartPageClient />
}
