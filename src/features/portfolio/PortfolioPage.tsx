import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { endpoints } from '../../shared/api/endpoints';
import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import '../services/services.css';

function getLocalized(value: { en?: string; fr?: string } | undefined, lang: string) {
  if (!value) return '';
  return lang.startsWith('fr') ? value.fr || value.en || '' : value.en || value.fr || '';
}

export function PortfolioPage() {
  const { i18n, t } = useTranslation();
  const query = useQuery({
    queryKey: ['public', 'portfolio'],
    queryFn: async () => {
      const res = await endpoints.public.portfolio.list({ limit: 50 });
      return res.data?.data || [];
    }
  });

  return (
    <section className="services-page">
      <div className="services-hero">
        <h1>{t('public.portfolio.title')}</h1>
        <p>{t('public.portfolio.subtitle')}</p>
      </div>
      {query.isLoading ? <LoadingState label={t('public.portfolio.loading')} /> : null}
      <div className="services-grid">
        {(query.data || []).map((item: Record<string, unknown>) => (
          <article key={String(item._id)} className="service-card">
            <h3>{getLocalized(item.projectTitle as { en?: string; fr?: string }, i18n.language)}</h3>
            <p>{getLocalized(item.projectOverview as { en?: string; fr?: string }, i18n.language)}</p>
            <p>{(item.technologies as string[] || []).join(', ')}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
