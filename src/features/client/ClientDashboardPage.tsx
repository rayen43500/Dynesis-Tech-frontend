import React from 'react';
import { Link } from 'react-router-dom';

import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { useClientQuotes, type ClientQuote, type ClientQuoteStatus } from './clientQuotesHooks';
import './client-dashboard.css';

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function statusLabel(status: ClientQuoteStatus) {
  switch (status) {
    case 'new':
      return 'Under Review';
    case 'reviewed':
      return 'Being Reviewed';
    case 'proposal_sent':
      return 'Proposal Sent ✓';
    case 'closed':
      return 'Closed';
    default:
      return status;
  }
}

function QuoteRequestCard({ quote }: { quote: ClientQuote }) {
  return (
    <div className="client-panel-card">
      <h2 className="client-quote-section__label">My Project Request</h2>
      <p className="client-quote-card__row">
        <strong>Type:</strong> {quote.projectType}
      </p>
      <p className="client-quote-card__row">
        <strong>Budget:</strong> {quote.budget}
      </p>
      <p className="client-quote-card__row">
        <strong>Timeline:</strong> {quote.timeline}
      </p>
      <p className="client-quote-card__row">
        <strong>Submitted:</strong> {formatDate(quote.createdAt)}
      </p>
      <span className={`client-quote-status client-quote-status--${quote.status}`}>{statusLabel(quote.status)}</span>
      {quote.status === 'proposal_sent' ? (
        <p className="client-quote-proposal-note">Your proposal has been sent to your email. Check your inbox.</p>
      ) : null}
    </div>
  );
}

export function ClientDashboardPage() {
  const query = useClientQuotes();
  const quote = query.data?.[0];

  return (
    <>
      <h1 className="client-page-title">Dashboard</h1>
      <p className="client-page-subtitle">Track your project requests and account activity.</p>

      {query.isLoading ? <LoadingState label="Loading your project request…" /> : null}

      {!query.isLoading && quote ? <QuoteRequestCard quote={quote} /> : null}

      {!query.isLoading && !quote ? (
        <div className="client-panel-card">
          <h2 className="client-quote-section__label">My Project Request</h2>
          <p className="client-quote-empty">No project request yet.</p>
          <Link to="/work-with-us" className="client-quote-empty__link">
            Submit a project brief →
          </Link>
        </div>
      ) : null}
    </>
  );
}
