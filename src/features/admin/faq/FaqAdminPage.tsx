import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { useAdminFaq } from '../shared/adminModuleHooks';
import '../quotes/quotes-admin.css';

function getLocalized(value: { en?: string; fr?: string } | undefined, lang: string) {
  if (!value) return '';
  return lang.startsWith('fr') ? value.fr || value.en || '' : value.en || value.fr || '';
}

export function FaqAdminPage() {
  const { i18n, t } = useTranslation();
  const query = useAdminFaq();
  const items = query.data || [];

  if (query.isLoading) return <div className="admin-quotes-page"><LoadingState label={t('admin.faq.loading')} /></div>;

  return (
    <div className="admin-quotes-page">
      <h1 className="admin-quotes-page__title">{t('admin.faq.title')}</h1>
      {items.length === 0 ? <p className="admin-quotes-empty">{t('admin.faq.empty')}</p> : (
        <div className="admin-quotes-table-wrap">
          {items.map((item: Record<string, unknown>) => (
            <div key={String(item._id)} className="admin-quotes-table__row" style={{ gridTemplateColumns: '2fr 1fr 0.7fr' }}>
              <span>{getLocalized(item.question as { en?: string; fr?: string }, i18n.language) || '—'}</span>
              <span>{String(item.category || '—')}</span>
              <span>{item.visible ? t('admin.faq.visible') : t('admin.faq.hidden')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
