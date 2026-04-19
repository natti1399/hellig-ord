import type { ShopifyProduct } from "./types"
import type { Product } from "@/types/product"

/**
 * Maps a raw ShopifyProduct (GraphQL response shape) to the canonical
 * Product type used throughout the UI.
 *
 * Exported for use in server components / page files. Agent B (SEO) should
 * import this instead of defining a local mapper.
 */
export function mapShopifyProductToProduct(p: ShopifyProduct): Product {
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
      selectedOptions: node.selectedOptions ?? [],
    })),
    productType: "",
    tags: [],
  }
}
