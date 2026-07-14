import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { useAdminInvoices } from '../shared/adminModuleHooks';
import '../quotes/quotes-admin.css';

export function InvoicesAdminPage() {
  const { t } = useTranslation();
  const query = useAdminInvoices();
  const items = query.data || [];

  if (query.isLoading) return <div className="admin-quotes-page"><LoadingState label={t('admin.invoices.loading')} /></div>;

  return (
    <div className="admin-quotes-page">
      <h1 className="admin-quotes-page__title">{t('admin.invoices.title')}</h1>
      {items.length === 0 ? <p className="admin-quotes-empty">{t('admin.invoices.empty')}</p> : (
        <div className="admin-quotes-table-wrap">
          {items.map((item: Record<string, unknown>) => (
            <div key={String(item._id)} className="admin-quotes-table__row" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
              <span>{String(item.invoiceNumber || '—')}</span>
              <span>{String(item.status || '—')}</span>
              <span>{String(item.total ?? 0)} {String(item.currency || 'EUR')}</span>
              <span>{item.dueDate ? new Date(String(item.dueDate)).toLocaleDateString() : '—'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
