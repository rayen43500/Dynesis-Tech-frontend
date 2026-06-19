import React from 'react';

import type { LocalizedString } from '../../../shared/types/platformSettings';

export function FieldLabel({ label }: { label: string }) {
  return <span className="admin-field__label admin-field__label--primary">{label}</span>;
}

type Props = {
  label: string;
  value: LocalizedString;
  onChange: (next: LocalizedString) => void;
  multiline?: boolean;
};

export function LocalizedField({ label, value, onChange, multiline }: Props) {
  return (
    <div className="admin-settings-localized">
      <FieldLabel label={label} />
      <div className="admin-settings-localized__grid">
        <label className="admin-field">
          <span className="admin-field__label">EN</span>
          {multiline ? (
            <textarea
              rows={3}
              value={value.en || ''}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
            />
          ) : (
            <input type="text" value={value.en || ''} onChange={(e) => onChange({ ...value, en: e.target.value })} />
          )}
        </label>
        <label className="admin-field">
          <span className="admin-field__label">FR</span>
          {multiline ? (
            <textarea
              rows={3}
              value={value.fr || ''}
              onChange={(e) => onChange({ ...value, fr: e.target.value })}
            />
          ) : (
            <input type="text" value={value.fr || ''} onChange={(e) => onChange({ ...value, fr: e.target.value })} />
          )}
        </label>
      </div>
    </div>
  );
}

type SimpleFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: 'text' | 'url' | 'email';
  placeholder?: string;
};

export function SimpleField({ label, value, onChange, type = 'text', placeholder }: SimpleFieldProps) {
  return (
    <label className="admin-field">
      <FieldLabel label={label} />
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

type ColorFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

export function ColorField({ label, value, onChange }: ColorFieldProps) {
  const pickerValue = value.startsWith('#') && value.length >= 7 ? value.slice(0, 7) : '#2d6a4f';
  return (
    <label className="admin-field admin-settings-color">
      <FieldLabel label={label} />
      <div className="admin-settings-color__row">
        <input type="color" value={pickerValue} onChange={(e) => onChange(e.target.value)} />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </label>
  );
}

type HslFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

export function HslField({ label, value, onChange }: HslFieldProps) {
  return (
    <label className="admin-field">
      <FieldLabel label={label} />
      <input type="text" value={value} placeholder="156 42% 35%" onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export function SettingsSectionCard({
  title,
  children,
  onSave,
  onReset,
  saving,
  resetting,
  saved,
  saveLabel,
  resetLabel
}: {
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  onReset?: () => void;
  saving?: boolean;
  resetting?: boolean;
  saved?: string;
  saveLabel: string;
  resetLabel?: string;
}) {
  const busy = saving || resetting;

  return (
    <section className="admin-settings-section">
      <h2 className="admin-settings-section__title">{title}</h2>
      <div className="admin-settings-section__body">{children}</div>
      <div className="admin-settings-section__footer">
        {onReset ? (
          <button type="button" className="admin-btn admin-btn--ghost" disabled={busy} onClick={onReset}>
            {resetLabel}
          </button>
        ) : (
          <span />
        )}
        <div className="admin-settings-section__footer-actions">
          {saved ? <p className="admin-message admin-message--success">{saved}</p> : null}
          <button type="button" className="admin-btn" disabled={busy} onClick={onSave}>
            {saving ? '…' : saveLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
