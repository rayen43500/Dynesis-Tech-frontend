import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useResetAdminSettings,
  useSettingsSectionFeedback,
  useUpdateAdminSettings
} from './adminSettingsHooks';
import { FieldLabel, LocalizedField, SettingsSectionCard, SimpleField } from './SettingsFormFields';
import { SettingsResetModal } from './SettingsResetModal';
import type { PlatformSettings } from '../../../shared/types/platformSettings';

type Props = {
  settings: PlatformSettings;
};

export function ContactSettingsSection({ settings }: Props) {
  const { t } = useTranslation();
  const mutation = useUpdateAdminSettings();
  const resetMutation = useResetAdminSettings();
  const { message, setMessage } = useSettingsSectionFeedback();

  const [contact, setContact] = useState(settings.contact || {});
  const [social, setSocial] = useState(settings.social || {});
  const [copyright, setCopyright] = useState(settings.copyright || {});
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
      setMessage(t('admin.settings.saved', 'Paramètres enregistrés avec succès.'));
    } catch {
      setMessage(t('admin.settings.saveFailed', "Échec de l'enregistrement. Veuillez réessayer."));
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
      setMessage(t('admin.settings.resetSuccess', 'Paramètres restaurés aux valeurs par défaut.'));
    } catch {
      setMessage(t('admin.settings.resetFailed', 'Échec de la réinitialisation. Veuillez réessayer.'));
    }
  }

  return (
    <>
      <SettingsSectionCard
        title={t('admin.settings.tabs.contact', 'Contact & Coordonnées')}
        onSave={() => void handleSave()}
        onReset={() => setResetOpen(true)}
        saving={mutation.isPending}
        resetting={resetMutation.isPending}
        saved={message}
        saveLabel={t('common.save', 'Enregistrer')}
        resetLabel={t('admin.settings.reset', 'Réinitialiser')}
      >
        <h3 className="admin-settings-subtitle" style={{ fontSize: '15px', fontWeight: 600, color: '#4ade80', marginBottom: '16px' }}>
          Informations de Contact Principales
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <SimpleField
            label={t('admin.settings.general.email', 'E-mail de contact')}
            value={contact.email || ''}
            onChange={(email) => setContact((prev) => ({ ...prev, email }))}
            type="email"
            placeholder="contact@dynesistech.com"
          />
          <SimpleField
            label={t('admin.settings.general.phone', 'Téléphone')}
            value={contact.phone || ''}
            onChange={(phone) => setContact((prev) => ({ ...prev, phone }))}
            placeholder="+33 1 23 45 67 89"
          />
        </div>

        <LocalizedField
          label={t('admin.settings.general.location', 'Adresse / Localisation')}
          value={contact.location || {}}
          onChange={(location) => setContact((prev) => ({ ...prev, location }))}
        />

        <LocalizedField
          label={t('admin.settings.general.hours', "Horaires d'ouverture")}
          value={contact.hours || {}}
          onChange={(hours) => setContact((prev) => ({ ...prev, hours }))}
        />

        <LocalizedField
          label={t('admin.settings.general.about', 'Présentation Entreprise (Footer / Page contact)')}
          value={contact.about || {}}
          onChange={(about) => setContact((prev) => ({ ...prev, about }))}
          multiline
        />

        <h3 className="admin-settings-subtitle" style={{ fontSize: '15px', fontWeight: 600, color: '#4ade80', marginTop: '28px', marginBottom: '16px' }}>
          Réseaux Sociaux & Copyright
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <SimpleField
            label="X (Twitter)"
            value={social.x || ''}
            onChange={(x) => setSocial((prev) => ({ ...prev, x }))}
            type="url"
            placeholder="https://x.com/dynesistech"
          />
          <SimpleField
            label="LinkedIn"
            value={social.linkedin || ''}
            onChange={(linkedin) => setSocial((prev) => ({ ...prev, linkedin }))}
            type="url"
            placeholder="https://linkedin.com/company/dynesistech"
          />
          <SimpleField
            label="GitHub"
            value={social.github || ''}
            onChange={(github) => setSocial((prev) => ({ ...prev, github }))}
            type="url"
            placeholder="https://github.com/dynesistech"
          />
          <SimpleField
            label="Instagram"
            value={social.instagram || ''}
            onChange={(instagram) => setSocial((prev) => ({ ...prev, instagram }))}
            type="url"
            placeholder="https://instagram.com/dynesistech"
          />
        </div>

        <LocalizedField
          label={t('admin.settings.general.copyright', 'Texte de Copyright (Pied de page)')}
          value={copyright}
          onChange={(c) => setCopyright(c)}
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
