import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { useAdminTickets } from '../shared/adminModuleHooks';
import '../quotes/quotes-admin.css';

export function TicketsAdminPage() {
  const { t } = useTranslation();
  const query = useAdminTickets();
  const items = query.data || [];

  if (query.isLoading) return <div className="admin-quotes-page"><LoadingState label={t('admin.tickets.loading')} /></div>;

  return (
    <div className="admin-quotes-page">
      <h1 className="admin-quotes-page__title">{t('admin.tickets.title')}</h1>
      {items.length === 0 ? <p className="admin-quotes-empty">{t('admin.tickets.empty')}</p> : (
        <div className="admin-quotes-table-wrap">
          {items.map((item: Record<string, unknown>) => (
            <div key={String(item._id)} className="admin-quotes-table__row" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr' }}>
              <span>{String(item.subject || '—')}</span>
              <span>{String(item.status || '—')}</span>
              <span>{String(item.priority || '—')}</span>
              <span>{String(item.category || '—')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
