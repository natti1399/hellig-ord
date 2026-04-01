import Link from "next/link"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  /** Human-readable label shown to the user. */
  label: string
  /** Href for the link. Omit (or leave undefined) for the current/active item. */
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Accessible breadcrumb navigation with Norwegian labels and structured
 * data (JSON-LD BreadcrumbList) embedded as an inline script for SEO.
 *
 * The last item is always treated as the current page (no link, aria-current).
 *
 * @example
 * <Breadcrumb
 *   items={[
 *     { label: "Hjem", href: "/" },
 *     { label: "Produkter", href: "/produkter" },
 *     { label: "Bibelvers-krukke" },
 *   ]}
 * />
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) return null

  // Build JSON-LD structured data for Google rich results.
  // Safety note: structuredData is built entirely from our own static data —
  // no user-generated content is interpolated, so serialising with
  // JSON.stringify is safe here.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsonLd: any = { __html: JSON.stringify(structuredData) }

  return (
    <>
      {/* Structured data — invisible to users, indexed by search engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd} />

      <nav
        aria-label="Brødsmulesti"
        className={cn("w-full", className)}
      >
        <ol
          className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
          role="list"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            const isFirst = index === 0

            return (
              <li
                key={`${item.label}-${index}`}
                className="flex items-center gap-1"
              >
                {/* Separator — hidden from screen readers */}
                {!isFirst && (
                  <span
                    aria-hidden="true"
                    className="select-none text-border"
                  >
                    /
                  </span>
                )}

                {isLast || !item.href ? (
                  // Current page — not a link
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={cn(
                      "font-medium",
                      isLast
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors duration-150 hover:text-foreground hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded-sm"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
