import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MessageDetailPanel } from './MessageDetailPanel';
import {
  messagePreviewSubject,
  useAdminMessages,
  useDeleteMessage,
  type AdminMessage,
  type MessageStatus
} from './adminMessagesHooks';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import '../quotes/quotes-admin.css';
import './messages-admin.css';

type FilterTab = 'all' | MessageStatus;

const FILTER_TAB_KEYS: { key: FilterTab; labelKey: string }[] = [
  { key: 'all', labelKey: 'admin.messages.tabs.all' },
  { key: 'new', labelKey: 'admin.messages.tabs.new' },
  { key: 'read', labelKey: 'admin.messages.tabs.read' },
  { key: 'replied', labelKey: 'admin.messages.tabs.replied' }
];

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function MessagesAdminPage() {
  const { t } = useTranslation();
  const query = useAdminMessages();
  const deleteMutation = useDeleteMessage();
  const [filter, setFilter] = useState<FilterTab>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminMessage | null>(null);

  const messages = query.data || [];
  const newCount = messages.filter((m) => m.status === 'new').length;

  const filtered = useMemo(() => {
    if (filter === 'all') return messages;
    return messages.filter((m) => m.status === filter);
  }, [messages, filter]);

  function statusLabel(status: MessageStatus) {
    if (status === 'new') return t('admin.messages.status.new');
    if (status === 'read') return t('admin.messages.status.read');
    if (status === 'replied') return t('admin.messages.status.replied');
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
      <div className="admin-messages-page">
        <LoadingState label={t('admin.messages.loading')} />
      </div>
    );
  }

  return (
    <div className="admin-messages-page admin-quotes-page">
      <div className="admin-quotes-page__head">
        <h1 className="admin-quotes-page__title">
          {t('admin.messages.title')}
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

      <div className="admin-quotes-table admin-messages-table">
        <div className="admin-quotes-table__head admin-messages-table__head">
          <span>{t('admin.messages.columns.sender')}</span>
          <span>{t('admin.messages.columns.subject')}</span>
          <span>{t('admin.messages.columns.type')}</span>
          <span>{t('admin.messages.columns.date')}</span>
          <span>{t('admin.messages.columns.status')}</span>
          <span>{t('admin.messages.columns.actions')}</span>
        </div>

        {filtered.map((message) => (
          <div key={message._id} className="admin-quotes-table__row admin-messages-table__row">
            <span>
              <span className="admin-messages-table__sender-name">{message.name}</span>
              <span className="admin-messages-table__sender-email">{message.email}</span>
            </span>
            <span className="admin-messages-table__subject">{messagePreviewSubject(message)}</span>
            <span>
              <span className={`admin-message-type${message.isGuest ? ' admin-message-type--guest' : ' admin-message-type--registered'}`}>
                {message.isGuest ? t('admin.messages.type.guest') : t('admin.messages.type.registeredUser')}
              </span>
            </span>
            <span className="admin-message-date">{formatDate(message.createdAt)}</span>
            <span>
              <span className={`admin-quote-status admin-message-status--${message.status}`}>{statusLabel(message.status)}</span>
            </span>
            <div className="admin-quotes-table__actions">
              <button type="button" className="admin-action-btn" onClick={() => setSelectedId(message._id)}>
                {t('common.view')}
              </button>
              <button type="button" className="admin-action-btn admin-action-btn--danger" onClick={() => setDeleteTarget(message)}>
                {t('common.delete')}
              </button>
            </div>
          </div>
        ))}

        {!filtered.length ? <div className="admin-empty">{t('admin.messages.empty')}</div> : null}
      </div>

      {deleteTarget ? (
        <div className="admin-modal-overlay" role="presentation" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <p className="admin-modal__text">{t('admin.messages.deleteConfirm')}</p>
            <div className="admin-modal__actions">
              <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setDeleteTarget(null)}>
                {t('common.cancel')}
              </button>
              <button type="button" className="admin-btn--delete" disabled={deleteMutation.isPending} onClick={() => void confirmDelete()}>
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {selectedId ? (
        <MessageDetailPanel messageId={selectedId} onClose={() => setSelectedId(null)} onUpdated={() => query.refetch()} />
      ) : null}
    </div>
  );
}
