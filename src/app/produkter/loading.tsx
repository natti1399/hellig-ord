import { Skeleton } from '@/components/ui/skeleton'

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
      {/* Image area — aspect-square matching ProductCard */}
      <Skeleton className="aspect-square w-full rounded-none" />

      {/* Content area */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title lines */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Description lines */}
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>

        {/* Price + CTA row */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default function ProdukterLoading() {
  return (
    <main className="flex-1" aria-label="Laster produkter" role="status">
      {/* Hero skeleton */}
      <section className="bg-muted border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center flex flex-col items-center gap-4">
            <Skeleton className="h-10 w-48 sm:h-12 sm:w-64" />
            <Skeleton className="h-4 w-full max-w-lg" />
            <Skeleton className="h-4 w-4/5 max-w-md" />
          </div>
        </div>
      </section>

      {/* Product grid skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Count row */}
        <div className="mb-8">
          <Skeleton className="h-4 w-24" />
        </div>

        {/* 3-column grid — matches ProductGrid layout exactly */}
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i}>
              <ProductCardSkeleton />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
