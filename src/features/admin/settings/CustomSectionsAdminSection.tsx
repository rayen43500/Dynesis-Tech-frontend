import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useResetAdminSettings,
  useSettingsSectionFeedback,
  useUpdateAdminSettings
} from './adminSettingsHooks';
import { FieldLabel, LocalizedField, SettingsSectionCard, SimpleField } from './SettingsFormFields';
import { SettingsResetModal } from './SettingsResetModal';
import type { CustomSectionItem, PlatformSettings } from '../../../shared/types/platformSettings';

type Props = {
  settings: PlatformSettings;
};

export function CustomSectionsAdminSection({ settings }: Props) {
  const { t } = useTranslation();
  const mutation = useUpdateAdminSettings();
  const resetMutation = useResetAdminSettings();
  const { message, setMessage } = useSettingsSectionFeedback();

  const [sections, setSections] = useState<CustomSectionItem[]>(settings.customSections || []);
  const [resetOpen, setResetOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setSections(settings.customSections || []);
  }, [settings]);

  function handleAddSection() {
    const newId = `section-${Date.now()}`;
    const newSection: CustomSectionItem = {
      id: newId,
      title: { fr: 'Nouvelle Section', en: 'New Section' },
      subtitle: { fr: 'Sous-titre explicatif de la section', en: 'Explanatory subtitle of the section' },
      content: { fr: 'Contenu détaillé de la section dynamique...', en: 'Detailed content of the dynamic section...' },
      badge: { fr: 'NOUVEAU', en: 'NEW' },
      buttonText: { fr: 'En savoir plus', en: 'Learn more' },
      buttonLink: '/contact',
      layoutVariant: 'card',
      enabled: true,
      order: sections.length + 1
    };
    setSections((prev) => [...prev, newSection]);
    setExpandedId(newId);
  }

  function handleUpdateSection(id: string, updated: Partial<CustomSectionItem>) {
    setSections((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  }

  function handleDeleteSection(id: string) {
    if (window.confirm('Voulez-vous vraiment supprimer cette section ?')) {
      setSections((prev) => prev.filter((item) => item.id !== id));
      if (expandedId === id) setExpandedId(null);
    }
  }

  function handleMove(index: number, direction: 'up' | 'down') {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;

    setSections(updated.map((sec, i) => ({ ...sec, order: i + 1 })));
  }

  async function handleSave() {
    setMessage('');
    try {
      await mutation.mutateAsync({ customSections: sections });
      setMessage(t('admin.settings.saved', 'Paramètres enregistrés avec succès.'));
    } catch {
      setMessage(t('admin.settings.saveFailed', "Échec de l'enregistrement. Veuillez réessayer."));
    }
  }

  async function handleReset() {
    setMessage('');
    try {
      const data = await resetMutation.mutateAsync('sitewide');
      setSections(data.customSections || []);
      setResetOpen(false);
      setMessage(t('admin.settings.resetSuccess', 'Paramètres restaurés aux valeurs par défaut.'));
    } catch {
      setMessage(t('admin.settings.resetFailed', 'Échec de la réinitialisation. Veuillez réessayer.'));
    }
  }

  return (
    <>
      <SettingsSectionCard
        title={t('admin.settings.tabs.sections', 'Sections Dynamiques Personnalisées')}
        onSave={() => void handleSave()}
        onReset={() => setResetOpen(true)}
        saving={mutation.isPending}
        resetting={resetMutation.isPending}
        saved={message}
        saveLabel={t('common.save', 'Enregistrer')}
        resetLabel={t('admin.settings.reset', 'Réinitialiser')}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
            Créez, modifiez et organisez des sections sur-mesure diffusées dynamiquement sur le site.
          </p>
          <button
            type="button"
            className="andela-nav__btn andela-nav__btn--primary"
            style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '8px', cursor: 'pointer' }}
            onClick={handleAddSection}
          >
            + Ajouter une Section
          </button>
        </div>

        {sections.length === 0 ? (
          <div
            style={{
              padding: '36px',
              textAlign: 'center',
              borderRadius: '12px',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
              color: 'rgba(255, 255, 255, 0.5)'
            }}
          >
            Aucune section personnalisée. Cliquez sur "+ Ajouter une Section" pour commencer.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {sections.map((sec, idx) => {
              const isExpanded = expandedId === sec.id;
              const titleText = sec.title?.fr || sec.title?.en || `Section #${idx + 1}`;

              return (
                <div
                  key={sec.id}
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(255, 255, 255, 0.03)',
                      cursor: 'pointer'
                    }}
                    onClick={() => setExpandedId(isExpanded ? null : sec.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 600,
                          background: sec.enabled ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                          color: sec.enabled ? '#4ade80' : 'rgba(255, 255, 255, 0.4)'
                        }}
                      >
                        {sec.enabled ? 'ACTIF' : 'MASQUÉ'}
                      </span>
                      <strong style={{ fontSize: '15px', color: '#ffffff' }}>{titleText}</strong>
                      <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)' }}>
                        ({sec.layoutVariant || 'card'})
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', opacity: idx === 0 ? 0.3 : 0.8 }}
                        disabled={idx === 0}
                        onClick={() => handleMove(idx, 'up')}
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', opacity: idx === sections.length - 1 ? 0.3 : 0.8 }}
                        disabled={idx === sections.length - 1}
                        onClick={() => handleMove(idx, 'down')}
                      >
                        ▼
                      </button>
                      <button
                        type="button"
                        style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#f87171',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleDeleteSection(sec.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{ padding: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <label className="admin-field">
                          <FieldLabel label="Statut d'affichage" />
                          <select
                            value={sec.enabled ? 'true' : 'false'}
                            onChange={(e) => handleUpdateSection(sec.id, { enabled: e.target.value === 'true' })}
                          >
                            <option value="true">Actif (Visible sur le site)</option>
                            <option value="false">Masqué (Désactivé)</option>
                          </select>
                        </label>

                        <label className="admin-field">
                          <FieldLabel label="Variante de mise en page" />
                          <select
                            value={sec.layoutVariant || 'card'}
                            onChange={(e) => handleUpdateSection(sec.id, { layoutVariant: e.target.value as CustomSectionItem['layoutVariant'] })}
                          >
                            <option value="card">Carte Glassmorphism</option>
                            <option value="banner">Bannière Pleine Largeur</option>
                            <option value="split">Disposition 2 Colonnes (Split)</option>
                            <option value="grid">Grille d'éléments</option>
                          </select>
                        </label>
                      </div>

                      <LocalizedField
                        label="Titre de la Section"
                        value={sec.title || {}}
                        onChange={(title) => handleUpdateSection(sec.id, { title })}
                      />

                      <LocalizedField
                        label="Sous-titre / Slogan"
                        value={sec.subtitle || {}}
                        onChange={(subtitle) => handleUpdateSection(sec.id, { subtitle })}
                      />

                      <LocalizedField
                        label="Badge haut (Tag)"
                        value={sec.badge || {}}
                        onChange={(badge) => handleUpdateSection(sec.id, { badge })}
                      />

                      <LocalizedField
                        label="Contenu détaillé de la section"
                        value={sec.content || {}}
                        onChange={(content) => handleUpdateSection(sec.id, { content })}
                        multiline
                      />

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <LocalizedField
                          label="Texte du bouton CTA"
                          value={sec.buttonText || {}}
                          onChange={(buttonText) => handleUpdateSection(sec.id, { buttonText })}
                        />
                        <SimpleField
                          label="Lien du bouton CTA (URL / Ancre)"
                          value={sec.buttonLink || ''}
                          onChange={(buttonLink) => handleUpdateSection(sec.id, { buttonLink })}
                          placeholder="/contact ou /services"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
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
