type FbqFunction = (
  action: string,
  event: string,
  params?: Record<string, unknown>
) => void

function getFbq(): FbqFunction | undefined {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    return window.fbq
  }
  return undefined
}

export function trackPageView(): void {
  const fbq = getFbq()
  if (!fbq) return
  fbq('track', 'PageView')
}

export function trackViewContent(
  productName: string,
  productId: string,
  price: number
): void {
  const fbq = getFbq()
  if (!fbq) return
  fbq('track', 'ViewContent', {
    content_name: productName,
    content_ids: [productId],
    content_type: 'product',
    value: price,
    currency: 'NOK',
  })
}

export function trackAddToCart(
  productName: string,
  productId: string,
  price: number,
  quantity: number
): void {
  const fbq = getFbq()
  if (!fbq) return
  fbq('track', 'AddToCart', {
    content_name: productName,
    content_ids: [productId],
    content_type: 'product',
    value: price * quantity,
    currency: 'NOK',
    num_items: quantity,
  })
}

export function trackInitiateCheckout(
  value: number,
  numItems: number
): void {
  const fbq = getFbq()
  if (!fbq) return
  fbq('track', 'InitiateCheckout', {
    value,
    currency: 'NOK',
    num_items: numItems,
  })
}

export function trackPurchase(
  value: number,
  currency: string,
  numItems: number
): void {
  const fbq = getFbq()
  if (!fbq) return
  fbq('track', 'Purchase', {
    value,
    currency,
    num_items: numItems,
  })
}

export function trackSearch(searchQuery: string): void {
  const fbq = getFbq()
  if (!fbq) return
  fbq('track', 'Search', {
    search_string: searchQuery,
  })
}
