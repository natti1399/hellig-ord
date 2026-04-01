// All data is static and server-controlled — dangerouslySetInnerHTML is safe here.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hellig Ord',
  url: 'https://helligeord.no',
  description:
    'Hellig Ord er en norsk nettbutikk som tilbyr vakre kristne produkter, bibelvers og gaver som inspirerer troen din. Vi selger alt fra plakater og smykker til personlige gaveartikler – alt skapt med kjærlighet og omtanke for troende hjerter.',
  logo: {
    '@type': 'ImageObject',
    url: 'https://helligeord.no/logo.png',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: {
      '@type': 'Language',
      name: 'Norwegian',
      alternateName: 'nb',
    },
  },
  sameAs: [],
}

// Hoisted outside the component — static JSX, never changes between renders.
const serialised = JSON.stringify(jsonLd)

export default function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialised }}
    />
  )
}
