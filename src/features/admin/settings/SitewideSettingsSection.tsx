import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useResetAdminSettings,
  useSettingsSectionFeedback,
  useUpdateAdminSettings
} from './adminSettingsHooks';
import { FieldLabel, HslField, SettingsSectionCard } from './SettingsFormFields';
import { SettingsResetModal } from './SettingsResetModal';
import type { PlatformSettings, ThemeModeColors } from '../../../shared/types/platformSettings';

type Props = {
  settings: PlatformSettings;
};

const LIGHT_KEYS: (keyof ThemeModeColors)[] = ['accent', 'accent2', 'bg', 'surface', 'text', 'muted', 'border'];

export function SitewideSettingsSection({ settings }: Props) {
  const { t } = useTranslation();
  const mutation = useUpdateAdminSettings();
  const resetMutation = useResetAdminSettings();
  const { message, setMessage } = useSettingsSectionFeedback();
  const [defaultMode, setDefaultMode] = useState(settings.theme?.defaultMode || 'system');
  const [global, setGlobal] = useState(settings.theme?.global || {});
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    setDefaultMode(settings.theme?.defaultMode || 'system');
    setGlobal(settings.theme?.global || {});
  }, [settings]);

  function updateLight(key: keyof ThemeModeColors, value: string) {
    setGlobal((prev) => ({
      ...prev,
      light: { ...prev.light, [key]: value }
    }));
  }

  function updateDark(key: keyof ThemeModeColors, value: string) {
    setGlobal((prev) => ({
      ...prev,
      dark: { ...prev.dark, [key]: value }
    }));
  }

  async function handleSave() {
    setMessage('');
    try {
      await mutation.mutateAsync({
        theme: {
          ...settings.theme,
          defaultMode,
          global
        }
      });
      setMessage(t('admin.settings.saved'));
    } catch {
      setMessage(t('admin.settings.saveFailed'));
    }
  }

  async function handleReset() {
    setMessage('');
    try {
      const data = await resetMutation.mutateAsync('sitewide');
      setDefaultMode(data.theme?.defaultMode || 'system');
      setGlobal(data.theme?.global || {});
      setResetOpen(false);
      setMessage(t('admin.settings.resetSuccess'));
    } catch {
      setMessage(t('admin.settings.resetFailed'));
    }
  }

  return (
    <>
      <SettingsSectionCard
        title={t('admin.settings.tabs.sitewide')}
        onSave={() => void handleSave()}
        onReset={() => setResetOpen(true)}
        saving={mutation.isPending}
        resetting={resetMutation.isPending}
        saved={message}
        saveLabel={t('common.save')}
        resetLabel={t('admin.settings.reset')}
      >
      <label className="admin-field">
        <FieldLabel label={t('admin.settings.theme.defaultMode')} hint={t('admin.settings.hints.defaultMode')} />
        <select
          value={defaultMode}
          onChange={(e) => setDefaultMode(e.target.value as 'light' | 'dark' | 'system')}
        >
          <option value="system">{t('admin.settings.theme.modeSystem')}</option>
          <option value="light">{t('admin.settings.theme.modeLight')}</option>
          <option value="dark">{t('admin.settings.theme.modeDark')}</option>
        </select>
      </label>

      <h3 className="admin-settings-subtitle">{t('admin.settings.theme.globalLight')}</h3>
      <div className="admin-settings-grid">
        {LIGHT_KEYS.map((key) => (
          <HslField
            key={`light-${key}`}
            label={t(`admin.settings.theme.vars.${key}`)}
            hint={t(`admin.settings.hints.globalLight.${key}`)}
            value={global.light?.[key] || ''}
            onChange={(v) => updateLight(key, v)}
          />
        ))}
      </div>

      <h3 className="admin-settings-subtitle">{t('admin.settings.theme.globalDark')}</h3>
      <div className="admin-settings-grid">
        {LIGHT_KEYS.map((key) => (
          <HslField
            key={`dark-${key}`}
            label={t(`admin.settings.theme.vars.${key}`)}
            hint={t(`admin.settings.hints.globalDark.${key}`)}
            value={global.dark?.[key] || ''}
            onChange={(v) => updateDark(key, v)}
          />
        ))}
      </div>
    </SettingsSectionCard>

      <SettingsResetModal
        open={resetOpen}
        onCancel={() => setResetOpen(false)}
        onConfirm={() => void handleReset()}
        confirming={resetMutation.isPending}
      />
    </>
  );
}
