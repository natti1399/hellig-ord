const ALLOWED_CHECKOUT_ORIGINS: readonly string[] = [
  "https://checkout.shopify.com",
  "https://g7bmfm-ep.myshopify.com",
  "https://hellig-ord.myshopify.com",
]

/**
 * Returns true only if the URL's origin is in the Shopify checkout allowlist.
 * Prevents open-redirect vulnerabilities when using window.location.href.
 */
export function isAllowedCheckoutUrl(url: string): boolean {
  try {
    const { origin } = new URL(url)
    return ALLOWED_CHECKOUT_ORIGINS.some((allowed) => origin === allowed)
  } catch {
    return false
  }
}
