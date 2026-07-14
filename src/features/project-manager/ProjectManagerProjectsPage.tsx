import React from 'react';
import { useTranslation } from 'react-i18next';

import { usePmProjects } from './projectManagerHooks';
import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import '../admin/quotes/quotes-admin.css';

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function ProjectManagerProjectsPage() {
  const { t } = useTranslation();
  const query = usePmProjects();
  const projects = query.data || [];

  if (query.isLoading) {
    return (
      <div className="admin-quotes-page">
        <LoadingState label={t('pm.projects.loading')} />
      </div>
    );
  }

  return (
    <div className="admin-quotes-page">
      <div className="admin-quotes-page__head">
        <h1 className="admin-quotes-page__title">{t('pm.projects.title')}</h1>
      </div>

      {projects.length === 0 ? (
        <p className="admin-quotes-empty">{t('pm.projects.empty')}</p>
      ) : (
        <div className="admin-quotes-table-wrap">
          <div className="admin-quotes-table__head" style={{ gridTemplateColumns: '1.6fr 0.9fr 0.9fr 0.8fr' }}>
            <span>{t('pm.projects.columns.title')}</span>
            <span>{t('pm.projects.columns.status')}</span>
            <span>{t('pm.projects.columns.payment')}</span>
            <span>{t('pm.projects.columns.updated')}</span>
          </div>
          {projects.map((project) => (
            <div key={project._id} className="admin-quotes-table__row" style={{ gridTemplateColumns: '1.6fr 0.9fr 0.9fr 0.8fr' }}>
              <span>{project.title || t('pm.projects.untitled')}</span>
              <span>{project.status || '—'}</span>
              <span>{project.paymentStatus || '—'}</span>
              <span>{formatDate(project.updatedAt)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
