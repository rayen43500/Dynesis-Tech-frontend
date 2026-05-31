import React, { useEffect, useState } from 'react';

import {
  buildDefaultProposalBody,
  useAdminQuote,
  useSendProposal,
  useUpdateQuote,
  type QuoteStatus
} from './adminQuotesHooks';

type Props = {
  quoteId: string;
  onClose: () => void;
  onUpdated: () => void;
};

const STATUS_OPTIONS: { value: QuoteStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'closed', label: 'Closed' }
];

function formatDate(value?: string) {
  if (!value) return '';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function QuoteDetailPanel({ quoteId, onClose, onUpdated }: Props) {
  const query = useAdminQuote(quoteId);
  const updateMutation = useUpdateQuote();
  const sendMutation = useSendProposal();

  const [status, setStatus] = useState<QuoteStatus>('new');
  const [adminNotes, setAdminNotes] = useState('');
  const [subject, setSubject] = useState('Project Proposal — Dynesis Tech');
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
    setSubject(quote.proposalSubject || 'Project Proposal — Dynesis Tech');
    setBody(quote.proposalBody || buildDefaultProposalBody(quote.name));
    setProposalSent(quote.status === 'proposal_sent');
  }, [quote]);

  async function handleSave() {
    setSaveMessage('');
    try {
      await updateMutation.mutateAsync({ id: quoteId, payload: { status, adminNotes } });
      setSaveMessage('Changes saved');
      onUpdated();
    } catch {
      setSaveMessage('Failed to save changes');
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
        setSendMessage('✓ Proposal sent successfully');
        onUpdated();
      } else {
        setSendError(true);
        setSendMessage('Failed to send. Try again.');
      }
    } catch {
      setSendError(true);
      setSendMessage('Failed to send. Try again.');
    }
  }

  if (query.isLoading || !quote) {
    return (
      <>
        <div className="admin-drawer-overlay" role="presentation" onClick={onClose} />
        <aside className="admin-quote-panel">
          <p className="admin-quote-panel__loading">Loading…</p>
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
            <p className="admin-quote-panel__date">Received {formatDate(quote.createdAt)}</p>
          </div>
          <button type="button" className="admin-drawer__close" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="admin-quote-panel__body">
          <section className="admin-quote-section">
            <h3 className="admin-quote-section__label">Contact Info</h3>
            <p className="admin-quote-section__line">
              <span>Name</span> {quote.name}
            </p>
            <p className="admin-quote-section__line">
              <span>Email</span> {quote.email}
            </p>
            <p className="admin-quote-section__line">
              <span>Company</span> {quote.company || '—'}
            </p>
            <p className="admin-quote-section__line">
              <span>Discovery call</span> {quote.wantsDiscoveryCall ? 'Yes' : 'No'}
            </p>
          </section>

          <section className="admin-quote-section">
            <h3 className="admin-quote-section__label">Project Details</h3>
            <p className="admin-quote-section__line">
              <span>Type</span> {quote.projectType}
            </p>
            <p className="admin-quote-section__line">
              <span>Budget</span> {quote.budget}
            </p>
            <p className="admin-quote-section__line">
              <span>Timeline</span> {quote.timeline}
            </p>
          </section>

          <section className="admin-quote-section">
            <h3 className="admin-quote-section__label">Description</h3>
            <div className="admin-quote-description">{quote.description}</div>
          </section>

          <section className="admin-quote-section">
            <h3 className="admin-quote-section__label">Status &amp; Notes</h3>
            <label className="admin-field">
              <span className="admin-field__label">Status</span>
              <select value={status} onChange={(e) => setStatus(e.target.value as QuoteStatus)}>
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field">
              <span className="admin-field__label">Admin notes</span>
              <textarea
                className="admin-quote-notes"
                placeholder="Add internal notes..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
              />
            </label>
            <button type="button" className="admin-quote-save-btn" disabled={updateMutation.isPending} onClick={() => void handleSave()}>
              Save Changes
            </button>
            {saveMessage ? <p className="admin-quote-feedback">{saveMessage}</p> : null}
          </section>

          <section className="admin-quote-proposal">
            <h3 className="admin-quote-proposal__title">Send Proposal to Client</h3>
            <label className="admin-field">
              <span className="admin-field__label">Subject</span>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </label>
            <label className="admin-field">
              <span className="admin-field__label">Body</span>
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
                  Sending...
                </>
              ) : (
                'Send Proposal →'
              )}
            </button>
            {sendMessage ? (
              <p className={`admin-quote-feedback${sendError ? ' admin-quote-feedback--error' : ' admin-quote-feedback--success'}`}>
                {sendMessage}
              </p>
            ) : null}
            <p className="admin-quote-proposal__note">This email will be sent to {quote.email}</p>
          </section>
        </div>
      </aside>
    </>
  );
}
