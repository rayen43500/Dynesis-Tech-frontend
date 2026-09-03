import React from 'react';
import { useTranslation } from 'react-i18next';

import { HomePricingSection } from '../home/AndelaHomePage';
import '../home/andela-home.css';
import '../home/home-services.css';
import './pricing.css';

export function PricingPage() {
  const { t } = useTranslation();

  return (
    <div className="pricing-page">
      <header className="andela-hero-top pricing-hero">
        <div className="andela-hero-headline">
          <h1 className="andela-h1">
            <span className="andela-h1__line1">{t('pricing.header.titleLine1')}</span>
            <span className="andela-h1__line2">{t('pricing.header.titleLine2')}</span>
          </h1>
          <p className="andela-hero-sub">{t('pricing.header.subtitle')}</p>
        </div>
      </header>

      <HomePricingSection showHeader={false} />
    </div>
  );
}
