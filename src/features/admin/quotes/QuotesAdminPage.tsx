import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { QuoteDetailPanel } from './QuoteDetailPanel';
import {
  markQuotesVisited,
  useAdminQuotes,
  useDeleteQuote,
  type AdminQuote,
  type QuoteStatus
} from './adminQuotesHooks';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { translateBudget, translateProjectType } from '../../../shared/i18n/quoteLabels';
import './quotes-admin.css';

type FilterTab = 'all' | QuoteStatus;

const FILTER_TAB_KEYS: { key: FilterTab; labelKey: string }[] = [
  { key: 'all', labelKey: 'admin.quotes.tabs.all' },
  { key: 'new', labelKey: 'admin.quotes.tabs.new' },
  { key: 'reviewed', labelKey: 'admin.quotes.tabs.reviewed' },
  { key: 'proposal_sent', labelKey: 'admin.quotes.tabs.proposalSent' },
  { key: 'closed', labelKey: 'admin.quotes.tabs.closed' }
];

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function QuotesAdminPage() {
  const { t } = useTranslation();
  const query = useAdminQuotes();
  const deleteMutation = useDeleteQuote();
  const [filter, setFilter] = useState<FilterTab>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminQuote | null>(null);

  useEffect(() => {
    markQuotesVisited();
  }, []);

  const quotes = query.data || [];
  const newCount = quotes.filter((q) => q.status === 'new').length;

  const filtered = useMemo(() => {
    if (filter === 'all') return quotes;
    return quotes.filter((q) => q.status === filter);
  }, [quotes, filter]);

  function statusLabel(status: QuoteStatus) {
    if (status === 'proposal_sent') return t('admin.quotes.tabs.proposalSent');
    if (status === 'new') return t('admin.quotes.tabs.new');
    if (status === 'reviewed') return t('admin.quotes.tabs.reviewed');
    if (status === 'closed') return t('admin.quotes.tabs.closed');
    return status;
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget._id);
    if (selectedId === deleteTarget._id) setSelectedId(null);
    setDeleteTarget(null);
  }

  if (query.isLoading) {
    return (
      <div className="admin-quotes-page">
        <LoadingState label={t('admin.quotes.loading')} />
      </div>
    );
  }

  return (
    <div className="admin-quotes-page">
      <div className="admin-quotes-page__head">
        <h1 className="admin-quotes-page__title">
          {t('admin.quotes.title')}
          {newCount > 0 ? <span className="admin-quotes-page__badge">{newCount}</span> : null}
        </h1>
      </div>

      <div className="admin-quotes-tabs">
        {FILTER_TAB_KEYS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`admin-quotes-tabs__tab${filter === tab.key ? ' admin-quotes-tabs__tab--active' : ''}`}
            onClick={() => setFilter(tab.key)}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      <div className="admin-quotes-table">
        <div className="admin-quotes-table__head">
          <span>{t('admin.quotes.columns.client')}</span>
          <span>{t('admin.quotes.columns.project')}</span>
          <span>{t('admin.quotes.columns.budget')}</span>
          <span>{t('admin.quotes.columns.date')}</span>
          <span>{t('admin.quotes.columns.status')}</span>
          <span>{t('admin.quotes.columns.actions')}</span>
        </div>

        {filtered.map((quote) => (
          <div key={quote._id} className="admin-quotes-table__row">
            <span className="admin-quotes-table__client">{quote.name}</span>
            <span>{translateProjectType(quote.projectType, t)}</span>
            <span>{translateBudget(quote.budget, t)}</span>
            <span>{formatDate(quote.createdAt)}</span>
            <span>
              <span className={`admin-quote-status admin-quote-status--${quote.status}`}>{statusLabel(quote.status)}</span>
            </span>
            <div className="admin-quotes-table__actions">
              <button type="button" className="admin-action-btn" onClick={() => setSelectedId(quote._id)}>
                {t('common.view')}
              </button>
              <button type="button" className="admin-action-btn admin-action-btn--danger" onClick={() => setDeleteTarget(quote)}>
                {t('common.delete')}
              </button>
            </div>
          </div>
        ))}

        {!filtered.length ? <div className="admin-empty">{t('admin.quotes.empty')}</div> : null}
      </div>

      {deleteTarget ? (
        <div className="admin-modal-overlay" role="presentation" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <p className="admin-modal__text">{t('admin.quotes.deleteConfirm')}</p>
            <div className="admin-modal__actions">
              <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setDeleteTarget(null)}>
                {t('common.cancel')}
              </button>
              <button
                type="button"
                className="admin-btn--delete"
                disabled={deleteMutation.isPending}
                onClick={() => void confirmDelete()}
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {selectedId ? (
        <QuoteDetailPanel
          quoteId={selectedId}
          onClose={() => setSelectedId(null)}
          onUpdated={() => query.refetch()}
        />
      ) : null}
    </div>
  );
}
