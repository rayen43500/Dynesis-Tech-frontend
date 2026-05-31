import React, { useEffect, useState } from 'react';
import { Bell, Moon, Sun, User } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../app/providers/AuthProvider';
import { getRoleHomePath } from '../../shared/constants/roles';
import { getLastVisitedQuotes, markQuotesVisited, useAdminQuoteNotifications } from '../../features/admin/quotes/adminQuotesHooks';
import {
  IconHome,
  IconInvoices,
  IconLogout,
  IconSettings,
  IconUser,
  IconUsers
} from '../../shared/ui/navigation/icons';
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [adminTheme, setAdminTheme] = useState<AdminTheme>(() => getStoredAdminTheme());
  const [lastVisited, setLastVisited] = useState<number | undefined>(() => getLastVisitedQuotes());

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Admin';
  const notificationsQuery = useAdminQuoteNotifications(lastVisited);
  const newQuotes = notificationsQuery.data ?? 0;

  useEffect(() => {
    localStorage.setItem(ADMIN_THEME_KEY, adminTheme);
  }, [adminTheme]);

  useEffect(() => {
    setLastVisited(getLastVisitedQuotes());
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/admin/quotes')) {
      markQuotesVisited();
      setLastVisited(Date.now());
    }
  }, [location.pathname]);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className={`admin-shell${adminTheme === 'dark' ? ' admin-shell--dark' : ''}`}>
      <aside className="admin-sidebar">
        <Link to={getRoleHomePath('admin')} className="admin-sidebar__brand" aria-label="Admin overview">
          <div className="admin-sidebar__logo">Dynesis Tech</div>
          <div className="admin-sidebar__subtitle">Admin Panel</div>
        </Link>

        <nav className="admin-sidebar__nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}>
            <NavIcon>
              <IconHome />
            </NavIcon>
            Overview
          </NavLink>

          <div className="admin-sidebar__section">Content</div>

          <NavLink
            to="/admin/developers"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconUser />
            </NavIcon>
            Developers
          </NavLink>
          <NavLink
            to="/admin/quotes"
            className={({ isActive }) =>
              `admin-sidebar__link admin-sidebar__link--quotes${isActive ? ' admin-sidebar__link--active' : ''}`
            }
          >
            <NavIcon>
              <IconInvoices />
            </NavIcon>
            Quotes
            {newQuotes > 0 ? <span className="admin-sidebar__badge">{newQuotes > 9 ? '9+' : newQuotes}</span> : null}
          </NavLink>

          <div className="admin-sidebar__section">System</div>

          <NavLink
            to="/admin/operations"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconUsers />
            </NavIcon>
            Users
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconSettings />
            </NavIcon>
            Settings
          </NavLink>
        </nav>

        <div className="admin-sidebar__footer">
          <button type="button" className="admin-sidebar__logout" onClick={handleLogout}>
            <span className="admin-sidebar__icon">
              <IconLogout />
            </span>
            Log out
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar__actions">
            <button
              type="button"
              className="admin-topbar__icon-btn"
              aria-label={adminTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setAdminTheme(adminTheme === 'dark' ? 'light' : 'dark')}
            >
              {adminTheme === 'dark' ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
            </button>
            <div className="admin-topbar__bell-wrap">
              <button
                type="button"
                className="admin-topbar__bell-btn"
                aria-label={newQuotes > 0 ? `${newQuotes} new project briefs` : 'Project briefs'}
                onClick={() => navigate('/admin/quotes')}
              >
                <Bell size={20} strokeWidth={1.75} />
              </button>
              {newQuotes > 0 ? <span className="admin-topbar__bell-dot" aria-hidden /> : null}
            </div>
            <button
              type="button"
              className="admin-topbar__icon-btn"
              aria-label={displayName ? `User: ${displayName}` : 'User account'}
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
