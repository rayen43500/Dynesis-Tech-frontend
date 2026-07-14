import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { useAdminHomepage } from '../shared/adminModuleHooks';
import '../quotes/quotes-admin.css';

export function HomepageAdminPage() {
  const { t } = useTranslation();
  const query = useAdminHomepage();
  const config = query.data;

  if (query.isLoading) return <div className="admin-quotes-page"><LoadingState label={t('admin.homepage.loading')} /></div>;

  return (
    <div className="admin-quotes-page">
      <h1 className="admin-quotes-page__title">{t('admin.homepage.title')}</h1>
      <p className="client-page-subtitle">{t('admin.homepage.subtitle')}</p>
      <div className="admin-quotes-detail">
        <p><strong>{t('admin.homepage.visible')}:</strong> {config?.visible ? t('admin.faq.visible') : t('admin.faq.hidden')}</p>
        <p><strong>{t('admin.homepage.ordering')}:</strong> {config?.ordering ?? 0}</p>
        <p><strong>{t('admin.homepage.heroTitle')}:</strong> {config?.hero?.title?.en || '—'}</p>
        <p><strong>{t('admin.homepage.heroSubtitle')}:</strong> {config?.hero?.subtitle?.en || '—'}</p>
      </div>
    </div>
  );
}
