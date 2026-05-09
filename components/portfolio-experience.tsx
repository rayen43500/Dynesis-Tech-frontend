'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink, Quote } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Development',
    description: 'Checkout optimisé, catalogue scalable, intégration paiements.',
    image: '/images/project-1.jpg',
    client: 'TechStore Inc.',
    year: '2023',
    result: '+32% conversion',
  },
  {
    id: 2,
    title: 'SaaS Dashboard',
    category: 'Design & Development',
    description: 'UI data-dense, accessibilité, temps de chargement sous contrôle.',
    image: '/images/project-2.jpg',
    client: 'DataViz Pro',
    year: '2023',
    result: '-40% time-to-insight',
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    category: 'Mobile Development',
    description: 'Parcours sécurisé, biométrie, conformité et UX premium.',
    image: '/images/project-3.jpg',
    client: 'FinanceHub',
    year: '2024',
    result: '4.8★ App Store',
  },
]

const caseStudy = {
  title: 'Refonte e-commerce — parcours d’achat',
  challenge:
    'Trop d’étapes, panier abandonné élevé, performance mobile en baisse sur les pages produit.',
  approach:
    'Audit UX, design system, optimisation Core Web Vitals, A/B testing sur le tunnel de commande.',
  outcome:
    'Tunnel simplifié, pages produit plus rapides, meilleure clarté des CTA et confiance renforcée (avis, garanties).',
  beforeImage: '/images/project-1.jpg',
  afterImage: '/images/project-2.jpg',
}

const testimonials = [
  {
    quote:
      'Livraison propre, communication claire, et une équipe qui comprend vraiment le produit. Le nouveau site reflète enfin notre positionnement.',
    name: 'Alexandra M.',
    role: 'CMO, TechScale',
  },
  {
    quote:
      'On cherchait de la rigueur technique + du soin UI. Mission accomplie : perf au vert et design premium.',
    name: 'Jordan P.',
    role: 'Founder, Northline',
  },
  {
    quote:
      'Le dashboard est devenu lisible pour toute l’équipe. Les décisions sont plus rapides, avec moins de friction.',
    name: 'Samira K.',
    role: 'Head of Ops, DataViz Pro',
  },
]

const fadeUp = (reduce: boolean, delay = 0) => ({
  initial: { opacity: 0, y: reduce ? 0 : 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: reduce ? 0 : 0.45, delay: reduce ? 0 : delay },
})

export function PortfolioExperience() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p
            className="text-sm font-medium uppercase tracking-widest text-primary"
            {...fadeUp(!!reduceMotion)}
          >
            Selected work
          </motion.p>
          <motion.h1
            className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            {...fadeUp(!!reduceMotion, 0.05)}
          >
            Portfolio premium, pensé pour convertir
          </motion.h1>
          <motion.p
            className="mt-5 text-lg text-muted-foreground"
            {...fadeUp(!!reduceMotion, 0.1)}
          >
            Études de cas, mockups visuels, avant/après et résultats mesurables — le niveau d’une agence sérieuse.
          </motion.p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.article
                key={project.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
                {...fadeUp(!!reduceMotion, i * 0.06)}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="space-y-3 p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {project.category}
                    </span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{project.title}</h2>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{project.client}</span>
                    <span>{project.year}</span>
                    <span className="ml-auto rounded-md bg-secondary/30 px-2 py-1 font-semibold text-secondary-foreground">
                      {project.result}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div className="mb-12 max-w-2xl" {...fadeUp(!!reduceMotion)}>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Étude de cas — avant / après
            </h2>
            <p className="mt-3 text-muted-foreground">
              {caseStudy.title}
            </p>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <motion.div className="space-y-4" {...fadeUp(!!reduceMotion, 0.05)}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Avant
              </p>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-md">
                <Image
                  src={caseStudy.beforeImage}
                  alt="Avant refonte"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
            <motion.div className="space-y-4" {...fadeUp(!!reduceMotion, 0.1)}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Après
              </p>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary/20 shadow-lg ring-2 ring-primary/10">
                <Image
                  src={caseStudy.afterImage}
                  alt="Après refonte"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 grid gap-6 rounded-2xl border border-border bg-card p-8 md:grid-cols-3"
            {...fadeUp(!!reduceMotion, 0.12)}
          >
            <div>
              <h3 className="text-sm font-semibold text-foreground">Problème</h3>
              <p className="mt-2 text-sm text-muted-foreground">{caseStudy.challenge}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Approche</h3>
              <p className="mt-2 text-sm text-muted-foreground">{caseStudy.approach}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Résultat</h3>
              <p className="mt-2 text-sm text-muted-foreground">{caseStudy.outcome}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            {...fadeUp(!!reduceMotion)}
          >
            Témoignages clients
          </motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
                {...fadeUp(!!reduceMotion, i * 0.07)}
              >
                <Quote className="h-8 w-8 text-primary/40" aria-hidden />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4 text-sm">
                  <span className="font-semibold text-foreground">{t.name}</span>
                  <p className="text-muted-foreground">{t.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

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
                <p className="text-4xl font-bold text-foreground">{stat.number}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          {...fadeUp(!!reduceMotion)}
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Un projet du même niveau ?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Racontez-nous votre contexte : nous alignons design, perf et stack pour un résultat durable.
          </p>
          <Link href="/contact" className="mt-8 inline-block">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold shadow-lg">
              Démarrer un projet <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
