import React, { useMemo, useState } from 'react';
import { Pencil, Search, Trash2 } from 'lucide-react';

import { DeveloperDrawerPanel } from './DeveloperDrawerPanel';
import { useAdminDevelopers, useDeleteDeveloper, type AdminDeveloperListItem } from './adminDevelopersHooks';
import { resolveDeveloperPhoto } from '../../../shared/utils/resolveMediaUrl';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';

type DeleteTarget = { id: string } | null;

type DataColumnKey = Exclude<keyof AdminDeveloperListItem, 'id' | 'photo'>;

const TABLE_COLUMNS: { key: DataColumnKey; label: string }[] = [
  { key: 'fullName', label: 'Developer' },
  { key: 'roleTitle', label: 'Role' },
  { key: 'expertiseTags', label: 'Expertise' },
  { key: 'availability', label: 'Available' },
  { key: 'visible', label: 'Visible' },
  { key: 'verifiedBadge', label: 'Verified' },
  { key: 'portfolioCount', label: 'Portfolio' }
];

const TABLE_GRID_COLUMNS = '2fr 1.2fr 1.5fr 0.9fr 0.9fr 0.9fr 0.9fr 100px';

function formatBoolean(value: boolean) {
  return value ? 'Yes' : 'No';
}

function renderCell(key: DataColumnKey, dev: AdminDeveloperListItem) {
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
  const query = useAdminDevelopers();
  const deleteMutation = useDeleteDeveloper();

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

  if (query.isLoading) return <LoadingState label="Loading developers…" />;

  return (
    <>
      <div className="admin-actions">
        <div className="admin-search-field">
          <Search className="admin-search-field__icon" size={16} strokeWidth={2} aria-hidden />
          <input
            className="admin-search"
            placeholder="Search developers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button type="button" className="admin-btn" onClick={openCreate}>
          + Add Developer
        </button>
      </div>

      <div className="admin-table admin-table--developers">
        <div className="admin-table__head admin-table__head--developers" style={{ gridTemplateColumns: TABLE_GRID_COLUMNS }}>
          {TABLE_COLUMNS.map((col) => (
            <span key={col.key}>{col.label}</span>
          ))}
          <span>Actions</span>
        </div>

        {filtered.map((dev) => (
          <div
            key={dev.id}
            className="admin-table__row admin-table__row--developers"
            style={{ gridTemplateColumns: TABLE_GRID_COLUMNS }}
          >
            {TABLE_COLUMNS.map((col) => (
              <div key={col.key}>{renderCell(col.key, dev)}</div>
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
            No developers yet.
            <br />
            Add your first developer.
          </div>
        ) : null}

        {developers.length > 0 && !filtered.length ? (
          <div className="admin-empty">No developers found.</div>
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
              Are you sure you want to delete this developer?
            </p>
            <div className="admin-modal__actions">
              <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn--delete"
                disabled={deleteMutation.isPending}
                onClick={() => void confirmDelete()}
              >
                Delete
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
