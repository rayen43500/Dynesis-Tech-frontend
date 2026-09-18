import React from 'react';
import { useTranslation } from 'react-i18next';

import { HomePricingSection } from '../home/AndelaHomePage';
import '../home/andela-home.css';
import '../home/home-services.css';
import './pricing.css';

export function PricingPage() {
  const { t } = useTranslation();

  return (
    <div className="pricing-page tech-page">
      <div className="tech-services__container" style={{ paddingTop: '108px', paddingBottom: '20px' }}>
        <header className="tech-services__header">
          <span className="tech-section-eyebrow">(01) — {t('pricing.header.eyebrow', 'SERVICES & OFFRES')}</span>
          <h1 className="tech-section-title">
            {t('pricing.header.titleLine1')} {t('pricing.header.titleLine2')}
          </h1>
          <p className="tech-section-sub">
            {t('pricing.header.subtitle')}
          </p>
        </header>
      </div>

      <HomePricingSection showHeader={false} />
    </div>
  );
}
