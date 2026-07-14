import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  type AdminInquiry,
  type InquiryStatus,
  useAdminInquiries,
  useConvertInquiry,
  useUpdateInquiryStatus
} from './adminInquiriesHooks';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import '../quotes/quotes-admin.css';

type FilterTab = 'all' | InquiryStatus;

const FILTERS: { key: FilterTab; labelKey: string }[] = [
  { key: 'all', labelKey: 'admin.inquiries.tabs.all' },
  { key: 'new', labelKey: 'admin.inquiries.tabs.new' },
  { key: 'contacted', labelKey: 'admin.inquiries.tabs.contacted' },
  { key: 'consultation', labelKey: 'admin.inquiries.tabs.consultation' },
  { key: 'converted', labelKey: 'admin.inquiries.tabs.converted' },
  { key: 'closed', labelKey: 'admin.inquiries.tabs.closed' }
];

const TABLE_GRID = '1.2fr 1fr 0.9fr 0.8fr 0.8fr 140px';

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function InquiriesAdminPage() {
  const { t } = useTranslation();
  const query = useAdminInquiries();
  const statusMutation = useUpdateInquiryStatus();
  const convertMutation = useConvertInquiry();
  const [filter, setFilter] = useState<FilterTab>('all');
  const [selected, setSelected] = useState<AdminInquiry | null>(null);

  const inquiries = query.data || [];
  const newCount = inquiries.filter((item) => item.status === 'new').length;

  const filtered = useMemo(() => {
    if (filter === 'all') return inquiries;
    return inquiries.filter((item) => item.status === filter);
  }, [filter, inquiries]);

  function statusLabel(status?: InquiryStatus) {
    if (!status) return '—';
    return t(`admin.inquiries.status.${status}`);
  }

  async function handleConvert(id: string) {
    await convertMutation.mutateAsync(id);
    setSelected(null);
  }

  if (query.isLoading) {
    return (
      <div className="admin-quotes-page">
        <LoadingState label={t('admin.inquiries.loading')} />
      </div>
    );
  }

  return (
    <div className="admin-quotes-page">
      <div className="admin-quotes-page__head">
        <h1 className="admin-quotes-page__title">
          {t('admin.inquiries.title')}
          {newCount > 0 ? <span className="admin-quotes-page__badge">{newCount > 9 ? '9+' : newCount}</span> : null}
        </h1>
      </div>

      <div className="admin-quotes-tabs" role="tablist">
        {FILTERS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={filter === tab.key}
            className={`admin-quotes-tabs__tab${filter === tab.key ? ' admin-quotes-tabs__tab--active' : ''}`}
            onClick={() => setFilter(tab.key)}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="admin-quotes-empty">{t('admin.inquiries.empty')}</p>
      ) : (
        <div className="admin-quotes-table-wrap">
          <div className="admin-quotes-table__head" style={{ gridTemplateColumns: TABLE_GRID }}>
            <span>{t('admin.inquiries.columns.client')}</span>
            <span>{t('admin.inquiries.columns.project')}</span>
            <span>{t('admin.inquiries.columns.budget')}</span>
            <span>{t('admin.inquiries.columns.date')}</span>
            <span>{t('admin.inquiries.columns.status')}</span>
            <span>{t('admin.inquiries.columns.actions')}</span>
          </div>
          {filtered.map((inquiry) => (
            <div
              key={inquiry._id}
              className={`admin-quotes-table__row${selected?._id === inquiry._id ? ' admin-quotes-table__row--selected' : ''}`}
              style={{ gridTemplateColumns: TABLE_GRID }}
            >
              <button type="button" className="admin-quotes-table__cell-btn" onClick={() => setSelected(inquiry)}>
                {inquiry.clientInfo?.name || inquiry.clientInfo?.company || '—'}
              </button>
              <span>{inquiry.projectType || '—'}</span>
              <span>{inquiry.budgetRange || '—'}</span>
              <span>{formatDate(inquiry.createdAt)}</span>
              <span>{statusLabel(inquiry.status)}</span>
              <span className="admin-quotes-table__actions">
                <button type="button" className="admin-quotes-table__action" onClick={() => setSelected(inquiry)}>
                  {t('admin.inquiries.view')}
                </button>
              </span>
            </div>
          ))}
        </div>
      )}

      {selected ? (
        <aside className="admin-quotes-detail" aria-label={t('admin.inquiries.detailTitle')}>
          <div className="admin-quotes-detail__head">
            <h2>{selected.clientInfo?.name || selected.clientInfo?.company || t('admin.inquiries.untitled')}</h2>
            <button type="button" className="admin-quotes-detail__close" onClick={() => setSelected(null)}>
              {t('common.close')}
            </button>
          </div>
          <p>
            <strong>{t('admin.inquiries.columns.project')}:</strong> {selected.projectType}
          </p>
          <p>
            <strong>{t('admin.inquiries.columns.budget')}:</strong> {selected.budgetRange}
          </p>
          <p>
            <strong>{t('admin.inquiries.email')}:</strong> {selected.clientInfo?.email}
          </p>
          {selected.consultationNotes ? (
            <p>
              <strong>{t('admin.inquiries.notes')}:</strong> {selected.consultationNotes}
            </p>
          ) : null}
          <div className="admin-quotes-detail__actions">
            {(['contacted', 'consultation', 'closed'] as InquiryStatus[]).map((status) => (
              <button
                key={status}
                type="button"
                className="admin-quotes-detail__btn"
                disabled={selected.status === status || statusMutation.isPending}
                onClick={() => statusMutation.mutateAsync({ id: selected._id, status })}
              >
                {statusLabel(status)}
              </button>
            ))}
            {selected.status !== 'converted' ? (
              <button
                type="button"
                className="admin-quotes-detail__btn admin-quotes-detail__btn--primary"
                disabled={convertMutation.isPending}
                onClick={() => handleConvert(selected._id)}
              >
                {t('admin.inquiries.convert')}
              </button>
            ) : null}
          </div>
        </aside>
      ) : null}
    </div>
  );
}
