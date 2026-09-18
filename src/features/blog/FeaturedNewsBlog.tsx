import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { endpoints } from '../../shared/api/endpoints';
import './featured-news-blog.css';

export interface BlogPostItem {
  _id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  badgeType?: 'NEWS RELEASE' | 'BLOG' | 'ARTICLE' | string;
  readTime?: string;
  coverImageUrl?: string;
  publishedAt?: string;
}

const DEFAULT_FEATURED_POSTS: BlogPostItem[] = [
  {
    _id: 'default-news-1',
    slug: 'transformer-l-entreprise-sans-casser-l-existant',
    title: 'Une transformation digitale qui ne casse pas ce qui marche déjà',
    badgeType: 'TRANSFORMATION DIGITALE',
    readTime: '3 MIN READ',
    coverImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-09-15'
  },
  {
    _id: 'default-news-2',
    slug: 'apps-web-et-mobile-pretes-pour-la-production',
    title: 'Des apps web et mobile pensées pour la prod, pas pour la démo',
    badgeType: 'DÉVELOPPEMENT WEB & MOBILE',
    readTime: '3 MIN READ',
    coverImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-09-12'
  },
  {
    _id: 'default-news-3',
    slug: 'design-produit-que-les-equipes-peuvent-livrer',
    title: 'Un design produit que vos équipes peuvent vraiment livrer',
    badgeType: 'DESIGN PRODUIT',
    readTime: '3 MIN READ',
    coverImageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2026-09-10'
  },
  {
    _id: 'default-news-4',
    slug: 'architectures-cloud-microservices-zero-downtime',
    title: 'Architectures Cloud & Microservices : Garantir le Zéro Downtime en production',
    badgeType: 'CLOUD & DEVOPS',
    readTime: '4 MIN READ',
    coverImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2026-09-08'
  },
  {
    _id: 'default-news-5',
    slug: 'ia-generative-agents-autonomes-entreprises',
    title: 'Intégrer les Agents IA et LLM dans vos Processus Métiers',
    badgeType: 'INTELLIGENCE ARTIFICIELLE',
    readTime: '3 MIN READ',
    coverImageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=400&q=80',
    publishedAt: '2026-09-05'
  },
  {
    _id: 'default-news-6',
    slug: 'audit-securite-zero-trust-systemes-critiques',
    title: 'Sécurité Zero-Trust & Conformité ISO 27001 pour Systèmes Critiques',
    badgeType: 'CYBERSÉCURITÉ',
    readTime: '3 MIN READ',
    coverImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80',
    publishedAt: '2026-09-03'
  },
  {
    _id: 'default-news-7',
    slug: 'smart-contracts-solidity-web3-applications',
    title: 'De la Blockchain au SaaS : Déploiement de Smart Contracts Sécurisés',
    badgeType: 'WEB3 & BLOCKCHAIN',
    readTime: '4 MIN READ',
    coverImageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&q=80',
    publishedAt: '2026-08-30'
  },
  {
    _id: 'default-news-8',
    slug: 'performance-react-vite-microfrontends',
    title: 'Optimisation Frontend : Passer sous la barre des 50ms de temps de rendu',
    badgeType: 'INGÉNIERIE LOGICIELLE',
    readTime: '3 MIN READ',
    coverImageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=400&q=80',
    publishedAt: '2026-08-28'
  }
];

function CategoryIcon({ type }: { type?: string }) {
  const normalized = (type || '').toUpperCase();
  if (normalized.includes('ARTICLE')) {
    return (
      <svg className="fn-tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <rect x="9" y="8" width="6" height="8" rx="1" strokeWidth="1.6" />
      </svg>
    );
  }
  if (normalized.includes('BLOG')) {
    return (
      <svg className="fn-tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12h8M8 9h8M8 15h5" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className="fn-tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" strokeWidth="2" />
    </svg>
  );
}

function getLocalized(value: { en?: string; fr?: string } | string | undefined, lang: string): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return lang.startsWith('fr') ? value.fr || value.en || '' : value.en || value.fr || '';
}

interface FeaturedNewsBlogProps {
  sectionTitle?: string;
  recentlyPublishedLabel?: string;
  recentlyPublishedHref?: string;
  showSectionHeader?: boolean;
  className?: string;
}

export function FeaturedNewsBlog({
  sectionTitle,
  recentlyPublishedLabel,
  recentlyPublishedHref = '/blog',
  showSectionHeader = true,
  className = ''
}: FeaturedNewsBlogProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const query = useQuery({
    queryKey: ['public', 'blog', 'featured-news'],
    queryFn: async () => {
      try {
        const res = await endpoints.public.blog.list({ limit: 20 });
        return res.data?.data || [];
      } catch {
        return [];
      }
    }
  });

  // Map API items or fall back to DEFAULT_FEATURED_POSTS
  const apiItems: (BlogPostItem & { isMain?: boolean })[] = (query.data || []).map((doc: any, index: number) => {
    const title = getLocalized(doc.title, lang) || doc.slug;
    const category = Array.isArray(doc.categories) && doc.categories[0] ? doc.categories[0] : '';
    const badgeType = doc.badgeType || (category
      ? category.toUpperCase()
      : index % 3 === 0
      ? 'NEWS RELEASE'
      : index % 3 === 1
      ? 'BLOG'
      : 'ARTICLE');

    return {
      _id: doc._id,
      slug: doc.slug,
      title,
      excerpt: getLocalized(doc.excerpt, lang),
      category,
      badgeType,
      readTime: doc.readTime || '3 MIN READ',
      coverImageUrl: doc.coverImageUrl || DEFAULT_FEATURED_POSTS[index % DEFAULT_FEATURED_POSTS.length].coverImageUrl,
      publishedAt: doc.publishedAt,
      isMain: Boolean(doc.isMain)
    };
  });

  // Ensure isMain item is placed strictly at the 1st position (Card 1)
  apiItems.sort((a, b) => (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0));

  // Combine API items with fallback items so we always have the 8-card grid fully populated
  const combinedPosts: BlogPostItem[] = [...apiItems];
  DEFAULT_FEATURED_POSTS.forEach((fallback) => {
    if (combinedPosts.length < 8 && !combinedPosts.some((p) => p.slug === fallback.slug)) {
      combinedPosts.push(fallback);
    }
  });

  const card1 = combinedPosts[0] || DEFAULT_FEATURED_POSTS[0];
  const card2 = combinedPosts[1] || DEFAULT_FEATURED_POSTS[1];
  const card3 = combinedPosts[2] || DEFAULT_FEATURED_POSTS[2];
  const card4 = combinedPosts[3] || DEFAULT_FEATURED_POSTS[3];

  const bottomItems = combinedPosts.slice(4, 8);
  while (bottomItems.length < 4) {
    bottomItems.push(DEFAULT_FEATURED_POSTS[4 + bottomItems.length]);
  }

  const titleText = sectionTitle || 'Featured News';
  const recentText = recentlyPublishedLabel || 'Recently Published';

  return (
    <section className={`featured-news-wrapper ${className}`} aria-label="Featured News">
      <div className="featured-news-container">
        {showSectionHeader && (
          <header className="featured-news-header">
            <h2 className="featured-news-header__title">{titleText}</h2>
            <Link to={recentlyPublishedHref} className="featured-news-header__link">
              <span>{recentText}</span>
              <span className="featured-news-header__arrow-circle" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </header>
        )}

        {/* Top Hero Grid: 2 tall cards + 1 column of 2 stacked cards */}
        <div className="featured-news-hero-grid">
          {/* Card 1 (Large left) */}
          <Link
            to={`/blog/${card1.slug}`}
            className="featured-news-card featured-news-card--tall"
            style={{ backgroundImage: `url("${card1.coverImageUrl}")` }}
          >
            <div className="featured-news-card__gradient" />
            <div className="featured-news-card__badge">
              <CategoryIcon type={card1.badgeType} />
              <span>{card1.badgeType}</span>
            </div>
            <div className="featured-news-card__bottom">
              <span className="featured-news-card__readtime">{card1.readTime || '2 MIN READ'}</span>
              <h3 className="featured-news-card__title">{card1.title}</h3>
            </div>
          </Link>

          {/* Card 2 (Large center) */}
          <Link
            to={`/blog/${card2.slug}`}
            className="featured-news-card featured-news-card--tall"
            style={{ backgroundImage: `url("${card2.coverImageUrl}")` }}
          >
            <div className="featured-news-card__gradient" />
            <div className="featured-news-card__badge">
              <CategoryIcon type={card2.badgeType} />
              <span>{card2.badgeType}</span>
            </div>
            <div className="featured-news-card__bottom">
              <span className="featured-news-card__readtime">{card2.readTime || '3 MIN READ'}</span>
              <h3 className="featured-news-card__title">{card2.title}</h3>
            </div>
          </Link>

          {/* Column 3 (2 Stacked cards) */}
          <div className="featured-news-hero-grid__stacked">
            {/* Card 3 (Upper) */}
            <Link
              to={`/blog/${card3.slug}`}
              className="featured-news-card featured-news-card--stacked"
              style={{ backgroundImage: `url("${card3.coverImageUrl}")` }}
            >
              <div className="featured-news-card__gradient" />
              <div className="featured-news-card__badge">
                <CategoryIcon type={card3.badgeType} />
                <span>{card3.badgeType}</span>
              </div>
              <div className="featured-news-card__bottom">
                <span className="featured-news-card__readtime">{card3.readTime || '3 MIN READ'}</span>
                <h4 className="featured-news-card__title featured-news-card__title--stacked">{card3.title}</h4>
              </div>
            </Link>

            {/* Card 4 (Lower) */}
            <Link
              to={`/blog/${card4.slug}`}
              className="featured-news-card featured-news-card--stacked"
              style={{ backgroundImage: `url("${card4.coverImageUrl}")` }}
            >
              <div className="featured-news-card__gradient" />
              <div className="featured-news-card__badge">
                <CategoryIcon type={card4.badgeType} />
                <span>{card4.badgeType}</span>
              </div>
              <div className="featured-news-card__bottom">
                <span className="featured-news-card__readtime">{card4.readTime || '3 MIN READ'}</span>
                <h4 className="featured-news-card__title featured-news-card__title--stacked">{card4.title}</h4>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Row: 4 horizontal items with circular thumbnails */}
        <div className="featured-news-bottom-row">
          {bottomItems.map((item, idx) => (
            <Link
              key={item.slug || idx}
              to={`/blog/${item.slug}`}
              className="featured-news-mini-item"
            >
              <div className="featured-news-mini-item__thumb-wrap">
                <img
                  src={item.coverImageUrl}
                  alt=""
                  className="featured-news-mini-item__thumb"
                  loading="lazy"
                />
              </div>
              <div className="featured-news-mini-item__content">
                <span className="featured-news-mini-item__readtime">{item.readTime || '3 MIN READ'}</span>
                <h5 className="featured-news-mini-item__title">{item.title}</h5>
                <div className="featured-news-mini-item__tag">
                  <CategoryIcon type={item.badgeType} />
                  <span>{item.badgeType}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
