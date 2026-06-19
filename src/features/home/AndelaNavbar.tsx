import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../app/providers/AuthProvider';
import { getRoleHomePath } from '../../shared/constants/roles';
import { openPageInNewWindow } from '../../shared/utils/openPageInNewWindow';
import { LanguageSwitcher } from '../../shared/ui/navigation/LanguageSwitcher';

type DropdownId = 'developers' | 'services';

const DROPDOWN_ROWS: Record<
  DropdownId,
  Array<{ icon: 'code' | 'list' | 'cloud'; titleKey: string; subtitleKey: string }>
> = {
  developers: [
    { icon: 'code', titleKey: 'nav.dropdown.builders', subtitleKey: 'nav.dropdown.buildersSub' },
    { icon: 'list', titleKey: 'nav.dropdown.integrators', subtitleKey: 'nav.dropdown.integratorsSub' },
    { icon: 'cloud', titleKey: 'nav.dropdown.scalers', subtitleKey: 'nav.dropdown.scalersSub' }
  ],
  services: [
    { icon: 'code', titleKey: 'nav.dropdown.productDesign', subtitleKey: 'nav.dropdown.productDesignSub' },
    { icon: 'list', titleKey: 'nav.dropdown.engineering', subtitleKey: 'nav.dropdown.engineeringSub' },
    { icon: 'cloud', titleKey: 'nav.dropdown.cloudDevops', subtitleKey: 'nav.dropdown.cloudDevopsSub' }
  ]
};

function DropdownIcon({ type }: { type: 'code' | 'list' | 'cloud' }) {
  if (type === 'code') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 8L4 12L8 16M16 8L20 12L16 16"
          stroke="#1A1A1A"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === 'list') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 7H19M5 12H19M5 17H14" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 18C7 16.3431 8.34315 15 10 15H14C15.6569 15 17 16.3431 17 18M7 10C7 8.34315 8.34315 7 10 7H14C15.6569 7 17 8.34315 17 10M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
        stroke="#1A1A1A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NavDropdownPanel({ id, onNavigate }: { id: DropdownId; onNavigate?: () => void }) {
  const { t } = useTranslation();
  const rows = DROPDOWN_ROWS[id];
  const panelTitle = id === 'developers' ? t('nav.hireTalent') : t('nav.buildConfidence');
  const sectionPath = id === 'developers' ? '/developers' : '/services';

  return (
    <div className="andela-nav__dropdown-grid" role="menu">
        <div className="andela-nav__dropdown-left">
          {rows.map((row) => (
            <Link
              key={row.titleKey}
              to={sectionPath}
              className="andela-nav__dropdown-row"
              role="menuitem"
              onClick={onNavigate}
            >
              <span className="andela-nav__dropdown-icon">
                <DropdownIcon type={row.icon} />
              </span>
              <span>
                <span className="andela-nav__dropdown-row-title">{t(row.titleKey)}</span>
                <span className="andela-nav__dropdown-row-sub">{t(row.subtitleKey)}</span>
              </span>
            </Link>
          ))}
          <Link to={sectionPath} className="andela-nav__dropdown-learn" onClick={onNavigate}>
            {t('nav.learnMore')}
          </Link>
        </div>

        <div className="andela-nav__dropdown-right">
          <p className="andela-nav__dropdown-right-title">{panelTitle}</p>
          <Link to="/contact" className="andela-nav__dropdown-right-link" onClick={onNavigate}>
            {t('nav.bookDiscovery')} →
          </Link>
          <img
            className="andela-nav__dropdown-photo"
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
            alt=""
          />
          <div className="andela-nav__dropdown-badge">
            <span>{t('nav.dropdown.sampleProfile')}</span>
            <span className="andela-nav__dropdown-badge-logo" aria-hidden>
              D
            </span>
          </div>
        </div>
      </div>
  );
}

type AndelaNavbarProps = {
  variant?: 'default' | 'contact';
};

export function AndelaNavbar({ variant = 'default' }: AndelaNavbarProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { status, user } = useAuth();
  const logoTo =
    status === 'authenticated' && user ? getRoleHomePath(user.role) : '/';
  const isContactNav = variant === 'contact';
  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  function handleLoginClick(e: React.MouseEvent) {
    if (pathname === '/') {
      e.preventDefault();
      openPageInNewWindow('/login');
    }
  }

  const open = (id: DropdownId) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDropdown(id);
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenDropdown(null), 120);
  };

  const closeMenus = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`andela-nav${isContactNav ? ' andela-nav--contact' : ''}`}
      aria-label={t('nav.primaryAria')}
    >
      <div className="andela-nav__bar">
        <Link to={logoTo} className="andela-nav__logo" aria-label={t('footer.brand.homeAria')}>
          <span className="andela-nav__logo-mark">D</span>
          <span className="andela-nav__logo-text">{t('nav.brand')}</span>
        </Link>

        <div className="andela-nav__center">
          <div
            className="andela-nav__item"
            onMouseEnter={() => open('developers')}
            onMouseLeave={scheduleClose}
          >
            <Link to="/developers" className="andela-nav__link">
              {t('nav.developers')} <span className="andela-nav__chev">▾</span>
            </Link>
          </div>

          <div
            className="andela-nav__item"
            onMouseEnter={() => open('services')}
            onMouseLeave={scheduleClose}
          >
            <Link to="/services" className="andela-nav__link">
              {t('nav.services')} <span className="andela-nav__chev">▾</span>
            </Link>
          </div>

          <Link to="/work-with-us" className="andela-nav__link">
            {t('nav.workWithUs')}
          </Link>
          <Link to="/contact" className="andela-nav__link">
            {t('nav.contact')}
          </Link>
        </div>

        <div className="andela-nav__right">
          <LanguageSwitcher variant="public" />
          <Link to="/login" className="andela-nav__btn andela-nav__btn--primary" onClick={handleLoginClick}>
            {t('nav.login')}
          </Link>

          <button
            type="button"
            className="andela-nav__burger"
            aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="andela-nav__burger-lines">
              <span />
            </span>
          </button>
        </div>
      </div>

      {openDropdown ? (
        <div
          className="andela-nav__dropdown andela-nav__dropdown--visible"
          onMouseEnter={() => open(openDropdown)}
          onMouseLeave={scheduleClose}
        >
          <NavDropdownPanel id={openDropdown} onNavigate={closeMenus} />
        </div>
      ) : null}

      <div className={`andela-nav__mobile ${mobileOpen ? 'andela-nav__mobile--open' : ''}`}>
        <Link to="/developers" onClick={() => setMobileOpen(false)}>
          {t('nav.developers')}
        </Link>
        <Link to="/services" onClick={() => setMobileOpen(false)}>
          {t('nav.services')}
        </Link>
        <Link to="/work-with-us" onClick={() => setMobileOpen(false)}>
          {t('nav.workWithUs')}
        </Link>
        <Link to="/contact" onClick={() => setMobileOpen(false)}>
          {t('nav.contact')}
        </Link>
        <Link
          to="/login"
          className="andela-nav__btn andela-nav__btn--primary"
          onClick={(e) => {
            handleLoginClick(e);
            setMobileOpen(false);
          }}
        >
          {t('nav.login')}
        </Link>
      </div>
    </nav>
  );
}
