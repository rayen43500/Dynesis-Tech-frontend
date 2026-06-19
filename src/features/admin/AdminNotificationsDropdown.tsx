import React from 'react';
import { Bell, FileText, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import type { AdminNotifications } from './adminNotificationsHooks';
import { markAllNotificationsRead } from './adminNotificationsStorage';

type Props = {
  open: boolean;
  onClose: () => void;
  notifications: AdminNotifications | undefined;
  onMarkAllRead: () => void;
};

export function AdminNotificationsDropdown({ open, onClose, notifications, onMarkAllRead }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const newQuotes = notifications?.newQuotes ?? 0;
  const newMessages = notifications?.newMessages ?? 0;
  const hasUnread = newQuotes > 0 || newMessages > 0;

  if (!open) return null;

  function handleMarkAllRead() {
    markAllNotificationsRead();
    onMarkAllRead();
    onClose();
  }

  function goToQuotes() {
    onClose();
    navigate('/dashboard/admin/quotes');
  }

  function goToMessages() {
    onClose();
    navigate('/dashboard/admin/messages');
  }

  return (
    <div className="admin-notifications-dropdown" role="dialog" aria-label={t('admin.notifications.title')}>
      <div className="admin-notifications-dropdown__header">
        <span className="admin-notifications-dropdown__title">{t('admin.notifications.title')}</span>
        {hasUnread ? (
          <button type="button" className="admin-notifications-dropdown__mark-read" onClick={handleMarkAllRead}>
            {t('admin.notifications.markAllRead')}
          </button>
        ) : null}
      </div>

      <div className="admin-notifications-dropdown__body">
        {newQuotes > 0 ? (
          <button type="button" className="admin-notifications-dropdown__item" onClick={goToQuotes}>
            <span className="admin-notifications-dropdown__icon admin-notifications-dropdown__icon--quotes">
              <FileText size={16} strokeWidth={1.75} aria-hidden />
            </span>
            <span className="admin-notifications-dropdown__content">
              <span className="admin-notifications-dropdown__item-title">{t('admin.notifications.newBrief.title')}</span>
              <span className="admin-notifications-dropdown__item-text">
                {t('admin.notifications.newBrief.text', { count: newQuotes })}
              </span>
              <span className="admin-notifications-dropdown__item-time">{t('admin.notifications.justNow')}</span>
            </span>
            <span className="admin-notifications-dropdown__unread-dot" aria-hidden />
          </button>
        ) : null}

        {newMessages > 0 ? (
          <button type="button" className="admin-notifications-dropdown__item" onClick={goToMessages}>
            <span className="admin-notifications-dropdown__icon admin-notifications-dropdown__icon--messages">
              <MessageCircle size={16} strokeWidth={1.75} aria-hidden />
            </span>
            <span className="admin-notifications-dropdown__content">
              <span className="admin-notifications-dropdown__item-title">{t('admin.notifications.newMessage.title')}</span>
              <span className="admin-notifications-dropdown__item-text">
                {t('admin.notifications.newMessage.text', { count: newMessages })}
              </span>
              <span className="admin-notifications-dropdown__item-time">{t('admin.notifications.justNow')}</span>
            </span>
            <span className="admin-notifications-dropdown__unread-dot" aria-hidden />
          </button>
        ) : null}

        {!hasUnread ? (
          <div className="admin-notifications-dropdown__empty">
            <Bell size={28} strokeWidth={1.5} className="admin-notifications-dropdown__empty-icon" aria-hidden />
            <p className="admin-notifications-dropdown__empty-text">{t('admin.notifications.empty')}</p>
          </div>
        ) : null}
      </div>

      <div className="admin-notifications-dropdown__footer">
        <Link to="/dashboard/admin/messages" className="admin-notifications-dropdown__footer-link" onClick={onClose}>
          {t('admin.notifications.viewAll')}
        </Link>
      </div>
    </div>
  );
}
