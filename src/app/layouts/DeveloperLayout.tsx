import React, { useEffect, useState } from 'react';
import { Moon, Sun, User, Menu, X } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../app/providers/AuthProvider';
import { getRoleHomePath } from '../../shared/constants/roles';
import { resolveMediaUrl } from '../../shared/utils/resolveMediaUrl';
import {
  IconHome,
  IconInvoices,
  IconLogout,
  IconMessages,
  IconSettings,
  IconUser,
  IconUsers,
  IconCalendar,
  IconContact,
  IconProjects
} from '../../shared/ui/navigation/icons';
import { LanguageSwitcher } from '../../shared/ui/navigation/LanguageSwitcher';
import '../../features/admin/admin-dashboard.css';

const DEVELOPER_THEME_KEY = 'developer-panel-theme';

type PanelTheme = 'light' | 'dark';

function getStoredTheme(): PanelTheme {
  const stored = localStorage.getItem(DEVELOPER_THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return 'light';
}

function NavIcon({ children }: { children: React.ReactNode }) {
  return <span className="admin-sidebar__icon">{children}</span>;
}

function usePageTitle() {
  const { t } = useTranslation();
  const location = useLocation();
  const path = location.pathname;

  if (path.endsWith('/developer') || path.endsWith('/developer/'))
    return t('developer.dashboard.title');
  if (path.includes('/projects')) return t('developer.projects.title');
  if (path.includes('/tasks') || path.includes('/kanban')) return t('developer.tasks.title');
  if (path.includes('/time')) return t('developer.time.title');
  if (path.includes('/bugs')) return t('developer.bugs.title');
  if (path.includes('/deployments')) return t('developer.deployments.title');
  if (path.includes('/leaves')) return t('developer.leaves.title');
  if (path.includes('/messages')) return t('developer.nav.messages');
  if (path.includes('/account')) return t('developer.nav.account');
  if (path.includes('/performance')) return t('developer.nav.performance');
  return t('developer.dashboard.title');
}

export function DeveloperLayout() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [panelTheme, setPanelTheme] = useState<PanelTheme>(() => getStoredTheme());
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pageTitle = usePageTitle();

  const displayName = user?.displayName?.trim() || user?.email?.split('@')[0] || t('nav.fallbackDeveloper');
  const profilePhotoUrl = user?.profilePicture ? resolveMediaUrl(user.profilePicture) : '';

  useEffect(() => {
    localStorage.setItem(DEVELOPER_THEME_KEY, panelTheme);
  }, [panelTheme]);

  async function handleLogout() {
    await logout();
    window.location.replace('/');
  }

  const closeNav = () => setMobileNavOpen(false);

  return (
    <div className={`admin-shell${panelTheme === 'dark' ? ' admin-shell--dark' : ''}`}>
      <div
        className={`admin-sidebar-backdrop ${mobileNavOpen ? 'admin-sidebar-backdrop--visible' : ''}`}
        onClick={closeNav}
      />
      <aside className={`admin-sidebar${mobileNavOpen ? ' admin-sidebar--mobile-open' : ''}`}>
        <Link to={getRoleHomePath('developer')} onClick={closeNav} className="admin-sidebar__brand" aria-label={t('nav.developerOverviewAria')}>
          <div className="admin-sidebar__logo">{t('nav.brand')}</div>
          <div className="admin-sidebar__subtitle">{t('nav.developerPortal')}</div>
        </Link>

        <nav className="admin-sidebar__nav" onClick={closeNav}>
          <NavLink to="/dashboard/developer" end className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}>
            <NavIcon><IconHome /></NavIcon>
            {t('developer.nav.overview')}
          </NavLink>

          <div className="admin-sidebar__section">{t('nav.content')}</div>

          <NavLink
            to="/dashboard/developer/projects"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon><IconProjects /></NavIcon>
            {t('developer.nav.projects')}
          </NavLink>
          <NavLink
            to="/dashboard/developer/tasks"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon><IconInvoices /></NavIcon>
            {t('developer.nav.tasks')}
          </NavLink>
          <NavLink
            to="/dashboard/developer/time"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon><IconCalendar /></NavIcon>
            {t('developer.nav.time')}
          </NavLink>

          <div className="admin-sidebar__section">{t('nav.system')}</div>

          <NavLink
            to="/dashboard/developer/bugs"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon><IconContact /></NavIcon>
            {t('developer.nav.bugs')}
          </NavLink>
          <NavLink
            to="/dashboard/developer/deployments"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon><IconMessages /></NavIcon>
            {t('developer.nav.deployments')}
          </NavLink>
          <NavLink
            to="/dashboard/developer/leaves"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon><IconCalendar /></NavIcon>
            {t('developer.nav.leaves')}
          </NavLink>

          <div className="admin-sidebar__section">{t('nav.userAccount')}</div>

          <NavLink
            to="/dashboard/developer/account"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon><IconUser /></NavIcon>
            {t('developer.nav.account')}
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
          <button
            type="button"
            className="admin-topbar__burger"
            aria-label="Toggle navigation"
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="admin-topbar__title">{pageTitle}</h1>
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
            <button
              type="button"
              className={`admin-topbar__icon-btn${profilePhotoUrl ? ' admin-topbar__icon-btn--avatar' : ''}`}
              aria-label={displayName ? t('nav.userLabel', { name: displayName }) : t('nav.userAccount')}
              title={displayName}
            >
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
