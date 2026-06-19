import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useResetAdminSettings,
  useSettingsSectionFeedback,
  useUpdateAdminSettings
} from './adminSettingsHooks';
import { LocalizedField, SettingsSectionCard, SimpleField } from './SettingsFormFields';
import { SettingsResetModal } from './SettingsResetModal';
import type { PlatformSettings } from '../../../shared/types/platformSettings';

type Props = {
  settings: PlatformSettings;
};

export function NavbarSettingsSection({ settings }: Props) {
  const { t } = useTranslation();
  const mutation = useUpdateAdminSettings();
  const resetMutation = useResetAdminSettings();
  const { message, setMessage } = useSettingsSectionFeedback();
  const [branding, setBranding] = useState(settings.branding || {});
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    setBranding(settings.branding || {});
  }, [settings]);

  async function handleSave() {
    setMessage('');
    try {
      await mutation.mutateAsync({ branding });
      setMessage(t('admin.settings.saved'));
    } catch {
      setMessage(t('admin.settings.saveFailed'));
    }
  }

  async function handleReset() {
    setMessage('');
    try {
      const data = await resetMutation.mutateAsync('navbar');
      setBranding(data.branding || {});
      setResetOpen(false);
      setMessage(t('admin.settings.resetSuccess'));
    } catch {
      setMessage(t('admin.settings.resetFailed'));
    }
  }

  return (
    <>
      <SettingsSectionCard
        title={t('admin.settings.tabs.navbar')}
        onSave={() => void handleSave()}
        onReset={() => setResetOpen(true)}
        saving={mutation.isPending}
        resetting={resetMutation.isPending}
        saved={message}
        saveLabel={t('common.save')}
        resetLabel={t('admin.settings.reset')}
      >
        <LocalizedField
          label={t('admin.settings.general.siteName')}
          hint={t('admin.settings.hints.siteName')}
          value={branding.siteName || {}}
          onChange={(siteName) => setBranding((prev) => ({ ...prev, siteName }))}
        />
        <LocalizedField
          label={t('admin.settings.general.tagline')}
          hint={t('admin.settings.hints.tagline')}
          value={branding.tagline || {}}
          onChange={(tagline) => setBranding((prev) => ({ ...prev, tagline }))}
        />
        <SimpleField
          label={t('admin.settings.general.logoUrl')}
          hint={t('admin.settings.hints.logoUrl')}
          value={branding.logoUrl || ''}
          onChange={(logoUrl) => setBranding((prev) => ({ ...prev, logoUrl }))}
          type="url"
        />
        <SimpleField
          label={t('admin.settings.general.logoMark')}
          hint={t('admin.settings.hints.logoMark')}
          value={branding.logoMark || 'D'}
          onChange={(logoMark) => setBranding((prev) => ({ ...prev, logoMark }))}
        />
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
