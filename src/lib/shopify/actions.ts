"use server"

import { storefrontClient } from "./client"
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_COLLECTIONS,
  CREATE_CART,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  GET_CART,
} from "./queries"
import type {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
  Cart,
  CartItem,
} from "./types"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isShopifyConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
  )
}

function normaliseCart(cart: ShopifyCart): Cart {
  const items: CartItem[] = cart.lines.edges.map(({ node }) => {
    const image = node.merchandise.product.images.edges[0]?.node ?? null
    return {
      lineId: node.id,
      variantId: node.merchandise.id,
      variantTitle: node.merchandise.title,
      productId: node.merchandise.product.id,
      productTitle: node.merchandise.product.title,
      productHandle: node.merchandise.product.handle,
      imageUrl: image?.url ?? null,
      imageAlt: image?.altText ?? null,
      price: node.merchandise.price.amount,
      currencyCode: node.merchandise.price.currencyCode,
      quantity: node.quantity,
    }
  })

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: cart.cost.subtotalAmount.amount,
    total: cart.cost.totalAmount.amount,
    currencyCode: cart.cost.totalAmount.currencyCode,
    items,
  }
}

// ---------------------------------------------------------------------------
// Mock data — returned when Shopify env vars are not configured
// ---------------------------------------------------------------------------

const MOCK_PRODUCTS: ShopifyProduct[] = [
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

const MOCK_CART: Cart = {
  id: "mock-cart-id",
  checkoutUrl: "#",
  totalQuantity: 0,
  subtotal: "0.00",
  total: "0.00",
  currencyCode: "NOK",
  items: [],
}

// ---------------------------------------------------------------------------
// Server actions
// ---------------------------------------------------------------------------

export async function getProducts(): Promise<ShopifyProduct[]> {
  if (!isShopifyConfigured()) {
    return MOCK_PRODUCTS
  }

  try {
    const { data, errors } = await storefrontClient!.request(GET_PRODUCTS, {
      variables: { first: 20 },
    })

    if (errors) {
      console.error("[Shopify] getProducts errors:", errors)
      return MOCK_PRODUCTS
    }

    return (
      (
        data as {
          products: { edges: Array<{ node: ShopifyProduct }> }
        }
      )?.products?.edges?.map((e) => e.node) ?? MOCK_PRODUCTS
    )
  } catch (err) {
    console.error("[Shopify] getProducts failed:", err)
    return MOCK_PRODUCTS
  }
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  if (!isShopifyConfigured()) {
    return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? MOCK_PRODUCTS[0]
  }

  try {
    const { data, errors } = await storefrontClient!.request(
      GET_PRODUCT_BY_HANDLE,
      { variables: { handle } }
    )

    if (errors) {
      console.error("[Shopify] getProductByHandle errors:", errors)
      return null
    }

    return (data as { product: ShopifyProduct })?.product ?? null
  } catch (err) {
    console.error("[Shopify] getProductByHandle failed:", err)
    return null
  }
}

export async function getCollections(): Promise<ShopifyCollection[]> {
  if (!isShopifyConfigured()) {
    return []
  }

  try {
    const { data, errors } = await storefrontClient!.request(GET_COLLECTIONS, {
      variables: { first: 10 },
    })

    if (errors) {
      console.error("[Shopify] getCollections errors:", errors)
      return []
    }

    return (
      (
        data as {
          collections: { edges: Array<{ node: ShopifyCollection }> }
        }
      )?.collections?.edges?.map((e) => e.node) ?? []
    )
  } catch (err) {
    console.error("[Shopify] getCollections failed:", err)
    return []
  }
}

export async function createCart(): Promise<Cart> {
  if (!isShopifyConfigured()) {
    return { ...MOCK_CART, id: `mock-${Date.now()}` }
  }

  try {
    const { data, errors } = await storefrontClient!.request(CREATE_CART, {
      variables: { input: {} },
    })

    if (errors) {
      console.error("[Shopify] createCart errors:", errors)
      return { ...MOCK_CART, id: `mock-${Date.now()}` }
    }

    const cart = (data as { cartCreate: { cart: ShopifyCart } })?.cartCreate
      ?.cart
    if (!cart) return { ...MOCK_CART, id: `mock-${Date.now()}` }

    return normaliseCart(cart)
  } catch (err) {
    console.error("[Shopify] createCart failed:", err)
    return { ...MOCK_CART, id: `mock-${Date.now()}` }
  }
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<Cart> {
  if (!isShopifyConfigured() || cartId.startsWith("mock-")) {
    return { ...MOCK_CART, id: cartId }
  }

  try {
    const { data, errors } = await storefrontClient!.request(ADD_TO_CART, {
      variables: {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }],
      },
    })

    if (errors) {
      console.error("[Shopify] addToCart errors:", errors)
      throw new Error("Kunne ikke legge til i handlekurv")
    }

    const cart = (data as { cartLinesAdd: { cart: ShopifyCart } })?.cartLinesAdd
      ?.cart
    if (!cart) throw new Error("Tomt svar fra handlekurv")

    return normaliseCart(cart)
  } catch (err) {
    console.error("[Shopify] addToCart failed:", err)
    throw err
  }
}

export async function updateCart(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  if (!isShopifyConfigured() || cartId.startsWith("mock-")) {
    return { ...MOCK_CART, id: cartId }
  }

  try {
    const { data, errors } = await storefrontClient!.request(UPDATE_CART, {
      variables: {
        cartId,
        lines: [{ id: lineId, quantity }],
      },
    })

    if (errors) {
      console.error("[Shopify] updateCart errors:", errors)
      throw new Error("Kunne ikke oppdatere handlekurv")
    }

    const cart = (
      data as { cartLinesUpdate: { cart: ShopifyCart } }
    )?.cartLinesUpdate?.cart
    if (!cart) throw new Error("Tomt svar fra handlekurv")

    return normaliseCart(cart)
  } catch (err) {
    console.error("[Shopify] updateCart failed:", err)
    throw err
  }
}

export async function removeFromCart(
  cartId: string,
  lineId: string
): Promise<Cart> {
  if (!isShopifyConfigured() || cartId.startsWith("mock-")) {
    return { ...MOCK_CART, id: cartId }
  }

  try {
    const { data, errors } = await storefrontClient!.request(REMOVE_FROM_CART, {
      variables: { cartId, lineIds: [lineId] },
    })

    if (errors) {
      console.error("[Shopify] removeFromCart errors:", errors)
      throw new Error("Kunne ikke fjerne fra handlekurv")
    }

    const cart = (
      data as { cartLinesRemove: { cart: ShopifyCart } }
    )?.cartLinesRemove?.cart
    if (!cart) throw new Error("Tomt svar fra handlekurv")

    return normaliseCart(cart)
  } catch (err) {
    console.error("[Shopify] removeFromCart failed:", err)
    throw err
  }
}

export async function getCart(cartId: string): Promise<Cart | null> {
  if (!isShopifyConfigured() || cartId.startsWith("mock-")) {
    return null
  }

  try {
    const { data, errors } = await storefrontClient!.request(GET_CART, {
      variables: { cartId },
    })

    if (errors) {
      console.error("[Shopify] getCart errors:", errors)
      return null
    }

    const cart = (data as { cart: ShopifyCart })?.cart
    if (!cart) return null

    return normaliseCart(cart)
  } catch (err) {
    console.error("[Shopify] getCart failed:", err)
    return null
  }
}
