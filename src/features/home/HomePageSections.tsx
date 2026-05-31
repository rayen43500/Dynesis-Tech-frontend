import React from 'react';

import { HomeScrollTabs } from './HomeScrollTabs';
import './home-sections.css';

export function HomePageSections() {
  return (
    <>
      <section className="home-intro" aria-label="Platform introduction">
        <h2 className="home-intro__title">
          <span className="home-intro__title-line">One platform to design,</span>
          <span className="home-intro__title-line">build, and grow your product</span>
        </h2>
      </section>

      <HomeScrollTabs />
    </>
  );
}
