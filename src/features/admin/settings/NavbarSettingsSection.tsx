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
import { endpoints } from '../../../shared/api/endpoints';

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
  const [uploading, setUploading] = useState(false);

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

  async function handleLogoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setMessage('');
    setUploading(true);
    try {
      const signedResponse = await endpoints.media.signUpload({ folder: 'branding', resourceType: 'image' });
      const signed = signedResponse.data?.data;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signed.apiKey);
      formData.append('timestamp', String(signed.timestamp));
      formData.append('signature', signed.signature);
      formData.append('folder', signed.folder);

      const uploadResponse = await fetch(signed.uploadUrl, { method: 'POST', body: formData });
      if (!uploadResponse.ok) throw new Error('Cloudinary upload failed');
      const uploaded = await uploadResponse.json();

      await endpoints.media.createAsset({
        cloudinaryPublicId: uploaded.public_id,
        secureUrl: uploaded.secure_url,
        folder: 'branding',
        altText: 'Site logo',
        tags: ['logo']
      });
      setBranding((prev) => ({ ...prev, logoUrl: uploaded.secure_url }));
      setMessage(t('admin.settings.logoUploaded'));
    } catch {
      setMessage(t('admin.settings.logoUploadFailed'));
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <SettingsSectionCard
        title={t('admin.settings.tabs.navbar')}
        subtitle={t('admin.settings.navbar.subtitle')}
        onSave={() => void handleSave()}
        onReset={() => setResetOpen(true)}
        saving={mutation.isPending}
        resetting={resetMutation.isPending}
        saved={message}
        saveLabel={t('common.save')}
        resetLabel={t('admin.settings.reset')}
      >
        <h3 className="admin-settings-subtitle">Identité du site</h3>
        <LocalizedField
          label={t('admin.settings.general.siteName')}
          value={branding.siteName || {}}
          onChange={(siteName) => setBranding((prev) => ({ ...prev, siteName }))}
        />
        <LocalizedField
          label={t('admin.settings.general.tagline')}
          value={branding.tagline || {}}
          onChange={(tagline) => setBranding((prev) => ({ ...prev, tagline }))}
        />
        <h3 className="admin-settings-subtitle">Logo du site</h3>
        <div className="admin-settings-media">
          <div className="admin-settings-media__controls">
            <SimpleField
              label={t('admin.settings.general.logoUrl')}
              value={branding.logoUrl || ''}
              onChange={(logoUrl) => setBranding((prev) => ({ ...prev, logoUrl }))}
              type="url"
            />
            <label className="admin-field">
              <span className="admin-field__label admin-field__label--primary">Choisir le fichier du logo</span>
              <input type="file" accept="image/*" onChange={(event) => void handleLogoUpload(event)} disabled={uploading} />
            </label>
            <SimpleField
              label={t('admin.settings.general.logoMark')}
              value={branding.logoMark || 'D'}
              onChange={(logoMark) => setBranding((prev) => ({ ...prev, logoMark }))}
            />
          </div>
          <div className="admin-settings-media__preview" aria-label="Aperçu du logo">
            {branding.logoUrl ? (
              <img src={branding.logoUrl} alt="Aperçu du logo" />
            ) : (
              <span className="admin-settings-media__empty">Aucun logo sélectionné</span>
            )}
          </div>
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
