import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAdminMessage, useReplyMessage, type MessageStatus } from './adminMessagesHooks';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';

type Props = {
  messageId: string;
  onClose: () => void;
  onUpdated: () => void;
};

const STATUS_KEYS: Record<MessageStatus, string> = {
  new: 'admin.messages.status.new',
  read: 'admin.messages.status.read',
  replied: 'admin.messages.status.replied'
};

function formatDate(value?: string | null) {
  if (!value) return '';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function MessageDetailPanel({ messageId, onClose, onUpdated }: Props) {
  const { t } = useTranslation();
  const query = useAdminMessage(messageId);
  const replyMutation = useReplyMessage();
  const [status, setStatus] = useState<MessageStatus>('new');
  const [reply, setReply] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [replyError, setReplyError] = useState(false);

  const message = query.data;

  useEffect(() => {
    if (!message) return;
    setStatus(message.status);
    setReply(message.adminReply || '');
  }, [message]);

  async function handleSendReply() {
    if (!message || !reply.trim()) return;
    setReplyMessage('');
    setReplyError(false);
    try {
      const res = await replyMutation.mutateAsync({ id: messageId, reply: reply.trim() });
      const data = res.data as { success?: boolean };
      if (data?.success) {
        setReplyMessage(
          message.isGuest
            ? t('admin.messages.detail.replySentEmail', { email: message.email })
            : t('admin.messages.detail.replySavedDashboard')
        );
        setStatus('replied');
        onUpdated();
      } else {
        setReplyError(true);
        setReplyMessage(t('admin.messages.detail.sendFailed'));
      }
    } catch {
      setReplyError(true);
      setReplyMessage(t('admin.messages.detail.sendFailed'));
    }
  }

  if (query.isLoading || !message) {
    return (
      <>
        <div className="admin-drawer-overlay" role="presentation" onClick={onClose} />
        <aside className="admin-quote-panel">
          <LoadingState label={t('admin.messages.detail.loading')} />
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
            <h2 className="admin-quote-panel__title">{message.name}</h2>
            <p className="admin-quote-panel__date">
              {t('common.received', { date: formatDate(message.createdAt) })}
            </p>
            <div className="admin-message-panel__badges">
              <span className={`admin-message-type${message.isGuest ? ' admin-message-type--guest' : ' admin-message-type--registered'}`}>
                {message.isGuest ? t('admin.messages.type.guest') : t('admin.messages.type.registeredUser')}
              </span>
              <span className={`admin-quote-status admin-message-status--${status}`}>{t(STATUS_KEYS[status])}</span>
            </div>
          </div>
          <button type="button" className="admin-drawer__close" aria-label={t('common.close')} onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="admin-quote-panel__body">
          <section className="admin-quote-section">
            <h3 className="admin-quote-section__label">{t('admin.messages.detail.senderInfo')}</h3>
            <p className="admin-quote-section__line">
              <span>{t('admin.quotes.detail.name')}</span> {message.name}
            </p>
            <p className="admin-quote-section__line">
              <span>{t('admin.quotes.detail.email')}</span> {message.email}
            </p>
            <p className="admin-quote-section__line">
              <span>{t('admin.messages.detail.phone')}</span> {message.phone || '—'}
            </p>
            <p className="admin-quote-section__line">
              <span>{t('admin.quotes.detail.company')}</span> {message.company || '—'}
            </p>
            <p className="admin-quote-section__line">
              <span>{t('admin.messages.detail.type')}</span>{' '}
              {message.isGuest ? t('admin.messages.type.guest') : t('admin.messages.type.registeredUser')}
            </p>
          </section>

          <section className="admin-quote-section">
            <h3 className="admin-quote-section__label">{t('admin.messages.detail.message')}</h3>
            <div className="admin-quote-description">{message.message}</div>
          </section>

          {message.adminReply && message.status === 'replied' ? (
            <section className="admin-quote-section">
              <h3 className="admin-quote-section__label">{t('admin.messages.detail.previousReply')}</h3>
              <div className="admin-message-existing-reply">{message.adminReply}</div>
              {message.adminRepliedAt ? (
                <p className="admin-message-existing-reply__date">
                  {t('admin.messages.detail.sentOn', { date: formatDate(message.adminRepliedAt) })}
                </p>
              ) : null}
            </section>
          ) : null}

          <section className="admin-message-reply">
            <h3 className="admin-quote-proposal__title">
              {message.isGuest ? t('admin.messages.detail.replyByEmail') : t('admin.messages.detail.replyToClient')}
            </h3>
            <label className="admin-field">
              <span className="admin-field__label">{t('admin.quotes.detail.status')}</span>
              <select value={status} onChange={(e) => setStatus(e.target.value as MessageStatus)} disabled>
                {(Object.keys(STATUS_KEYS) as MessageStatus[]).map((value) => (
                  <option key={value} value={value}>
                    {t(STATUS_KEYS[value])}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field">
              <span className="admin-field__label">{t('admin.messages.detail.reply')}</span>
              <textarea
                className="admin-message-reply__body"
                placeholder={t('admin.messages.detail.replyPlaceholder')}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            </label>
            <button
              type="button"
              className="admin-quote-send-btn"
              disabled={!reply.trim() || replyMutation.isPending}
              onClick={() => void handleSendReply()}
            >
              {replyMutation.isPending ? (
                <>
                  <span className="admin-quote-send-btn__spinner" aria-hidden />
                  {t('common.sending')}
                </>
              ) : (
                t('admin.messages.detail.sendReply')
              )}
            </button>
            {replyMessage ? (
              <p className={`admin-quote-feedback${replyError ? ' admin-quote-feedback--error' : ' admin-quote-feedback--success'}`}>
                {replyMessage}
              </p>
            ) : null}
            <p className="admin-quote-proposal__note">
              {message.isGuest
                ? t('admin.messages.detail.willSendTo', { email: message.email })
                : t('admin.messages.detail.willAppearDashboard')}
            </p>
          </section>
        </div>
      </aside>
    </>
  );
}
