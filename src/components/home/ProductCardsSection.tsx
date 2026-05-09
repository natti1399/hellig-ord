import Image from "next/image"
import Link from "next/link"
import { getProducts } from "@/lib/shopify/actions"
import { formatPrice } from "@/lib/mock-data"
import { FadeInSection } from "./FadeInSection"

export async function ProductCardsSection() {
  const products = await getProducts()

  return (
    <section className="bg-background py-16 md:py-24" aria-labelledby="product-cards-heading">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <FadeInSection className="mb-10 text-center" delay={0} direction="up">
          <h2
            id="product-cards-heading"
            className="font-heading text-2xl font-bold text-primary sm:text-3xl"
          >
            Våre produkter
          </h2>
          <p className="mt-3 font-sans text-sm text-muted-foreground">
            Håndplukket med omtanke – laget for å styrke troen din.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 4).map((product, index) => {
            const image = product.images.edges[0]?.node
            const variant = product.variants.edges[0]?.node
            const price = variant?.price
              ? formatPrice(
                  parseFloat(variant.price.amount),
                  variant.price.currencyCode
                )
              : null

            return (
              <FadeInSection key={product.id} delay={index * 0.1} direction="up">
                <Link
                  href={`/produkter/${product.handle}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card hover:shadow-md transition-shadow duration-200"
                >
                  {image && (
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <Image
                        src={image.url}
                        alt={image.altText || product.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="px-4 py-3">
                    <p className="font-heading text-sm font-semibold text-foreground leading-snug line-clamp-2">
                      {product.title}
                    </p>
                    {price && (
                      <p className="mt-1 font-sans text-sm font-bold text-primary">
                        {price}
                      </p>
                    )}
                  </div>
                </Link>
              </FadeInSection>
            )
          })}
        </div>

        <FadeInSection delay={0.4} className="mt-10 text-center">
          <Link
            href="/produkter"
            className="inline-flex items-center justify-center rounded-xl border border-primary/30 bg-transparent px-8 py-3 font-sans text-sm font-semibold text-primary hover:bg-primary/5 transition-colors duration-200"
          >
            Se alle produkter
          </Link>
        </FadeInSection>
      </div>
    </section>
  )
}
