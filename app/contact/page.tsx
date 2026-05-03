import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Dynesis Tech',
  description: 'Get in touch with Dynesis Tech. We\'d love to hear about your project and help you achieve your digital goals.',
}

export default function Contact() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-bg.jpg"
            alt="Contact background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-white/80">
            Have a question or ready to start your next project? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            {[
              {
                icon: Mail,
                title: 'Email',
                content: 'contact@dynesis.tech',
                description: 'We\'ll respond within 24 hours',
              },
              {
                icon: Phone,
                title: 'Phone',
                content: '+1 (555) 123-4567',
                description: 'Available Monday to Friday, 9 AM - 6 PM',
              },
              {
                icon: MapPin,
                title: 'Location',
                content: 'New York, USA',
                description: 'Remote collaboration available worldwide',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm font-medium text-foreground/80">{item.content}</p>
                <p className="text-xs text-foreground/60 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              Send us a Message
            </h2>
            <p className="text-lg text-foreground/70">
              Tell us about your project and what you&apos;re looking to accomplish. We&apos;ll get back to you with a customized proposal.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'How quickly will I hear back from your team?',
                a: 'We typically respond to all inquiries within 24 business hours. For urgent matters, please include that in your message.',
              },
              {
                q: 'Do you offer free consultations?',
                a: 'Yes! We offer a complimentary 30-minute consultation to discuss your project requirements and goals.',
              },
              {
                q: 'What areas do you serve?',
                a: 'We serve clients globally. While we\'re based in New York, we work with teams and businesses worldwide through remote collaboration.',
              },
              {
                q: 'How do I request an invoice or quote?',
                a: 'Select "Devis / Factures" in the request type field on our contact form, and we\'ll process your request accordingly.',
              },
              {
                q: 'Can I subscribe to your newsletter?',
                a: 'Absolutely! You can subscribe through the contact form or visit our homepage newsletter signup. We share tech insights, tips, and exclusive updates.',
              },
              {
                q: 'What\'s your typical project timeline?',
                a: 'Project timelines vary based on scope. During our initial consultation, we\'ll provide a realistic estimate for your specific needs.',
              },
            ].map((item, i) => (
              <details
                key={i}
                className="group border-b border-border pb-6 last:border-b-0"
              >
                <summary className="cursor-pointer font-semibold text-foreground hover:text-primary transition-colors">
                  {item.q}
                </summary>
                <p className="mt-3 text-foreground/70">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-foreground/70 mb-8">
            Let&apos;s discuss how Dynesis Tech can help you achieve your digital goals.
          </p>
          <a href="#form" className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-8 rounded-lg transition-all">
            Start Your Project
          </a>
        </div>
      </section>
    </div>
  )
}
