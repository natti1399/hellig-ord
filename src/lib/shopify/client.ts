import { createStorefrontApiClient } from "@shopify/storefront-api-client"

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? ""
const publicAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? ""

const isConfigured = storeDomain.length > 0 && publicAccessToken.length > 0

export const storefrontClient = isConfigured
  ? createStorefrontApiClient({
      storeDomain,
      apiVersion: "2025-07",
      publicAccessToken,
    })
  : null
