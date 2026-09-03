import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Code2, Layers, Monitor, type LucideIcon } from 'lucide-react';

import { useHomePageContent } from '../../shared/hooks/useSiteContent';
import { usePublicPricingPlans, type PricingPlan } from '../pricing/pricingHooks';
import { HomePageSections } from './HomePageSections';
import './andela-home.css';
import './home-sections.css';
import './home-services.css';

import { DynamicCustomSections } from '../../shared/ui/content/DynamicCustomSections';

export function AndelaHomePage() {
  const content = useHomePageContent();

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
        </section>

        <DynamicCustomSections />

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

        <HomePricingSection />

        <HomePageSections />
      </main>
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
    <section className={`home-svc${showHeader ? '' : ' home-svc--embedded'}`}>
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
