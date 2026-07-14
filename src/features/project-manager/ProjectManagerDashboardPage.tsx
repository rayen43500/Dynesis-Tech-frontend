import React from 'react';
import { useTranslation } from 'react-i18next';

import { usePmDashboard } from './projectManagerHooks';
import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import '../admin/admin-dashboard.css';

export function ProjectManagerDashboardPage() {
  const { t } = useTranslation();
  const query = usePmDashboard();
  const data = query.data;

  if (query.isLoading) {
    return <LoadingState label={t('pm.dashboard.loading')} />;
  }

  return (
    <div className="admin-overview">
      <h1 className="admin-quotes-page__title">{t('pm.dashboard.title')}</h1>
      <p className="client-page-subtitle">{t('pm.dashboard.subtitle')}</p>

      <div className="admin-overview__stats">
        <article className="admin-stat-card">
          <h2>{t('pm.dashboard.stats.projects')}</h2>
          <p>{data?.stats.totalProjects ?? 0}</p>
        </article>
        <article className="admin-stat-card">
          <h2>{t('pm.dashboard.stats.active')}</h2>
          <p>{data?.stats.activeProjects ?? 0}</p>
        </article>
        <article className="admin-stat-card">
          <h2>{t('pm.dashboard.stats.tasks')}</h2>
          <p>{data?.stats.assignedTasks ?? 0}</p>
        </article>
        <article className="admin-stat-card">
          <h2>{t('pm.dashboard.stats.overdue')}</h2>
          <p>{data?.stats.overdueTasks ?? 0}</p>
        </article>
      </div>

      {data?.projects?.length ? (
        <section className="admin-overview__section">
          <h2>{t('pm.dashboard.recentProjects')}</h2>
          <ul>
            {data.projects.map((project) => (
              <li key={project._id}>
                {project.title} — {project.status}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="admin-quotes-empty">{t('pm.dashboard.noProjects')}</p>
      )}
    </div>
  );
}
