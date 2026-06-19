import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useResetAdminSettings,
  useSettingsSectionFeedback,
  useUpdateAdminSettings
} from './adminSettingsHooks';
import { LocalizedField, SettingsSectionCard, SimpleField } from './SettingsFormFields';
import { SettingsResetModal } from './SettingsResetModal';
import type { LocalizedString, PlatformSettings } from '../../../shared/types/platformSettings';

type Props = {
  settings: PlatformSettings;
};

export function FooterSettingsSection({ settings }: Props) {
  const { t } = useTranslation();
  const mutation = useUpdateAdminSettings();
  const resetMutation = useResetAdminSettings();
  const { message, setMessage } = useSettingsSectionFeedback();
  const [contact, setContact] = useState(settings.contact || {});
  const [social, setSocial] = useState(settings.social || {});
  const [copyright, setCopyright] = useState<LocalizedString>(settings.copyright || {});
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    setContact(settings.contact || {});
    setSocial(settings.social || {});
    setCopyright(settings.copyright || {});
  }, [settings]);

  async function handleSave() {
    setMessage('');
    try {
      await mutation.mutateAsync({ contact, social, copyright });
      setMessage(t('admin.settings.saved'));
    } catch {
      setMessage(t('admin.settings.saveFailed'));
    }
  }

  async function handleReset() {
    setMessage('');
    try {
      const data = await resetMutation.mutateAsync('footer');
      setContact(data.contact || {});
      setSocial(data.social || {});
      setCopyright(data.copyright || {});
      setResetOpen(false);
      setMessage(t('admin.settings.resetSuccess'));
    } catch {
      setMessage(t('admin.settings.resetFailed'));
    }
  }

  return (
    <>
      <SettingsSectionCard
        title={t('admin.settings.tabs.footer')}
        onSave={() => void handleSave()}
        onReset={() => setResetOpen(true)}
        saving={mutation.isPending}
        resetting={resetMutation.isPending}
        saved={message}
        saveLabel={t('common.save')}
        resetLabel={t('admin.settings.reset')}
      >
        <h3 className="admin-settings-subtitle">{t('admin.settings.general.contact')}</h3>
        <SimpleField
          label={t('admin.settings.general.email')}
          value={contact.email || ''}
          onChange={(email) => setContact((prev) => ({ ...prev, email }))}
          type="email"
        />
        <SimpleField
          label={t('admin.settings.general.phone')}
          value={contact.phone || ''}
          onChange={(phone) => setContact((prev) => ({ ...prev, phone }))}
        />
        <LocalizedField
          label={t('admin.settings.general.location')}
          value={contact.location || {}}
          onChange={(location) => setContact((prev) => ({ ...prev, location }))}
        />
        <LocalizedField
          label={t('admin.settings.general.hours')}
          value={contact.hours || {}}
          onChange={(hours) => setContact((prev) => ({ ...prev, hours }))}
        />
        <LocalizedField
          label={t('admin.settings.general.about')}
          value={contact.about || {}}
          onChange={(about) => setContact((prev) => ({ ...prev, about }))}
          multiline
        />

        <h3 className="admin-settings-subtitle">{t('admin.settings.general.social')}</h3>
        <SimpleField
          label={t('footer.social.x')}
          value={social.x || ''}
          onChange={(x) => setSocial((prev) => ({ ...prev, x }))}
          type="url"
        />
        <SimpleField
          label={t('footer.social.linkedin')}
          value={social.linkedin || ''}
          onChange={(linkedin) => setSocial((prev) => ({ ...prev, linkedin }))}
          type="url"
        />
        <SimpleField
          label={t('footer.social.github')}
          value={social.github || ''}
          onChange={(github) => setSocial((prev) => ({ ...prev, github }))}
          type="url"
        />

        <LocalizedField
          label={t('admin.settings.general.copyright')}
          value={copyright}
          onChange={setCopyright}
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
