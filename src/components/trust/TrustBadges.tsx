import { cn } from '@/lib/utils'

interface TrustBadge {
  icon: string
  label: string
}

const badges: TrustBadge[] = [
  { icon: '🔒', label: 'Sikker betaling' },
  { icon: '🚚', label: 'Gratis frakt over 499 kr' },
  { icon: '↩️', label: '14 dagers angrerett' },
  { icon: '💳', label: 'Visa, Mastercard, Klarna, Vipps' },
]

interface TrustBadgesProps {
  className?: string
}

export function TrustBadges({ className }: TrustBadgesProps) {
  return (
    <div
      className={cn('w-full bg-muted py-3.5', className)}
      role="region"
      aria-label="Trygghetsinformasjon"
    >
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 lg:px-8">
        {badges.map((badge) => (
          <li
            key={badge.label}
            className="flex items-center gap-2 font-sans text-xs font-medium text-foreground/70 tracking-wide"
          >
            <span className="text-base leading-none" aria-hidden="true">
              {badge.icon}
            </span>
            <span>{badge.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
