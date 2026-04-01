export interface ShopifyMoneyV2 {
  amount: string
  currencyCode: string
}

export interface ShopifyImage {
  id?: string
  url: string
  altText: string | null
  width?: number
  height?: number
}

export interface ShopifyProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: ShopifyMoneyV2
  selectedOptions?: Array<{ name: string; value: string }>
}

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml?: string
  priceRange: {
    minVariantPrice: ShopifyMoneyV2
    maxVariantPrice: ShopifyMoneyV2
  }
  images: {
    edges: Array<{ node: ShopifyImage }>
  }
  variants: {
    edges: Array<{ node: ShopifyProductVariant }>
  }
}

export interface ShopifyCollection {
  id: string
  title: string
  handle: string
  description: string
  image: ShopifyImage | null
}

export interface ShopifyCartLineItem {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: ShopifyMoneyV2
    product: {
      id: string
      title: string
      handle: string
      images: {
        edges: Array<{ node: ShopifyImage }>
      }
    }
  }
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: ShopifyMoneyV2
    totalAmount: ShopifyMoneyV2
  }
  lines: {
    edges: Array<{ node: ShopifyCartLineItem }>
  }
}

// Normalised types used throughout the UI

export interface CartItem {
  lineId: string
  variantId: string
  variantTitle: string
  productId: string
  productTitle: string
  productHandle: string
  imageUrl: string | null
  imageAlt: string | null
  price: string
  currencyCode: string
  quantity: number
}

export interface Cart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  subtotal: string
  total: string
  currencyCode: string
  items: CartItem[]
}
