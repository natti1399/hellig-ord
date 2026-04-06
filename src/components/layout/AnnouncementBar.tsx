const announcements = [
  "✝ Gratis levering i hele Norge ✝",
  "✝ 30 dagers åpent kjøp ✝",
  "✝ Trygg betaling med Vipps og Klarna ✝",
]

export function AnnouncementBar() {
  return (
    <div
      className="w-full bg-primary text-primary-foreground py-2 px-4 text-center text-xs tracking-widest uppercase font-sans"
      role="banner"
      aria-label="Tilbudsinformasjon"
    >
      <p className="font-medium">
        {announcements[0]}
        <span className="hidden sm:inline">
          {" "}
          &nbsp;·&nbsp; {announcements[1]}
          &nbsp;·&nbsp; {announcements[2]}
        </span>
      </p>
    </div>
  )
}
