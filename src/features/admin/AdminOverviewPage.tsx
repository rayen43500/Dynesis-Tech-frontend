import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useAdminDevelopers } from './developers/adminDevelopersHooks';
import { useAdminQuotes } from './quotes/adminQuotesHooks';
import { LoadingState } from '../../shared/ui/feedback/LoadingState';

export function AdminOverviewPage() {
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
    return <LoadingState label="Loading overview…" />;
  }

  return (
    <div className="admin-overview">
      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__value">{stats.total}</div>
          <div className="admin-stat__label">Total Developers</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__value">{stats.available}</div>
          <div className="admin-stat__label">Available</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__value">{stats.portfolioProjects}</div>
          <div className="admin-stat__label">Portfolio Projects</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__value">{stats.newBriefs}</div>
          <div className="admin-stat__label">New Briefs</div>
        </div>
      </div>
      <div className="admin-overview-actions">
        <Link to="/admin/quotes" className="admin-btn admin-btn--ghost">
          View Project Briefs
        </Link>
        <Link to="/admin/developers" className="admin-btn">
          + Add Developer
        </Link>
      </div>
    </div>
  );
}
