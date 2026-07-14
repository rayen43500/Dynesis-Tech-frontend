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

function priorityBadge(priority?: string) {
  const map: Record<string, string> = {
    urgent: '#e05555',
    high: '#d97706',
    medium: '#3a8a3a',
    low: '#8a8a9a'
  };
  const color = (priority && map[priority]) || '#8a8a9a';
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 9999,
        fontSize: 11,
        fontWeight: 500,
        color: '#fff',
        background: color,
        textTransform: 'capitalize'
      }}
    >
      {priority || '-'}
    </span>
  );
}

function statusBadge(status: string, label: string) {
  const map: Record<string, string> = {
    todo: '#8a8a9a',
    in_progress: '#3a8a3a',
    blocked: '#e05555',
    review: '#d97706',
    testing: '#6366f1',
    done: '#059669'
  };
  const color = map[status] || '#8a8a9a';
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 9999,
        fontSize: 11,
        fontWeight: 500,
        color: '#fff',
        background: color
      }}
    >
      {label}
    </span>
  );
}

export function DeveloperDashboardPage() {
  const { t } = useTranslation();
  const query = useDeveloperDashboard();

  if (query.isLoading) return <LoadingState label={t('developer.dashboard.loading')} />;

  const data = query.data;
  const stats = data?.stats;

  return (
    <div className="admin-overview">
      {/* Stats cards */}
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

      {/* Quick actions */}
      <div className="admin-overview-actions">
        <Link to="/dashboard/developer/tasks" className="admin-btn">
          {t('developer.dashboard.viewTasks')}
        </Link>
        <Link to="/dashboard/developer/time" className="admin-btn admin-btn--ghost">
          {t('developer.dashboard.logTime')}
        </Link>
      </div>

      {/* Recent Tasks */}
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--admin-muted)' }}>
          {t('developer.dashboard.recentTasks')}
        </p>
        <div className="admin-table">
          <div className="admin-table__head" style={{ gridTemplateColumns: '1.8fr 1fr 1fr 1fr' }}>
            <span>{t('developer.tasks.columns.task')}</span>
            <span>{t('developer.tasks.columns.status')}</span>
            <span>{t('developer.tasks.columns.priority')}</span>
            <span>{t('developer.tasks.columns.dueDate')}</span>
          </div>
          {(data?.tasks || []).slice(0, 6).map((task) => (
            <div key={task._id} className="admin-table__row" style={{ gridTemplateColumns: '1.8fr 1fr 1fr 1fr' }}>
              <span className="admin-dev-cell__name">{task.title}</span>
              {statusBadge(task.status, t(`developer.taskStatus.${task.status}`))}
              {priorityBadge(task.priority)}
              <span className="admin-table__role">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
              </span>
            </div>
          ))}
          {!data?.tasks?.length ? <div className="admin-empty">{t('developer.tasks.empty')}</div> : null}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--admin-muted)' }}>
          {t('developer.dashboard.recentActivity')}
        </p>
        <div className="admin-table">
          <div className="admin-table__head" style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
            <span>{t('developer.dashboard.activity.type')}</span>
            <span>{t('developer.dashboard.activity.message')}</span>
            <span>{t('developer.dashboard.activity.date')}</span>
          </div>
          {(data?.activities || []).map((activity) => (
            <div key={activity._id} className="admin-table__row" style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
              <span className="admin-table__role" style={{ textTransform: 'capitalize' }}>
                {activity.eventType.replace(/_/g, ' ')}
              </span>
              <span className="admin-dev-cell__name">{activity.message}</span>
              <span className="admin-table__role">
                {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : '-'}
              </span>
            </div>
          ))}
          {!data?.activities?.length ? <div className="admin-empty">{t('developer.dashboard.activity.empty')}</div> : null}
        </div>
      </div>
    </div>
  );
}
