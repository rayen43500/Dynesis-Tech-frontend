import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { useAdminSettings } from './adminSettingsHooks';
import { FooterSettingsSection } from './FooterSettingsSection';
import { HomePageSettingsSection } from './HomePageSettingsSection';
import { NavbarSettingsSection } from './NavbarSettingsSection';
import { SitewideSettingsSection } from './SitewideSettingsSection';
import type { SettingsTab } from '../../../shared/types/platformSettings';
import './settings-admin.css';

const TABS: SettingsTab[] = ['homePage', 'navbar', 'footer', 'sitewide'];

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

      <div className="admin-quotes-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`admin-quotes-tabs__tab${activeTab === tab ? ' admin-quotes-tabs__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {t(`admin.settings.tabs.${tab}`)}
          </button>
        ))}
      </div>

      {activeTab === 'homePage' ? <HomePageSettingsSection settings={settings} /> : null}
      {activeTab === 'navbar' ? <NavbarSettingsSection settings={settings} /> : null}
      {activeTab === 'footer' ? <FooterSettingsSection settings={settings} /> : null}
      {activeTab === 'sitewide' ? <SitewideSettingsSection settings={settings} /> : null}
    </div>
  );
}
