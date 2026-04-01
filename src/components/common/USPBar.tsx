import { cn } from '@/lib/utils'

const USP_ITEMS = [
  'Håndplukket med omtanke',
  'Rask levering',
  'Inspirert av Guds ord',
  'Gratis frakt over 499 kr',
  '14 dagers angrerett',
  'Sikker betaling',
  'Vakre kristne gaver',
]

// Separator between items
const SEPARATOR = '•'

interface USPBarProps {
  className?: string
}

export function USPBar({ className }: USPBarProps) {
  // Duplicate items for seamless loop
  const allItems = [...USP_ITEMS, ...USP_ITEMS]

  return (
    <div
      className={cn('w-full overflow-hidden bg-primary py-2.5', className)}
      role="region"
      aria-label="Produktfordeler"
    >
      <div
        className="flex items-center gap-0 whitespace-nowrap"
        style={{ animation: 'usp-marquee 28s linear infinite' }}
        aria-hidden="true"
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground/80"
          >
            {item}
            <span className="text-primary-foreground/30">{SEPARATOR}</span>
          </span>
        ))}
      </div>

      {/* Screen-reader accessible version */}
      <p className="sr-only">
        {USP_ITEMS.join(' · ')}
      </p>

      <style>{`
        @keyframes usp-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="usp-marquee"] {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
