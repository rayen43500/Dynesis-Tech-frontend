import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useClientProjects } from './clientProjectsHooks';
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
        <div className="client-projects-grid">
          {projects.map((project) => {
            const completedStages = (project.roadmap || []).filter((stage) => stage.completed).length;
            const totalStages = project.roadmap?.length || 0;
            const progress = totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0;

            return (
              <article key={project._id} className="client-panel-card">
                <h2 className="client-quote-section__label">{project.title || t('client.projects.untitled')}</h2>
                <p className="client-quote-card__row">
                  <strong>{t('client.projects.status')}:</strong> {project.status || '—'}
                </p>
                <p className="client-quote-card__row">
                  <strong>{t('client.projects.progress')}:</strong> {progress}%
                </p>
                <p className="client-quote-card__row">
                  <strong>{t('client.projects.updated')}:</strong> {formatDate(project.updatedAt)}
                </p>
                <Link to={`/dashboard/client/roadmap?project=${project._id}`} className="client-quote-empty__link">
                  {t('client.projects.viewRoadmap')}
                </Link>
              </article>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
