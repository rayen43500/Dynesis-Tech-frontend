import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useResetAdminSettings,
  useSettingsSectionFeedback,
  useUpdateAdminSettings
} from './adminSettingsHooks';
import { FieldLabel, SettingsSectionCard } from './SettingsFormFields';
import { SettingsResetModal } from './SettingsResetModal';
import type { PlatformSettings, TypographySettings } from '../../../shared/types/platformSettings';

type Props = {
  settings: PlatformSettings;
};

const DEFAULT_TYPOGRAPHY: TypographySettings = {
  headingFont: 'Lora',
  bodyFont: 'Inter',
  headingScale: 'md',
  headingWeight: '400',
  letterSpacing: 'normal'
};

export function TypographySettingsSection({ settings }: Props) {
  const { t } = useTranslation();
  const mutation = useUpdateAdminSettings();
  const resetMutation = useResetAdminSettings();
  const { message, setMessage } = useSettingsSectionFeedback();
  const [typography, setTypography] = useState<TypographySettings>(
    settings.typography || DEFAULT_TYPOGRAPHY
  );
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    setTypography(settings.typography || DEFAULT_TYPOGRAPHY);
  }, [settings]);

  function updateField<K extends keyof TypographySettings>(key: K, value: TypographySettings[K]) {
    setTypography((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setMessage('');
    try {
      await mutation.mutateAsync({ typography });
      setMessage(t('admin.settings.saved', 'Paramètres enregistrés avec succès.'));
    } catch {
      setMessage(t('admin.settings.saveFailed', "Échec de l'enregistrement. Veuillez réessayer."));
    }
  }

  async function handleReset() {
    setMessage('');
    try {
      const data = await resetMutation.mutateAsync('sitewide');
      setTypography(data.typography || DEFAULT_TYPOGRAPHY);
      setResetOpen(false);
      setMessage(t('admin.settings.resetSuccess', 'Paramètres restaurés aux valeurs par défaut.'));
    } catch {
      setMessage(t('admin.settings.resetFailed', 'Échec de la réinitialisation. Veuillez réessayer.'));
    }
  }

  return (
    <>
      <SettingsSectionCard
        title={t('admin.settings.tabs.typography', "Style d'écriture & Typographie")}
        onSave={() => void handleSave()}
        onReset={() => setResetOpen(true)}
        saving={mutation.isPending}
        resetting={resetMutation.isPending}
        saved={message}
        saveLabel={t('common.save', 'Enregistrer')}
        resetLabel={t('admin.settings.reset', 'Réinitialiser')}
      >
        <div className="admin-settings-typography-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <label className="admin-field">
            <FieldLabel label={t('admin.settings.typography.headingFont', 'Police des titres (Headings)')} />
            <select
              value={typography.headingFont || 'Lora'}
              onChange={(e) => updateField('headingFont', e.target.value as TypographySettings['headingFont'])}
            >
              <option value="Lora">Lora (Serif Éléguant)</option>
              <option value="Inter">Inter (Sans-serif Moderne)</option>
              <option value="Outfit">Outfit (Geometrique Tech)</option>
              <option value="Playfair Display">Playfair Display (Serif Premium)</option>
              <option value="Plus Jakarta Sans">Plus Jakarta Sans (Moderne Bold)</option>
            </select>
          </label>

          <label className="admin-field">
            <FieldLabel label={t('admin.settings.typography.bodyFont', 'Police du texte (Body)')} />
            <select
              value={typography.bodyFont || 'Inter'}
              onChange={(e) => updateField('bodyFont', e.target.value as TypographySettings['bodyFont'])}
            >
              <option value="Inter">Inter</option>
              <option value="DM Sans">DM Sans</option>
              <option value="Roboto">Roboto</option>
              <option value="System">Système natif</option>
            </select>
          </label>

          <label className="admin-field">
            <FieldLabel label={t('admin.settings.typography.headingScale', 'Échelle des titres')} />
            <select
              value={typography.headingScale || 'md'}
              onChange={(e) => updateField('headingScale', e.target.value as TypographySettings['headingScale'])}
            >
              <option value="sm">Compact (Discret)</option>
              <option value="md">Standard (Équilibré)</option>
              <option value="lg">Grand (Impactant)</option>
              <option value="xl">Ultra Hero (Imposant)</option>
            </select>
          </label>

          <label className="admin-field">
            <FieldLabel label={t('admin.settings.typography.headingWeight', 'Graisse des titres')} />
            <select
              value={typography.headingWeight || '400'}
              onChange={(e) => updateField('headingWeight', e.target.value as TypographySettings['headingWeight'])}
            >
              <option value="300">300 - Light</option>
              <option value="400">400 - Normal</option>
              <option value="500">500 - Medium</option>
              <option value="600">600 - SemiBold</option>
              <option value="700">700 - Bold</option>
            </select>
          </label>

          <label className="admin-field">
            <FieldLabel label={t('admin.settings.typography.letterSpacing', 'Espacement des lettres')} />
            <select
              value={typography.letterSpacing || 'normal'}
              onChange={(e) => updateField('letterSpacing', e.target.value as TypographySettings['letterSpacing'])}
            >
              <option value="tight">Resserré (-0.5px)</option>
              <option value="normal">Normal (0px)</option>
              <option value="wide">Espacé (+1px)</option>
            </select>
          </label>
        </div>

        {/* Dynamic Preview Box */}
        <div
          className="admin-typography-preview"
          style={{
            marginTop: '28px',
            padding: '24px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#ffffff'
          }}
        >
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#4ade80', fontWeight: 600 }}>
            Aperçu du style d'écriture
          </span>
          <h2
            style={{
              margin: '12px 0 8px 0',
              fontFamily: typography.headingFont ? `'${typography.headingFont}', serif` : 'serif',
              fontWeight: Number(typography.headingWeight || 400),
              fontSize:
                typography.headingScale === 'xl'
                  ? '36px'
                  : typography.headingScale === 'lg'
                  ? '30px'
                  : typography.headingScale === 'sm'
                  ? '22px'
                  : '26px',
              letterSpacing:
                typography.letterSpacing === 'wide'
                  ? '1px'
                  : typography.letterSpacing === 'tight'
                  ? '-0.5px'
                  : 'normal'
            }}
          >
            Des solutions sur mesure pour votre ambition
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: typography.bodyFont ? `'${typography.bodyFont}', sans-serif` : 'sans-serif',
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1.6
            }}
          >
            Dynesis Tech conçoit et déploie des applications web3, plateformes SaaS et architectures cloud d'exception.
          </p>
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
