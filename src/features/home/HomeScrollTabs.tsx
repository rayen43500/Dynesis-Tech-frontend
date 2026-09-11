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

  const articles = query.data || [];
  if (query.isLoading || articles.length === 0) return null;

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
          const tag = article.categories?.[0] || t('home.blog.defaultTag');

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
                  <span>{t('home.blog.cta')}</span>
                  <ArrowRight size={16} className="home-blog-carousel__cta-arrow" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
