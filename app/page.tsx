import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap, Code, Palette, Users, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NewsletterForm } from '@/components/newsletter-form'
import { StatCounter } from '@/components/stats-counter'
import { TrustedBy } from '@/components/trusted-by'
import { HeroSlider } from '@/components/hero-slider'

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section with Slider */}
      <HeroSlider />


      {/* Services Preview - Enhanced */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Core Services
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              Everything you need to succeed in the digital world
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Palette, title: 'Web Design', description: 'Beautiful, responsive designs that engage your audience and drive conversions' },
              { icon: Code, title: 'Development', description: 'Robust, scalable solutions built with modern technology and best practices' },
              { icon: Zap, title: 'Performance', description: 'Lightning-fast websites optimized for speed and Core Web Vitals' },
              { icon: Users, title: 'Support', description: '24/7 dedicated support and maintenance for your peace of mind' },
            ].map((service, i) => (
              <div 
                key={i} 
                className="group rounded-xl border border-border bg-card p-6 sm:p-8 hover:border-primary/50 hover:shadow-lg hover:bg-card/80 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Modern */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/newsletter-bg.jpg"
            alt="Newsletter background"
            fill
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-secondary/70 to-primary/80" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            Stay Updated with Tech Insights
          </h2>
          <p className="mb-8 text-lg text-white/80 leading-relaxed">
            Subscribe to our newsletter for exclusive updates, tech trends, and special offers. Join thousands of innovators staying ahead.
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="mb-8 text-lg text-foreground/70 leading-relaxed">
            Let&apos;s discuss how Dynesis Tech can help you achieve your digital goals and accelerate your growth.
          </p>
          <Link href="/contact">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6 px-8 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95">
              Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
