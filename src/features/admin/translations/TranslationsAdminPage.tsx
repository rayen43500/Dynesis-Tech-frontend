import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { useAdminTranslations } from '../shared/adminModuleHooks';
import '../quotes/quotes-admin.css';

export function TranslationsAdminPage() {
  const { t } = useTranslation();
  const query = useAdminTranslations();
  const items = query.data || [];

  if (query.isLoading) return <div className="admin-quotes-page"><LoadingState label={t('admin.translations.loading')} /></div>;

  return (
    <div className="admin-quotes-page">
      <h1 className="admin-quotes-page__title">{t('admin.translations.title')}</h1>
      {items.length === 0 ? <p className="admin-quotes-empty">{t('admin.translations.empty')}</p> : (
        <div className="admin-quotes-table-wrap">
          {items.map((item: Record<string, unknown>) => (
            <div key={String(item._id)} className="admin-quotes-table__row" style={{ gridTemplateColumns: '1fr 1.5fr 1fr' }}>
              <span>{String(item.namespace || '—')}</span>
              <span>{String(item.key || '—')}</span>
              <span>{item.visible ? t('admin.faq.visible') : t('admin.faq.hidden')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
