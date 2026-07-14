import React from 'react';
import { useTranslation } from 'react-i18next';

import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { useDeveloperBugs } from './developerHooks';

const SEVERITY_COLORS: Record<string, string> = {
  critical: '#e05555',
  high: '#d97706',
  medium: '#6366f1',
  low: '#8a8a9a'
};

const STATUS_COLORS: Record<string, string> = {
  open: '#e05555',
  in_progress: '#d97706',
  resolved: '#3a8a3a',
  closed: '#8a8a9a'
};

function SeverityBadge({ severity }: { severity: string }) {
  const color = SEVERITY_COLORS[severity.toLowerCase()] || '#8a8a9a';
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: 9999,
      fontSize: 11,
      fontWeight: 500,
      color: '#fff',
      background: color,
      textTransform: 'capitalize'
    }}>
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status.toLowerCase()] || '#8a8a9a';
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: 9999,
      fontSize: 11,
      fontWeight: 500,
      color: '#fff',
      background: color,
      textTransform: 'capitalize'
    }}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

export function DeveloperBugsPage() {
  const { t } = useTranslation();
  const query = useDeveloperBugs();

  if (query.isLoading) return <LoadingState label={t('developer.bugs.loading')} />;

  const bugs = query.data || [];
  const openBugs = bugs.filter((b) => b.status === 'open' || b.status === 'in_progress');

  return (
    <div className="admin-overview">
      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__value">{bugs.length}</div>
          <div className="admin-stat__label">Total bugs assignés</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__value">{openBugs.length}</div>
          <div className="admin-stat__label">Bugs ouverts / en cours</div>
        </div>
      </div>

      <div className="admin-table">
        <div className="admin-table__head" style={{ gridTemplateColumns: '2fr 1fr 1fr 2fr' }}>
          <span>{t('developer.bugs.columns.bug')}</span>
          <span>{t('developer.bugs.columns.severity')}</span>
          <span>{t('developer.bugs.columns.status')}</span>
          <span>{t('developer.bugs.columns.description')}</span>
        </div>
        {bugs.map((bug) => (
          <div key={bug._id} className="admin-table__row" style={{ gridTemplateColumns: '2fr 1fr 1fr 2fr' }}>
            <span className="admin-dev-cell__name">{bug.title}</span>
            <SeverityBadge severity={bug.severity} />
            <StatusBadge status={bug.status} />
            <span className="admin-table__role">{bug.description || '-'}</span>
          </div>
        ))}
        {!bugs.length ? <div className="admin-empty">{t('developer.bugs.empty')}</div> : null}
      </div>
    </div>
  );
}
