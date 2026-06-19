import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '../../shared/ui/navigation/LanguageSwitcher';

export function AuthLogo() {
  const { t } = useTranslation();

  return (
    <div className="auth-logo-row">
      <Link to="/" className="auth-logo-only" aria-label={t('footer.brand.homeAria')}>
        <span className="auth-logo-only__mark">D</span>
        <span className="auth-logo-only__text">{t('nav.brand')}</span>
      </Link>
      <LanguageSwitcher variant="auth" />
    </div>
  );
}
