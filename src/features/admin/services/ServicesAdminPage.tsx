import React, { useMemo, useState } from 'react';
import { Pencil, Search, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { ServiceDrawerPanel } from './ServiceDrawerPanel';
import {
  type AdminService,
  useAdminServices,
  useDeleteService,
  useUpdateService
} from './adminServicesHooks';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import '../quotes/quotes-admin.css';

type DeleteTarget = AdminService | null;
type FilterTab = 'all' | 'visible' | 'hidden' | 'highlighted';

const TABLE_GRID_COLUMNS = '1.4fr 1.6fr 1.1fr 0.8fr 0.8fr 0.7fr 104px';

const FILTERS: { key: FilterTab; labelKey: string }[] = [
  { key: 'all', labelKey: 'admin.services.tabs.all' },
  { key: 'visible', labelKey: 'admin.services.tabs.visible' },
  { key: 'hidden', labelKey: 'admin.services.tabs.hidden' },
  { key: 'highlighted', labelKey: 'admin.services.tabs.highlighted' }
];

function getLocalized(value: { en?: string; fr?: string } | undefined, lang: string) {
  if (!value) return '';
  return lang.startsWith('fr') ? value.fr || value.en || '' : value.en || value.fr || '';
}

export function ServicesAdminPage() {
  const { i18n, t } = useTranslation();
  const query = useAdminServices();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterTab>('all');
  const [drawerId, setDrawerId] = useState<string | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);

  const services = query.data || [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return services.filter((service) => {
      if (filter === 'visible' && service.visible === false) return false;
      if (filter === 'hidden' && service.visible !== false) return false;
      if (filter === 'highlighted' && !service.highlight) return false;

      if (!q) return true;

      const title = `${service.title?.en || ''} ${service.title?.fr || ''}`.toLowerCase();
      const description = `${service.shortDescription?.en || ''} ${service.shortDescription?.fr || ''}`.toLowerCase();
      const tags = (service.supportingTags || []).join(' ').toLowerCase();
      return title.includes(q) || description.includes(q) || tags.includes(q);
    });
  }, [filter, search, services]);

  const highlightedCount = services.filter((service) => service.highlight).length;

  function openCreate() {
    setDrawerId(null);
  }

  function openEdit(id: string) {
    setDrawerId(id);
  }

  function closeDrawer() {
    setDrawerId(undefined);
  }

  async function toggleVisible(service: AdminService) {
    await updateMutation.mutateAsync({
      id: service._id,
      payload: {
        title: service.title || {},
        shortDescription: service.shortDescription || {},
        supportingTags: service.supportingTags || [],
        highlight: Boolean(service.highlight),
        visible: service.visible === false,
        ordering: service.ordering ?? 0,
        cta: service.cta || null
      }
    });
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget._id);
    setDeleteTarget(null);
  }

  if (query.isLoading) return <LoadingState label={t('admin.services.loading')} />;

  return (
    <>
      <div className="admin-actions">
        <div className="admin-search-field">
          <Search className="admin-search-field__icon" size={16} strokeWidth={2} aria-hidden />
          <input
            className="admin-search"
            placeholder={t('admin.services.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button type="button" className="admin-btn" onClick={openCreate}>
          {t('admin.services.add')}
        </button>
      </div>

      <div className="admin-quotes-tabs">
        {FILTERS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`admin-quotes-tabs__tab${filter === tab.key ? ' admin-quotes-tabs__tab--active' : ''}`}
            onClick={() => setFilter(tab.key)}
          >
            {t(tab.labelKey)}
            {tab.key === 'highlighted' && highlightedCount > 0 ? ` (${highlightedCount})` : ''}
          </button>
        ))}
      </div>

      <div className="admin-table">
        <div className="admin-table__head" style={{ gridTemplateColumns: TABLE_GRID_COLUMNS }}>
          <span>{t('admin.services.columns.service')}</span>
          <span>{t('admin.services.columns.description')}</span>
          <span>{t('admin.services.columns.tags')}</span>
          <span>{t('admin.services.columns.visible')}</span>
          <span>{t('admin.services.columns.highlight')}</span>
          <span>{t('admin.services.columns.order')}</span>
          <span>{t('admin.services.columns.actions')}</span>
        </div>

        {filtered.map((service) => {
          const title = getLocalized(service.title, i18n.language) || t('admin.services.untitled');
          const description = getLocalized(service.shortDescription, i18n.language);

          return (
            <div key={service._id} className="admin-table__row" style={{ gridTemplateColumns: TABLE_GRID_COLUMNS }}>
              <div>
                <span className="admin-dev-cell__name">{title}</span>
                {service.cta?.href ? <span className="admin-table__role">{service.cta.href}</span> : null}
              </div>
              <span className="admin-table__role">{description || '-'}</span>
              <div className="admin-pills">
                {(service.supportingTags || []).slice(0, 2).map((tag) => (
                  <span key={tag} className="admin-pill">
                    {tag}
                  </span>
                ))}
                {(service.supportingTags || []).length > 2 ? (
                  <span className="admin-pill admin-pill--more">+{(service.supportingTags || []).length - 2}</span>
                ) : null}
              </div>
              <button
                type="button"
                className={`admin-switch${service.visible !== false ? ' admin-switch--on' : ''}`}
                onClick={() => void toggleVisible(service)}
                aria-label={t('admin.services.toggleVisible', { name: title })}
                aria-pressed={service.visible !== false}
              >
                <span className="admin-switch__knob" />
              </button>
              <div className="admin-availability">
                <span
                  className={`admin-availability__dot${service.highlight ? ' admin-availability__dot--yes' : ''}`}
                  aria-hidden
                />
                {service.highlight ? t('common.yes') : t('common.no')}
              </div>
              <span className="admin-table__count">{service.ordering ?? 0}</span>
              <div className="admin-row-actions">
                <button
                  type="button"
                  className="admin-action-btn"
                  aria-label={t('admin.services.editAria', { name: title })}
                  onClick={() => openEdit(service._id)}
                >
                  <Pencil size={16} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  className="admin-action-btn admin-action-btn--danger"
                  aria-label={t('admin.services.deleteAria', { name: title })}
                  onClick={() => setDeleteTarget(service)}
                >
                  <Trash2 size={16} strokeWidth={1.75} />
                </button>
              </div>
            </div>
          );
        })}

        {!services.length ? (
          <div className="admin-empty">
            {t('admin.services.emptyInitial')}
            <br />
            {t('admin.services.emptyInitialCta')}
          </div>
        ) : null}

        {services.length > 0 && !filtered.length ? <div className="admin-empty">{t('admin.services.empty')}</div> : null}
      </div>

      {deleteTarget ? (
        <div className="admin-modal-overlay" role="presentation" onClick={() => setDeleteTarget(null)}>
          <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-service-delete-title"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="admin-modal__text" id="admin-service-delete-title">
              {t('admin.services.deleteConfirm', {
                name: getLocalized(deleteTarget.title, i18n.language) || t('admin.services.untitled')
              })}
            </p>
            <div className="admin-modal__actions">
              <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setDeleteTarget(null)}>
                {t('common.cancel')}
              </button>
              <button
                type="button"
                className="admin-btn--delete"
                disabled={deleteMutation.isPending}
                onClick={() => void confirmDelete()}
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {drawerId !== undefined ? (
        <ServiceDrawerPanel serviceId={drawerId} onClose={closeDrawer} onSaved={() => query.refetch()} />
      ) : null}
    </>
  );
}
