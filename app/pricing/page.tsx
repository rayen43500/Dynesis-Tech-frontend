import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Checkout } from '@/components/checkout'
import { PRODUCTS } from '@/lib/products'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Dynesis Tech',
  description: 'Transparent pricing for our web design and development services. Choose the plan that fits your needs.',
}

export default function Pricing() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-6 text-lg text-foreground/70">
            Choose the perfect plan for your project. All plans include support and updates.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3 lg:gap-6">
            {PRODUCTS.map((product, index) => {
              const isPopular = index === 1
              return (
                <div
                  key={product.id}
                  className={`relative rounded-2xl border transition-all duration-300 ${
                    isPopular
                      ? 'border-blue-600 shadow-2xl md:scale-105'
                      : 'border-border hover:border-border hover:shadow-lg'
                  } overflow-hidden`}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-sm font-semibold py-2">
                      MOST POPULAR
                    </div>
                  )}

                  <div className={`p-8 ${isPopular ? 'pt-16' : ''}`}>
                    {/* Header */}
                    <h3 className="text-2xl font-bold text-foreground mb-2">{product.name}</h3>
                    <p className="text-foreground/70 text-sm mb-6">{product.description}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-foreground">
                        ${(product.priceInCents / 100).toFixed(2)}
                      </span>
                      <p className="text-foreground/70 text-sm mt-2">one-time payment</p>
                    </div>

                    {/* CTA Button */}
                    <div className="mb-8">
                      <Checkout productId={product.id} />
                    </div>

                    {/* Features */}
                    <div className="border-t border-border pt-8">
                      <p className="text-sm font-semibold text-foreground mb-4">What&apos;s included:</p>
                      <ul className="space-y-3">
                        {product.features?.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground/70">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'Can I upgrade or change my plan?',
                answer: 'Yes, absolutely! You can upgrade or downgrade your plan at any time. We&apos;ll adjust your billing accordingly.',
              },
              {
                question: 'What happens after the project is complete?',
                answer: 'All plans include ongoing support and maintenance for the first 12 months. Additional support packages are available.',
              },
              {
                question: 'Do you offer custom pricing?',
                answer: 'Of course! If you have specific needs that don&apos;t fit our packages, contact us for a custom quote.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards through Stripe. Enterprise customers can arrange invoicing.',
              },
              {
                question: 'Is there a money-back guarantee?',
                answer: 'We&apos;re confident in our work. If you&apos;re not satisfied within 30 days, we&apos;ll work with you to make it right.',
              },
              {
                question: 'How long does a project typically take?',
                answer: 'Timeline depends on complexity. Starter projects: 4-6 weeks, Professional: 8-12 weeks, Enterprise: custom timeline.',
              },
            ].map((faq, i) => (
              <div key={i} className="rounded-lg border border-border bg-background p-6">
                <h3 className="font-semibold text-foreground mb-3">{faq.question}</h3>
                <p className="text-foreground/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Ready to get started?
          </h2>
          <p className="mb-8 text-lg text-foreground/70">
            Choose your plan above or contact us to discuss a custom solution.
          </p>
          <Link href="/contact">
            <Button variant="outline" className="border-border text-foreground text-base py-6 hover:bg-muted/30">
              Contact Us for Custom Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
