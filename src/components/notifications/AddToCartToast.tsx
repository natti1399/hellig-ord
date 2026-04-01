"use client"

import { toast } from "sonner"
import { ShoppingBag, CheckCircle2 } from "lucide-react"

interface AddToCartOptions {
  productName: string
  productImage?: string
  variantTitle?: string
  onViewCart?: () => void
}

export function showAddToCartToast({
  productName,
  productImage,
  variantTitle,
  onViewCart,
}: AddToCartOptions): void {
  toast.custom(
    (t) => (
      <div
        className="flex items-start gap-3 w-full max-w-sm rounded-xl border border-[#DDD5CB] bg-[#F7F4EF] px-4 py-3 shadow-lg"
        style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
      >
        {/* Icon / Image */}
        <div className="flex-shrink-0 mt-0.5">
          {productImage ? (
            <div className="size-10 rounded-md overflow-hidden border border-[#DDD5CB]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={productImage}
                alt={productName}
                className="size-full object-cover"
              />
            </div>
          ) : (
            <div className="flex size-10 items-center justify-center rounded-md bg-[#51304A]/10">
              <CheckCircle2 className="size-5 text-[#51304A]" aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8AA29E]">
            Lagt til i handlekurven
          </p>
          <p className="text-sm font-medium text-[#161515] truncate leading-snug">
            {productName}
          </p>
          {variantTitle && (
            <p className="text-xs text-[#6B5E57]">{variantTitle}</p>
          )}

          {onViewCart && (
            <button
              onClick={() => {
                toast.dismiss(t)
                onViewCart()
              }}
              className="mt-1.5 self-start flex items-center gap-1.5 rounded-md bg-[#51304A] px-3 py-1.5 text-xs font-semibold text-[#F7F4EF] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#51304A]"
            >
              <ShoppingBag className="size-3" aria-hidden="true" />
              Se handlekurv
            </button>
          )}
        </div>

        {/* Dismiss */}
        <button
          onClick={() => toast.dismiss(t)}
          aria-label="Lukk varsel"
          className="flex-shrink-0 text-[#6B5E57] hover:text-[#161515] transition-colors text-lg leading-none mt-0.5"
        >
          ×
        </button>
      </div>
    ),
    {
      duration: 3000,
      position: "bottom-right",
    }
  )
}
