import Image from "next/image"
import Link from "next/link"
import { getProducts } from "@/lib/shopify/actions"
import { formatPrice } from "@/lib/mock-data"
import { FadeInSection } from "./FadeInSection"

export async function ProductCardsSection() {
  const products = await getProducts()

  return (
    <section className="bg-background py-16 md:py-24" aria-label="Produkter">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 4).map((product, index) => {
            const image = product.images.edges[0]?.node
            const variant = product.variants.edges[0]?.node
            const price = variant?.price
              ? formatPrice(
                  variant.price.amount,
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
      </div>
    </section>
  )
}
