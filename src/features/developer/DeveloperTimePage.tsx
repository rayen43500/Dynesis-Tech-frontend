import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { useCreateDeveloperTimeEntry, useDeveloperTimeEntries } from './developerHooks';

function minutesLabel(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
}

export function DeveloperTimePage() {
  const { t } = useTranslation();
  const query = useDeveloperTimeEntries();
  const createMutation = useCreateDeveloperTimeEntry();
  const [duration, setDuration] = useState('60');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function addEntry() {
    setError('');
    setSuccess(false);
    const minutes = Number.parseInt(duration, 10);
    if (!Number.isFinite(minutes) || minutes <= 0) {
      setError('Veuillez entrer une durée valide en minutes.');
      return;
    }
    if (minutes > 1440) {
      setError('La durée ne peut pas dépasser 1440 minutes (24h).');
      return;
    }
    try {
      await createMutation.mutateAsync({
        startedAt: new Date().toISOString(),
        durationMinutes: minutes,
        note,
        source: 'manual'
      });
      setDuration('60');
      setNote('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Erreur lors de l\'enregistrement. Réessayez.');
    }
  }

  if (query.isLoading) return <LoadingState label={t('developer.time.loading')} />;

  const entries = query.data || [];
  const total = entries.reduce((sum, entry) => sum + entry.durationMinutes, 0);

  return (
    <div className="admin-overview">
      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__value">{minutesLabel(total)}</div>
          <div className="admin-stat__label">{t('developer.time.total')}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__value">{entries.length}</div>
          <div className="admin-stat__label">Entrées enregistrées</div>
        </div>
      </div>

      <div className="admin-card-block">
        <p style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--admin-muted)' }}>
          Nouvelle entrée de temps
        </p>
        {error && <p style={{ margin: '0 0 12px', color: '#e05555', fontSize: 13 }}>{error}</p>}
        {success && <p className="admin-message">✓ Entrée enregistrée avec succès.</p>}
        <div className="admin-grid-2">
          <label className="admin-field">
            <span className="admin-field__label">{t('developer.time.duration')}</span>
            <input
              type="number"
              min={1}
              max={1440}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span className="admin-field__label">{t('developer.time.note')}</span>
            <input
              value={note}
              placeholder="Ex: Implémentation du module auth"
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
        </div>
        <button
          type="button"
          className="admin-btn"
          disabled={createMutation.isPending}
          onClick={() => void addEntry()}
        >
          {createMutation.isPending ? 'Enregistrement…' : t('developer.time.add')}
        </button>
      </div>

      <div className="admin-table">
        <div className="admin-table__head" style={{ gridTemplateColumns: '1fr 1fr 2fr' }}>
          <span>{t('developer.time.columns.date')}</span>
          <span>{t('developer.time.columns.duration')}</span>
          <span>{t('developer.time.columns.note')}</span>
        </div>
        {entries.map((entry) => (
          <div key={entry._id} className="admin-table__row" style={{ gridTemplateColumns: '1fr 1fr 2fr' }}>
            <span className="admin-table__role">{new Date(entry.startedAt).toLocaleDateString()}</span>
            <span className="admin-dev-cell__name">{minutesLabel(entry.durationMinutes)}</span>
            <span className="admin-table__role">{entry.note || '-'}</span>
          </div>
        ))}
        {!entries.length ? <div className="admin-empty">{t('developer.time.empty')}</div> : null}
      </div>
    </div>
  );
}
