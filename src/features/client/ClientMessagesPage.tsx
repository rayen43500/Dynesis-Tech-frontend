import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { clientMessageTitle, useClientMessages } from './clientMessagesHooks';
import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import './client-messages.css';

function formatDate(value?: string) {
  if (!value) return '';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function ClientMessagesPage() {
  const { t } = useTranslation();
  const query = useClientMessages();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (query.isLoading) {
    return <LoadingState label={t('client.messages.loading')} />;
  }

  const messages = query.data || [];

  if (!messages.length) {
    return (
      <div className="client-messages-page">
        <h1 className="client-messages-page__title">{t('client.messages.title')}</h1>
        <div className="client-messages-empty">
          {t('client.messages.empty')}
          <br />
          <Link to="/dashboard/client/contact" className="client-messages-empty__link">
            {t('client.messages.emptyCta')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="client-messages-page">
      <h1 className="client-messages-page__title">{t('client.messages.title')}</h1>

      {messages.map((message) => {
        const open = expandedId === message._id;
        const replied = message.status === 'replied' && Boolean(message.adminReply);

        return (
          <article
            key={message._id}
            className={`client-message-card${open ? ' client-message-card--open' : ''}`}
            onClick={() => setExpandedId(open ? null : message._id)}
          >
            <div className="client-message-card__top">
              <h2 className="client-message-card__title">{clientMessageTitle(message)}</h2>
              <span className="client-message-card__date">{formatDate(message.createdAt)}</span>
            </div>
            {!open ? <p className="client-message-card__preview">{message.message}</p> : null}
            <div className="client-message-card__status-row">
              <span
                className={`client-message-card__badge${
                  replied ? ' client-message-card__badge--replied' : ' client-message-card__badge--sent'
                }`}
              >
                {replied ? t('client.messages.status.replied') : t('client.messages.status.sent')}
              </span>
            </div>

            {open ? (
              <>
                <div className="client-message-card__body">{message.message}</div>
                {replied ? (
                  <>
                    <p className="client-message-card__reply-label">{t('client.messages.replyLabel')}</p>
                    <div className="client-message-card__reply">{message.adminReply}</div>
                    {message.adminRepliedAt ? (
                      <p className="client-message-card__reply-date">{formatDate(message.adminRepliedAt)}</p>
                    ) : null}
                  </>
                ) : null}
              </>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
