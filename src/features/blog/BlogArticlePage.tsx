import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { endpoints } from '../../shared/api/endpoints';
import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import '../services/services.css';

function getLocalized(value: { en?: string; fr?: string } | undefined, lang: string) {
  if (!value) return '';
  return lang.startsWith('fr') ? value.fr || value.en || '' : value.en || value.fr || '';
}

export function BlogArticlePage() {
  const { slug } = useParams();
  const { i18n, t } = useTranslation();
  const query = useQuery({
    queryKey: ['public', 'blog', slug],
    enabled: !!slug,
    queryFn: async () => {
      const res = await endpoints.public.blog.getBySlug(slug as string);
      return res.data?.data;
    }
  });

  if (query.isLoading) return <LoadingState label={t('public.blog.loading')} />;

  return (
    <section className="services-page">
      <article className="service-card" style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1>{getLocalized(query.data?.title, i18n.language)}</h1>
        <p>{getLocalized(query.data?.content, i18n.language)}</p>
      </article>
    </section>
  );
}
