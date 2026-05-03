import { Award, Globe, Heart, Zap } from 'lucide-react'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Dynesis Tech',
  description: 'Learn about Dynesis Tech\'s mission, values, and the team behind your digital transformation.',
}

export default function About() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            About Dynesis Tech
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed">
            We&apos;re a team of passionate innovators dedicated to transforming businesses through cutting-edge digital solutions. Since 2015, we&apos;ve been helping companies achieve extraordinary growth.
          </p>
          <div className="pt-6">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
              Trusted by 40+ leading companies worldwide
            </span>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-foreground/70 leading-relaxed">
                To empower businesses with innovative digital solutions that drive measurable growth and create lasting value. We combine strategic thinking, cutting-edge technology, and creative excellence to deliver results that exceed expectations.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-foreground/70 leading-relaxed">
                To be the trusted partner for digital transformation, recognized for delivering exceptional results and fostering long-term relationships. We envision a future where technology and human creativity converge to create extraordinary digital experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-xl">
              <Image
                src="/images/about.jpg"
                alt="Dynesis Tech Team"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  Founded in 2015, Dynesis Tech began with a simple mission: to help businesses thrive in the digital age. What started as a small team of three has grown into a full-service digital agency serving clients globally with excellence and innovation.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  We believe that great design and solid development go hand-in-hand. Every project we undertake is an opportunity to create something extraordinary and drive real impact for our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Core Values
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Zap, title: 'Innovation', description: 'We stay ahead of industry trends and embrace new technologies.' },
              { icon: Heart, title: 'Passion', description: 'We care deeply about our work and our clients\' success.' },
              { icon: Globe, title: 'Global Reach', description: 'We serve clients worldwide with the highest standards.' },
              { icon: Award, title: 'Excellence', description: 'Quality and attention to detail are paramount in everything we do.' },
            ].map((value, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-8 hover:border-primary/50 hover:shadow-lg hover:bg-card/80 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div className="rounded-lg bg-primary/10 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meet Our Team
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder', email: 'sarah@dynesis.tech' },
              { name: 'Michael Chen', role: 'Lead Developer', email: 'michael@dynesis.tech' },
              { name: 'Emma Rodriguez', role: 'Design Director', email: 'emma@dynesis.tech' },
              { name: 'David Kim', role: 'Full Stack Developer', email: 'david@dynesis.tech' },
              { name: 'Lisa Anderson', role: 'Project Manager', email: 'lisa@dynesis.tech' },
              { name: 'James Wilson', role: 'Marketing Specialist', email: 'james@dynesis.tech' },
            ].map((member, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-8 text-center hover:shadow-lg transition-shadow">
                <div className="mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto" />
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-foreground/60 mb-2">{member.role}</p>
                <p className="text-xs text-primary">{member.email}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
