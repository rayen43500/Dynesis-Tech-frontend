import React, { useMemo, useState } from 'react';
import { Pencil, Search, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { DeveloperDrawerPanel } from './DeveloperDrawerPanel';
import { useAdminDevelopers, useDeleteDeveloper, type AdminDeveloperListItem } from './adminDevelopersHooks';
import { resolveDeveloperPhoto } from '../../../shared/utils/resolveMediaUrl';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';

type DeleteTarget = { id: string } | null;

type DataColumnKey = Exclude<keyof AdminDeveloperListItem, 'id' | 'photo'>;

const TABLE_COLUMNS: { key: DataColumnKey; labelKey: string }[] = [
  { key: 'fullName', labelKey: 'admin.developers.columns.developer' },
  { key: 'roleTitle', labelKey: 'admin.developers.columns.role' },
  { key: 'expertiseTags', labelKey: 'admin.developers.columns.expertise' },
  { key: 'availability', labelKey: 'admin.developers.columns.available' },
  { key: 'visible', labelKey: 'admin.developers.columns.visible' },
  { key: 'verifiedBadge', labelKey: 'admin.developers.columns.verified' },
  { key: 'portfolioCount', labelKey: 'admin.developers.columns.portfolio' }
];

const TABLE_GRID_COLUMNS = '2fr 1.2fr 1.5fr 0.9fr 0.9fr 0.9fr 0.9fr 100px';

function renderCell(
  key: DataColumnKey,
  dev: AdminDeveloperListItem,
  formatBoolean: (value: boolean) => string
) {
  switch (key) {
    case 'fullName':
      return (
        <div className="admin-dev-cell">
          <img
            className="admin-dev-cell__photo"
            src={resolveDeveloperPhoto({ photo: dev.photo }) || 'https://i.pravatar.cc/80?img=11'}
            alt=""
          />
          <span className="admin-dev-cell__name">{dev.fullName}</span>
        </div>
      );
    case 'roleTitle':
      return <span className="admin-table__role">{dev.roleTitle}</span>;
    case 'expertiseTags':
      return (
        <div className="admin-pills">
          {dev.expertiseTags.slice(0, 2).map((tag) => (
            <span key={tag} className="admin-pill">
              {tag}
            </span>
          ))}
        </div>
      );
    case 'availability':
      return (
        <div className="admin-availability">
          <span
            className={`admin-availability__dot${dev.availability ? ' admin-availability__dot--yes' : ''}`}
            aria-hidden
          />
          {formatBoolean(dev.availability)}
        </div>
      );
    case 'visible':
      return (
        <div className="admin-availability">
          <span
            className={`admin-availability__dot${dev.visible ? ' admin-availability__dot--yes' : ''}`}
            aria-hidden
          />
          {formatBoolean(dev.visible)}
        </div>
      );
    case 'verifiedBadge':
      return (
        <div className="admin-availability">
          <span
            className={`admin-availability__dot${dev.verifiedBadge ? ' admin-availability__dot--yes' : ''}`}
            aria-hidden
          />
          {formatBoolean(dev.verifiedBadge)}
        </div>
      );
    case 'portfolioCount':
      return <span className="admin-table__count">{dev.portfolioCount}</span>;
    default:
      return null;
  }
}

export function DevelopersAdminListPage() {
  const { t } = useTranslation();
  const query = useAdminDevelopers();
  const deleteMutation = useDeleteDeveloper();

  const formatBoolean = (value: boolean) => (value ? t('common.yes') : t('common.no'));

  const [search, setSearch] = useState('');
  const [drawerId, setDrawerId] = useState<string | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);

  const developers = query.data || [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return developers;
    return developers.filter(
      (dev) =>
        dev.fullName.toLowerCase().includes(q) ||
        dev.roleTitle.toLowerCase().includes(q) ||
        dev.expertiseTags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [developers, search]);

  function openCreate() {
    setDrawerId(null);
  }

  function openEdit(id: string) {
    setDrawerId(id);
  }

  function closeDrawer() {
    setDrawerId(undefined);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  }

  if (query.isLoading) return <LoadingState label={t('admin.developers.loading')} />;

  return (
    <>
      <div className="admin-actions">
        <div className="admin-search-field">
          <Search className="admin-search-field__icon" size={16} strokeWidth={2} aria-hidden />
          <input
            className="admin-search"
            placeholder={t('admin.developers.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button type="button" className="admin-btn" onClick={openCreate}>
          {t('admin.developers.add')}
        </button>
      </div>

      <div className="admin-table admin-table--developers">
        <div className="admin-table__head admin-table__head--developers" style={{ gridTemplateColumns: TABLE_GRID_COLUMNS }}>
          {TABLE_COLUMNS.map((col) => (
            <span key={col.key}>{t(col.labelKey)}</span>
          ))}
          <span>{t('admin.developers.columns.actions')}</span>
        </div>

        {filtered.map((dev) => (
          <div
            key={dev.id}
            className="admin-table__row admin-table__row--developers"
            style={{ gridTemplateColumns: TABLE_GRID_COLUMNS }}
          >
            {TABLE_COLUMNS.map((col) => (
              <div key={col.key}>{renderCell(col.key, dev, formatBoolean)}</div>
            ))}
            <div className="admin-row-actions">
              <button
                type="button"
                className="admin-action-btn"
                aria-label={`Edit ${dev.fullName}`}
                onClick={() => openEdit(dev.id)}
              >
                <Pencil size={16} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                className="admin-action-btn admin-action-btn--danger"
                aria-label={`Delete ${dev.fullName}`}
                onClick={() => setDeleteTarget({ id: dev.id })}
              >
                <Trash2 size={16} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        ))}

        {!developers.length ? (
          <div className="admin-empty">
            {t('admin.developers.emptyInitial')}
            <br />
            {t('admin.developers.emptyInitialCta')}
          </div>
        ) : null}

        {developers.length > 0 && !filtered.length ? (
          <div className="admin-empty">{t('admin.developers.empty')}</div>
        ) : null}
      </div>

      {deleteTarget ? (
        <div className="admin-modal-overlay" role="presentation" onClick={() => setDeleteTarget(null)}>
          <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-delete-title"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="admin-modal__text" id="admin-delete-title">
              {t('admin.developers.deleteConfirm')}
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
        <DeveloperDrawerPanel developerId={drawerId} onClose={closeDrawer} onSaved={() => query.refetch()} />
      ) : null}
    </>
  );
}
