import type { MetadataRoute } from 'next'
import { getProducts, getProjects } from '@/lib/data'

// Базовый URL берётся из env (так же, как Payload serverURL).
// Если не задан — fallback на относительные пути (Google всё равно соберёт).
const BASE = process.env.NEXT_PUBLIC_SERVER_URL || ''

const STATIC: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/',         priority: 1.0, freq: 'weekly' },
  { path: '/catalog',  priority: 0.9, freq: 'daily' },
  { path: '/projects', priority: 0.8, freq: 'weekly' },
  { path: '/gallery',  priority: 0.7, freq: 'weekly' },
  { path: '/horeca',   priority: 0.8, freq: 'monthly' },
  { path: '/about',    priority: 0.6, freq: 'monthly' },
  { path: '/care',     priority: 0.5, freq: 'monthly' },
  { path: '/journal',  priority: 0.6, freq: 'monthly' },
  { path: '/order',    priority: 0.7, freq: 'monthly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const [products, projects] = await Promise.all([
    getProducts({ limit: 1000 }).catch(() => []),
    getProjects({ limit: 1000 }).catch(() => []),
  ])

  return [
    ...STATIC.map((s) => ({
      url: BASE + s.path,
      lastModified: now,
      changeFrequency: s.freq,
      priority: s.priority,
    })),
    ...products.map((p) => ({
      url: `${BASE}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...projects.map((pr) => ({
      url: `${BASE}/projects/${pr.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
