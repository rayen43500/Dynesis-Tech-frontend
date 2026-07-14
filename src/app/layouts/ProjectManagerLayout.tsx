import React, { useEffect, useState } from 'react';
import { Moon, Sun, User } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../app/providers/AuthProvider';
import { getRoleHomePath } from '../../shared/constants/roles';
import { resolveMediaUrl } from '../../shared/utils/resolveMediaUrl';
import { IconHome, IconInvoices, IconLogout, IconMessages, IconSettings, IconUser } from '../../shared/ui/navigation/icons';
import { LanguageSwitcher } from '../../shared/ui/navigation/LanguageSwitcher';
import '../../features/admin/admin-dashboard.css';

const PM_THEME_KEY = 'pm-panel-theme';

type PanelTheme = 'light' | 'dark';

function getStoredTheme(): PanelTheme {
  const stored = localStorage.getItem(PM_THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return 'light';
}

function NavIcon({ children }: { children: React.ReactNode }) {
  return <span className="admin-sidebar__icon">{children}</span>;
}

export function ProjectManagerLayout() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [panelTheme, setPanelTheme] = useState<PanelTheme>(() => getStoredTheme());

  const displayName = user?.displayName?.trim() || user?.email?.split('@')[0] || t('nav.fallbackPm');
  const profilePhotoUrl = user?.profilePicture ? resolveMediaUrl(user.profilePicture) : '';

  useEffect(() => {
    localStorage.setItem(PM_THEME_KEY, panelTheme);
  }, [panelTheme]);

  async function handleLogout() {
    await logout();
    window.location.replace('/');
  }

  return (
    <div className={`admin-shell${panelTheme === 'dark' ? ' admin-shell--dark' : ''}`}>
      <aside className="admin-sidebar">
        <Link to={getRoleHomePath('project_manager')} className="admin-sidebar__brand" aria-label={t('nav.pmOverviewAria')}>
          <div className="admin-sidebar__logo">{t('nav.brand')}</div>
          <div className="admin-sidebar__subtitle">{t('nav.pmPortal')}</div>
        </Link>

        <nav className="admin-sidebar__nav">
          <NavLink to="/dashboard/project-manager" end className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}>
            <NavIcon>
              <IconHome />
            </NavIcon>
            {t('nav.overview')}
          </NavLink>
          <NavLink
            to="/dashboard/project-manager/projects"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconInvoices />
            </NavIcon>
            {t('pm.nav.projects')}
          </NavLink>
          <NavLink
            to="/dashboard/project-manager/tasks"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconSettings />
            </NavIcon>
            {t('pm.nav.tasks')}
          </NavLink>
          <NavLink
            to="/dashboard/project-manager/roadmap"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconUser />
            </NavIcon>
            {t('pm.nav.roadmap')}
          </NavLink>
          <NavLink
            to="/dashboard/project-manager/messages"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconMessages />
            </NavIcon>
            {t('pm.nav.messages')}
          </NavLink>
        </nav>

        <div className="admin-sidebar__footer">
          <button type="button" className="admin-sidebar__logout" onClick={handleLogout}>
            <span className="admin-sidebar__icon">
              <IconLogout />
            </span>
            {t('nav.logout')}
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar__actions">
            <LanguageSwitcher variant="dashboard" />
            <button
              type="button"
              className="admin-topbar__icon-btn"
              aria-label={panelTheme === 'dark' ? t('nav.switchLight') : t('nav.switchDark')}
              onClick={() => setPanelTheme(panelTheme === 'dark' ? 'light' : 'dark')}
            >
              {panelTheme === 'dark' ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
            </button>
            <button type="button" className="admin-topbar__icon-btn" aria-label={displayName} title={displayName}>
              {profilePhotoUrl ? <img src={profilePhotoUrl} alt="" className="admin-topbar__avatar" /> : <User size={18} strokeWidth={1.75} />}
            </button>
            <span>{displayName}</span>
          </div>
        </header>
        <div className="admin-main__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
