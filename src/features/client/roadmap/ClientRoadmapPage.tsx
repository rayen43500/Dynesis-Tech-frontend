import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useClientProjectRoadmap, useClientProjects } from '../projects/clientProjectsHooks';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import '../client-dashboard.css';

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function ClientRoadmapPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const projectsQuery = useClientProjects();
  const projectId = searchParams.get('project') || projectsQuery.data?.[0]?._id || null;
  const roadmapQuery = useClientProjectRoadmap(projectId);

  const sortedRoadmap = useMemo(() => {
    return [...(roadmapQuery.data?.roadmap || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [roadmapQuery.data?.roadmap]);

  return (
    <>
      <h1 className="client-page-title">{t('client.roadmap.title')}</h1>
      <p className="client-page-subtitle">{t('client.roadmap.subtitle')}</p>

      {projectsQuery.isLoading || roadmapQuery.isLoading ? <LoadingState label={t('client.roadmap.loading')} /> : null}

      {!projectsQuery.isLoading && !projectId ? (
        <div className="client-panel-card">
          <p className="client-quote-empty">{t('client.roadmap.empty')}</p>
          <Link to="/dashboard/client/projects" className="client-quote-empty__link">
            {t('client.roadmap.viewProjects')}
          </Link>
        </div>
      ) : null}

      {roadmapQuery.data ? (
        <div className="client-panel-card">
          <h2 className="client-quote-section__label">{roadmapQuery.data.title || t('client.projects.untitled')}</h2>

          {sortedRoadmap.length > 0 ? (
            <ol className="client-roadmap-list">
              {sortedRoadmap.map((stage, index) => (
                <li key={`${stage.title}-${index}`} className={stage.completed ? 'client-roadmap-list__item--done' : ''}>
                  <span>{stage.completed ? '✓' : '○'}</span>
                  <span>{stage.title}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="client-quote-empty">{t('client.roadmap.noStages')}</p>
          )}

          {roadmapQuery.data.milestones?.length ? (
            <>
              <h3 className="client-quote-section__label">{t('client.roadmap.milestones')}</h3>
              <ul className="client-milestones-list">
                {roadmapQuery.data.milestones.map((milestone, index) => (
                  <li key={`${milestone.title}-${index}`}>
                    <strong>{milestone.title}</strong> — {formatDate(milestone.dueDate)} ({milestone.status})
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {roadmapQuery.data.activityTimeline?.length ? (
            <>
              <h3 className="client-quote-section__label">{t('client.roadmap.activity')}</h3>
              <ul className="client-activity-list">
                {roadmapQuery.data.activityTimeline.map((item, index) => (
                  <li key={`${item.message}-${index}`}>
                    {item.message} — {formatDate(item.createdAt)}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
