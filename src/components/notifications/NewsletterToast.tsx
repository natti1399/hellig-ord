"use client"

import { toast } from "sonner"
import { Mail } from "lucide-react"

export function showNewsletterToast(): void {
  toast.custom(
    (t) => (
      <div
        className="flex items-start gap-3 w-full max-w-sm rounded-xl border border-[#DDD5CB] bg-[#F7F4EF] px-4 py-3.5 shadow-lg"
        style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
      >
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5 flex size-10 items-center justify-center rounded-md bg-[#8AA29E]/15">
          <Mail className="size-5 text-[#8AA29E]" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <p className="text-sm font-semibold text-[#161515] leading-snug">
            Takk for påmeldingen!
          </p>
          <p className="text-xs text-[#6B5E57] leading-relaxed">
            Du vil motta vårt nyhetsbrev med inspirasjonsvers og eksklusive
            tilbud.
          </p>
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
      duration: 5000,
      position: "bottom-right",
    }
  )
}
