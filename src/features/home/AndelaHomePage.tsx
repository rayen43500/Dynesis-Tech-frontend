import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BarChart3, Code2, Layers, Monitor, ShieldCheck, Settings, Users, type LucideIcon } from 'lucide-react';

import { useHomePageContent } from '../../shared/hooks/useSiteContent';
import { usePublicPricingPlans, type PricingPlan } from '../pricing/pricingHooks';
import { HomePageSections } from './HomePageSections';
import './andela-home.css';
import './home-sections.css';
import './home-services.css';

import { DynamicCustomSections } from '../../shared/ui/content/DynamicCustomSections';
import { HomeShowcaseSlider } from './HomeShowcaseSlider';

export function AndelaHomePage() {
  const content = useHomePageContent();

  return (
    <div className="andela-page">
      <main>
        <section
          className={`andela-hero-top${content.heroBackgroundImage ? ' andela-hero-top--has-background' : ''}`}
          style={content.heroBackgroundImage ? { backgroundImage: `url("${content.heroBackgroundImage}")` } : undefined}
        >
          <div className="andela-hero-headline">
            <h1 className="andela-h1">
              <span className="andela-h1__line1">{content.headline1}</span>
              <span className="andela-h1__line2">{content.headline2}</span>
            </h1>
            <div className="andela-hero-actions">
              <Link to={content.button1Href} className="andela-hero-action andela-hero-action--primary">
                {content.button1} <span aria-hidden>→</span>
              </Link>
              <Link to={content.button2Href} className="andela-hero-action andela-hero-action--secondary">
                {content.button2}
              </Link>
            </div>


            <div className="home-proof-bar" aria-label="Chiffres clés">
              <HomeProofStat icon={Users} value="50+" label="Clients satisfaits" />
              <HomeProofStat icon={Settings} value="100+" label="Projets réalisés" />
              <HomeProofStat icon={BarChart3} value="3+" label="Années d'expérience" />
              <HomeProofStat icon={ShieldCheck} value="99%" label="Taux de satisfaction" />
            </div>
          </div>
        </section>

        <DynamicCustomSections />
        <HomeShowcaseSlider images={content.showcaseImages} backgroundImage={content.showcaseBackgroundImage || content.heroBackgroundImage} />

        <HomePricingSection />

        <HomePageSections />

        {/* DERNIÈRE SECTION AVANT FOOTER : AVIS CLIENTS & RATINGS */}
        <section className="testimonials-section" id="avis" aria-label="Avis et témoignages clients">
          <div className="testimonials-section__inner">
            <div className="ratings-capsule-wrap">
              <div className="ratings-capsule">
                <span className="g2dot" aria-hidden>G2</span>
                <span className="rating-num">{content.ratingScore}</span>
                <span className="stars" aria-hidden>★★★★★</span>
                <span className="reviews">| {content.reviewCountText}</span>
                <span className="verified-badge">✓ Avis vérifiés</span>
              </div>
            </div>

            <header className="testimonials__header">
              <span className="testimonials__eyebrow">Témoignages & Confiance</span>
              <h2 className="testimonials__title">{content.testimonialsHeading}</h2>
              <p className="testimonials__sub">
                Découvrez comment nos clients accélèrent leurs déploiements et sécurisent leur vision technologique à nos côtés.
              </p>
            </header>

            <div className="tgrid">
              {content.testimonials.map((item, index) => (
                <article key={`${item.name}-${index}`} className="tcard">
                  <div className="tcard__top">
                    <div className="tstars" aria-hidden>
                      ★★★★★
                    </div>
                    <span className="tcard__quote-mark" aria-hidden>“</span>
                  </div>
                  <p className="tquote">{item.quote}</p>
                  <div className="tfoot">
                    <div className="tavatar" aria-hidden>
                      {item.name.charAt(0)}
                    </div>
                    <div className="tinfo">
                      <div className="tname-row">
                        <span className="tname">{item.name}</span>
                        <span className="tcheck" title="Client vérifié">✓</span>
                      </div>
                      <div className="trole">{item.role}</div>
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

function HomeProofStat({
  icon: Icon,
  value,
  label
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div className="home-proof-stat">
      <span className="home-proof-stat__icon" aria-hidden>
        <Icon size={22} strokeWidth={2.2} />
      </span>
      <span className="home-proof-stat__copy">
        <strong>{value}</strong>
        <span>{label}</span>
      </span>
    </div>
  );
}


const SERVICE_ICONS: Record<string, LucideIcon> = {
  vitrine: Monitor,
  blockchain: Code2,
  custom: Layers,
  other: Monitor
};

const SERVICE_PLAN_KEYS = ['vitrine', 'blockchain', 'custom'] as const;

function ServiceCard({ plan }: { plan: PricingPlan }) {
  const { t } = useTranslation();
  const Icon = SERVICE_ICONS[plan.category] ?? SERVICE_ICONS.other;
  const includedFeatures = plan.features.filter((f) => f.included);
  const hasI18nCopy = SERVICE_PLAN_KEYS.includes(plan.category as (typeof SERVICE_PLAN_KEYS)[number]);
  const name = hasI18nCopy ? t(`home.services.plans.${plan.category}.name`) : plan.name;
  const description = hasI18nCopy ? t(`home.services.plans.${plan.category}.description`) : plan.description;
  const price = hasI18nCopy
    ? t(`home.services.plans.${plan.category}.price`)
    : [plan.price, plan.priceNote].filter(Boolean).join(' ');
  const cta = hasI18nCopy
    ? t(`home.services.plans.${plan.category}.cta`)
    : plan.ctaLabel || t('home.services.ctaFallback');

  return (
    <article className="home-svc-card">
      <span className="home-svc-card__icon" aria-hidden>
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <h3 className="home-svc-card__name">{name}</h3>
      <p className="home-svc-card__desc">{description}</p>
      <div className="home-svc-card__price">
        <span className="home-svc-card__price-value">{price}</span>
      </div>
      <hr className="home-svc-card__divider" />
      <ul className="home-svc-card__features">
        {includedFeatures.map((f, i) => (
          <li key={i} className="home-svc-card__feature">
            <span className="home-svc-card__check" aria-hidden>
              ✓
            </span>
            {f.label}
          </li>
        ))}
      </ul>
      <Link
        to={plan.category === 'custom' ? '/work-with-us' : plan.ctaHref || '/contact'}
        id={`home-svc-cta-${plan._id}`}
        className="home-svc-card__cta"
      >
        {cta} →
      </Link>
    </article>
  );
}

export function HomePricingSection({ showHeader = true }: { showHeader?: boolean }) {
  const content = useHomePageContent();
  const { t } = useTranslation();
  const { data: plans, isLoading } = usePublicPricingPlans();

  if (isLoading) {
    return (
      <section className={`home-svc home-svc--loading${showHeader ? '' : ' home-svc--embedded'}`}>
        <p className="home-svc__loading">{t('home.services.loading')}</p>
      </section>
    );
  }

  if (!plans || plans.length === 0) return null;

  return (
    <section
      className={`home-svc${showHeader ? '' : ' home-svc--embedded'}${content.servicesBackgroundImage ? ' home-svc--has-bg' : ''}`}
      style={content.servicesBackgroundImage ? { backgroundImage: `url("${content.servicesBackgroundImage}")`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      <div className="home-svc__inner">
        {showHeader ? (
          <div className="home-svc__header">
            <span className="home-svc__label">{t('home.services.label')}</span>
            <h2 className="home-svc__headline">{t('home.services.headline')}</h2>
            <p className="home-svc__sub">{t('home.services.sub')}</p>
          </div>
        ) : null}

        <div className="home-svc__grid">
          {plans.map((plan) => (
            <ServiceCard key={plan._id} plan={plan} />
          ))}
        </div>

        <div className="home-svc__banner">
          <div>
            <p className="home-svc__banner-title">{t('home.services.bannerTitle')}</p>
            <p className="home-svc__banner-sub">{t('home.services.bannerSub')}</p>
          </div>
          <Link to="/work-with-us" id="home-svc-custom-cta" className="home-svc__banner-cta">
            {t('home.services.bannerCta')} →
          </Link>
        </div>
      </div>
    </section>
  );
}


