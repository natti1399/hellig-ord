interface ProductJsonLdProps {
  name: string
  description: string
  image: string | string[]
  price: number
  currency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  sku?: string
  brand?: string
  url?: string
}

export default function ProductJsonLd({
  name,
  description,
  image,
  price,
  currency = 'NOK',
  availability = 'InStock',
  sku,
  brand = 'Hellig Ord',
  url,
}: ProductJsonLdProps) {
  // JSON.stringify produces only static, server-controlled data — no user input.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: Array.isArray(image) ? image : [image],
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      ...(url ? { url } : {}),
    },
    ...(sku ? { sku } : {}),
    ...(url ? { url } : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
