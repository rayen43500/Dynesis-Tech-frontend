import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type TabId = 'design' | 'development' | 'transformation';

const TABS: { id: TabId; label: string }[] = [
  { id: 'design', label: 'Product Design & Build' },
  { id: 'development', label: 'Web & Mobile Development' },
  { id: 'transformation', label: 'Digital Transformation' }
];

const TAB_CONTENT: Record<
  TabId,
  {
    tag: string;
    headline: React.ReactNode;
    checks: string[];
    learnHref: string;
    visual: {
      image: string;
      name: string;
      role: string;
      tags: string[];
    };
  }
> = {
  design: {
    tag: 'PRODUCT DESIGN',
    headline: (
      <>
        Design and ship products
        <br />
        your users love
      </>
    ),
    checks: [
      'UX research & wireframing',
      'UI design & design systems',
      'Prototyping & user testing',
      'Handoff-ready Figma deliverables'
    ],
    learnHref: '/work-with-us',
    visual: {
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
      name: 'Sarah Chen',
      role: 'Lead Product Designer',
      tags: ['Figma', 'Design Systems']
    }
  },
  development: {
    tag: 'WEB & MOBILE',
    headline: (
      <>
        Build fast, clean,
        <br />
        production-ready apps
      </>
    ),
    checks: [
      'React, Next.js & Node.js',
      'iOS & Android mobile apps',
      'API design & backend systems',
      'Performance & scalability built-in'
    ],
    learnHref: '/developers',
    visual: {
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
      name: 'Marcus Webb',
      role: 'Senior Full-Stack Engineer',
      tags: ['React', 'Node.js']
    }
  },
  transformation: {
    tag: 'DIGITAL TRANSFORMATION',
    headline: (
      <>
        Evolve your business
        <br />
        with modern digital systems
      </>
    ),
    checks: [
      'Legacy system modernization',
      'Cloud architecture & DevOps',
      'Process automation & tooling',
      'Team training & technical upskilling'
    ],
    learnHref: '/contact',
    visual: {
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80',
      name: 'Elena Torres',
      role: 'Transformation Lead',
      tags: ['AWS', 'DevOps']
    }
  }
};

const NAV_OFFSET = 68;
const STICKY_NAV_HEIGHT = 52;

const STICKY_TOP = NAV_OFFSET + STICKY_NAV_HEIGHT;

function pickActivePanel(refs: Partial<Record<TabId, HTMLElement | null>>): TabId {
  const stickyLine = STICKY_TOP + 2;
  let active: TabId = TABS[0].id;
  let bestTop = -Infinity;

  for (const tab of TABS) {
    const node = refs[tab.id];
    if (!node) continue;

    const top = node.getBoundingClientRect().top;
    if (top <= stickyLine && top > bestTop) {
      bestTop = top;
      active = tab.id;
    }
  }

  if (bestTop === -Infinity) {
    let closest = Infinity;
    for (const tab of TABS) {
      const node = refs[tab.id];
      if (!node) continue;
      const dist = Math.abs(node.getBoundingClientRect().top - STICKY_TOP);
      if (dist < closest) {
        closest = dist;
        active = tab.id;
      }
    }
  }

  return active;
}

export function HomeScrollTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('design');
  const panelsWrapperRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Partial<Record<TabId, HTMLElement | null>>>({});
  const clickScrolling = useRef(false);
  const clickTimer = useRef<number | null>(null);

  useEffect(() => {
    const updateActive = () => {
      if (clickScrolling.current) return;
      setActiveTab(pickActivePanel(panelRefs.current));
    };

    const observers: IntersectionObserver[] = [];

    for (const tab of TABS) {
      const node = panelRefs.current[tab.id];
      if (!node) continue;

      const observer = new IntersectionObserver(
        () => updateActive(),
        {
          root: null,
          rootMargin: `-${STICKY_TOP}px 0px 0px 0px`,
          threshold: [0, 0.25, 0.5, 0.75, 1]
        }
      );

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

    const index = TABS.findIndex((tab) => tab.id === tabId);
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
    <section className="home-scroll-tabs" aria-label="Services">
      <div className="home-scroll-tabs__nav-wrap">
        <div className="home-scroll-tabs__nav-inner" role="tablist" aria-label="Service categories">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`scroll-tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`scroll-panel-${tab.id}`}
              className={`home-scroll-tabs__tab${activeTab === tab.id ? ' home-scroll-tabs__tab--active' : ''}`}
              onClick={() => scrollToPanel(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={panelsWrapperRef} className="home-scroll-tabs__panels">
        {TABS.map((tab) => {
          const data = TAB_CONTENT[tab.id];
          return (
            <article
              key={tab.id}
              id={`scroll-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`scroll-tab-${tab.id}`}
              className="home-scroll-tabs__panel"
              ref={(node) => {
                panelRefs.current[tab.id] = node;
              }}
            >
              <div className="home-scroll-tabs__left">
                <span className="home-scroll-tabs__tag">{data.tag}</span>
                <h3 className="home-scroll-tabs__headline">{data.headline}</h3>
                <ul className="home-scroll-tabs__checks">
                  {data.checks.map((item) => (
                    <li key={item} className="home-scroll-tabs__check">
                      <span className="home-scroll-tabs__check-mark" aria-hidden>
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to={data.learnHref} className="home-scroll-tabs__link">
                  Learn more <span aria-hidden>→</span>
                </Link>
              </div>

              <div className="home-scroll-tabs__right">
                <img className="home-scroll-tabs__photo" src={data.visual.image} alt="" loading="lazy" />
                <div className="home-scroll-tabs__float-card">
                  <p className="home-scroll-tabs__float-name">{data.visual.name}</p>
                  <p className="home-scroll-tabs__float-role">{data.visual.role}</p>
                  <div className="home-scroll-tabs__float-tags">
                    {data.visual.tags.map((tag) => (
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
