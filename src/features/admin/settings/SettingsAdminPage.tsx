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

const TABS: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'homePage',
    label: "Page d'accueil",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6.5L8 2l6 4.5V14a1 1 0 01-1 1H3a1 1 0 01-1-1V6.5z" />
        <path d="M6 15V9h4v6" />
      </svg>
    )
  },
  {
    id: 'sections',
    label: 'Sections dynamiques',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="5" height="5" rx="1" />
        <rect x="9" y="2" width="5" height="5" rx="1" />
        <rect x="2" y="9" width="5" height="5" rx="1" />
        <rect x="9" y="9" width="5" height="5" rx="1" />
      </svg>
    )
  },
  {
    id: 'typography',
    label: "Style d'écriture",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13V3h4m0 0h4m-4 0v10m4-10v10" />
      </svg>
    )
  },
  {
    id: 'contact',
    label: 'Contact & Réseaux',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 10.67A2 2 0 0012 9h-1a2 2 0 00-2 2v.5c0 1.1.9 2 2 2h1a2 2 0 002-2V10.67z" />
        <path d="M4 6H2a2 2 0 00-2 2v.67A2 2 0 002 11h1a2 2 0 002-2V8a2 2 0 00-2-2H2" />
        <path d="M4 8a4 4 0 018 0" />
      </svg>
    )
  },
  {
    id: 'navbar',
    label: 'Navbar / En-tête',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="2" width="14" height="12" rx="2" />
        <path d="M1 6h14" />
        <path d="M5 9h6" />
      </svg>
    )
  },
  {
    id: 'footer',
    label: 'Pied de page',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="2" width="14" height="12" rx="2" />
        <path d="M1 10h14" />
        <path d="M5 13h6" />
      </svg>
    )
  },
  {
    id: 'sitewide',
    label: 'Général / Couleurs',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="6" />
        <path d="M8 2a4 4 0 010 8" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    )
  }
];

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

      <div className="admin-settings-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`admin-settings-tab${activeTab === tab.id ? ' admin-settings-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {t(`admin.settings.tabs.${tab.id}`, tab.label)}
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

