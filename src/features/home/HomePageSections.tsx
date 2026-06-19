import React from 'react';

import { useHomePageContent } from '../../shared/hooks/useSiteContent';
import { HomeScrollTabs } from './HomeScrollTabs';
import './home-sections.css';

export function HomePageSections() {
  const content = useHomePageContent();

  return (
    <>
      <section className="home-intro" aria-label={content.intro.line1}>
        <h2 className="home-intro__title">
          <span className="home-intro__title-line">{content.intro.line1}</span>
          <span className="home-intro__title-line">{content.intro.line2}</span>
        </h2>
      </section>

      <HomeScrollTabs />
    </>
  );
}
