import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  buildDefaultProposalBody,
  useAdminQuote,
  useSendProposal,
  useUpdateQuote,
  type QuoteStatus
} from './adminQuotesHooks';
import { translateBudget, translateProjectType, translateTimeline } from '../../../shared/i18n/quoteLabels';

type Props = {
  quoteId: string;
  onClose: () => void;
  onUpdated: () => void;
};

const STATUS_KEYS: Record<QuoteStatus, string> = {
  new: 'admin.quotes.tabs.new',
  reviewed: 'admin.quotes.tabs.reviewed',
  proposal_sent: 'admin.quotes.tabs.proposalSent',
  closed: 'admin.quotes.tabs.closed'
};

function formatDate(value?: string) {
  if (!value) return '';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function QuoteDetailPanel({ quoteId, onClose, onUpdated }: Props) {
  const { t } = useTranslation();
  const query = useAdminQuote(quoteId);
  const updateMutation = useUpdateQuote();
  const sendMutation = useSendProposal();

  const [status, setStatus] = useState<QuoteStatus>('new');
  const [adminNotes, setAdminNotes] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [sendMessage, setSendMessage] = useState('');
  const [sendError, setSendError] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);

  const quote = query.data;

  useEffect(() => {
    if (!quote) return;
    setStatus(quote.status);
    setAdminNotes(quote.adminNotes || '');
    setSubject(quote.proposalSubject || t('admin.quotes.detail.defaultSubject'));
    setBody(quote.proposalBody || buildDefaultProposalBody(quote.name));
    setProposalSent(quote.status === 'proposal_sent');
  }, [quote, t]);

  async function handleSave() {
    setSaveMessage('');
    try {
      await updateMutation.mutateAsync({ id: quoteId, payload: { status, adminNotes } });
      setSaveMessage(t('admin.quotes.detail.saved'));
      onUpdated();
    } catch {
      setSaveMessage(t('admin.quotes.detail.saveFailed'));
    }
  }

  async function handleSendProposal() {
    setSendMessage('');
    setSendError(false);
    try {
      const res = await sendMutation.mutateAsync({ id: quoteId, subject, body });
      const data = res.data as { success?: boolean };
      if (data?.success) {
        setProposalSent(true);
        setStatus('proposal_sent');
        setSendMessage(t('admin.quotes.detail.sentSuccess'));
        onUpdated();
      } else {
        setSendError(true);
        setSendMessage(t('admin.quotes.detail.sendFailed'));
      }
    } catch {
      setSendError(true);
      setSendMessage(t('admin.quotes.detail.sendFailed'));
    }
  }

  if (query.isLoading || !quote) {
    return (
      <>
        <div className="admin-drawer-overlay" role="presentation" onClick={onClose} />
        <aside className="admin-quote-panel">
          <p className="admin-quote-panel__loading">{t('admin.quotes.detail.loading')}</p>
        </aside>
      </>
    );
  }

  return (
    <>
      <div className="admin-drawer-overlay" role="presentation" onClick={onClose} />
      <aside className="admin-quote-panel" role="dialog" aria-modal="true">
        <header className="admin-quote-panel__header">
          <div>
            <h2 className="admin-quote-panel__title">{quote.name}</h2>
            <p className="admin-quote-panel__date">
              {t('common.received', { date: formatDate(quote.createdAt) })}
            </p>
          </div>
          <button type="button" className="admin-drawer__close" aria-label={t('common.close')} onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="admin-quote-panel__body">
          <section className="admin-quote-section">
            <h3 className="admin-quote-section__label">{t('admin.quotes.detail.contactInfo')}</h3>
            <p className="admin-quote-section__line">
              <span>{t('admin.quotes.detail.name')}</span> {quote.name}
            </p>
            <p className="admin-quote-section__line">
              <span>{t('admin.quotes.detail.email')}</span> {quote.email}
            </p>
            <p className="admin-quote-section__line">
              <span>{t('admin.quotes.detail.company')}</span> {quote.company || '—'}
            </p>
            <p className="admin-quote-section__line">
              <span>{t('admin.quotes.detail.discoveryCall')}</span>{' '}
              {quote.wantsDiscoveryCall ? t('common.yes') : t('common.no')}
            </p>
          </section>

          <section className="admin-quote-section">
            <h3 className="admin-quote-section__label">{t('admin.quotes.detail.projectDetails')}</h3>
            <p className="admin-quote-section__line">
              <span>{t('admin.quotes.detail.type')}</span> {translateProjectType(quote.projectType, t)}
            </p>
            <p className="admin-quote-section__line">
              <span>{t('admin.quotes.detail.budget')}</span> {translateBudget(quote.budget, t)}
            </p>
            <p className="admin-quote-section__line">
              <span>{t('admin.quotes.detail.timeline')}</span> {translateTimeline(quote.timeline, t)}
            </p>
          </section>

          <section className="admin-quote-section">
            <h3 className="admin-quote-section__label">{t('admin.quotes.detail.description')}</h3>
            <div className="admin-quote-description">{quote.description}</div>
          </section>

          <section className="admin-quote-section">
            <h3 className="admin-quote-section__label">{t('admin.quotes.detail.statusNotes')}</h3>
            <label className="admin-field">
              <span className="admin-field__label">{t('admin.quotes.detail.status')}</span>
              <select value={status} onChange={(e) => setStatus(e.target.value as QuoteStatus)}>
                {(Object.keys(STATUS_KEYS) as QuoteStatus[]).map((value) => (
                  <option key={value} value={value}>
                    {t(STATUS_KEYS[value])}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field">
              <span className="admin-field__label">{t('admin.quotes.detail.adminNotes')}</span>
              <textarea
                className="admin-quote-notes"
                placeholder={t('admin.quotes.detail.notesPlaceholder')}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
              />
            </label>
            <button type="button" className="admin-quote-save-btn" disabled={updateMutation.isPending} onClick={() => void handleSave()}>
              {t('admin.quotes.detail.saveChanges')}
            </button>
            {saveMessage ? <p className="admin-quote-feedback">{saveMessage}</p> : null}
          </section>

          <section className="admin-quote-proposal">
            <h3 className="admin-quote-proposal__title">{t('admin.quotes.detail.sendProposal')}</h3>
            <label className="admin-field">
              <span className="admin-field__label">{t('admin.quotes.detail.subject')}</span>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </label>
            <label className="admin-field">
              <span className="admin-field__label">{t('admin.quotes.detail.body')}</span>
              <textarea className="admin-quote-proposal__body" value={body} onChange={(e) => setBody(e.target.value)} />
            </label>
            <button
              type="button"
              className="admin-quote-send-btn"
              disabled={proposalSent || sendMutation.isPending}
              onClick={() => void handleSendProposal()}
            >
              {sendMutation.isPending ? (
                <>
                  <span className="admin-quote-send-btn__spinner" aria-hidden />
                  {t('common.sending')}
                </>
              ) : (
                t('admin.quotes.detail.sendProposalBtn')
              )}
            </button>
            {sendMessage ? (
              <p className={`admin-quote-feedback${sendError ? ' admin-quote-feedback--error' : ' admin-quote-feedback--success'}`}>
                {sendMessage}
              </p>
            ) : null}
            <p className="admin-quote-proposal__note">{t('admin.quotes.detail.emailNotice', { email: quote.email })}</p>
          </section>
        </div>
      </aside>
    </>
  );
}
