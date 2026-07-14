import React from 'react';
import { useTranslation } from 'react-i18next';

import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { useDeveloperDeployments } from './developerHooks';

export function DeveloperDeploymentsPage() {
  const { t } = useTranslation();
  const query = useDeveloperDeployments();

  if (query.isLoading) return <LoadingState label={t('developer.deployments.loading')} />;

  const deployments = query.data || [];

  return (
    <div className="admin-table">
      <div className="admin-table__head" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr' }}>
        <span>{t('developer.deployments.columns.version')}</span>
        <span>{t('developer.deployments.columns.environment')}</span>
        <span>{t('developer.deployments.columns.status')}</span>
        <span>{t('developer.deployments.columns.date')}</span>
        <span>{t('developer.deployments.columns.notes')}</span>
      </div>
      {deployments.map((deployment) => (
        <div key={deployment._id} className="admin-table__row" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr' }}>
          <span className="admin-dev-cell__name">{deployment.version || '-'}</span>
          <span className="admin-table__role">{deployment.environment}</span>
          <span className="admin-table__role">{deployment.status}</span>
          <span className="admin-table__role">{deployment.deployedAt ? new Date(deployment.deployedAt).toLocaleDateString() : '-'}</span>
          <span className="admin-table__role">{deployment.releaseNotes || '-'}</span>
        </div>
      ))}
      {!deployments.length ? <div className="admin-empty">{t('developer.deployments.empty')}</div> : null}
    </div>
  );
}
