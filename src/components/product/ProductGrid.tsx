import type { Product } from "@/types/product"
import { ProductCard } from "./ProductCard"

interface ProductGridProps {
  products: Product[]
  emptyMessage?: string
}

export function ProductGrid({
  products,
  emptyMessage = "Ingen produkter funnet.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-muted-foreground font-sans text-base">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
