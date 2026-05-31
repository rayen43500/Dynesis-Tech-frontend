import React, { useEffect, useMemo, useState } from 'react';

import { QuoteDetailPanel } from './QuoteDetailPanel';
import {
  markQuotesVisited,
  useAdminQuotes,
  useDeleteQuote,
  type AdminQuote,
  type QuoteStatus
} from './adminQuotesHooks';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import './quotes-admin.css';

type FilterTab = 'all' | QuoteStatus;

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'reviewed', label: 'Reviewed' },
  { key: 'proposal_sent', label: 'Proposal Sent' },
  { key: 'closed', label: 'Closed' }
];

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function statusLabel(status: QuoteStatus) {
  return status.replace('_', ' ');
}

export function QuotesAdminPage() {
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

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget._id);
    if (selectedId === deleteTarget._id) setSelectedId(null);
    setDeleteTarget(null);
  }

  if (query.isLoading) {
    return (
      <div className="admin-quotes-page">
        <LoadingState label="Loading project briefs…" />
      </div>
    );
  }

  return (
    <div className="admin-quotes-page">
      <div className="admin-quotes-page__head">
        <h1 className="admin-quotes-page__title">
          Project Briefs
          {newCount > 0 ? <span className="admin-quotes-page__badge">{newCount}</span> : null}
        </h1>
      </div>

      <div className="admin-quotes-tabs">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`admin-quotes-tabs__tab${filter === tab.key ? ' admin-quotes-tabs__tab--active' : ''}`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-quotes-table">
        <div className="admin-quotes-table__head">
          <span>Client</span>
          <span>Project</span>
          <span>Budget</span>
          <span>Date</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {filtered.map((quote) => (
          <div key={quote._id} className="admin-quotes-table__row">
            <span className="admin-quotes-table__client">{quote.name}</span>
            <span>{quote.projectType}</span>
            <span>{quote.budget}</span>
            <span>{formatDate(quote.createdAt)}</span>
            <span>
              <span className={`admin-quote-status admin-quote-status--${quote.status}`}>{statusLabel(quote.status)}</span>
            </span>
            <div className="admin-quotes-table__actions">
              <button type="button" className="admin-action-btn" onClick={() => setSelectedId(quote._id)}>
                View
              </button>
              <button type="button" className="admin-action-btn admin-action-btn--danger" onClick={() => setDeleteTarget(quote)}>
                Delete
              </button>
            </div>
          </div>
        ))}

        {!filtered.length ? <div className="admin-empty">No project briefs found.</div> : null}
      </div>

      {deleteTarget ? (
        <div className="admin-modal-overlay" role="presentation" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <p className="admin-modal__text">Are you sure you want to delete this project brief?</p>
            <div className="admin-modal__actions">
              <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn--delete"
                disabled={deleteMutation.isPending}
                onClick={() => void confirmDelete()}
              >
                Delete
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
