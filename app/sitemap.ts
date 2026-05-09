import type { MetadataRoute } from 'next'

const paths = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/pricing',
  '/blog',
  '/contact',
  '/login',
  '/register',
  '/forgot-password',
  '/resend-verification',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const lastModified = new Date()

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }))
}
