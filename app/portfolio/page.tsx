import type { Metadata } from 'next'
import { PortfolioExperience } from '@/components/portfolio-experience'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Portfolio - Dynesis Tech',
  description:
    'Études de cas, refontes avant/après et projets web & mobile livrés avec exigence design + performance.',
  openGraph: {
    title: 'Portfolio - Dynesis Tech',
    description: 'Sélection de projets premium : e-commerce, SaaS et applications mobiles.',
    url: `${siteUrl}/portfolio`,
    siteName: 'Dynesis Tech',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Dynesis Tech',
    description: 'Sélection de projets premium : e-commerce, SaaS et applications mobiles.',
  },
}

export default function PortfolioPage() {
  return <PortfolioExperience />
}
