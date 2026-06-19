import React, { useEffect, useState } from 'react';
import { Bell, Moon, Sun, User } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../app/providers/AuthProvider';
import { getRoleHomePath } from '../../shared/constants/roles';
import { getLastVisitedQuotes, markQuotesVisited } from '../../features/admin/quotes/adminQuotesHooks';
import { useAdminNotifications } from '../../features/admin/adminNotificationsHooks';
import {
  IconHome,
  IconInvoices,
  IconLogout,
  IconMessages,
  IconSettings,
  IconUser,
  IconUsers
} from '../../shared/ui/navigation/icons';
import { LanguageSwitcher } from '../../shared/ui/navigation/LanguageSwitcher';
import '../../features/admin/admin-dashboard.css';
import '../../features/admin/quotes/quotes-admin.css';

const ADMIN_THEME_KEY = 'admin-panel-theme';

type AdminTheme = 'light' | 'dark';

function getStoredAdminTheme(): AdminTheme {
  const stored = localStorage.getItem(ADMIN_THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return 'light';
}

function NavIcon({ children }: { children: React.ReactNode }) {
  return <span className="admin-sidebar__icon">{children}</span>;
}

export function AdminLayout() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [adminTheme, setAdminTheme] = useState<AdminTheme>(() => getStoredAdminTheme());
  const [lastVisited, setLastVisited] = useState<number | undefined>(() => getLastVisitedQuotes());

  const displayName = user?.displayName || user?.email?.split('@')[0] || t('nav.fallbackAdmin');
  const notificationsQuery = useAdminNotifications(lastVisited);
  const newQuotes = notificationsQuery.data?.newQuotes ?? 0;
  const newMessages = notificationsQuery.data?.newMessages ?? 0;
  const totalNotifications = newQuotes + newMessages;

  useEffect(() => {
    localStorage.setItem(ADMIN_THEME_KEY, adminTheme);
  }, [adminTheme]);

  useEffect(() => {
    setLastVisited(getLastVisitedQuotes());
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/dashboard/admin/quotes')) {
      markQuotesVisited();
      setLastVisited(Date.now());
    }
  }, [location.pathname]);

  async function handleLogout() {
    await logout();
    window.location.replace('/');
  }

  return (
    <div className={`admin-shell${adminTheme === 'dark' ? ' admin-shell--dark' : ''}`}>
      <aside className="admin-sidebar">
        <Link to={getRoleHomePath('admin')} className="admin-sidebar__brand" aria-label={t('nav.adminOverviewAria')}>
          <div className="admin-sidebar__logo">{t('nav.brand')}</div>
          <div className="admin-sidebar__subtitle">{t('nav.adminPanel')}</div>
        </Link>

        <nav className="admin-sidebar__nav">
          <NavLink to="/dashboard/admin" end className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}>
            <NavIcon>
              <IconHome />
            </NavIcon>
            {t('nav.overview')}
          </NavLink>

          <div className="admin-sidebar__section">{t('nav.content')}</div>

          <NavLink
            to="/dashboard/admin/developers"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconUser />
            </NavIcon>
            {t('nav.developers')}
          </NavLink>
          <NavLink
            to="/dashboard/admin/quotes"
            className={({ isActive }) =>
              `admin-sidebar__link admin-sidebar__link--quotes${isActive ? ' admin-sidebar__link--active' : ''}`
            }
          >
            <NavIcon>
              <IconInvoices />
            </NavIcon>
            {t('nav.quotes')}
            {newQuotes > 0 ? <span className="admin-sidebar__badge">{newQuotes > 9 ? '9+' : newQuotes}</span> : null}
          </NavLink>

          <NavLink
            to="/dashboard/admin/messages"
            className={({ isActive }) =>
              `admin-sidebar__link admin-sidebar__link--messages${isActive ? ' admin-sidebar__link--active' : ''}`
            }
          >
            <NavIcon>
              <IconMessages />
            </NavIcon>
            {t('nav.messages')}
            {newMessages > 0 ? <span className="admin-sidebar__badge">{newMessages > 9 ? '9+' : newMessages}</span> : null}
          </NavLink>

          <div className="admin-sidebar__section">{t('nav.system')}</div>

          <NavLink
            to="/dashboard/admin/operations"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconUsers />
            </NavIcon>
            {t('nav.users')}
          </NavLink>
          <NavLink
            to="/dashboard/admin/settings"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconSettings />
            </NavIcon>
            {t('nav.settings')}
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
              aria-label={adminTheme === 'dark' ? t('nav.switchLight') : t('nav.switchDark')}
              onClick={() => setAdminTheme(adminTheme === 'dark' ? 'light' : 'dark')}
            >
              {adminTheme === 'dark' ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
            </button>
            <div className="admin-topbar__bell-wrap">
              <button
                type="button"
                className="admin-topbar__bell-btn"
                aria-label={
                  totalNotifications > 0
                    ? t('nav.newNotifications', { count: totalNotifications })
                    : t('nav.notifications')
                }
                onClick={() => navigate(newMessages > 0 ? '/dashboard/admin/messages' : '/dashboard/admin/quotes')}
              >
                <Bell size={20} strokeWidth={1.75} />
              </button>
              {totalNotifications > 0 ? <span className="admin-topbar__bell-dot" aria-hidden /> : null}
            </div>
            <button
              type="button"
              className="admin-topbar__icon-btn"
              aria-label={displayName ? t('nav.userLabel', { name: displayName }) : t('nav.userAccount')}
              title={displayName}
            >
              <User size={18} strokeWidth={1.75} />
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
