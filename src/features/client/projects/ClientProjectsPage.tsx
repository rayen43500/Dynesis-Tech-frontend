import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useClientProjects } from './clientProjectsHooks';
import { BlockchainTimeline } from './BlockchainTimeline';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import '../client-dashboard.css';

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function ClientProjectsPage() {
  const { t } = useTranslation();
  const query = useClientProjects();
  const projects = query.data || [];

  return (
    <>
      <h1 className="client-page-title">{t('client.projects.title')}</h1>
      <p className="client-page-subtitle">{t('client.projects.subtitle')}</p>

      {query.isLoading ? <LoadingState label={t('client.projects.loading')} /> : null}

      {!query.isLoading && projects.length === 0 ? (
        <div className="client-panel-card">
          <p className="client-quote-empty">{t('client.projects.empty')}</p>
        </div>
      ) : null}

      {!query.isLoading && projects.length > 0 ? (
        <div className="client-projects-grid" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {projects.map((project) => {
            const completedStages = (project.roadmap || []).filter((stage) => stage.completed).length;
            const totalStages = project.roadmap?.length || 0;
            const progress = totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0;

            return (
              <article key={project._id} className="client-panel-card" style={{ maxWidth: '100%' }}>
                <h2 className="client-quote-section__label" style={{ fontSize: '18px', textTransform: 'none', color: 'var(--admin-text)' }}>
                  {project.title || t('client.projects.untitled')}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', margin: '16px 0' }}>
                  <p className="client-quote-card__row" style={{ margin: 0 }}>
                    <strong>{t('client.projects.status')}:</strong> {project.status || '—'}
                  </p>
                  <p className="client-quote-card__row" style={{ margin: 0 }}>
                    <strong>{t('client.projects.progress')}:</strong> {progress}% ({completedStages}/{totalStages} étapes)
                  </p>
                  <p className="client-quote-card__row" style={{ margin: 0 }}>
                    <strong>{t('client.projects.updated')}:</strong> {formatDate(project.updatedAt)}
                  </p>
                </div>

                <BlockchainTimeline entries={project.blockchainLog || []} />

                <div style={{ marginTop: '16px', textAlign: 'right' }}>
                  <Link to={`/dashboard/client/roadmap?project=${project._id}`} className="client-quote-empty__link">
                    {t('client.projects.viewRoadmap')} →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
