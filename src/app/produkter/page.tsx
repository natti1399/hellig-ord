import type { Metadata } from "next"
import { getProducts } from "@/lib/shopify/actions"
import { ProductGrid } from "@/components/product/ProductGrid"
import type { Product } from "@/types/product"

export const metadata: Metadata = {
  title: "Alle produkter",
  description:
    "Utforsk vårt utvalg av vakre kristne gaver — bibelvers, smykker, dagbøker og mer. Skapt med kjærlighet for å berike troen din.",
  openGraph: {
    title: "Alle produkter | Hellig Ord",
    description:
      "Utforsk vårt utvalg av vakre kristne gaver — bibelvers, smykker, dagbøker og mer.",
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
      <section className="bg-muted border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-wide text-foreground sm:text-5xl">
              Alle produkter
            </h1>
            <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
              Utforsk vårt utvalg av vakre kristne gaver — skapt med kjærlighet
              og omtanke for å berike troen din og glede de du er glad i.
            </p>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <p className="font-sans text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "produkt" : "produkter"}
          </p>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  )
}
