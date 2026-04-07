"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ShoppingBag, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface NavLink {
  href: string
  label: string
}

const navLinks: NavLink[] = [
  { href: "/", label: "Hjem" },
  { href: "/produkter", label: "Produkter" },
  { href: "/om-oss", label: "Om Oss" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/faq", label: "FAQ" },
]

function NavItem({ href, label }: NavLink) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} className="relative group flex items-center">
      <motion.span
        className={cn(
          "text-sm font-medium tracking-wide transition-colors duration-200",
          isActive
            ? "text-primary"
            : "text-foreground/70 hover:text-foreground"
        )}
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {label}
      </motion.span>
      <span
        className={cn(
          "absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300",
          isActive ? "w-full" : "w-0 group-hover:w-full"
        )}
      />
    </Link>
  )
}

function CartButton({ itemCount = 0 }: { itemCount?: number }) {
  return (
    <Link href="/handlekurv" aria-label={`Handlekurv, ${itemCount} varer`}>
      <motion.div
        className="relative flex items-center justify-center size-11 rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <ShoppingBag className="size-5" />
        {itemCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold leading-none">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        )}
      </motion.div>
    </Link>
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-background transition-shadow duration-300",
        scrolled ? "shadow-sm border-b border-border/60" : ""
      )}
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex flex-col leading-tight group" aria-label="Hellig Ord – gå til forsiden">
          <motion.span
            className="font-heading text-xl font-bold text-primary tracking-tight"
            whileHover={{ opacity: 0.85 }}
            transition={{ duration: 0.15 }}
          >
            Hellig Ord
          </motion.span>
          <span className="font-heading text-[10px] italic text-muted-foreground tracking-widest -mt-0.5">
            Ord for hjertet
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Hovednavigasjon"
        >
          {navLinks.map((link) => (
            <NavItem key={link.href} {...link} />
          ))}
        </nav>

        {/* Right: Cart + mobile menu */}
        <div className="flex items-center gap-2">
          <CartButton itemCount={0} />

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden inline-flex items-center justify-center size-11 rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Åpne meny"
            >
              <Menu className="size-5" />
            </button>
            <SheetContent side="right" className="w-full max-w-xs p-0">
              <SheetHeader className="p-6 pb-4 border-b border-border/50">
                <SheetTitle className="font-heading text-xl text-primary text-left">
                  Hellig Ord
                </SheetTitle>
                <p className="font-heading text-xs italic text-muted-foreground tracking-widest text-left -mt-1">
                  Ord for hjertet
                </p>
              </SheetHeader>
              <nav
                className="flex flex-col gap-1 p-4"
                aria-label="Mobilnavigasjon"
              >
                {navLinks.map((link) => (
                  <MobileNavItem
                    key={link.href}
                    {...link}
                    onClose={() => setMobileOpen(false)}
                  />
                ))}
              </nav>
              <div className="absolute bottom-6 left-6 right-6">
                <Link
                  href="/handlekurv"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                >
                  <ShoppingBag className="size-4" />
                  Handlekurv
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function MobileNavItem({
  href,
  label,
  onClose,
}: NavLink & { onClose: () => void }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClose}
      className={cn(
        "flex items-center rounded-lg px-3 py-3 text-base font-medium transition-colors duration-150",
        isActive
          ? "bg-muted text-primary"
          : "text-foreground/80 hover:bg-muted hover:text-foreground"
      )}
    >
      {label}
      {isActive && (
        <span className="ml-auto size-1.5 rounded-full bg-primary" />
      )}
    </Link>
  )
}
