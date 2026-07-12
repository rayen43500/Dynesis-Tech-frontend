import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { useDeveloperDashboard } from './developerHooks';

function formatHours(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
}

export function DeveloperDashboardPage() {
  const { t } = useTranslation();
  const query = useDeveloperDashboard();

  if (query.isLoading) return <LoadingState label={t('developer.dashboard.loading')} />;

  const data = query.data;
  const stats = data?.stats;

  return (
    <div className="admin-overview">
      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__value">{stats?.activeProjects ?? 0}</div>
          <div className="admin-stat__label">{t('developer.dashboard.stats.projects')}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__value">{stats?.assignedTasks ?? 0}</div>
          <div className="admin-stat__label">{t('developer.dashboard.stats.tasks')}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__value">{formatHours(stats?.weekMinutes ?? 0)}</div>
          <div className="admin-stat__label">{t('developer.dashboard.stats.weekTime')}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__value">{stats?.openBugs ?? 0}</div>
          <div className="admin-stat__label">{t('developer.dashboard.stats.bugs')}</div>
        </div>
      </div>

      <div className="admin-overview-actions">
        <Link to="/dashboard/developer/tasks" className="admin-btn">
          {t('developer.dashboard.viewTasks')}
        </Link>
        <Link to="/dashboard/developer/time" className="admin-btn admin-btn--ghost">
          {t('developer.dashboard.logTime')}
        </Link>
      </div>

      <div className="admin-table">
        <div className="admin-table__head" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr' }}>
          <span>{t('developer.tasks.columns.task')}</span>
          <span>{t('developer.tasks.columns.status')}</span>
          <span>{t('developer.tasks.columns.priority')}</span>
          <span>{t('developer.tasks.columns.dueDate')}</span>
        </div>
        {(data?.tasks || []).slice(0, 6).map((task) => (
          <div key={task._id} className="admin-table__row" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr' }}>
            <span className="admin-dev-cell__name">{task.title}</span>
            <span className="admin-table__role">{t(`developer.taskStatus.${task.status}`)}</span>
            <span className="admin-table__role">{task.priority || '-'}</span>
            <span className="admin-table__role">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</span>
          </div>
        ))}
        {!data?.tasks?.length ? <div className="admin-empty">{t('developer.tasks.empty')}</div> : null}
      </div>

      <div className="admin-table">
        <div className="admin-table__head" style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
          <span>{t('developer.dashboard.activity.type')}</span>
          <span>{t('developer.dashboard.activity.message')}</span>
          <span>{t('developer.dashboard.activity.date')}</span>
        </div>
        {(data?.activities || []).map((activity) => (
          <div key={activity._id} className="admin-table__row" style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
            <span className="admin-table__role">{activity.eventType}</span>
            <span className="admin-dev-cell__name">{activity.message}</span>
            <span className="admin-table__role">{activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : '-'}</span>
          </div>
        ))}
        {!data?.activities?.length ? <div className="admin-empty">{t('developer.dashboard.activity.empty')}</div> : null}
      </div>
    </div>
  );
}
