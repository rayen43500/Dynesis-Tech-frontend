import React from 'react';

import { useHomePageContent } from '../../shared/hooks/useSiteContent';
import { HomeScrollTabs } from './HomeScrollTabs';
import './home-sections.css';

export function HomePageSections() {
  const content = useHomePageContent();

  return (
    <section className="home-perspectives-section" aria-label={content.intro.line1}>
      <div className="home-perspectives-section__inner">
        <header className="home-perspectives-header">
          <span className="home-perspectives-eyebrow">Perspectives & Stratégie</span>
          <h2 className="home-perspectives-title">
            <span className="home-perspectives-title__line">{content.intro.line1}</span>
            {content.intro.line2 ? (
              <span className="home-perspectives-title__line">{content.intro.line2}</span>
            ) : null}
          </h2>
          <p className="home-perspectives-sub">
            Découvrez nos analyses, méthodologies et retours d'expérience pour réussir la transformation et l'échelle de vos produits.
          </p>
        </header>

        <HomeScrollTabs />
      </div>
    </section>
  );
}
