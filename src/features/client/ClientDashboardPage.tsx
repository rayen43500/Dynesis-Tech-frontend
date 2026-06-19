import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { useClientQuotes, type ClientQuote, type ClientQuoteStatus } from './clientQuotesHooks';
import { translateBudget, translateProjectType, translateTimeline } from '../../shared/i18n/quoteLabels';
import './client-dashboard.css';

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function QuoteRequestCard({ quote }: { quote: ClientQuote }) {
  const { t } = useTranslation();

  function statusLabel(status: ClientQuoteStatus) {
    switch (status) {
      case 'new':
        return t('client.dashboard.status.underReview');
      case 'reviewed':
        return t('client.dashboard.status.beingReviewed');
      case 'proposal_sent':
        return t('client.dashboard.status.proposalSent');
      case 'closed':
        return t('client.dashboard.status.closed');
      default:
        return status;
    }
  }

  return (
    <div className="client-panel-card">
      <h2 className="client-quote-section__label">{t('client.dashboard.projectRequest.title')}</h2>
      <p className="client-quote-card__row">
        <strong>{t('client.dashboard.projectRequest.type')}</strong> {translateProjectType(quote.projectType, t)}
      </p>
      <p className="client-quote-card__row">
        <strong>{t('client.dashboard.projectRequest.budget')}</strong> {translateBudget(quote.budget, t)}
      </p>
      <p className="client-quote-card__row">
        <strong>{t('client.dashboard.projectRequest.timeline')}</strong> {translateTimeline(quote.timeline, t)}
      </p>
      <p className="client-quote-card__row">
        <strong>{t('client.dashboard.projectRequest.submitted')}</strong> {formatDate(quote.createdAt)}
      </p>
      <span className={`client-quote-status client-quote-status--${quote.status}`}>{statusLabel(quote.status)}</span>
      {quote.status === 'proposal_sent' ? (
        <p className="client-quote-proposal-note">{t('client.dashboard.proposalNote')}</p>
      ) : null}
    </div>
  );
}

export function ClientDashboardPage() {
  const { t } = useTranslation();
  const query = useClientQuotes();
  const quote = query.data?.[0];

  return (
    <>
      <h1 className="client-page-title">{t('client.dashboard.title')}</h1>
      <p className="client-page-subtitle">{t('client.dashboard.subtitle')}</p>

      {query.isLoading ? <LoadingState label={t('client.dashboard.loading')} /> : null}

      {!query.isLoading && quote ? <QuoteRequestCard quote={quote} /> : null}

      {!query.isLoading && !quote ? (
        <div className="client-panel-card">
          <h2 className="client-quote-section__label">{t('client.dashboard.projectRequest.title')}</h2>
          <p className="client-quote-empty">{t('client.dashboard.empty')}</p>
          <Link to="/work-with-us" className="client-quote-empty__link">
            {t('client.dashboard.emptyCta')}
          </Link>
        </div>
      ) : null}
    </>
  );
}
