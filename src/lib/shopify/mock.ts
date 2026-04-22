import type { ShopifyProduct } from "./types"
import type { Cart } from "./types"

// ---------------------------------------------------------------------------
// Mock data — returned when Shopify env vars are not configured
// ---------------------------------------------------------------------------

if (
  process.env.NODE_ENV === "development" &&
  (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
    !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN)
) {
  console.warn(
    "[Shopify] NOT CONFIGURED — using mock data. Set NEXT_PUBLIC_SHOPIFY_* env vars."
  )
}

export const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    id: "gid://shopify/Product/1",
    title: "Bibelvers plakat – Filipperne 4:13",
    handle: "bibelvers-plakat-filiperne-4-13",
    description:
      "En vakker håndlaget plakat med det oppmuntrende verset fra Filipperne 4:13.",
    priceRange: {
      minVariantPrice: { amount: "249.00", currencyCode: "NOK" },
      maxVariantPrice: { amount: "249.00", currencyCode: "NOK" },
    },
    images: { edges: [] },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/1",
            title: "Standard",
            availableForSale: true,
            price: { amount: "249.00", currencyCode: "NOK" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/2",
    title: "Kristen krus – Guds nåde",
    handle: "kristen-krus-guds-naade",
    description: "Varm dine hender og ditt hjerte med dette inspirerende kruset.",
    priceRange: {
      minVariantPrice: { amount: "179.00", currencyCode: "NOK" },
      maxVariantPrice: { amount: "179.00", currencyCode: "NOK" },
    },
    images: { edges: [] },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/2",
            title: "Standard",
            availableForSale: true,
            price: { amount: "179.00", currencyCode: "NOK" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/3",
    title: "Trefigur – Krossen",
    handle: "trefigur-krossen",
    description: "Håndlaget trefigur som minner oss om Guds kjærlighet.",
    priceRange: {
      minVariantPrice: { amount: "349.00", currencyCode: "NOK" },
      maxVariantPrice: { amount: "349.00", currencyCode: "NOK" },
    },
    images: { edges: [] },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/3",
            title: "Standard",
            availableForSale: true,
            price: { amount: "349.00", currencyCode: "NOK" },
          },
        },
      ],
    },
  },
]

export const MOCK_CART: Cart = {
  id: "mock-cart-id",
  checkoutUrl: "#",
  totalQuantity: 0,
  subtotal: "0.00",
  total: "0.00",
  currencyCode: "NOK",
  items: [],
}
