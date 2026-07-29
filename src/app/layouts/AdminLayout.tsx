import React, { useEffect, useRef, useState } from 'react';
import { Bell, Moon, Sun, User, Mail } from 'lucide-react';

import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../app/providers/AuthProvider';
import { getRoleHomePath } from '../../shared/constants/roles';
import { resolveMediaUrl } from '../../shared/utils/resolveMediaUrl';
import { AdminNotificationsDropdown } from '../../features/admin/AdminNotificationsDropdown';
import { useAdminNotifications } from '../../features/admin/adminNotificationsHooks';
import { getLastReadNotifications } from '../../features/admin/adminNotificationsStorage';
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
import '../../features/client/client-account.css';

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
  const bellWrapRef = useRef<HTMLDivElement>(null);
  const [adminTheme, setAdminTheme] = useState<AdminTheme>(() => getStoredAdminTheme());
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [lastReadAt, setLastReadAt] = useState<number | undefined>(() => getLastReadNotifications());

  const displayName = user?.displayName?.trim() || user?.email?.split('@')[0] || t('nav.fallbackAdmin');
  const profilePhotoUrl = user?.profilePicture ? resolveMediaUrl(user.profilePicture) : '';
  const notificationsQuery = useAdminNotifications(lastReadAt);
  const newQuotes = notificationsQuery.data?.newQuotes ?? 0;
  const newMessages = notificationsQuery.data?.newMessages ?? 0;
  const totalNotifications = newQuotes + newMessages;

  useEffect(() => {
    localStorage.setItem(ADMIN_THEME_KEY, adminTheme);
  }, [adminTheme]);

  useEffect(() => {
    if (!notificationsOpen) return;

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (bellWrapRef.current && !bellWrapRef.current.contains(target)) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [notificationsOpen]);

  function handleBellClick() {
    const willOpen = !notificationsOpen;
    setNotificationsOpen(willOpen);
    if (willOpen) {
      void notificationsQuery.refetch();
    }
  }

  function handleMarkAllRead() {
    setLastReadAt(Date.now());
  }

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

          <NavLink
            to="/dashboard/admin/projects"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconInvoices />
            </NavIcon>
            {t('nav.projects')}
          </NavLink>
          <NavLink
            to="/dashboard/admin/inquiries"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconUsers />
            </NavIcon>
            {t('nav.inquiries')}
          </NavLink>
          <NavLink
            to="/dashboard/admin/portfolios"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconUser />
            </NavIcon>
            {t('nav.portfolios')}
          </NavLink>
          <NavLink
            to="/dashboard/admin/services"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconSettings />
            </NavIcon>
            {t('nav.services')}
          </NavLink>
          <NavLink
            to="/dashboard/admin/newsletter"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <Mail size={18} strokeWidth={1.75} />
            </NavIcon>
            {t('nav.newsletter')}
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
          <NavLink
            to="/dashboard/admin/account"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconUser />
            </NavIcon>
            {t('nav.myAccount')}
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
            <div className="admin-topbar__bell-wrap" ref={bellWrapRef}>
              <button
                type="button"
                className="admin-topbar__bell-btn"
                aria-expanded={notificationsOpen}
                aria-haspopup="dialog"
                aria-label={
                  totalNotifications > 0
                    ? t('nav.newNotifications', { count: totalNotifications })
                    : t('nav.notifications')
                }
                onClick={handleBellClick}
              >
                <Bell size={20} strokeWidth={1.75} />
              </button>
              {totalNotifications > 0 ? (
                <span className="admin-topbar__bell-count" aria-hidden>
                  {totalNotifications > 9 ? '9+' : totalNotifications}
                </span>
              ) : null}
              <AdminNotificationsDropdown
                open={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
                notifications={notificationsQuery.data}
                onMarkAllRead={handleMarkAllRead}
              />
            </div>
            <button
              type="button"
              className={`admin-topbar__icon-btn${profilePhotoUrl ? ' admin-topbar__icon-btn--avatar' : ''}`}
              aria-label={displayName ? t('nav.userLabel', { name: displayName }) : t('nav.userAccount')}
              title={displayName}
              onClick={() => navigate('/dashboard/admin/account')}
            >
              {profilePhotoUrl ? (
                <img src={profilePhotoUrl} alt="" className="admin-topbar__avatar" />
              ) : (
                <User size={18} strokeWidth={1.75} />
              )}
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
