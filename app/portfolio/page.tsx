import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio - Dynesis Tech',
  description: 'Explore our impressive portfolio of completed projects and success stories.',
}

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Development',
      description: 'A full-featured e-commerce platform with payment integration',
      image: '/images/project-1.jpg',
      client: 'TechStore Inc.',
      year: '2023',
    },
    {
      id: 2,
      title: 'SaaS Dashboard',
      category: 'Design & Development',
      description: 'Analytics and management dashboard for a SaaS company',
      image: '/images/project-2.jpg',
      client: 'DataViz Pro',
      year: '2023',
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      category: 'Mobile Development',
      description: 'Secure mobile banking application with biometric authentication',
      image: '/images/project-3.jpg',
      client: 'FinanceHub',
      year: '2024',
    },
  ]

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Portfolio
          </h1>
          <p className="mt-6 text-lg text-foreground/70">
            Showcasing our best work and successful client projects
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group rounded-xl border border-border overflow-hidden bg-card hover:border-primary/50 hover:shadow-xl transition-all"
              >
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground bg-primary">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-foreground/60 mb-4">{project.description}</p>

                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-foreground/70">{project.client}</p>
                      <p className="text-xs text-foreground/50">{project.year}</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-foreground/40 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { number: '50+', label: 'Projects Delivered' },
              { number: '40+', label: 'Happy Clients' },
              { number: '100%', label: 'Satisfaction Rate' },
              { number: '8+', label: 'Years in Business' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-slate-900 mb-2">{stat.number}</p>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Interested in a similar project?
          </h2>
          <p className="mb-8 text-lg text-slate-600">
            Let&apos;s discuss your vision and how we can bring it to life.
          </p>
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base py-6 px-8">
              Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
