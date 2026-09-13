import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHomePageContent, useBrandingContent } from '../../shared/hooks/useSiteContent';
import { usePublicPricingPlans, type PricingPlan } from '../pricing/pricingHooks';
import { HomePageSections } from './HomePageSections';
import { DynamicCustomSections } from '../../shared/ui/content/DynamicCustomSections';
import { HomeMethodSection } from './HomeMethodSection';
import { HomeWhyDynesisSection } from './HomeWhyDynesisSection';

import './andela-home.css';
import './home-sections.css';
import './home-services.css';

function isVideoUrl(url?: string): boolean {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url) || url.includes('/video/upload/');
}


const DEFAULT_PLANS: PricingPlan[] = [
  {
    _id: 'default-plan-1',
    category: 'vitrine',
    name: 'Site Vitrine',
    description: 'Idéal pour présenter votre activité en ligne avec un site professionnel, rapide et responsive.',
    price: '990€',
    priceNote: '/projet',
    features: [
      { label: 'Design moderne & responsive', included: true },
      { label: "Jusqu'à 8 pages", included: true },
      { label: 'Formulaire de contact', included: true },
      { label: 'SEO de base', included: true },
      { label: '3 mois de support', included: true }
    ],
    highlighted: false,
    badgeLabel: '',
    ctaLabel: 'DÉMARRER MON PROJET',
    ctaHref: '/contact',
    ctaType: 'contact',
    visible: true,
    order: 1
  },
  {
    _id: 'default-plan-2',
    category: 'blockchain',
    name: 'Blockchain & Web3',
    description: 'Pour les projets nécessitant traçabilité, smart contracts et intégration Web3.',
    price: '2 900€',
    priceNote: '/projet',
    highlighted: true,
    badgeLabel: 'RECOMMANDÉ',
    features: [
      { label: 'Smart contracts Solidity', included: true },
      { label: 'Intégration Ethereum / Polygon', included: true },
      { label: 'Tableau de bord blockchain', included: true },
      { label: 'Authentification Web3', included: true },
      { label: 'Audit de sécurité smart contract', included: true }
    ],
    ctaLabel: 'DISCUTER DE MON PROJET',
    ctaHref: '/contact',
    ctaType: 'contact',
    visible: true,
    order: 2
  },
  {
    _id: 'default-plan-3',
    category: 'custom',
    name: 'Application sur mesure',
    description: 'Plateformes SaaS, applications mobiles, APIs complexes — nous construisons votre vision.',
    price: 'Sur devis',
    priceNote: '',
    highlighted: false,
    badgeLabel: '',
    features: [
      { label: 'Architecture sur mesure', included: true },
      { label: 'Application web / mobile', included: true },
      { label: 'API REST / GraphQL', included: true },
      { label: 'Intégration IA & automatisation', included: true },
      { label: 'Support dédié & SLA personnalisé', included: true }
    ],
    ctaLabel: 'OBTENIR UN DEVIS',
    ctaHref: '/work-with-us',
    ctaType: 'quote',
    visible: true,
    order: 3
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    quote: '« Dynesis a apporté structure et sérénité à une feuille de route complexe. Nous avons livré dans les délais avec une qualité remarquée par nos parties prenantes. »',
    name: 'Olivia M.',
    role: 'LEAD PRODUIT • SAAS',
    initial: 'O'
  },
  {
    quote: '« Communication claire, exécution design solide et rigueur technique. Le processus a été de niveau entreprise dès le premier jour. »',
    name: 'Daniel R.',
    role: 'CTO • FINTECH',
    initial: 'D'
  },
  {
    quote: '« Ils nous ont permis d\'aller vite sans sacrifier la maintenabilité. La passation a été propre et la base de code est un plaisir à faire évoluer. »',
    name: 'Sofia A.',
    role: 'ENGINEERING MANAGER • B2B',
    initial: 'S'
  },
  {
    quote: '« Un partenaire premium. La phase de cadrage était précise, les estimations transparentes et la livraison constante semaine après semaine. »',
    name: 'Michael T.',
    role: 'FONDATEUR • STARTUP',
    initial: 'M'
  }
];

export function AndelaHomePage() {
  const content = useHomePageContent();
  const branding = useBrandingContent();

  const rawHeadline1 = content.headline1 || 'Logiciel premium,';
  const rawHeadline2 = content.headline2 || 'conçu pour votre croissance.';
  const heroDescription = content.subheading || 'Nous transformons vos idées en produits numériques rapides, fiables et prêts à évoluer — du premier prototype à la mise en production.';

  const heroBgVideo = content.heroBackgroundVideo || (isVideoUrl(content.heroBackgroundImage) ? content.heroBackgroundImage : '');
  const heroBgImage = isVideoUrl(content.heroBackgroundImage) ? '' : content.heroBackgroundImage;
  const showcaseBgVideo = content.showcaseBackgroundVideo || (isVideoUrl(content.showcaseBackgroundImage) ? content.showcaseBackgroundImage : '');
  const showcaseBgImage = isVideoUrl(content.showcaseBackgroundImage) ? '' : content.showcaseBackgroundImage;

  const testimonialsList = (content.testimonials && content.testimonials.length >= 4)
    ? content.testimonials.slice(0, 4).map((item, idx) => ({
        quote: item.quote.startsWith('«') ? item.quote : `« ${item.quote.replace(/^["']|["']$/g, '').trim()} »`,
        name: item.name,
        role: item.role.toUpperCase().replace(/\s*·\s*/g, ' • '),
        initial: item.name.charAt(0) || DEFAULT_TESTIMONIALS[idx]?.initial || 'D'
      }))
    : DEFAULT_TESTIMONIALS;

  return (
    <div className="tech-page">
      <main>
        {/* (A) HERO SECTION */}
        <section
          className={`tech-hero${(heroBgVideo || heroBgImage) ? ' tech-hero--has-custom-bg' : ''}`}
          style={heroBgImage && !heroBgVideo ? { backgroundImage: `url("${heroBgImage}")` } : undefined}
        >
          {heroBgVideo ? (
            <div className="tech-hero__bg-video-wrap" aria-hidden="true">
              <video
                className="tech-hero__bg-video"
                src={heroBgVideo}
                poster={heroBgImage || undefined}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="tech-hero__bg-video-overlay" />
            </div>
          ) : heroBgImage ? (
            <div className="tech-hero__bg-video-wrap" aria-hidden="true">
              <img
                className="tech-hero__bg-img"
                src={heroBgImage}
                alt=""
                loading="eager"
              />
              <div className="tech-hero__bg-video-overlay" />
            </div>
          ) : null}
          <div className="tech-hero__container">
            {/* Left Column: Technical Copy */}
            <div className="tech-hero__copy">
              <div className="tech-hero__dot-grid" aria-hidden="true" />
              <span className="tech-hero__eyebrow">(A) — PLATEFORME DE DÉVELOPPEMENT</span>

              <h1 className="tech-hero__title">
                <span className="tech-hero__line">Logiciel premium,</span>
                <span className="tech-hero__line">conçu pour</span>
                <span className="tech-hero__line">
                  votre <span className="tech-hero__line--accent">croissance.</span>
                </span>
              </h1>

              <p className="tech-hero__sub">
                {heroDescription}
              </p>

              <div className="tech-hero__actions">
                <Link to={content.button1Href || '/contact'} className="tech-btn tech-btn--primary">
                  {content.button1 || 'RÉSERVER UN APPEL DÉCOUVERTE'} <span className="tech-btn__arrow">→</span>
                </Link>
                <Link to={content.button2Href || '/services'} className="tech-btn tech-btn--secondary">
                  {content.button2 || 'EXPLORER NOTRE PLATEFORME'}
                </Link>
              </div>
            </div>

            {/* Right Column: Cloudinary Video (only when video is set) */}
            {content.heroVideoUrl ? (
              <div className="tech-hero__visual">
                <div className="tech-hero__card">
                  <div className="tech-hero__card-canvas tech-hero__card-canvas--video">
                    <video
                      className="tech-hero__card-video"
                      src={content.heroVideoUrl}
                      poster={content.heroVideoPoster || undefined}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  <div className="tech-hero__card-footer">
                    <span className="tech-hero__card-tag">VIDÉO PRODUIT • CLOUDINARY</span>
                    <span className="tech-hero__card-status">
                      <span className="tech-hero__status-dot" aria-hidden="true" />
                      EN DIRECT
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {/* KEY STATS PROOF BAR */}
        <section className="tech-stats" aria-label="Chiffres clés">
          <div className="tech-stats__container">
            <div className="tech-stat-col">
              <span className="tech-stat-val">50+</span>
              <span className="tech-stat-lbl">CLIENTS SATISFAITS</span>
            </div>
            <div className="tech-stat-col">
              <span className="tech-stat-val">100+</span>
              <span className="tech-stat-lbl">PROJETS RÉALISÉS</span>
            </div>
            <div className="tech-stat-col">
              <span className="tech-stat-val">3+</span>
              <span className="tech-stat-lbl">ANNÉES D'EXPÉRIENCE</span>
            </div>
            <div className="tech-stat-col tech-stat-col--highlight">
              <span className="tech-stat-val tech-stat-val--blue">99%</span>
              <span className="tech-stat-lbl">TAUX DE SATISFACTION</span>
            </div>
          </div>
        </section>

        {/* (B) NOTRE MÉTHODE */}
        <HomeMethodSection
          backgroundImage={showcaseBgImage}
          backgroundVideo={showcaseBgVideo}
        />

        {/* (C) POURQUOI DYNESISTECH */}
        <HomeWhyDynesisSection />

        <DynamicCustomSections />

        {/* (C) NOS SERVICES */}
        <HomePricingSection />

        {/* (D) PERSPECTIVES & STRATÉGIE */}
        <HomePageSections />

        {/* (E) TÉMOIGNAGES & CONFIANCE */}
        <section className="tech-testimonials" id="avis" aria-label="Témoignages & Confiance">
          <div className="tech-testimonials__container">
            <header className="tech-testimonials__header">
              <span className="tech-section-eyebrow">(E) — TÉMOIGNAGES & CONFIANCE</span>
              <h2 className="tech-section-title">
                {content.testimonialsHeading || 'Ils nous font confiance pour avancer avec clarté'}
              </h2>
            </header>

            <div className="tech-testimonials__grid">
              {testimonialsList.map((item, index) => (
                <article key={`${item.name}-${index}`} className="tech-testimonial-card">
                  <div className="tech-testimonial-card__stars" aria-label="5 étoiles">
                    ★★★★★
                  </div>
                  <p className="tech-testimonial-card__quote">{item.quote}</p>
                  <div className="tech-testimonial-card__author">
                    <div className="tech-testimonial-card__avatar" aria-hidden="true">
                      {item.initial}
                    </div>
                    <div className="tech-testimonial-card__meta">
                      <div className="tech-testimonial-card__name-row">
                        <span className="tech-testimonial-card__name">{item.name}</span>
                        <span className="tech-testimonial-card__check" title="Client vérifié">✓</span>
                      </div>
                      <span className="tech-testimonial-card__role">{item.role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ServiceCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const indexStr = String(index + 1).padStart(2, '0');
  const isRecommended = plan.category === 'blockchain' || plan.highlighted || !!plan.badgeLabel;
  const badgeText = plan.badgeLabel || 'RECOMMANDÉ';

  const priceParts = plan.price ? plan.price.split(' ') : [];
  const priceDisplay = plan.price || '';
  const priceNote = plan.priceNote || (plan.price !== 'Sur devis' ? '/projet' : '');

  return (
    <article className={`tech-svc-card${isRecommended ? ' tech-svc-card--recommended' : ''}`}>
      {isRecommended ? (
        <div className="tech-svc-card__badge">{badgeText}</div>
      ) : null}

      <div className="tech-svc-card__top">
        <h3 className="tech-svc-card__title">{plan.name}</h3>
        <span className="tech-svc-card__index">{indexStr}</span>
      </div>

      <p className="tech-svc-card__desc">{plan.description}</p>

      <div className="tech-svc-card__pricing">
        <span className="tech-svc-card__amount">{priceDisplay}</span>
        {priceNote ? <span className="tech-svc-card__unit">{priceNote}</span> : null}
      </div>

      <ul className="tech-svc-card__features">
        {plan.features.filter((f) => f.included).map((feat, i) => (
          <li key={i} className="tech-svc-card__feature-item">
            <span className="tech-svc-card__check">✓</span>
            <span>{feat.label}</span>
          </li>
        ))}
      </ul>

      <div className="tech-svc-card__divider" aria-hidden="true" />

      <Link
        to={plan.category === 'custom' ? '/work-with-us' : plan.ctaHref || '/contact'}
        id={`home-svc-cta-${plan._id}`}
        className="tech-svc-card__cta"
      >
        <span>{plan.ctaLabel || (index === 0 ? 'DÉMARRER MON PROJET' : index === 1 ? 'DISCUTER DE MON PROJET' : 'OBTENIR UN DEVIS')}</span>
        <span className="tech-svc-card__cta-arrow">→</span>
      </Link>
    </article>
  );
}

export function HomePricingSection({ showHeader = true }: { showHeader?: boolean }) {
  const content = useHomePageContent();
  const { data: apiPlans, isLoading } = usePublicPricingPlans();

  const plans = (apiPlans && apiPlans.length > 0) ? apiPlans : DEFAULT_PLANS;
  const servicesBgVideo = content.servicesBackgroundVideo || (isVideoUrl(content.servicesBackgroundImage) ? content.servicesBackgroundImage : '');
  const servicesBgImage = isVideoUrl(content.servicesBackgroundImage) ? '' : content.servicesBackgroundImage;

  return (
    <section
      className={`tech-services${showHeader ? '' : ' tech-services--embedded'}${(servicesBgVideo || servicesBgImage) ? ' tech-services--has-custom-bg' : ''}`}
      style={servicesBgImage && !servicesBgVideo ? { backgroundImage: `url("${servicesBgImage}")`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      aria-label="Nos Services"
    >
      {servicesBgVideo ? (
        <div className="tech-section__bg-video-wrap" aria-hidden="true">
          <video
            className="tech-section__bg-video"
            src={servicesBgVideo}
            poster={servicesBgImage || undefined}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="tech-section__bg-video-overlay" />
        </div>
      ) : null}
      <div className="tech-services__container">
        {showHeader ? (
          <header className="tech-services__header">
            <span className="tech-section-eyebrow">(C) — NOS SERVICES</span>
            <h2 className="tech-section-title">Des solutions adaptées à chaque projet</h2>
            <p className="tech-section-sub">
              Du site vitrine à la plateforme blockchain, nous couvrons chaque étape de votre transformation numérique.
            </p>
          </header>
        ) : null}

        <div className="tech-services__grid">
          {plans.slice(0, 3).map((plan, index) => (
            <ServiceCard key={plan._id || index} plan={plan} index={index} />
          ))}
        </div>

        {/* Bottom banner for custom complex projects */}
        <div className="tech-services__banner">
          <div className="tech-services__banner-text">
            <h4 className="tech-services__banner-title">Votre projet est plus élaboré ?</h4>
            <p className="tech-services__banner-desc">
              Applications métier, IA sur mesure, plateformes enterprise — discutons-en.
            </p>
          </div>
          <Link to="/work-with-us" id="home-svc-custom-cta" className="tech-services__banner-btn">
            OBTENIR UN DEVIS →
          </Link>
        </div>
      </div>
    </section>
  );
}
