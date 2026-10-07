import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { locations } from '@/content/locations'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '')
  return [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    ...locations.map((l) => ({
      url: `${base}/${l.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/cookies`, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
