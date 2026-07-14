import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { useDeveloperLeaves, useRequestDeveloperLeave } from './developerHooks';

export function DeveloperLeavesPage() {
  const { t } = useTranslation();
  const query = useDeveloperLeaves();
  const requestLeave = useRequestDeveloperLeave();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  async function submit() {
    if (!startDate || !endDate) return;
    await requestLeave.mutateAsync({ startDate, endDate, reason });
    setStartDate('');
    setEndDate('');
    setReason('');
  }

  if (query.isLoading) return <LoadingState label={t('developer.leaves.loading')} />;

  const leaves = query.data || [];

  return (
    <div className="admin-overview">
      <div className="admin-card-block">
        <div className="admin-grid-2">
          <label className="admin-field">
            <span className="admin-field__label">{t('developer.leaves.start')}</span>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label className="admin-field">
            <span className="admin-field__label">{t('developer.leaves.end')}</span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
        </div>
        <label className="admin-field">
          <span className="admin-field__label">{t('developer.leaves.reason')}</span>
          <textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} />
        </label>
        <button type="button" className="admin-btn" disabled={requestLeave.isPending} onClick={() => void submit()}>
          {t('developer.leaves.request')}
        </button>
      </div>

      <div className="admin-table">
        <div className="admin-table__head" style={{ gridTemplateColumns: '1fr 1fr 1fr 2fr' }}>
          <span>{t('developer.leaves.columns.start')}</span>
          <span>{t('developer.leaves.columns.end')}</span>
          <span>{t('developer.leaves.columns.status')}</span>
          <span>{t('developer.leaves.columns.reason')}</span>
        </div>
        {leaves.map((leave) => (
          <div key={leave._id} className="admin-table__row" style={{ gridTemplateColumns: '1fr 1fr 1fr 2fr' }}>
            <span className="admin-table__role">{new Date(leave.startDate).toLocaleDateString()}</span>
            <span className="admin-table__role">{new Date(leave.endDate).toLocaleDateString()}</span>
            <span className="admin-dev-cell__name">{leave.status}</span>
            <span className="admin-table__role">{leave.reason || '-'}</span>
          </div>
        ))}
        {!leaves.length ? <div className="admin-empty">{t('developer.leaves.empty')}</div> : null}
      </div>
    </div>
  );
}
