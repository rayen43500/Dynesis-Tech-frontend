import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { type AdminProject, type ProjectStatus, useAdminProjects, useUpdateProject, useCompleteBlockchainStage } from './adminProjectsHooks';
import { BlockchainTimeline } from '../../client/projects/BlockchainTimeline';
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
  const completeStageMutation = useCompleteBlockchainStage();

  const [filter, setFilter] = useState<FilterTab>('all');
  const [selected, setSelected] = useState<AdminProject | null>(null);
  const [adminNote, setAdminNote] = useState('');

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

  async function handleCompleteStage(projectId: string, stageIndex: number) {
    const res = await completeStageMutation.mutateAsync({
      id: projectId,
      stageIndex,
      adminNote: adminNote.trim() || undefined
    });
    setAdminNote('');
    if (res.data?.data) {
      setSelected(res.data.data as AdminProject);
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
        <aside className="admin-quotes-detail" aria-label={t('admin.projects.detailTitle')} style={{ width: '560px', overflowY: 'auto', maxHeight: '100vh', padding: '28px' }}>
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
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Étapes Feuille de Route & Validation Blockchain</h3>

              <div style={{ marginBottom: '12px' }}>
                <input
                  type="text"
                  placeholder="Note facultative pour la blockchain (ex: Livrable vérifié v1.2)"
                  style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid var(--admin-border)' }}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                />
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selected.roadmap.map((stage, index) => (
                  <li
                    key={`${stage.title}-${index}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: stage.completed ? '#eaf4ea' : 'var(--admin-surface-muted, #f8fafc)',
                      border: '1px solid var(--admin-row-border, #e2e8f0)'
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 500, color: stage.completed ? '#2d6a4f' : 'var(--admin-text)' }}>
                      {stage.completed ? '✓ ' : '○ '} {stage.title}
                    </span>

                    {!stage.completed ? (
                      <button
                        type="button"
                        className="admin-btn"
                        style={{ fontSize: '11px', padding: '4px 10px' }}
                        disabled={completeStageMutation.isPending}
                        onClick={() => handleCompleteStage(selected._id, index)}
                      >
                        Valider & Signer Hash
                      </button>
                    ) : (
                      <span style={{ fontSize: '11px', color: '#2d6a4f', fontWeight: 600 }}>Inscrit on-chain</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Render Blockchain Log */}
          <BlockchainTimeline entries={selected.blockchainLog || []} />
        </aside>
      ) : null}
    </div>
  );
}
