import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { FadeInSection } from "./FadeInSection"
import { getProducts } from "@/lib/shopify/actions"
import { formatPrice } from "@/lib/mock-data"
import { FeaturedAddToCartButton } from "./FeaturedAddToCartButton"

export async function FeaturedProductSection() {
  const products = await getProducts()
  const product = products[0]

  if (!product) return null

  const firstImage = product.images.edges[0]?.node
  const firstVariant = product.variants.edges[0]?.node
  const handle = product.handle

  const price = firstVariant
    ? formatPrice(firstVariant.price.amount, firstVariant.price.currencyCode)
    : formatPrice(
        product.priceRange.minVariantPrice.amount,
        product.priceRange.minVariantPrice.currencyCode
      )

  return (
    <section
      className="bg-background py-16 md:py-24"
      aria-labelledby="featured-product-heading"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section heading */}
        <FadeInSection className="mb-12 text-center" delay={0}>
          <h2
            id="featured-product-heading"
            className="font-heading text-2xl font-normal italic text-primary tracking-wide sm:text-3xl"
          >
            Bibelvers-krukken
          </h2>
        </FadeInSection>

        {/* Product card */}
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-2">
            {/* Product image area */}
            <FadeInSection direction="left" delay={0.1} className="relative">
              <Link
                href={`/produkter/${handle}`}
                className="block relative aspect-square w-full bg-white"
                aria-label="Se produktdetaljer"
              >
                {firstImage?.url ? (
                  <Image
                    src={firstImage.url}
                    alt={
                      firstImage.altText ??
                      "Bibelvers-krukke – glaskrukke fylt med fargekodede bibelvers"
                    }
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <Image
                    src="/images/hero-product.png"
                    alt="Bibelvers-krukke – glaskrukke fylt med fargekodede bibelvers, med gaveeske"
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </Link>

              {/* Badge */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <Badge className="bg-accent text-accent-foreground font-sans text-xs tracking-wide font-medium px-3 py-1 rounded-full">
                  Nyhet
                </Badge>
              </div>
            </FadeInSection>

            {/* Product details */}
            <FadeInSection
              direction="right"
              delay={0.2}
              className="flex flex-col justify-center p-5 sm:p-8 lg:p-10"
            >
              <h3 className="font-heading text-xl font-bold tracking-wide text-primary sm:text-2xl leading-snug">
                Bibelvers-krukke
                <span className="block font-normal italic text-lg">
                  60 vers for alle livets øyeblikk
                </span>
              </h3>

              <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
                En vakker glaskrukke fylt med 60 håndskrevne bibelvers. Perfekt
                som gave til noen du er glad i — eller til deg selv som en daglig
                påminnelse om Guds kjærlighet.
              </p>

              {/* Features */}
              <ul className="mt-5 space-y-2" aria-label="Produktegenskaper">
                {[
                  "60 fargerike kort med bibelvers",
                  "Etikett med «LES MEG NÅR...»",
                  "Inkludert gaveeske med kors",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 font-sans text-sm text-foreground/80"
                  >
                    <span className="text-accent text-xs" aria-hidden="true">
                      +
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-end gap-4">
                <div>
                  <p className="font-sans text-xs text-muted-foreground tracking-wide mb-1">
                    Pris
                  </p>
                  <p className="font-heading text-3xl font-bold text-primary">
                    {price}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {firstVariant && (
                  <FeaturedAddToCartButton
                    variantId={firstVariant.id}
                    productName="Bibelvers-krukke"
                    productImage={firstImage?.url}
                  />
                )}
                <Link
                  href={`/produkter/${handle}`}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-primary/20 px-6 font-sans text-sm font-medium text-primary hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
                  aria-label="Se detaljer for Bibelvers-krukke"
                >
                  Les mer
                </Link>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  )
}
