import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { HomePageSections } from './HomePageSections';
import './andela-home.css';
import './home-sections.css';

export function AndelaHomePage() {
  const content = useMemo(
    () => ({
      logoText: 'Dynesis Tech',
      headline1: 'Premium Software,',
      headline2: 'Built for Your Growth.',
      subheading:
        'From strategy to launch, we deliver digital products that perform — built with precision, clarity, and zero compromise on quality.',
      features: ['Strategy-led delivery', 'Experienced engineers', 'Enterprise-grade quality'],
      ctaPillText: 'Hire Top Talent',
      button1: 'Book a discovery call',
      button2: 'Explore our platform',
      reviewCountText: '329 reviews',
      testimonialsHeading: 'Trusted by teams who value clarity',
      featuredPerson: {
        name: 'Thomas R.',
        title: 'Senior Full Stack Engineer',
        workedWith: ['FT', 'SF']
      },
      courseCard: {
        title: 'Delivery readiness',
        rows: [
          { label: 'Discovery alignment', pct: 100 },
          { label: 'Execution velocity', pct: 76 }
        ]
      },
      techStack: ['HuggingFace', 'PyTorch', 'LangChain', 'OpenAI', 'AWS', 'FastAPI'],
      testimonials: [
        {
          quote:
            '“Dynesis brought structure and calm to a complex roadmap. We shipped on time with a level of quality our stakeholders noticed.”',
          name: 'Olivia M.',
          role: 'Product Lead · SaaS'
        },
        {
          quote:
            '“Clear communication, strong design execution, and engineering rigor. The process felt enterprise-grade from day one.”',
          name: 'Daniel R.',
          role: 'CTO · Fintech'
        },
        {
          quote:
            '“They helped us move fast without sacrificing maintainability. The handover was clean and the codebase is a joy to extend.”',
          name: 'Sofia A.',
          role: 'Engineering Manager · B2B'
        },
        {
          quote:
            '“A premium partner. Discovery was sharp, estimates were transparent, and delivery was consistent week after week.”',
          name: 'Michael T.',
          role: 'Founder · Startup'
        }
      ]
    }),
    []
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
            <div className="andela-checkrow" aria-label="Key benefits">
              {content.features.map((f) => (
                <span key={f} className="andela-check">
                  <span className="andela-check__mark">✓</span>
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-card" aria-label="Featured profile card">
            <div className="floating-card profile-card">
              <div className="profile-top">
                <div className="profile-name">{content.featuredPerson.name}</div>
                <div className="match-badge">
                  <span className="match-dot" aria-hidden />
                  100% Match
                </div>
              </div>
              <p className="profile-title">{content.featuredPerson.title}</p>
            </div>

            <img
              className="hero-card__photo"
              src="/images/hero-developer.png"
              alt="Featured team member"
              loading="eager"
            />

            <div className="hero-card__pills" aria-label="Technology stack">
              <div className="tech-track">
                <div className="tech-strip">
                  {tech.map((t, idx) => (
                    <span key={`${t}-${idx}`} className="pill">
                      <span className="pill-dot" aria-hidden />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="cta-row" aria-label="Primary calls to action">
          <Link className="btn-lg btn-lg--primary" to="/contact">
            {content.button1}
            <span aria-hidden>→</span>
          </Link>
          <Link className="btn-lg btn-lg--secondary" to="/work-with-us">
            {content.button2}
          </Link>
        </section>

        <section className="ratings" aria-label="Social proof">
          <div className="ratings__inner">
            <span className="g2dot" aria-hidden>
              G2
            </span>
            <span className="rating-num">4.7</span>
            <span className="stars" aria-label="Rating">
              ★★★★½
            </span>
            <span className="reviews">| {content.reviewCountText}</span>
          </div>
        </section>

        <section className="testimonials" aria-label="Testimonials">
          <div className="testimonials__inner">
            <h2 className="testimonials__title">{content.testimonialsHeading}</h2>
            <div className="tgrid">
              {content.testimonials.map((t) => (
                <article key={t.name} className="tcard">
                  <div className="tstars" aria-hidden>
                    ★★★★★
                  </div>
                  <p className="tquote">{t.quote}</p>
                  <div className="tfoot">
                    <div>
                      <div className="tname">{t.name}</div>
                      <div className="trole">{t.role}</div>
                    </div>
                    <div className="tlogo" aria-label="Company logo">
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

