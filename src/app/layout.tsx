import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import MetaPixel from "@/components/analytics/MetaPixel";
import { Providers } from "@/providers/Providers";
import { SkipToContent } from "@/components/common/SkipToContent";
import { BackToTop } from "@/components/common/BackToTop";
import { CookieConsent } from "@/components/common/CookieConsent";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Hellig Ord – Ord for hjertet",
    template: "%s | Hellig Ord",
  },
  description:
    "Hellig Ord tilbyr vakre kristne produkter som inspirerer troen din. Bibelvers, gaver og mer – alt med kjærlighet og omtanke.",
  keywords: [
    "kristen nettbutikk",
    "bibelvers",
    "kristne gaver",
    "religiøse produkter",
    "hellig ord",
    "tro",
    "bibel",
  ],
  metadataBase: new URL("https://helligeord.no"),
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: "https://helligeord.no",
    siteName: "Hellig Ord",
    title: "Hellig Ord – Ord for hjertet",
    description:
      "Vakre kristne produkter som inspirerer troen din. Bibelvers, gaver og mer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nb"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SkipToContent />
        <Providers>
          <MetaPixel />
          <AnnouncementBar />
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
