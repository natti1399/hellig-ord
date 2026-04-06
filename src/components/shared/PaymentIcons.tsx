interface PaymentIconsProps {
  className?: string
  size?: 'sm' | 'md'
}

export function PaymentIcons({ className = '', size = 'md' }: PaymentIconsProps) {
  const h = size === 'sm' ? 'h-5' : 'h-7'

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label="Betalingsmetoder">
      {/* Vipps */}
      <svg className={h} viewBox="0 0 80 24" fill="none" aria-label="Vipps" role="img">
        <rect width="80" height="24" rx="4" fill="#FF5B24" />
        <text x="40" y="16" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">Vipps</text>
      </svg>

      {/* Klarna */}
      <svg className={h} viewBox="0 0 80 24" fill="none" aria-label="Klarna" role="img">
        <rect width="80" height="24" rx="4" fill="#FFB3C7" />
        <text x="40" y="16" textAnchor="middle" fill="#0A0B09" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">Klarna</text>
      </svg>

      {/* Visa */}
      <svg className={h} viewBox="0 0 48 24" fill="none" aria-label="Visa" role="img">
        <rect width="48" height="24" rx="4" fill="#1A1F71" />
        <text x="24" y="16" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif" fontStyle="italic">VISA</text>
      </svg>

      {/* Mastercard */}
      <svg className={h} viewBox="0 0 48 24" fill="none" aria-label="Mastercard" role="img">
        <rect width="48" height="24" rx="4" fill="#252525" />
        <circle cx="19" cy="12" r="7" fill="#EB001B" />
        <circle cx="29" cy="12" r="7" fill="#F79E1B" />
        <path d="M24 6.8a7 7 0 0 1 0 10.4 7 7 0 0 1 0-10.4z" fill="#FF5F00" />
      </svg>
    </div>
  )
}
