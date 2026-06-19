import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  confirming?: boolean;
};

export function SettingsResetModal({ open, onCancel, onConfirm, confirming }: Props) {
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <div className="admin-modal-overlay" role="presentation" onClick={onCancel}>
      <div className="admin-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <p className="admin-modal__text">{t('admin.settings.resetConfirm')}</p>
        <div className="admin-modal__actions">
          <button type="button" className="admin-btn admin-btn--ghost" onClick={onCancel}>
            {t('common.cancel')}
          </button>
          <button type="button" className="admin-btn--delete" disabled={confirming} onClick={onConfirm}>
            {t('admin.settings.reset')}
          </button>
        </div>
      </div>
    </div>
  );
}
