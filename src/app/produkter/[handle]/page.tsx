import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRightIcon, Star } from "lucide-react"
import { getProducts, getProductByHandle as fetchProduct } from "@/lib/shopify/actions"
import { getProductContent } from "@/data/product-content"
import { ProductDetailClient } from "@/components/product/ProductDetailClient"
import { ProductAccordion } from "@/components/product/ProductAccordion"
import { ProductImageGallery } from "@/components/product/ProductImageGallery"
import type { Product } from "@/types/product"

interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  priceRange: { minVariantPrice: { amount: string; currencyCode: string }; maxVariantPrice: { amount: string; currencyCode: string } }
  images: { edges: Array<{ node: { url: string; altText: string | null; width?: number; height?: number } }> }
  variants: { edges: Array<{ node: { id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string } } }> }
}

function mapToProduct(p: ShopifyProduct): Product {
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

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const raw = await fetchProduct(handle)
  if (!raw) return { title: "Produkt ikke funnet" }

  return {
    title: raw.title,
    description: raw.description.slice(0, 155),
    openGraph: {
      title: `${raw.title} | Hellig Ord`,
      description: raw.description.slice(0, 155),
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const raw = await fetchProduct(handle)
  if (!raw) notFound()

  const product = mapToProduct(raw)
  const content = getProductContent(handle)

  return (
    <main className="flex-1">
      {/* Breadcrumb */}
      <nav
        aria-label="Brødsmule-navigasjon"
        className="border-b border-border bg-muted/50"
      >
        <ol className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 font-sans text-xs text-muted-foreground sm:px-6 lg:px-8">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Hjem
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRightIcon className="size-3 shrink-0" />
          </li>
          <li>
            <Link href="/produkter" className="hover:text-foreground transition-colors">
              Produkter
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRightIcon className="size-3 shrink-0" />
          </li>
          <li
            aria-current="page"
            className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none"
          >
            {product.title}
          </li>
        </ol>
      </nav>

      {/* Product detail */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
          {/* Image gallery */}
          <ProductImageGallery
            images={product.images}
            productTitle={product.title}
          />

          {/* Details */}
          <div className="flex flex-col gap-4">
            {/* Title — close to the image */}
            <h1 className="font-heading text-3xl font-bold leading-tight tracking-wide text-foreground sm:text-4xl">
              {product.title}
            </h1>

            {/* Star row — 5 anmeldelser */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5" aria-label="5 av 5 stjerner">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-primary text-primary"
                    aria-hidden
                  />
                ))}
              </div>
              <span className="font-heading text-sm italic text-muted-foreground">
                (5 anmeldelser)
              </span>
            </div>

            {/* Hook line (italic emotional pitch) */}
            {content?.hook && (
              <p className="font-heading text-base italic text-foreground/80 leading-snug">
                {content.hook}
              </p>
            )}

            {/* 4-row accordion with icons (Beskrivelse / Bruksveileder / Spesifikasjoner / Pleie og vedlikehold) */}
            {content ? (
              <ProductAccordion content={content} />
            ) : (
              <p className="font-sans text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            {/* Buy section: price, variants, quantity, CTA, trust grid */}
            <ProductDetailClient product={product} />
          </div>
        </div>
      </section>
    </main>
  )
}
