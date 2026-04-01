export interface ProductImage {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface MoneyV2 {
  amount: string
  currencyCode: string
}

export interface PriceRange {
  minVariantPrice: MoneyV2
  maxVariantPrice: MoneyV2
}

export interface ProductVariant {
  id: string
  title: string
  price: MoneyV2
  availableForSale: boolean
  selectedOptions: Array<{
    name: string
    value: string
  }>
}

export interface Product {
  id: string
  title: string
  description: string
  handle: string
  priceRange: PriceRange
  images: ProductImage[]
  variants: ProductVariant[]
  productType: string
  tags: string[]
}

export interface Collection {
  id: string
  title: string
  description: string
  handle: string
  image: ProductImage | null
  products: Product[]
}
