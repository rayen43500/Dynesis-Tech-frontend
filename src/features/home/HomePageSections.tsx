import React from 'react';

import { HomeScrollTabs } from './HomeScrollTabs';
import { useTranslation } from 'react-i18next';
import './home-sections.css';

export function HomePageSections() {
  const { t } = useTranslation();

  return (
    <>
      <section className="home-intro" aria-label={t('home.intro.line1')}>
        <h2 className="home-intro__title">
          <span className="home-intro__title-line">{t('home.intro.line1')}</span>
          <span className="home-intro__title-line">{t('home.intro.line2')}</span>
        </h2>
      </section>

      <HomeScrollTabs />
    </>
  );
}
