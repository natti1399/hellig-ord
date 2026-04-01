import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgePillVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-[11px] font-semibold tracking-wide leading-none whitespace-nowrap',
  {
    variants: {
      variant: {
        bestselger: 'bg-accent text-accent-foreground',
        ny: 'bg-primary text-primary-foreground',
        begrenset: 'bg-secondary text-secondary-foreground',
        gratisFrakt: 'bg-muted text-muted-foreground border border-border',
      },
    },
    defaultVariants: {
      variant: 'bestselger',
    },
  }
)

type BadgeVariant = NonNullable<VariantProps<typeof badgePillVariants>['variant']>

const BADGE_LABELS: Record<BadgeVariant, string> = {
  bestselger: 'Bestselger',
  ny: 'Ny',
  begrenset: 'Begrenset opplag',
  gratisFrakt: 'Gratis frakt',
}

interface BadgePillProps {
  variant: BadgeVariant
  className?: string
}

export function BadgePill({ variant, className }: BadgePillProps) {
  return (
    <span className={cn(badgePillVariants({ variant }), className)}>
      {BADGE_LABELS[variant]}
    </span>
  )
}

export type { BadgeVariant }

interface ProductBadgesProps {
  badges: BadgeVariant[]
  className?: string
  layout?: 'horizontal' | 'vertical'
}

export function ProductBadges({
  badges,
  className,
  layout = 'horizontal',
}: ProductBadgesProps) {
  if (badges.length === 0) return null

  return (
    <div
      className={cn(
        'flex flex-wrap gap-1.5',
        layout === 'vertical' && 'flex-col items-start',
        className
      )}
      aria-label="Produktmerker"
    >
      {badges.map((variant) => (
        <BadgePill key={variant} variant={variant} />
      ))}
    </div>
  )
}
