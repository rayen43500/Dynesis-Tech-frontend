import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import { endpoints } from '../../shared/api/endpoints';

type Localized = { en?: string; fr?: string };

type BlogCard = {
  _id: string;
  slug: string;
  title?: Localized;
  excerpt?: Localized;
  coverImageUrl?: string;
  categories?: string[];
};

function pickLocalized(value: Localized | undefined, lang: string) {
  if (!value) return '';
  return lang.startsWith('fr') ? value.fr || value.en || '' : value.en || value.fr || '';
}

const DEFAULT_ARTICLES: BlogCard[] = [
  {
    _id: 'default-1',
    slug: 'transformation-digitale-qui-ne-casse-pas',
    coverImageUrl: '/images/blog/transform.jpg',
    categories: ['TRANSFORMATION DIGITALE'],
    title: {
      fr: 'Une transformation qui ne casse pas ce qui marche',
      en: 'A transformation that preserves what works'
    },
    excerpt: {
      fr: 'Moderniser l\'existant, passer au cloud et automatiser le travail répétitif, sans geler l\'activité pendant six mois.',
      en: 'Modernize existing systems, move to the cloud and automate repetitive work without freezing operations for six months.'
    }
  },
  {
    _id: 'default-2',
    slug: 'des-apps-pensees-pour-la-prod',
    coverImageUrl: '/images/blog/web.jpg',
    categories: ['DÉVELOPPEMENT WEB & MOBILE'],
    title: {
      fr: 'Des apps pensées pour la prod, pas la démo',
      en: 'Apps built for production, not the demo'
    },
    excerpt: {
      fr: 'React, mobile natif et APIs solides : des produits rapides qui restent maintenables après le lancement.',
      en: 'React, native mobile and solid APIs: fast products that stay maintainable after launch.'
    }
  },
  {
    _id: 'default-3',
    slug: 'un-design-produit-que-vos-equipes-peuvent-livrer',
    coverImageUrl: '/images/blog/design.jpg',
    categories: ['DESIGN PRODUIT & DÉVELOPPEMENT'],
    title: {
      fr: 'Un design produit que vos équipes peuvent livrer',
      en: 'Product design your teams can actually ship'
    },
    excerpt: {
      fr: 'De la recherche au handoff, un process qui aligne ingénierie, marque et utilisateurs.',
      en: 'From research to handoff, a process that aligns engineering, brand, and users.'
    }
  }
];

export function HomeScrollTabs() {
  const { i18n, t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);

  const query = useQuery({
    queryKey: ['public', 'blog', 'home-carousel'],
    queryFn: async () => {
      const res = await endpoints.public.blog.list({ limit: 12 });
      return (res.data?.data || []) as BlogCard[];
    }
  });

  const queryArticles = query.data || [];
  const articles = queryArticles.length > 0 ? queryArticles : DEFAULT_ARTICLES;

  function scroll(direction: 'left' | 'right') {
    if (!trackRef.current) return;
    const scrollAmount = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  return (
    <div className="home-blog-carousel" aria-label={t('home.blog.sectionAria')}>
      {articles.length > 3 ? (
        <div className="home-blog-carousel__controls">
          <button
            type="button"
            className="home-blog-carousel__nav-btn"
            onClick={() => scroll('left')}
            aria-label="Articles précédents"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="home-blog-carousel__nav-btn"
            onClick={() => scroll('right')}
            aria-label="Articles suivants"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      ) : null}

      <div className="home-blog-carousel__track" ref={trackRef}>
        {articles.map((article) => {
          const title = pickLocalized(article.title, i18n.language);
          const excerpt = pickLocalized(article.excerpt, i18n.language);
          const tag = article.categories?.[0] || 'TECH & ARCHITECTURE';

          return (
            <article key={article._id} className="home-blog-carousel__card">
              <Link to={`/blog/${article.slug}`} className="home-blog-carousel__media-link" tabIndex={-1} aria-hidden>
                {article.coverImageUrl ? (
                  <img className="home-blog-carousel__image" src={article.coverImageUrl} alt="" loading="lazy" />
                ) : (
                  <div className="home-blog-carousel__image home-blog-carousel__image--empty" />
                )}
              </Link>
              <div className="home-blog-carousel__body">
                <span className="home-blog-carousel__tag">{tag}</span>
                <h3 className="home-blog-carousel__title">
                  <Link to={`/blog/${article.slug}`}>{title}</Link>
                </h3>
                {excerpt ? <p className="home-blog-carousel__excerpt">{excerpt}</p> : null}
                <Link to={`/blog/${article.slug}`} className="home-blog-carousel__cta">
                  <span>LIRE L'ARTICLE</span>
                  <span className="home-blog-carousel__cta-arrow" aria-hidden>→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
