import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { useAdminClients } from '../shared/adminModuleHooks';
import '../quotes/quotes-admin.css';

export function ClientsAdminPage() {
  const { t } = useTranslation();
  const query = useAdminClients();
  const items = query.data || [];

  if (query.isLoading) return <div className="admin-quotes-page"><LoadingState label={t('admin.clients.loading')} /></div>;

  return (
    <div className="admin-quotes-page">
      <h1 className="admin-quotes-page__title">{t('admin.clients.title')}</h1>
      {items.length === 0 ? <p className="admin-quotes-empty">{t('admin.clients.empty')}</p> : (
        <div className="admin-quotes-table-wrap">
          {items.map((item: Record<string, unknown>) => (
            <div key={String(item._id)} className="admin-quotes-table__row" style={{ gridTemplateColumns: '1.2fr 1.2fr 1fr 1fr' }}>
              <span>{String(item.companyName || '—')}</span>
              <span>{String(item.contactName || '—')}</span>
              <span>{String(item.contactEmail || '—')}</span>
              <span>{String(item.location || '—')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
