import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { endpoints } from '../../shared/api/endpoints';
import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { FeaturedNewsBlog } from './FeaturedNewsBlog';
import './blog-page.css';

interface ArticleItem {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImageUrl: string;
  publishedAt: string;
  authorName: string;
}

function getLocalized(value: { en?: string; fr?: string } | undefined, lang: string): string {
  if (!value) return '';
  return lang.startsWith('fr') ? value.fr || value.en || '' : value.en || value.fr || '';
}

export function BlogPage() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const query = useQuery({
    queryKey: ['public', 'blog'],
    queryFn: async () => {
      const res = await endpoints.public.blog.list({ limit: 50 });
      return res.data?.data || [];
    }
  });

  const articles: ArticleItem[] = (query.data || []).map((item: any): ArticleItem => ({
    _id: String(item._id),
    slug: String(item.slug || ''),
    title: getLocalized(item.title, lang) || item.slug,
    excerpt: getLocalized(item.excerpt, lang) || '',
    category: Array.isArray(item.categories) && item.categories[0] ? item.categories[0] : 'ARTICLE',
    coverImageUrl: item.coverImageUrl || 'https://images.unsplash.com/photo-1517976487507-580da3a82371?auto=format&fit=crop&w=800&q=80',
    publishedAt: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString(lang.startsWith('fr') ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
    authorName: item.authorName || 'Dynesis Editorial'
  }));

  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a: ArticleItem) => {
      if (a.category) set.add(a.category);
    });
    return ['all', ...Array.from(set)];
  }, [articles]);

  const featuredSlugs = useMemo(() => {
    return new Set(articles.slice(0, 8).map((a) => a.slug));
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((a: ArticleItem) => {
      const matchesSearch = !searchTerm.trim() ||
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (searchTerm.trim()) {
        return matchesSearch;
      }

      if (selectedCategory !== 'all') {
        return a.category.toLowerCase() === selectedCategory.toLowerCase();
      }

      // In 'all' view without search query, exclude articles already showcased in Featured News
      return !featuredSlugs.has(a.slug);
    });
  }, [articles, selectedCategory, searchTerm, featuredSlugs]);

  const isFiltering = selectedCategory !== 'all' || Boolean(searchTerm.trim());

  return (
    <div className="blog-page-root">
      {/* Featured News Hero Grid (shown when not filtering) */}
      {!isFiltering && (
        <FeaturedNewsBlog
          sectionTitle="Featured News"
          recentlyPublishedLabel="Recently Published"
          recentlyPublishedHref="#all-articles"
        />
      )}

      {/* Archive / All Articles Section */}
      <section className="blog-archive-section" id="all-articles">
        <div className="blog-archive-container">
          <div className="blog-archive-header">
            <div className="blog-archive-header__copy">
              <span className="blog-archive-eyebrow">
                {lang.startsWith('fr') ? 'ARCHIVES & ANALYSES' : 'ARCHIVES & INSIGHTS'}
              </span>
              <h2 className="blog-archive-title">
                {lang.startsWith('fr') ? 'Tous les articles & publications' : 'All Articles & Publications'}
              </h2>
            </div>

            {/* Search Bar */}
            <div className="blog-search-bar">
              <svg className="blog-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lang.startsWith('fr') ? 'Rechercher un sujet, mot-clé…' : 'Search topics, keywords…'}
                className="blog-search-input"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="blog-search-clear"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Chips */}
          {categories.length > 1 && (
            <div className="blog-categories-bar" role="tablist">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`blog-category-chip ${selectedCategory === cat ? 'blog-category-chip--active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'all' ? (lang.startsWith('fr') ? 'Tous les sujets' : 'All Topics') : cat}
                </button>
              ))}
            </div>
          )}

          {/* Loading */}
          {query.isLoading ? <LoadingState label={t('public.blog.loading')} /> : null}

          {/* Articles Grid */}
          {!query.isLoading && filteredArticles.length === 0 ? (
            <div className="blog-empty-state">
              <p>{lang.startsWith('fr') ? 'Aucun article ne correspond à votre recherche.' : 'No articles match your search criteria.'}</p>
            </div>
          ) : (
            <div className="blog-archive-grid">
              {filteredArticles.map((item: ArticleItem) => (
                <article key={item._id} className="blog-archive-card">
                  <Link to={`/blog/${item.slug}`} className="blog-archive-card__image-link">
                    <img
                      src={item.coverImageUrl}
                      alt={item.title}
                      className="blog-archive-card__image"
                      loading="lazy"
                    />
                    <span className="blog-archive-card__category">{item.category}</span>
                  </Link>

                  <div className="blog-archive-card__body">
                    <div className="blog-archive-card__meta">
                      <span className="blog-archive-card__date">{item.publishedAt}</span>
                      <span className="blog-archive-card__dot">•</span>
                      <span className="blog-archive-card__read">3 MIN READ</span>
                    </div>

                    <h3 className="blog-archive-card__title">
                      <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                    </h3>

                    {item.excerpt ? (
                      <p className="blog-archive-card__excerpt">{item.excerpt}</p>
                    ) : null}

                    <div className="blog-archive-card__footer">
                      <span className="blog-archive-card__author">{item.authorName}</span>
                      <Link to={`/blog/${item.slug}`} className="blog-archive-card__cta">
                        <span>{lang.startsWith('fr') ? 'Lire' : 'Read'}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
