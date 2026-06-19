import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type TabId = 'design' | 'development' | 'transformation';

const TABS: TabId[] = ['design', 'development', 'transformation'];

const NAV_OFFSET = 68;
const STICKY_NAV_HEIGHT = 52;
const STICKY_TOP = NAV_OFFSET + STICKY_NAV_HEIGHT;

function pickActivePanel(refs: Partial<Record<TabId, HTMLElement | null>>): TabId {
  const stickyLine = STICKY_TOP + 2;
  let active: TabId = TABS[0];
  let bestTop = -Infinity;

  for (const tab of TABS) {
    const node = refs[tab];
    if (!node) continue;

    const top = node.getBoundingClientRect().top;
    if (top <= stickyLine && top > bestTop) {
      bestTop = top;
      active = tab;
    }
  }

  if (bestTop === -Infinity) {
    let closest = Infinity;
    for (const tab of TABS) {
      const node = refs[tab];
      if (!node) continue;
      const dist = Math.abs(node.getBoundingClientRect().top - STICKY_TOP);
      if (dist < closest) {
        closest = dist;
        active = tab;
      }
    }
  }

  return active;
}

export function HomeScrollTabs() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabId>('design');
  const panelsWrapperRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Partial<Record<TabId, HTMLElement | null>>>({});
  const clickScrolling = useRef(false);
  const clickTimer = useRef<number | null>(null);

  const tabMeta: Record<TabId, { learnHref: string; image: string; tags: string[] }> = {
    design: {
      learnHref: '/work-with-us',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
      tags: ['Figma', 'Design Systems']
    },
    development: {
      learnHref: '/developers',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
      tags: ['React', 'Node.js']
    },
    transformation: {
      learnHref: '/contact',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80',
      tags: ['AWS', 'DevOps']
    }
  };

  useEffect(() => {
    const updateActive = () => {
      if (clickScrolling.current) return;
      setActiveTab(pickActivePanel(panelRefs.current));
    };

    const observers: IntersectionObserver[] = [];

    for (const tab of TABS) {
      const node = panelRefs.current[tab];
      if (!node) continue;

      const observer = new IntersectionObserver(() => updateActive(), {
        root: null,
        rootMargin: `-${STICKY_TOP}px 0px 0px 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1]
      });

      observer.observe(node);
      observers.push(observer);
    }

    updateActive();

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  function scrollToPanel(tabId: TabId) {
    const wrapper = panelsWrapperRef.current;
    if (!wrapper) return;

    const index = TABS.findIndex((tab) => tab === tabId);
    if (index < 0) return;

    setActiveTab(tabId);
    clickScrolling.current = true;

    if (clickTimer.current) {
      window.clearTimeout(clickTimer.current);
    }

    const panelStep = window.innerHeight * 0.85;
    const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
    const top = wrapperTop + index * panelStep - STICKY_TOP;

    window.scrollTo({ top, behavior: 'smooth' });

    clickTimer.current = window.setTimeout(() => {
      clickScrolling.current = false;
    }, 900);
  }

  return (
    <section className="home-scroll-tabs" aria-label={t('nav.services')}>
      <div className="home-scroll-tabs__nav-wrap">
        <div className="home-scroll-tabs__nav-inner" role="tablist" aria-label={t('nav.services')}>
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`scroll-tab-${tab}`}
              aria-selected={activeTab === tab}
              aria-controls={`scroll-panel-${tab}`}
              className={`home-scroll-tabs__tab${activeTab === tab ? ' home-scroll-tabs__tab--active' : ''}`}
              onClick={() => scrollToPanel(tab)}
            >
              {t(`home.scrollTabs.${tab}.label`)}
            </button>
          ))}
        </div>
      </div>

      <div ref={panelsWrapperRef} className="home-scroll-tabs__panels">
        {TABS.map((tab) => {
          const meta = tabMeta[tab];
          const checks = ['c1', 'c2', 'c3', 'c4'] as const;
          return (
            <article
              key={tab}
              id={`scroll-panel-${tab}`}
              role="tabpanel"
              aria-labelledby={`scroll-tab-${tab}`}
              className="home-scroll-tabs__panel"
              ref={(node) => {
                panelRefs.current[tab] = node;
              }}
            >
              <div className="home-scroll-tabs__left">
                <span className="home-scroll-tabs__tag">{t(`home.scrollTabs.${tab}.tag`)}</span>
                <h3 className="home-scroll-tabs__headline">
                  {t(`home.scrollTabs.${tab}.headline1`)}
                  <br />
                  {t(`home.scrollTabs.${tab}.headline2`)}
                </h3>
                <ul className="home-scroll-tabs__checks">
                  {checks.map((c) => (
                    <li key={c} className="home-scroll-tabs__check">
                      <span className="home-scroll-tabs__check-mark" aria-hidden>
                        ✓
                      </span>
                      {t(`home.scrollTabs.${tab}.${c}`)}
                    </li>
                  ))}
                </ul>
                <Link to={meta.learnHref} className="home-scroll-tabs__link">
                  {t('nav.learnMore')}
                </Link>
              </div>

              <div className="home-scroll-tabs__right">
                <img className="home-scroll-tabs__photo" src={meta.image} alt="" loading="lazy" />
                <div className="home-scroll-tabs__float-card">
                  <p className="home-scroll-tabs__float-name">{t(`home.scrollTabs.${tab}.person`)}</p>
                  <p className="home-scroll-tabs__float-role">{t(`home.scrollTabs.${tab}.role`)}</p>
                  <div className="home-scroll-tabs__float-tags">
                    {meta.tags.map((tag) => (
                      <span key={tag} className="home-scroll-tabs__float-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
