import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { endpoints } from '../../shared/api/endpoints';
import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { FeaturedNewsBlog } from './FeaturedNewsBlog';
import './blog-article.css';

function getLocalized(value: { en?: string; fr?: string } | undefined, lang: string) {
  if (!value) return '';
  return lang.startsWith('fr') ? value.fr || value.en || '' : value.en || value.fr || '';
}

export function BlogArticlePage() {
  const { slug } = useParams();
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const query = useQuery({
    queryKey: ['public', 'blog', slug],
    enabled: !!slug,
    queryFn: async () => {
      const res = await endpoints.public.blog.getBySlug(slug as string);
      return res.data?.data;
    }
  });

  if (query.isLoading) {
    return (
      <div className="blog-article-loading">
        <LoadingState label={t('public.blog.loading')} />
      </div>
    );
  }

  const article = query.data;

  const title = getLocalized(article?.title, lang) || slug?.replace(/-/g, ' ');
  const content = getLocalized(article?.content, lang) || getLocalized(article?.excerpt, lang) || '';
  const category = (Array.isArray(article?.categories) && article?.categories[0]) || 'ARTICLE';
  const coverImage = article?.coverImageUrl || 'https://images.unsplash.com/photo-1517976487507-580da3a82371?auto=format&fit=crop&w=1400&q=80';
  const dateFormatted = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(lang.startsWith('fr') ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Récemment';

  const paragraphs = content.split('\n\n').filter(Boolean);

  return (
    <div className="blog-article-root">
      {/* Top Breadcrumb */}
      <div className="blog-article-nav">
        <div className="blog-article-nav__container">
          <Link to="/blog" className="blog-article-nav__back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{lang.startsWith('fr') ? 'Retour aux actualités' : 'Back to News'}</span>
          </Link>
          <span className="blog-article-nav__sep">/</span>
          <span className="blog-article-nav__current">{category}</span>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="blog-article-main">
        <header className="blog-article-header">
          <div className="blog-article-header__tags">
            <span className="blog-article-header__badge">{category}</span>
            <span className="blog-article-header__read">3 MIN READ</span>
          </div>

          <h1 className="blog-article-header__title">{title}</h1>

          <div className="blog-article-author-row">
            <div className="blog-article-author-row__avatar">
              {article?.authorName ? article.authorName.charAt(0) : 'D'}
            </div>
            <div className="blog-article-author-row__info">
              <span className="blog-article-author-row__name">{article?.authorName || 'Dynesis Tech Editorial'}</span>
              <span className="blog-article-author-row__date">{dateFormatted}</span>
            </div>
          </div>
        </header>

        {/* Featured Cover Banner */}
        <div className="blog-article-cover">
          <img src={coverImage} alt={title} className="blog-article-cover__img" />
        </div>

        {/* Article Body Content */}
        <div className="blog-article-content">
          {paragraphs.length > 0 ? (
            paragraphs.map((p: string, idx: number) => (
              <p key={idx} className="blog-article-p">{p}</p>
            ))
          ) : (
            <p className="blog-article-p">
              {lang.startsWith('fr')
                ? 'Cet article explore les défis actuels d\'architecture, d\'expérience produit et d\'ingénierie moderne.'
                : 'This article explores key insights into modern engineering, product design, and scalable systems.'}
            </p>
          )}
        </div>

        {/* Post Footer */}
        <footer className="blog-article-footer">
          <Link to="/blog" className="blog-article-footer__btn">
            ← {lang.startsWith('fr') ? 'Voir toutes les actualités' : 'Explore All News'}
          </Link>
        </footer>
      </article>

      {/* Related Featured News */}
      <div className="blog-article-related">
        <FeaturedNewsBlog
          sectionTitle={lang.startsWith('fr') ? 'Autres actualités à la Une' : 'More Featured News'}
          recentlyPublishedLabel={lang.startsWith('fr') ? 'Tous les articles' : 'All Articles'}
          recentlyPublishedHref="/blog"
        />
      </div>
    </div>
  );
}
