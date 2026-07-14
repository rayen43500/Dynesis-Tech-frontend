import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { useClientInvoices } from '../billing/clientBillingHooks';
import '../client-dashboard.css';

export function ClientInvoicesPage() {
  const { t } = useTranslation();
  const query = useClientInvoices();
  const items = query.data || [];

  return (
    <>
      <h1 className="client-page-title">{t('client.invoices.title')}</h1>
      <p className="client-page-subtitle">{t('client.invoices.subtitle')}</p>
      {query.isLoading ? <LoadingState label={t('client.invoices.loading')} /> : null}
      {!query.isLoading && items.length === 0 ? (
        <div className="client-panel-card"><p className="client-quote-empty">{t('client.invoices.empty')}</p></div>
      ) : null}
      {!query.isLoading && items.length > 0 ? (
        <div className="client-notifications-list">
          {items.map((item: Record<string, unknown>) => (
            <article key={String(item._id)} className="client-panel-card">
              <h2 className="client-quote-section__label">{String(item.invoiceNumber || t('client.invoices.untitled'))}</h2>
              <p className="client-quote-card__row"><strong>{t('client.invoices.status')}:</strong> {String(item.status)}</p>
              <p className="client-quote-card__row"><strong>{t('client.invoices.total')}:</strong> {String(item.total)} {String(item.currency || 'EUR')}</p>
              <p className="client-quote-card__row"><strong>{t('client.invoices.paid')}:</strong> {String(item.amountPaid || 0)}</p>
            </article>
          ))}
        </div>
      ) : null}
    </>
  );
}
