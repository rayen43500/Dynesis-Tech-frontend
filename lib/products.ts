export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  images?: string[]
  features?: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'starter',
    name: 'Starter Package',
    description: 'Perfect for small projects and startups',
    priceInCents: 29999, // $299.99
    features: ['Basic website design', 'Mobile responsive', '5 pages', 'Contact form', 'Email support'],
  },
  {
    id: 'professional',
    name: 'Professional Package',
    description: 'Ideal for growing businesses',
    priceInCents: 79999, // $799.99
    features: ['Advanced design system', 'Fully responsive', 'Up to 20 pages', 'CMS integration', 'SEO optimization', 'Analytics setup', 'Priority support'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Package',
    description: 'Complete custom solutions for large organizations',
    priceInCents: 199999, // $1999.99
    features: ['Custom architecture', 'Full responsiveness', 'Unlimited pages', 'Full CMS integration', 'Advanced SEO', 'Custom integrations', '24/7 support', 'Performance optimization'],
  },
]
