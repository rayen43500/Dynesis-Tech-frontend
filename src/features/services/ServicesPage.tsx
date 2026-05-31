import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Check, Code2, Layers, Monitor, PenTool, Smartphone } from 'lucide-react';

import { ScrollReveal } from './ScrollReveal';
import './services.css';

const SERVICES = [
  {
    icon: Monitor,
    name: 'Landing Page',
    desc: 'High-converting, beautifully designed pages that turn visitors into clients.',
    checkpoints: ['UX & conversion design', 'Responsive development', 'SEO-ready structure', '2 rounds of revisions'],
    cta: 'Get a Quote →',
    href: '/work-with-us'
  },
  {
    icon: Code2,
    name: 'Web Application',
    desc: 'Scalable, full-stack web apps built for performance, clarity, and long-term maintainability.',
    checkpoints: [
      'Discovery & scoping session',
      'UI/UX design system',
      'Full-stack development',
      'Testing & deployment'
    ],
    cta: 'Get a Quote →',
    href: '/work-with-us'
  },
  {
    icon: Smartphone,
    name: 'Mobile Application',
    desc: 'iOS and Android apps designed for seamless experience and built for real-world usage.',
    checkpoints: ['UX research & prototyping', 'iOS & Android development', 'Backend & API integration', 'App store submission'],
    cta: 'Get a Quote →',
    href: '/work-with-us'
  },
  {
    icon: PenTool,
    name: 'UI/UX Design',
    desc: 'Research-led design that puts your users first and your brand at its best.',
    checkpoints: ['User research & wireframes', 'Interactive prototypes', 'Design system & Figma handoff', 'Usability testing'],
    cta: 'Get a Quote →',
    href: '/work-with-us'
  },
  {
    icon: Brain,
    name: 'AI Solutions',
    desc: 'Integrate intelligent AI features into your product — from smart automation to custom model deployment.',
    checkpoints: [
      'AI feature consulting & scoping',
      'LLM integration & fine-tuning',
      'Automation & workflow AI',
      'Custom model deployment'
    ],
    cta: 'Get a Quote →',
    href: '/work-with-us'
  },
  {
    icon: Layers,
    name: 'Custom Project',
    desc: "Something more complex? Let's scope it together and build the right solution.",
    checkpoints: ['Free discovery call', 'Custom scoping session', 'Tailored proposal', 'Flexible engagement model'],
    cta: "Let's Talk →",
    href: '/work-with-us'
  }
] as const;

const PROCESS_STEPS = [
  {
    num: 1,
    title: 'Discovery',
    desc: 'We start by understanding your goals, users, and constraints.'
  },
  {
    num: 2,
    title: 'Design',
    desc: 'Clean interfaces validated with real feedback before we build.'
  },
  {
    num: 3,
    title: 'Build',
    desc: 'Senior engineers ship clean code on time and without shortcuts.'
  },
  {
    num: 4,
    title: 'Deliver',
    desc: 'We deploy, monitor, and stay available well after launch.'
  }
] as const;

export function ServicesPage() {
  return (
    <div className="services-page">
      <section className="services-hero">
        <ScrollReveal>
          <h1 className="services-hero__line1">What We Build</h1>
          <p className="services-hero__line2">And How We Do It.</p>
          <p className="services-hero__sub">
            From discovery to deployment — we design, build, and evolve digital products with precision and care.
          </p>
        </ScrollReveal>
      </section>

      <section className="services-grid-section">
        <div className="services-grid">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.name} className="services-card" delay={index * 0.1}>
                <div className="services-card__icon" aria-hidden>
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h2 className="services-card__name">{service.name}</h2>
                <p className="services-card__desc">{service.desc}</p>
                <div className="services-card__divider" />
                <p className="services-card__included">What&apos;s included:</p>
                <ul className="services-card__checklist">
                  {service.checkpoints.map((item) => (
                    <li key={item} className="services-card__check-item">
                      <Check className="services-card__check-icon" size={13} strokeWidth={2} aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to={service.href} className="services-card__cta">
                  {service.cta}
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <section className="services-process">
        <ScrollReveal>
          <h2 className="services-process__title">How We Work</h2>
        </ScrollReveal>
        <div className="services-process__track">
          <div className="services-process__line" aria-hidden />
          {PROCESS_STEPS.map((step, index) => (
            <ScrollReveal key={step.title} className="services-process__step" delay={index * 0.1}>
              <div className="services-process__num">{step.num}</div>
              <h3 className="services-process__step-title">{step.title}</h3>
              <p className="services-process__step-desc">{step.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="services-cta">
        <ScrollReveal>
          <h2 className="services-cta__title">Ready to Start?</h2>
          <p className="services-cta__sub">
            Tell us about your project and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="services-cta__actions">
            <Link to="/work-with-us" className="services-cta__btn services-cta__btn--primary">
              Work With Us →
            </Link>
            <Link to="/developers" className="services-cta__btn services-cta__btn--secondary">
              Meet Our Developers
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
