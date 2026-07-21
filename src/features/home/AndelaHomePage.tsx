import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useHomePageContent } from '../../shared/hooks/useSiteContent';
import { usePublicPricingPlans, type PricingPlan } from '../pricing/pricingHooks';
import { HomePageSections } from './HomePageSections';
import './andela-home.css';
import './home-sections.css';

export function AndelaHomePage() {
  const content = useHomePageContent();
  const tech = useMemo(() => [...content.techStack, ...content.techStack], [content.techStack]);

  return (
    <div className="andela-page">
      <main>
        <section className="andela-hero-top">
          <div className="andela-hero-headline">
            <h1 className="andela-h1">
              <span className="andela-h1__line1">{content.headline1}</span>
              <span className="andela-h1__line2">{content.headline2}</span>
            </h1>
            <p className="andela-hero-sub">{content.subheading}</p>
            <div className="andela-checkrow" aria-label={content.headline1}>
              {content.features.map((f) => (
                <span key={f} className="andela-check">
                  <span className="andela-check__mark">✓</span>
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-card" aria-label={content.featuredPerson.name}>
            <div className="floating-card profile-card">
              <div className="profile-top">
                <div className="profile-name">{content.featuredPerson.name}</div>
                <div className="match-badge">
                  <span className="match-dot" aria-hidden />
                  {content.matchBadge}
                </div>
              </div>
              <p className="profile-title">{content.featuredPerson.title}</p>
            </div>

            <img className="hero-card__photo" src={content.heroImage} alt="" loading="eager" />

            <div className="hero-card__pills" aria-hidden>
              <div className="tech-track">
                <div className="tech-strip">
                  {tech.map((label, idx) => (
                    <span key={`${label}-${idx}`} className="pill">
                      <span className="pill-dot" aria-hidden />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="cta-row">
          <Link className="btn-lg btn-lg--primary" to={content.button1Href}>
            {content.button1}
            <span aria-hidden>→</span>
          </Link>
          <Link className="btn-lg btn-lg--secondary" to={content.button2Href}>
            {content.button2}
          </Link>
        </section>

        <section className="ratings">
          <div className="ratings__inner">
            <span className="g2dot" aria-hidden>
              G2
            </span>
            <span className="rating-num">{content.ratingScore}</span>
            <span className="stars" aria-hidden>
              ★★★★½
            </span>
            <span className="reviews">| {content.reviewCountText}</span>
          </div>
        </section>

        <section className="testimonials">
          <div className="testimonials__inner">
            <h2 className="testimonials__title">{content.testimonialsHeading}</h2>
            <div className="tgrid">
              {content.testimonials.map((item) => (
                <article key={`${item.name}-${item.quote.slice(0, 24)}`} className="tcard">
                  <div className="tstars" aria-hidden>
                    ★★★★★
                  </div>
                  <p className="tquote">{item.quote}</p>
                  <div className="tfoot">
                    <div>
                      <div className="tname">{item.name}</div>
                      <div className="trole">{item.role}</div>
                    </div>
                    <div className="tlogo" aria-hidden>
                      Co
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section Services / Tarifs */}
        <HomePricingSection />

        <HomePageSections />
      </main>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Section Services — adaptée au fond blanc de la page d'accueil
   ──────────────────────────────────────────────────────────────── */
const SERVICE_META: Record<string, { icon: string; accentColor: string; lightBg: string; lightBorder: string }> = {
  vitrine:    { icon: '🌐', accentColor: '#2d6a4f', lightBg: '#edf7f2', lightBorder: '#b8ddc8' },
  blockchain: { icon: '🔗', accentColor: '#1a1a1a', lightBg: '#f5f5f5', lightBorder: '#d6d6d6' },
  custom:     { icon: '⚙️', accentColor: '#4a5e3a', lightBg: '#f0f4ed', lightBorder: '#c5d4bb' },
  other:      { icon: '💡', accentColor: '#2d6a4f', lightBg: '#edf7f2', lightBorder: '#b8ddc8' }
};

function ServiceCard({ plan }: { plan: PricingPlan }) {
  const meta = SERVICE_META[plan.category] ?? SERVICE_META.other;

  return (
    <article
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 28px 28px',
        borderRadius: '16px',
        background: '#ffffff',
        border: plan.highlighted ? `2px solid ${meta.lightBorder}` : '1px solid #e8e8e8',
        boxShadow: plan.highlighted
          ? `0 8px 32px rgba(0,0,0,0.08), 0 0 0 3px ${meta.lightBg}`
          : '0 2px 8px rgba(0,0,0,0.06)'
      }}
    >
      {plan.badgeLabel && (
        <span style={{
          position: 'absolute', top: '-13px', left: '24px',
          padding: '4px 14px', borderRadius: '9999px',
          background: meta.accentColor, color: '#ffffff',
          fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px',
          whiteSpace: 'nowrap'
        }}>
          {plan.badgeLabel}
        </span>
      )}

      {/* Icon + Title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
        <span style={{
          flexShrink: 0,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '52px', height: '52px', borderRadius: '14px',
          background: meta.lightBg, fontSize: '24px'
        }}>
          {meta.icon}
        </span>
        <div>
          <p style={{
            margin: '0 0 3px', fontSize: '10px', fontWeight: 700,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            color: meta.accentColor
          }}>
            Service
          </p>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>
            {plan.name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#4a4a4a', lineHeight: 1.6 }}>
        {plan.description}
      </p>

      {/* Price Block */}
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: '6px',
        padding: '12px 16px', borderRadius: '10px',
        background: meta.lightBg, border: `1px solid ${meta.lightBorder}`,
        marginBottom: '20px'
      }}>
        <span style={{ fontSize: '28px', fontFamily: 'Lora, Georgia, serif', fontWeight: 400, color: '#1a1a1a' }}>
          {plan.price}
        </span>
        {plan.priceNote && (
          <span style={{ fontSize: '13px', color: '#6b6b6b' }}>{plan.priceNote}</span>
        )}
      </div>

      {/* Features */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', flex: 1 }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: '8px',
            marginBottom: '8px', fontSize: '13px',
            color: f.included ? '#2d2d2d' : '#b0b0b0'
          }}>
            <span style={{
              flexShrink: 0,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '17px', height: '17px', borderRadius: '50%',
              background: f.included ? meta.lightBg : '#f0f0f0',
              color: f.included ? meta.accentColor : '#cccccc',
              fontSize: '10px', fontWeight: 800, marginTop: '1px'
            }}>
              {f.included ? '✓' : '×'}
            </span>
            {f.label}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to={plan.ctaHref || '/contact'}
        id={`home-svc-cta-${plan._id}`}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          padding: '13px 18px', borderRadius: '10px',
          background: plan.highlighted ? meta.accentColor : '#ffffff',
          color: plan.highlighted ? '#ffffff' : meta.accentColor,
          border: `1.5px solid ${plan.highlighted ? meta.accentColor : meta.lightBorder}`,
          fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600,
          textDecoration: 'none'
        }}
      >
        {plan.ctaLabel || 'En savoir plus'} →
      </Link>
    </article>
  );
}

function HomePricingSection() {
  const { data: plans, isLoading } = usePublicPricingPlans();

  if (isLoading) {
    return (
      <section style={{ padding: '80px 24px', background: '#f8faf8', textAlign: 'center' }}>
        <p style={{ color: '#6b6b6b', fontSize: '14px' }}>Chargement des services…</p>
      </section>
    );
  }

  if (!plans || plans.length === 0) return null;

  return (
    <section style={{ padding: '80px 24px 96px', background: '#f8faf8' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{
            display: 'inline-block', marginBottom: '14px',
            padding: '5px 16px', borderRadius: '9999px',
            background: '#edf7f2', border: '1px solid #b8ddc8',
            fontSize: '11px', fontWeight: 600, letterSpacing: '2px',
            textTransform: 'uppercase', color: '#2d6a4f'
          }}>
            Nos Services
          </span>
          <h2 style={{
            margin: '0 0 14px',
            fontFamily: 'Lora, Georgia, serif',
            fontSize: 'clamp(26px, 4vw, 38px)',
            fontWeight: 400, lineHeight: 1.2, color: '#1a1a1a'
          }}>
            Des solutions adaptées à chaque projet
          </h2>
          <p style={{ margin: '0 auto', maxWidth: '560px', fontSize: '15px', color: '#4a4a4a', lineHeight: 1.7 }}>
            Du site vitrine à la plateforme blockchain, nous couvrons chaque étape de votre transformation numérique.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}>
          {plans.map((plan) => (
            <ServiceCard key={plan._id} plan={plan} />
          ))}
        </div>

        {/* Custom Project Banner */}
        <div style={{
          marginTop: '36px',
          padding: '24px 32px',
          borderRadius: '12px',
          background: '#ffffff',
          border: '1px dashed #d1d5db',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>
              Votre projet est plus élaboré ?
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: '#6b6b6b' }}>
              Applications métier, IA sur mesure, plateformes enterprise — discutons-en.
            </p>
          </div>
          <Link
            to="/contact"
            id="home-svc-custom-cta"
            style={{
              padding: '12px 28px', borderRadius: '10px',
              background: '#1a1a1a', color: '#ffffff',
              fontSize: '14px', fontWeight: 600,
              textDecoration: 'none', whiteSpace: 'nowrap'
            }}
          >
            Obtenir un devis →
          </Link>
        </div>

      </div>
    </section>
  );
}
