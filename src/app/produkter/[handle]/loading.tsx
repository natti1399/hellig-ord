import { Skeleton } from '@/components/ui/skeleton'

export default function ProduktDetailLoading() {
  return (
    <main
      className="flex-1"
      aria-label="Laster produktside"
      role="status"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-8 flex items-center gap-2">
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-3.5 w-2" />
          <Skeleton className="h-3.5 w-32" />
        </div>

        {/* Two-column layout — mirrors the real product detail page */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">

          {/* Left column — product image */}
          <div className="flex flex-col gap-3">
            <Skeleton className="aspect-square w-full rounded-xl" />

            {/* Thumbnail strip */}
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-20 rounded-lg flex-shrink-0" />
              ))}
            </div>
          </div>

          {/* Right column — product details */}
          <div className="flex flex-col gap-6 pt-1">
            {/* Product type label */}
            <Skeleton className="h-3.5 w-24" />

            {/* Title — two lines like a real heading */}
            <div className="flex flex-col gap-2.5">
              <Skeleton className="h-8 w-4/5" />
              <Skeleton className="h-8 w-3/5" />
            </div>

            {/* Price */}
            <Skeleton className="h-9 w-28" />

            {/* Short description */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-11/12" />
              <Skeleton className="h-3.5 w-4/5" />
            </div>

            {/* Variant selector label + options */}
            <div className="flex flex-col gap-2.5">
              <Skeleton className="h-3.5 w-20" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-20 rounded-lg" />
                <Skeleton className="h-10 w-20 rounded-lg" />
                <Skeleton className="h-10 w-20 rounded-lg" />
              </div>
            </div>

            {/* Quantity label + stepper */}
            <div className="flex flex-col gap-2.5">
              <Skeleton className="h-3.5 w-14" />
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>

            {/* Add to cart CTA */}
            <Skeleton className="h-14 w-full rounded-xl" />

            {/* Accordion rows */}
            <div className="mt-2 border-t border-border pt-6 flex flex-col gap-0">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-border py-4"
                >
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-4 rounded-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
