import type { ImageLoaderProps } from "next/image"

/**
 * Custom image loader for the Shopify CDN.
 *
 * Shopify CDN supports resizing via query parameters:
 *   width  → &width=<px>
 *   quality → not a native Shopify param, but kept for API compatibility
 *
 * When a real Shopify storefront is connected, `src` will be a full
 * Shopify CDN URL such as:
 *   https://cdn.shopify.com/s/files/1/0000/0001/products/item.jpg
 *
 * The loader appends `&width=` (and removes any existing width param) so
 * Next.js can generate a proper srcset.
 */
export default function shopifyImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const url = new URL(src)

  url.searchParams.set("width", String(width))

  if (quality) {
    url.searchParams.set("quality", String(quality))
  }

  return url.toString()
}
