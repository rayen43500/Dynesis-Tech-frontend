import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { useClientTickets } from '../billing/clientBillingHooks';
import { endpoints } from '../../../shared/api/endpoints';
import '../client-dashboard.css';

export function ClientSupportPage() {
  const { t } = useTranslation();
  const query = useClientTickets();
  const qc = useQueryClient();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const createMutation = useMutation({
    mutationFn: (payload: { subject: string; description: string }) => endpoints.client.tickets.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['client', 'tickets'] });
      setSubject('');
      setDescription('');
    }
  });

  const items = query.data || [];

  return (
    <>
      <h1 className="client-page-title">{t('client.support.title')}</h1>
      <p className="client-page-subtitle">{t('client.support.subtitle')}</p>
      <div className="client-panel-card">
        <h2 className="client-quote-section__label">{t('client.support.newTicket')}</h2>
        <input className="admin-services-search__input" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={t('client.support.subject')} />
        <textarea className="admin-services-search__input" style={{ marginTop: 8, minHeight: 100 }} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('client.support.description')} />
        <button type="button" className="client-quote-empty__link" style={{ marginTop: 12, border: 'none', background: 'none', cursor: 'pointer' }} disabled={!subject || createMutation.isPending} onClick={() => createMutation.mutate({ subject, description })}>
          {t('client.support.submit')}
        </button>
      </div>
      {query.isLoading ? <LoadingState label={t('client.support.loading')} /> : null}
      {!query.isLoading && items.length > 0 ? (
        <div className="client-notifications-list">
          {items.map((item: Record<string, unknown>) => (
            <article key={String(item._id)} className="client-panel-card">
              <h2 className="client-quote-section__label">{String(item.subject)}</h2>
              <p className="client-quote-card__row">{String(item.status)} — {String(item.priority)}</p>
            </article>
          ))}
        </div>
      ) : null}
    </>
  );
}
