import type { Metadata } from "next"
import { getProducts } from "@/lib/shopify/actions"
import { ProductGrid } from "@/components/product/ProductGrid"
import type { Product } from "@/types/product"

export const metadata: Metadata = {
  title: "Våre produkter",
  description:
    "Håndplukket med omtanke – vakre kristne gaver som gir ro, håp og trøst i hverdagen. Utforsk bibelvers, smykker, dagbøker og mer.",
  openGraph: {
    title: "Våre produkter | Hellig Ord",
    description:
      "Håndplukket med omtanke – vakre kristne gaver som gir ro, håp og trøst i hverdagen.",
  },
}

function mapShopifyProduct(p: {
  id: string
  title: string
  handle: string
  description: string
  priceRange: { minVariantPrice: { amount: string; currencyCode: string }; maxVariantPrice: { amount: string; currencyCode: string } }
  images: { edges: Array<{ node: { url: string; altText: string | null; width?: number; height?: number } }> }
  variants: { edges: Array<{ node: { id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string } } }> }
}): Product {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    handle: p.handle,
    priceRange: {
      minVariantPrice: p.priceRange.minVariantPrice,
      maxVariantPrice: p.priceRange.maxVariantPrice,
    },
    images: p.images.edges.map(({ node }) => ({
      url: node.url,
      altText: node.altText,
      width: node.width ?? 800,
      height: node.height ?? 800,
    })),
    variants: p.variants.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      price: node.price,
      availableForSale: node.availableForSale,
      selectedOptions: [],
    })),
    productType: "",
    tags: [],
  }
}

export default async function ProdukterPage() {
  const shopifyProducts = await getProducts()
  const products = shopifyProducts.map(mapShopifyProduct)

  return (
    <main className="flex-1">
      {/* Hero section */}
      <section
        className="border-b"
        style={{ backgroundColor: "#F7F4EF", borderColor: "#e8e2db" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1
              className="font-heading text-4xl font-bold tracking-wide sm:text-5xl"
              style={{ color: "#51304A" }}
            >
              Våre produkter
            </h1>
            {/* Decorative rule */}
            <div className="mx-auto mt-5 mb-5 h-px w-16" style={{ backgroundColor: "#8AA29E" }} />
            <p
              className="font-sans text-base leading-relaxed sm:text-lg"
              style={{ color: "#7a6a62" }}
            >
              Håndplukket med omtanke – små ting som gir ro, håp og trøst i hverdagen.
            </p>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {products.length > 1 && (
          <div className="mb-8 flex items-center justify-between">
            <p className="font-sans text-sm text-muted-foreground">
              {products.length} produkter
            </p>
          </div>
        )}
        <ProductGrid products={products} />
      </section>

      {/* Trust strip */}
      <section className="border-t" style={{ borderColor: "#e8e2db" }}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: "✦", text: "Gratis frakt i hele Norge" },
              { icon: "✦", text: "30 dagers åpent kjøp" },
              { icon: "✦", text: "Sendes fra Norge" },
              { icon: "✦", text: "Trygg betaling" },
            ].map(({ icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-2 font-sans text-sm"
                style={{ color: "#8AA29E" }}
              >
                <span className="text-xs" aria-hidden="true">{icon}</span>
                <span style={{ color: "#7a6a62" }}>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
