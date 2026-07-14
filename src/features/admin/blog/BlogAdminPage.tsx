import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { useAdminBlog } from '../shared/adminModuleHooks';
import '../quotes/quotes-admin.css';

function getLocalized(value: { en?: string; fr?: string } | undefined, lang: string) {
  if (!value) return '';
  return lang.startsWith('fr') ? value.fr || value.en || '' : value.en || value.fr || '';
}

export function BlogAdminPage() {
  const { i18n, t } = useTranslation();
  const query = useAdminBlog();
  const items = query.data || [];

  if (query.isLoading) return <div className="admin-quotes-page"><LoadingState label={t('admin.blog.loading')} /></div>;

  return (
    <div className="admin-quotes-page">
      <h1 className="admin-quotes-page__title">{t('admin.blog.title')}</h1>
      {items.length === 0 ? <p className="admin-quotes-empty">{t('admin.blog.empty')}</p> : (
        <div className="admin-quotes-table-wrap">
          {items.map((item: Record<string, unknown>) => (
            <div key={String(item._id)} className="admin-quotes-table__row" style={{ gridTemplateColumns: '1.5fr 1fr 1fr' }}>
              <span>{getLocalized(item.title as { en?: string; fr?: string }, i18n.language) || String(item.slug)}</span>
              <span>{item.published ? t('admin.blog.published') : t('admin.blog.draft')}</span>
              <span>{item.publishedAt ? new Date(String(item.publishedAt)).toLocaleDateString() : '—'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
