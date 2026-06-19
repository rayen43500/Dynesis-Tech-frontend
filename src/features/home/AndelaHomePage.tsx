import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { HomePageSections } from './HomePageSections';
import './andela-home.css';
import './home-sections.css';

export function AndelaHomePage() {
  const { t } = useTranslation();

  const content = useMemo(
    () => ({
      headline1: t('home.hero.headline1'),
      headline2: t('home.hero.headline2'),
      subheading: t('home.hero.subheading'),
      features: [
        t('home.hero.feature.strategyLed'),
        t('home.hero.feature.experiencedEngineers'),
        t('home.hero.feature.enterpriseQuality')
      ],
      button1: t('home.cta.primary'),
      button2: t('home.cta.secondary'),
      reviewCountText: t('home.ratings.reviewCount'),
      testimonialsHeading: t('home.testimonials.title'),
      matchBadge: t('home.hero.matchBadge'),
      featuredPerson: {
        name: t('home.featured.name'),
        title: t('home.featured.role')
      },
      courseCard: {
        title: t('home.delivery.title'),
        rows: [
          { label: t('home.delivery.discovery'), pct: 100 },
          { label: t('home.delivery.velocity'), pct: 76 }
        ]
      },
      techStack: ['HuggingFace', 'PyTorch', 'LangChain', 'OpenAI', 'AWS', 'FastAPI'],
      testimonials: [1, 2, 3, 4].map((n) => ({
        quote: t(`home.testimonials.${n}.quote`),
        name: t(`home.testimonials.${n}.name`),
        role: t(`home.testimonials.${n}.role`)
      }))
    }),
    [t]
  );

  const tech = useMemo(() => [...content.techStack, ...content.techStack], [content.techStack]);

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

          <div className="hero-card" aria-label={content.featuredPerson.name}>
            <div className="floating-card profile-card">
              <div className="profile-top">
                <div className="profile-name">{content.featuredPerson.name}</div>
                <div className="match-badge">
                  <span className="match-dot" aria-hidden />
                  {content.matchBadge}
                </div>
              </div>
              <p className="profile-title">{content.featuredPerson.title}</p>
            </div>

            <img
              className="hero-card__photo"
              src="/images/hero-developer.png"
              alt=""
              loading="eager"
            />

            <div className="hero-card__pills" aria-hidden>
              <div className="tech-track">
                <div className="tech-strip">
                  {tech.map((label, idx) => (
                    <span key={`${label}-${idx}`} className="pill">
                      <span className="pill-dot" aria-hidden />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="cta-row">
          <Link className="btn-lg btn-lg--primary" to="/contact">
            {content.button1}
            <span aria-hidden>→</span>
          </Link>
          <Link className="btn-lg btn-lg--secondary" to="/work-with-us">
            {content.button2}
          </Link>
        </section>

        <section className="ratings">
          <div className="ratings__inner">
            <span className="g2dot" aria-hidden>
              G2
            </span>
            <span className="rating-num">4.7</span>
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
                <article key={item.name} className="tcard">
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

        <HomePageSections />
      </main>
    </div>
  );
}
