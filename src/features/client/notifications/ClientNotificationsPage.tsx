import React from 'react';
import { useTranslation } from 'react-i18next';

import { useMarkAllNotificationsRead, useMarkNotificationRead, useNotifications } from './notificationsHooks';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import '../client-dashboard.css';

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function ClientNotificationsPage() {
  const { t } = useTranslation();
  const query = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const items = query.data?.items || [];
  const unreadCount = query.data?.unreadCount || 0;

  return (
    <>
      <div className="client-notifications-head">
        <div>
          <h1 className="client-page-title">{t('client.notifications.title')}</h1>
          <p className="client-page-subtitle">{t('client.notifications.subtitle')}</p>
        </div>
        {unreadCount > 0 ? (
          <button type="button" className="client-quote-empty__link" onClick={() => markAllRead.mutate()} disabled={markAllRead.isPending}>
            {t('client.notifications.markAllRead')}
          </button>
        ) : null}
      </div>

      {query.isLoading ? <LoadingState label={t('client.notifications.loading')} /> : null}

      {!query.isLoading && items.length === 0 ? (
        <div className="client-panel-card">
          <p className="client-quote-empty">{t('client.notifications.empty')}</p>
        </div>
      ) : null}

      {!query.isLoading && items.length > 0 ? (
        <div className="client-notifications-list">
          {items.map((item) => (
            <article key={item._id} className={`client-panel-card${item.readAt ? '' : ' client-panel-card--unread'}`}>
              <h2 className="client-quote-section__label">{item.title || t('client.notifications.untitled')}</h2>
              {item.body ? <p className="client-quote-card__row">{item.body}</p> : null}
              <p className="client-quote-card__row">{formatDate(item.createdAt)}</p>
              {!item.readAt ? (
                <button type="button" className="client-quote-empty__link" onClick={() => markRead.mutate(item._id)} disabled={markRead.isPending}>
                  {t('client.notifications.markRead')}
                </button>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
    </>
  );
}
