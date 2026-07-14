import React from 'react';
import { useTranslation } from 'react-i18next';
import '../quotes/quotes-admin.css';

export function MediaAdminPage() {
  const { t } = useTranslation();

  return (
    <div className="admin-quotes-page">
      <h1 className="admin-quotes-page__title">{t('admin.media.title')}</h1>
      <p className="client-page-subtitle">{t('admin.media.subtitle')}</p>
      <div className="admin-quotes-detail">
        <p>{t('admin.media.hint')}</p>
      </div>
    </div>
  );
}
