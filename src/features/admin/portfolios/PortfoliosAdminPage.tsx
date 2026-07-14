import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAdminPortfolios } from './adminPortfoliosHooks';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import '../quotes/quotes-admin.css';

type FilterTab = 'all' | 'featured' | 'standard';

const TABLE_GRID = '1.6fr 1.2fr 0.8fr 0.7fr 0.7fr';

function getLocalized(value: { en?: string; fr?: string } | undefined, lang: string) {
  if (!value) return '';
  return lang.startsWith('fr') ? value.fr || value.en || '' : value.en || value.fr || '';
}

export function PortfoliosAdminPage() {
  const { i18n, t } = useTranslation();
  const query = useAdminPortfolios();
  const [filter, setFilter] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');

  const portfolios = query.data || [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return portfolios.filter((item) => {
      if (filter === 'featured' && !item.featured) return false;
      if (filter === 'standard' && item.featured) return false;
      if (!q) return true;
      const title = getLocalized(item.projectTitle, i18n.language).toLowerCase();
      const tech = (item.technologies || []).join(' ').toLowerCase();
      return title.includes(q) || tech.includes(q);
    });
  }, [filter, i18n.language, portfolios, search]);

  if (query.isLoading) {
    return (
      <div className="admin-quotes-page">
        <LoadingState label={t('admin.portfolios.loading')} />
      </div>
    );
  }

  return (
    <div className="admin-quotes-page">
      <div className="admin-quotes-page__head">
        <h1 className="admin-quotes-page__title">{t('admin.portfolios.title')}</h1>
      </div>

      <div className="admin-quotes-tabs" role="tablist">
        {(
          [
            { key: 'all', labelKey: 'admin.portfolios.tabs.all' },
            { key: 'featured', labelKey: 'admin.portfolios.tabs.featured' },
            { key: 'standard', labelKey: 'admin.portfolios.tabs.standard' }
          ] as const
        ).map((tab) => (
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

      <div className="admin-services-search">
        <input
          type="search"
          className="admin-services-search__input"
          placeholder={t('admin.portfolios.search')}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="admin-quotes-empty">{t('admin.portfolios.empty')}</p>
      ) : (
        <div className="admin-quotes-table-wrap">
          <div className="admin-quotes-table__head" style={{ gridTemplateColumns: TABLE_GRID }}>
            <span>{t('admin.portfolios.columns.title')}</span>
            <span>{t('admin.portfolios.columns.technologies')}</span>
            <span>{t('admin.portfolios.columns.featured')}</span>
            <span>{t('admin.portfolios.columns.order')}</span>
            <span>{t('admin.portfolios.columns.categories')}</span>
          </div>
          {filtered.map((item) => (
            <div key={item._id} className="admin-quotes-table__row" style={{ gridTemplateColumns: TABLE_GRID }}>
              <span>{getLocalized(item.projectTitle, i18n.language) || t('admin.portfolios.untitled')}</span>
              <span>{(item.technologies || []).slice(0, 4).join(', ') || '—'}</span>
              <span>{item.featured ? t('admin.portfolios.yes') : t('admin.portfolios.no')}</span>
              <span>{item.ordering ?? 0}</span>
              <span>{(item.categories || []).slice(0, 3).join(', ') || '—'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
