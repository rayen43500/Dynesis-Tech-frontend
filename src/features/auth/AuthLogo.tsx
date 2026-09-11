import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useBrandingContent } from '../../shared/hooks/useSiteContent';
import { LanguageSwitcher } from '../../shared/ui/navigation/LanguageSwitcher';

export function AuthLogo() {
  const { t } = useTranslation();
  const branding = useBrandingContent();

  return (
    <div className="auth-logo-row">
      <Link to="/" className="auth-logo-only" aria-label={t('footer.brand.homeAria')}>
        {branding.logoUrl ? (
          <img src={branding.logoUrl} alt={branding.siteName || ''} className="auth-logo-only__img" />
        ) : (
          <>
            <span className="auth-logo-only__mark">{branding.logoMark || 'D'}</span>
            <span className="auth-logo-only__text">{branding.siteName || t('nav.brand')}</span>
          </>
        )}
      </Link>
      <LanguageSwitcher variant="auth" />
    </div>
  );
}

