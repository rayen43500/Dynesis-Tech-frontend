import React from 'react';
import { Link } from 'react-router-dom';

import { usePublicPricingPlans, type PricingPlan } from './pricingHooks';
import './pricing.css';

const CATEGORY_ICONS: Record<string, string> = {
  vitrine: '🌐',
  blockchain: '🔗',
  custom: '⚙️',
  other: '💡'
};

function PlanCard({ plan }: { plan: PricingPlan }) {
  return (
    <article className={`pricing-card${plan.highlighted ? ' pricing-card--highlighted' : ''}`}>
      {plan.badgeLabel ? <div className="pricing-card__badge">{plan.badgeLabel}</div> : null}

      <div className="pricing-card__icon" aria-hidden>
        {CATEGORY_ICONS[plan.category] ?? '💡'}
      </div>

      <h2 className="pricing-card__name">{plan.name}</h2>
      <p className="pricing-card__desc">{plan.description}</p>

      <div className="pricing-card__price-row">
        <span className="pricing-card__price">{plan.price}</span>
        {plan.priceNote && <span className="pricing-card__price-note">{plan.priceNote}</span>}
      </div>

      <div className="pricing-card__divider" aria-hidden />

      {plan.features.length > 0 && (
        <ul className="pricing-card__features" aria-label={`Fonctionnalités ${plan.name}`}>
          {plan.features.map((f, i) => (
            <li key={i} className={`pricing-feature${f.included ? '' : ' pricing-feature--excluded'}`}>
              <span className={`pricing-feature__icon${f.included ? ' pricing-feature__icon--check' : ' pricing-feature__icon--cross'}`}>
                {f.included ? '✓' : '×'}
              </span>
              {f.label}
            </li>
          ))}
        </ul>
      )}

      <Link
        to={plan.ctaHref || '/contact'}
        className="pricing-card__cta"
        id={`pricing-cta-${plan._id}`}
      >
        {plan.ctaLabel || 'Commencer'}
        <span aria-hidden>→</span>
      </Link>
    </article>
  );
}

export function PricingPage() {
  const { data: plans, isLoading } = usePublicPricingPlans();

  return (
    <div className="pricing-page">
      <div className="pricing-page__inner">
        <header className="pricing-header">
          <span className="pricing-header__eyebrow">Tarifs & Formules</span>
          <h1 className="pricing-header__title">
            Des formules claires pour<br />chaque ambition
          </h1>
          <p className="pricing-header__subtitle">
            Du site vitrine à la plateforme blockchain sur mesure, choisissez la formule adaptée à votre projet.
            Toutes les formules incluent notre support et la transparence totale.
          </p>
        </header>

        {isLoading && <p className="pricing-loading">Chargement des formules…</p>}

        {!isLoading && plans && plans.length > 0 && (
          <div className="pricing-grid">
            {plans.map((plan) => (
              <PlanCard key={plan._id} plan={plan} />
            ))}
          </div>
        )}

        <div className="pricing-custom-banner">
          <div className="pricing-custom-banner__text">
            <h2>Vous avez un projet plus élaboré ?</h2>
            <p>Applications complexes, plateformes enterprise, projets IA ou multi-blockchain — parlons-en.</p>
          </div>
          <Link to="/contact" className="pricing-custom-banner__btn" id="pricing-custom-cta">
            Discuter de mon projet →
          </Link>
        </div>
      </div>
    </div>
  );
}
