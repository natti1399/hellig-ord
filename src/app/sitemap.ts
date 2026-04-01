import type { MetadataRoute } from 'next'

const BASE_URL = 'https://helligeord.no'

const mockProductHandles = [
  'bibelvers-plakat-guds-naade',
  'trekors-halskjede-sølv',
  'kristne-gaveesker-sett',
  'lovsang-notatbok',
  'bønnebok-innbundet',
  'bibelsitat-veggdekor',
  'kristen-kopp-med-vers',
  'advent-lysestake',
  'dåpsgave-sølvramme',
  'konfirmasjonsbibel-innbundet',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/produkter`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/om-oss`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  const productRoutes: MetadataRoute.Sitemap = mockProductHandles.map(
    (handle) => ({
      url: `${BASE_URL}/produkter/${handle}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  )

  return [...staticRoutes, ...productRoutes]
}
