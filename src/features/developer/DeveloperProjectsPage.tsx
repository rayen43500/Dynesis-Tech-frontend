import React from 'react';
import { useTranslation } from 'react-i18next';

import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { useDeveloperProjects } from './developerHooks';

export function DeveloperProjectsPage() {
  const { t } = useTranslation();
  const query = useDeveloperProjects();

  if (query.isLoading) return <LoadingState label={t('developer.projects.loading')} />;

  const projects = query.data || [];

  return (
    <div className="admin-table">
      <div className="admin-table__head" style={{ gridTemplateColumns: '1.4fr 0.8fr 1.4fr 1fr' }}>
        <span>{t('developer.projects.columns.project')}</span>
        <span>{t('developer.projects.columns.status')}</span>
        <span>{t('developer.projects.columns.roadmap')}</span>
        <span>{t('developer.projects.columns.updated')}</span>
      </div>
      {projects.map((project) => {
        const completed = (project.roadmap || []).filter((item) => item.completed).length;
        const total = project.roadmap?.length || 0;
        return (
          <div key={project._id} className="admin-table__row" style={{ gridTemplateColumns: '1.4fr 0.8fr 1.4fr 1fr' }}>
            <div>
              <span className="admin-dev-cell__name">{project.title}</span>
              {project.consultationNotes ? <span className="admin-table__role">{project.consultationNotes}</span> : null}
            </div>
            <span className="admin-table__role">{project.status}</span>
            <span className="admin-table__role">{total ? `${completed}/${total}` : '-'}</span>
            <span className="admin-table__role">{project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : '-'}</span>
          </div>
        );
      })}
      {!projects.length ? <div className="admin-empty">{t('developer.projects.empty')}</div> : null}
    </div>
  );
}
