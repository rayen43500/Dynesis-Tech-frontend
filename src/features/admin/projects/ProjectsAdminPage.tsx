import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { type AdminProject, type ProjectStatus, useAdminProjects, useUpdateProject } from './adminProjectsHooks';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import '../quotes/quotes-admin.css';

type FilterTab = 'all' | ProjectStatus;

const FILTERS: { key: FilterTab; labelKey: string }[] = [
  { key: 'all', labelKey: 'admin.projects.tabs.all' },
  { key: 'active', labelKey: 'admin.projects.tabs.active' },
  { key: 'paused', labelKey: 'admin.projects.tabs.paused' },
  { key: 'completed', labelKey: 'admin.projects.tabs.completed' },
  { key: 'canceled', labelKey: 'admin.projects.tabs.canceled' }
];

const TABLE_GRID = '1.6fr 0.9fr 0.9fr 0.8fr 120px';

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function ProjectsAdminPage() {
  const { t } = useTranslation();
  const query = useAdminProjects();
  const updateMutation = useUpdateProject();
  const [filter, setFilter] = useState<FilterTab>('all');
  const [selected, setSelected] = useState<AdminProject | null>(null);

  const projects = query.data || [];

  const filtered = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((p) => p.status === filter);
  }, [filter, projects]);

  function statusLabel(status?: ProjectStatus) {
    if (!status) return '—';
    return t(`admin.projects.status.${status}`);
  }

  async function handleStatusChange(id: string, status: ProjectStatus) {
    await updateMutation.mutateAsync({ id, payload: { status } });
    if (selected?._id === id) {
      setSelected((prev) => (prev ? { ...prev, status } : prev));
    }
  }

  if (query.isLoading) {
    return (
      <div className="admin-quotes-page">
        <LoadingState label={t('admin.projects.loading')} />
      </div>
    );
  }

  return (
    <div className="admin-quotes-page">
      <div className="admin-quotes-page__head">
        <h1 className="admin-quotes-page__title">{t('admin.projects.title')}</h1>
      </div>

      <div className="admin-quotes-tabs" role="tablist">
        {FILTERS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={filter === tab.key}
            className={`admin-quotes-tabs__tab${filter === tab.key ? ' admin-quotes-tabs__tab--active' : ''}`}
            onClick={() => setFilter(tab.key)}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="admin-quotes-empty">{t('admin.projects.empty')}</p>
      ) : (
        <div className="admin-quotes-table-wrap">
          <div className="admin-quotes-table__head" style={{ gridTemplateColumns: TABLE_GRID }}>
            <span>{t('admin.projects.columns.title')}</span>
            <span>{t('admin.projects.columns.status')}</span>
            <span>{t('admin.projects.columns.payment')}</span>
            <span>{t('admin.projects.columns.updated')}</span>
            <span>{t('admin.projects.columns.actions')}</span>
          </div>
          {filtered.map((project) => (
            <div
              key={project._id}
              className={`admin-quotes-table__row${selected?._id === project._id ? ' admin-quotes-table__row--selected' : ''}`}
              style={{ gridTemplateColumns: TABLE_GRID }}
            >
              <button type="button" className="admin-quotes-table__cell-btn" onClick={() => setSelected(project)}>
                {project.title || t('admin.projects.untitled')}
              </button>
              <span>{statusLabel(project.status)}</span>
              <span>{project.paymentStatus || '—'}</span>
              <span>{formatDate(project.updatedAt)}</span>
              <span className="admin-quotes-table__actions">
                <button type="button" className="admin-quotes-table__action" onClick={() => setSelected(project)}>
                  {t('admin.projects.view')}
                </button>
              </span>
            </div>
          ))}
        </div>
      )}

      {selected ? (
        <aside className="admin-quotes-detail" aria-label={t('admin.projects.detailTitle')}>
          <div className="admin-quotes-detail__head">
            <h2>{selected.title || t('admin.projects.untitled')}</h2>
            <button type="button" className="admin-quotes-detail__close" onClick={() => setSelected(null)}>
              {t('common.close')}
            </button>
          </div>
          <p>
            <strong>{t('admin.projects.columns.status')}:</strong> {statusLabel(selected.status)}
          </p>
          <p>
            <strong>{t('admin.projects.columns.payment')}:</strong> {selected.paymentStatus || '—'}
          </p>
          {selected.consultationNotes ? (
            <p>
              <strong>{t('admin.projects.notes')}:</strong> {selected.consultationNotes}
            </p>
          ) : null}
          <div className="admin-quotes-detail__actions">
            {(['active', 'paused', 'completed', 'canceled'] as ProjectStatus[]).map((status) => (
              <button
                key={status}
                type="button"
                className="admin-quotes-detail__btn"
                disabled={selected.status === status || updateMutation.isPending}
                onClick={() => handleStatusChange(selected._id, status)}
              >
                {statusLabel(status)}
              </button>
            ))}
          </div>
          {selected.roadmap?.length ? (
            <div>
              <h3>{t('admin.projects.roadmap')}</h3>
              <ul>
                {selected.roadmap.map((stage, index) => (
                  <li key={`${stage.title}-${index}`}>
                    {stage.completed ? '✓ ' : '○ '}
                    {stage.title}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {selected.milestones?.length ? (
            <div>
              <h3>{t('admin.projects.milestones')}</h3>
              <ul>
                {selected.milestones.map((milestone, index) => (
                  <li key={`${milestone.title}-${index}`}>
                    {milestone.title} — {formatDate(milestone.dueDate)} ({milestone.status})
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      ) : null}
    </div>
  );
}
