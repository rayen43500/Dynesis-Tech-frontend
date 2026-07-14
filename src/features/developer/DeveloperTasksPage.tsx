import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { type DeveloperTaskStatus, useDeveloperTasks, useUpdateDeveloperTaskStatus } from './developerHooks';

const STATUS_OPTIONS: DeveloperTaskStatus[] = ['todo', 'in_progress', 'blocked', 'review', 'testing', 'done'];

const STATUS_COLORS: Record<DeveloperTaskStatus, string> = {
  todo: '#8a8a9a',
  in_progress: '#3a8a3a',
  blocked: '#e05555',
  review: '#d97706',
  testing: '#6366f1',
  done: '#059669'
};

const PRIORITY_COLORS: Record<string, string> = {
  urgent: '#e05555',
  high: '#d97706',
  medium: '#3a8a3a',
  low: '#8a8a9a'
};

export function DeveloperTasksPage() {
  const { t } = useTranslation();
  const query = useDeveloperTasks();
  const updateStatus = useUpdateDeveloperTaskStatus();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const tasks = query.data || [];
  const filtered = useMemo(() => {
    let result = tasks;
    if (filterStatus !== 'all') {
      result = result.filter((task) => task.status === filterStatus);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter((task) => task.title.toLowerCase().includes(q) || task.description?.toLowerCase().includes(q));
    }
    return result;
  }, [search, filterStatus, tasks]);

  if (query.isLoading) return <LoadingState label={t('developer.tasks.loading')} />;

  return (
    <>
      <div className="admin-actions">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="admin-search-field">
            <Search className="admin-search-field__icon" size={16} strokeWidth={2} aria-hidden />
            <input
              className="admin-search"
              placeholder={t('developer.tasks.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="admin-search"
            style={{ width: 160 }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{t(`developer.taskStatus.${s}`)}</option>
            ))}
          </select>
        </div>
        <span style={{ fontSize: 13, color: 'var(--admin-muted)' }}>
          {filtered.length} tâche{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="admin-table">
        <div className="admin-table__head" style={{ gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1fr' }}>
          <span>{t('developer.tasks.columns.task')}</span>
          <span>{t('developer.tasks.columns.status')}</span>
          <span>{t('developer.tasks.columns.priority')}</span>
          <span>{t('developer.tasks.columns.dueDate')}</span>
          <span>{t('developer.tasks.columns.estimate')}</span>
        </div>
        {filtered.map((task) => (
          <div key={task._id} className="admin-table__row" style={{ gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1fr' }}>
            <div>
              <span className="admin-dev-cell__name">{task.title}</span>
              {task.description ? <span className="admin-table__role" style={{ display: 'block', fontSize: 12, marginTop: 2 }}>{task.description}</span> : null}
            </div>
            <div>
              <select
                value={task.status}
                className="admin-search"
                style={{ width: '100%', padding: '6px 10px', fontSize: 12 }}
                disabled={updateStatus.isPending}
                onChange={(e) => void updateStatus.mutateAsync({ id: task._id, status: e.target.value as DeveloperTaskStatus })}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {t(`developer.taskStatus.${status}`)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {task.priority ? (
                <span style={{
                  display: 'inline-block',
                  padding: '2px 10px',
                  borderRadius: 9999,
                  fontSize: 11,
                  fontWeight: 500,
                  color: '#fff',
                  background: PRIORITY_COLORS[task.priority] || '#8a8a9a',
                  textTransform: 'capitalize'
                }}>
                  {t(`developer.priority.${task.priority}`)}
                </span>
              ) : <span className="admin-table__role">-</span>}
            </div>
            <span className="admin-table__role">
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
            </span>
            <span className="admin-table__role">
              {task.estimatedHours ? `${task.estimatedHours}h` : '-'}
            </span>
          </div>
        ))}
        {!filtered.length ? <div className="admin-empty">{t('developer.tasks.empty')}</div> : null}
      </div>
    </>
  );
}
