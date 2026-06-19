import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './public-footer.css';

export function PublicFooter() {
  const { t } = useTranslation();

  const navLinks = [
    { label: t('footer.navigation.home'), to: '/' },
    { label: t('footer.navigation.developers'), to: '/developers' },
    { label: t('footer.navigation.services'), to: '/services' },
    { label: t('footer.navigation.workWithUs'), to: '/work-with-us' },
    { label: t('footer.navigation.contact'), to: '/contact' }
  ];

  const serviceLinks = [
    t('footer.services.webExperiences'),
    t('footer.services.mobileApplications'),
    t('footer.services.aiMachineLearning'),
    t('footer.services.clientSystems'),
    t('footer.services.secureSolutions')
  ];

  const socialLinks = [
    {
      label: t('footer.social.x'),
      href: '#',
      ariaLabel: t('footer.social.x'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      label: t('footer.social.linkedin'),
      href: '#',
      ariaLabel: t('footer.social.linkedin'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
        </svg>
      )
    },
    {
      label: t('footer.social.github'),
      href: '#',
      ariaLabel: t('footer.social.github'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      )
    }
  ];

  return (
    <footer className="public-footer">
      <div className="public-footer__inner">
        <div className="public-footer__grid">
          <div className="public-footer__col">
            <h3 className="public-footer__col-title">{t('footer.company.title')}</h3>
            <div className="public-footer__col-body">
              <p className="public-footer__about">{t('footer.company.about')}</p>
            </div>
          </div>

          <div className="public-footer__col">
            <h3 className="public-footer__col-title">{t('footer.navigation.title')}</h3>
            <div className="public-footer__col-body">
              {navLinks.map(({ label, to }) => (
                <Link key={to} to={to} className="public-footer__link">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="public-footer__col">
            <h3 className="public-footer__col-title">{t('footer.services.title')}</h3>
            <div className="public-footer__col-body">
              {serviceLinks.map((item) => (
                <span key={item} className="public-footer__item">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="public-footer__col">
            <h3 className="public-footer__col-title">{t('footer.contact.title')}</h3>
            <div className="public-footer__col-body">
              <span className="public-footer__item">{t('footer.contact.email')}</span>
              <span className="public-footer__item">{t('footer.contact.phone')}</span>
              <span className="public-footer__item">{t('footer.contact.location')}</span>
              <span className="public-footer__item">{t('footer.contact.hours')}</span>
            </div>
          </div>
        </div>

        <hr className="public-footer__divider" />

        <div className="public-footer__bar">
          <Link to="/" className="public-footer__bar-brand" aria-label={t('footer.brand.homeAria')}>
            <span className="public-footer__bar-brand-mark">D</span>
            <span className="public-footer__bar-brand-text">{t('footer.brand.name')}</span>
          </Link>

          <p className="public-footer__copyright">{t('footer.copyright')}</p>

          <div className="public-footer__social">
            {socialLinks.map(({ label, href, ariaLabel, icon }) => (
              <a key={label} href={href} className="public-footer__social-link" aria-label={ariaLabel}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
