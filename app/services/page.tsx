import Image from 'next/image'
import { CheckCircle, Palette, Code, Smartphone, BarChart3, Shield } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - Dynesis Tech',
  description: 'Discover our comprehensive range of digital services including web design, development, and more.',
}

export default function Services() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Our Services
              </h1>
              <p className="text-lg text-foreground/70">
                Comprehensive digital solutions tailored to your business needs
              </p>
              <p className="text-foreground/60">
                We provide a complete range of services to transform your business and accelerate your digital growth.
              </p>
            </div>
            <div className="relative h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-xl">
              <Image
                src="/images/services.jpg"
                alt="Our Services"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:gap-8">
            {/* Service 1 */}
            <div id="web-design" className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center order-last lg:order-first">
                <span className="text-foreground/60 text-center">
                  <p className="text-2xl font-semibold">Web Design</p>
                  <p className="text-sm">(Premium image will be added)</p>
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Web Design</h2>
                <p className="text-foreground/70 mb-6">
                  Beautiful, user-friendly designs that captivate your audience and drive conversions. Our design team creates stunning visual experiences that reflect your brand identity.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Responsive Design', 'UI/UX Optimization', 'Brand Design', 'Prototype & Wireframing'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Service 2 */}
            <div id="development" className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <span className="text-foreground/60 text-center">
                  <p className="text-2xl font-semibold">Development</p>
                  <p className="text-sm">(Premium image will be added)</p>
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Web Development</h2>
                <p className="text-foreground/70 mb-6">
                  Robust, scalable web applications built with the latest technologies. We combine best practices with innovative solutions to create powerful digital platforms.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Full Stack Development', 'API Integration', 'Database Design', 'Performance Optimization'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Service 3 */}
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center order-last lg:order-first">
                <span className="text-foreground/60 text-center">
                  <p className="text-2xl font-semibold">Mobile Apps</p>
                  <p className="text-sm">(Premium image will be added)</p>
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Mobile Applications</h2>
                <p className="text-foreground/70 mb-6">
                  Native and cross-platform mobile applications that deliver exceptional user experiences. From iOS to Android, we create apps that users love.
                </p>
                <ul className="space-y-3 mb-8">
                  {['iOS Development', 'Android Development', 'React Native', 'App Deployment'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Additional Services
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: BarChart3, id: 'consulting', title: 'Digital Consulting', description: 'Expert guidance on digital strategy and transformation' },
              { icon: Shield, title: 'Security & Compliance', description: 'Secure solutions that meet industry standards' },
              { icon: Code, title: 'Maintenance & Support', description: '24/7 monitoring and ongoing technical support' },
            ].map((service) => (
              <div key={service.title} id={service.id} className="rounded-xl border border-border bg-background p-8">
                <service.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-foreground/70 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
            24/7 Support & Maintenance
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            We don&apos;t just build your project and disappear. Our dedicated support team is always there to help with updates, fixes, and optimizations.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {['Emergency Support', 'Regular Updates', 'Performance Monitoring'].map((item) => (
              <div key={item} className="rounded-lg bg-primary/10 p-6">
                <p className="font-semibold text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
