import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAdminDevelopers } from './developers/adminDevelopersHooks';
import { useAdminQuotes } from './quotes/adminQuotesHooks';
import { LoadingState } from '../../shared/ui/feedback/LoadingState';

export function AdminOverviewPage() {
  const { t } = useTranslation();
  const developersQuery = useAdminDevelopers();
  const quotesQuery = useAdminQuotes();

  const stats = useMemo(() => {
    const developers = developersQuery.data || [];
    const quotes = quotesQuery.data || [];
    const total = developers.length;
    const available = developers.filter((d) => d.availability).length;
    const portfolioProjects = developers.reduce((sum, d) => sum + (d.portfolioCount || 0), 0);
    const newBriefs = quotes.filter((q) => q.status === 'new').length;
    return { total, available, portfolioProjects, newBriefs };
  }, [developersQuery.data, quotesQuery.data]);

  if (developersQuery.isLoading || quotesQuery.isLoading) {
    return <LoadingState label={t('admin.overview.loading')} />;
  }

  return (
    <div className="admin-overview">
      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__value">{stats.total}</div>
          <div className="admin-stat__label">{t('admin.overview.stats.totalDevelopers')}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__value">{stats.available}</div>
          <div className="admin-stat__label">{t('admin.overview.stats.available')}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__value">{stats.portfolioProjects}</div>
          <div className="admin-stat__label">{t('admin.overview.stats.portfolioProjects')}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__value">{stats.newBriefs}</div>
          <div className="admin-stat__label">{t('admin.overview.stats.newBriefs')}</div>
        </div>
      </div>
      <div className="admin-overview-actions">
        <Link to="/dashboard/admin/quotes" className="admin-btn admin-btn--ghost">
          {t('admin.overview.viewBriefs')}
        </Link>
        <Link to="/dashboard/admin/developers" className="admin-btn">
          {t('admin.overview.addDeveloper')}
        </Link>
      </div>
    </div>
  );
}
