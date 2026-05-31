import React, { useEffect, useState } from 'react';
import { Moon, Sun, User } from 'lucide-react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../../app/providers/AuthProvider';
import { getRoleHomePath } from '../../shared/constants/roles';
import { IconHome, IconInvoices, IconLogout, IconSettings } from '../../shared/ui/navigation/icons';
import '../../features/admin/admin-dashboard.css';

const CLIENT_THEME_KEY = 'client-panel-theme';

type PanelTheme = 'light' | 'dark';

function getStoredClientTheme(): PanelTheme {
  const stored = localStorage.getItem(CLIENT_THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return 'light';
}

function NavIcon({ children }: { children: React.ReactNode }) {
  return <span className="admin-sidebar__icon">{children}</span>;
}

export function ClientLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [panelTheme, setPanelTheme] = useState<PanelTheme>(() => getStoredClientTheme());

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Client';

  useEffect(() => {
    localStorage.setItem(CLIENT_THEME_KEY, panelTheme);
  }, [panelTheme]);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className={`admin-shell${panelTheme === 'dark' ? ' admin-shell--dark' : ''}`}>
      <aside className="admin-sidebar">
        <Link to={getRoleHomePath('client')} className="admin-sidebar__brand" aria-label="Client overview">
          <div className="admin-sidebar__logo">Dynesis Tech</div>
          <div className="admin-sidebar__subtitle">Client Portal</div>
        </Link>

        <nav className="admin-sidebar__nav">
          <NavLink to="/client" end className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}>
            <NavIcon>
              <IconHome />
            </NavIcon>
            Overview
          </NavLink>
          <NavLink
            to="/client/request"
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
          >
            <NavIcon>
              <IconInvoices />
            </NavIcon>
            My Request
          </NavLink>
          <NavLink
            to="/client/settings"
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
              aria-label={panelTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setPanelTheme(panelTheme === 'dark' ? 'light' : 'dark')}
            >
              {panelTheme === 'dark' ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
            </button>
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
