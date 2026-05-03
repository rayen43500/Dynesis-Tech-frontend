import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap, Code, Palette, Users, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NewsletterForm } from '@/components/newsletter-form'
import { StatCounter } from '@/components/stats-counter'
import { TrustedBy } from '@/components/trusted-by'

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section - Modern with Background */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-40">
        {/* Background Image with Overlay (better contrast) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg-light.jpg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Dark scrim + subtle gradient for text readability */}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
          {/* Subtle vignette */}
          <div className="absolute inset-0 [background:radial-gradient(70%_60%_at_50%_40%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.45)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 text-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white font-medium backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Digital Solutions</span>
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
                Accelerate Your Digital Growth
              </h1>
              <p className="text-balance text-lg text-white/80 sm:text-xl leading-relaxed mx-auto max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                Transform your business with cutting-edge web design, development, and AI solutions. We deliver results that drive real growth.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6 px-8 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-white/30 hover:border-white/60 hover:bg-white/10 text-base py-6 px-8 font-semibold transition-all duration-300"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>

            {/* Stats with Animations */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-8">
              <StatCounter value={50} label="Projects" suffix="+" />
              <StatCounter value={40} label="Clients" suffix="+" />
              <StatCounter value={8} label="Years" suffix="+" />
            </div>

            {/* Trusted By Section */}
            <TrustedBy />
          </div>
        </div>
      </section>

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
