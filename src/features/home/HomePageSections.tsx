import React from 'react';

import { useHomePageContent } from '../../shared/hooks/useSiteContent';
import { HomeScrollTabs } from './HomeScrollTabs';
import './home-sections.css';

export function HomePageSections() {
  const content = useHomePageContent();

  const titleLine = content.intro.line1 && content.intro.line1 !== 'One platform to design,'
    ? `${content.intro.line1} ${content.intro.line2 || ''}`.trim()
    : 'Une plateforme pour concevoir et faire grandir votre produit';

  return (
    <section className="home-perspectives-section" id="perspectives" aria-label="Perspectives & Stratégie">
      <div className="home-perspectives-section__inner">
        <header className="home-perspectives-header">
          <span className="home-perspectives-eyebrow">(D) — PERSPECTIVES & STRATÉGIE</span>
          <h2 className="home-perspectives-title">{titleLine}</h2>
        </header>

        <HomeScrollTabs />
      </div>
    </section>
  );
}
