import { HomeIcon, TruckIcon, RotateCcwIcon, ShieldCheckIcon } from "lucide-react"

const trustItems = [
  { icon: HomeIcon, label: "Norsk nettbutikk" },
  { icon: TruckIcon, label: "Gratis frakt i Norge" },
  { icon: RotateCcwIcon, label: "30 dagers åpent kjøp" },
  { icon: ShieldCheckIcon, label: "Trygg betaling" },
]

function VippsLogo() {
  return (
    <svg viewBox="0 0 60 22" className="h-5 w-auto" aria-label="Vipps" role="img">
      <text x="0" y="17" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="17" fill="#FF5B24">
        vipps
      </text>
    </svg>
  )
}

function KlarnaLogo() {
  return (
    <svg viewBox="0 0 62 22" className="h-5 w-auto" aria-label="Klarna" role="img">
      <rect x="0" y="0" width="62" height="22" rx="4" fill="#FFB3C7" />
      <text x="7" y="16" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="13" fill="#1A1A1A">
        Klarna
      </text>
    </svg>
  )
}

function VisaLogo() {
  return (
    <svg viewBox="0 0 54 22" className="h-5 w-auto" aria-label="Visa" role="img">
      <text x="0" y="18" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="20" fontStyle="italic" fill="#1A1F71">
        VISA
      </text>
    </svg>
  )
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 38 24" className="h-5 w-auto" aria-label="Mastercard" role="img">
      <circle cx="14" cy="12" r="11" fill="#EB001B" />
      <circle cx="24" cy="12" r="11" fill="#F79E1B" />
      <path d="M19 5.3a11 11 0 0 1 0 13.4A11 11 0 0 1 19 5.3Z" fill="#FF5F00" />
    </svg>
  )
}

const paymentItems = [
  { logo: VippsLogo, name: "Vipps" },
  { logo: KlarnaLogo, name: "Klarna" },
  { logo: VisaLogo, name: "Visa" },
  { logo: MastercardLogo, name: "Mastercard" },
]

const boxClass =
  "flex h-16 items-center justify-center rounded-xl border border-[#EAEAEA] bg-white p-3"

export function TrustPaymentGrid() {
  return (
    <div className="space-y-3" role="region" aria-label="Trygghet og betaling">
      {/* Row 1 — Trust */}
      <div className="grid grid-cols-4 gap-3">
        {trustItems.map(({ icon: Icon, label }) => (
          <div key={label} className={boxClass}>
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <Icon className="size-5 text-primary shrink-0" aria-hidden />
              <span className="text-center font-sans text-[11px] leading-tight text-muted-foreground">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 — Payment */}
      <div className="grid grid-cols-4 gap-3">
        {paymentItems.map(({ logo: Logo, name }) => (
          <div key={name} className={boxClass} aria-label={name}>
            <Logo />
          </div>
        ))}
      </div>
    </div>
  )
}
