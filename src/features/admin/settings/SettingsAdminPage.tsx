import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { useAdminSettings } from './adminSettingsHooks';
import { FooterSettingsSection } from './FooterSettingsSection';
import { HomePageSettingsSection } from './HomePageSettingsSection';
import { NavbarSettingsSection } from './NavbarSettingsSection';
import { SitewideSettingsSection } from './SitewideSettingsSection';
import { CustomSectionsAdminSection } from './CustomSectionsAdminSection';
import { TypographySettingsSection } from './TypographySettingsSection';
import { ContactSettingsSection } from './ContactSettingsSection';
import type { SettingsTab } from '../../../shared/types/platformSettings';
import './settings-admin.css';

const TABS: SettingsTab[] = [
  'homePage',
  'sections',
  'typography',
  'contact',
  'navbar',
  'footer',
  'sitewide'
];

const TAB_FALLBACKS: Record<SettingsTab, string> = {
  homePage: "Page d'accueil",
  sections: 'Sections dynamiques',
  typography: "Style d'écriture",
  contact: 'Contact & Réseaux',
  navbar: 'Navbar / En-tête',
  footer: 'Pied de page',
  sitewide: 'Général / Couleurs'
};

export function SettingsAdminPage() {
  const { t } = useTranslation();
  const query = useAdminSettings();
  const [activeTab, setActiveTab] = useState<SettingsTab>('homePage');

  if (query.isLoading || !query.data) {
    return (
      <div className="admin-quotes-page admin-settings-page">
        <LoadingState label={t('admin.settings.loading')} />
      </div>
    );
  }

  const settings = query.data;

  return (
    <div className="admin-quotes-page admin-settings-page">
      <div className="admin-quotes-page__head">
        <h1 className="admin-quotes-page__title">{t('admin.settings.title')}</h1>
      </div>

      <div className="admin-quotes-tabs" style={{ overflowX: 'auto', paddingBottom: '4px' }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`admin-quotes-tabs__tab${activeTab === tab ? ' admin-quotes-tabs__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {t(`admin.settings.tabs.${tab}`, TAB_FALLBACKS[tab])}
          </button>
        ))}
      </div>

      {activeTab === 'homePage' ? <HomePageSettingsSection settings={settings} /> : null}
      {activeTab === 'sections' ? <CustomSectionsAdminSection settings={settings} /> : null}
      {activeTab === 'typography' ? <TypographySettingsSection settings={settings} /> : null}
      {activeTab === 'contact' ? <ContactSettingsSection settings={settings} /> : null}
      {activeTab === 'navbar' ? <NavbarSettingsSection settings={settings} /> : null}
      {activeTab === 'footer' ? <FooterSettingsSection settings={settings} /> : null}
      {activeTab === 'sitewide' ? <SitewideSettingsSection settings={settings} /> : null}
    </div>
  );
}

