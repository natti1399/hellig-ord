import Link from "next/link"
import { Separator } from "@/components/ui/separator"

interface FooterLinkGroup {
  heading: string
  links: Array<{ href: string; label: string }>
}

const linkGroups: FooterLinkGroup[] = [
  {
    heading: "Butikk",
    links: [
      { href: "/produkter", label: "Alle produkter" },
      { href: "/om-oss", label: "Om oss" },
    ],
  },
  {
    heading: "Kundeservice",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/kontakt", label: "Kontakt oss" },
      { href: "/frakt-og-retur", label: "Frakt og retur" },
      { href: "/personvern", label: "Personvern" },
    ],
  },
]

function VippsLogo() {
  return (
    <svg viewBox="0 0 60 22" style={{ height: 20, width: "auto" }} aria-label="Vipps" role="img">
      <text x="0" y="17" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="17" fill="#FF5B24">
        vipps
      </text>
    </svg>
  )
}

function KlarnaLogo() {
  return (
    <svg viewBox="0 0 62 22" style={{ height: 20, width: "auto" }} aria-label="Klarna" role="img">
      <rect x="0" y="0" width="62" height="22" rx="4" fill="#FFB3C7" />
      <text x="7" y="16" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="13" fill="#1A1A1A">
        Klarna
      </text>
    </svg>
  )
}

function VisaLogo() {
  return (
    <svg viewBox="0 0 54 22" style={{ height: 20, width: "auto" }} aria-label="Visa" role="img">
      <text x="0" y="18" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="20" fontStyle="italic" fill="#1A1F71">
        VISA
      </text>
    </svg>
  )
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 38 24" style={{ height: 20, width: "auto" }} aria-label="Mastercard" role="img">
      <circle cx="14" cy="12" r="11" fill="#EB001B" />
      <circle cx="24" cy="12" r="11" fill="#F79E1B" />
      <path d="M19 5.3a11 11 0 0 1 0 13.4A11 11 0 0 1 19 5.3Z" fill="#FF5F00" />
    </svg>
  )
}

const paymentLogos = [
  { Logo: VippsLogo, name: "Vipps" },
  { Logo: KlarnaLogo, name: "Klarna" },
  { Logo: VisaLogo, name: "Visa" },
  { Logo: MastercardLogo, name: "Mastercard" },
]

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border/50" role="contentinfo">
      {/* Bible verse banner */}
      <div className="w-full bg-primary/5 border-b border-border/40 py-6 px-4 text-center">
        <blockquote className="mx-auto max-w-2xl">
          <p className="font-heading text-base italic text-primary/80 leading-relaxed">
            &ldquo;Ditt ord er en lykt for min fot og et lys på min sti.&rdquo;
          </p>
          <cite className="mt-2 block text-xs text-muted-foreground tracking-widest uppercase not-italic">
            Salmenes bok 119:105
          </cite>
        </blockquote>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <div>
              <Link href="/" className="group inline-flex flex-col leading-tight" aria-label="Hellig Ord – gå til forsiden">
                <span className="font-heading text-2xl font-bold text-primary tracking-tight group-hover:opacity-80 transition-opacity duration-150">
                  Hellig Ord
                </span>
                <span className="font-heading text-xs italic text-muted-foreground tracking-widest mt-0.5">
                  Ord for hjertet
                </span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Vi tilbyr vakre kristne produkter som bringer Guds ord nærmere hjertet. Hvert produkt er laget med kjærlighet og omtanke.
            </p>
          </div>

          {/* Link columns */}
          {linkGroups.map((group) => (
            <div key={group.heading} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-foreground tracking-widest uppercase">
                {group.heading}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {group.links.map((link) => {
                  const isExternal = link.href.startsWith("http")
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        {...(isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 hover:underline underline-offset-4"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment logos */}
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          {paymentLogos.map(({ Logo, name }) => (
            <div key={name} className="flex items-center justify-center">
              <Logo />
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border/60" />

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground text-center sm:text-left">
          &copy; 2026 Hellig Ord. Alle rettigheter reservert.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/personvern"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            Personvern
          </Link>
          <Link
            href="/vilkar"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            Kjøpsvilkår
          </Link>
          <Link
            href="/informasjonskapsler"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            Informasjonskapsler
          </Link>
        </div>
      </div>
    </footer>
  )
}
