import React from 'react';

import { useI18n } from '../../../app/providers/I18nProvider';
import { useTranslation } from 'react-i18next';

type LanguageSwitcherProps = {
  variant?: 'default' | 'dashboard' | 'public' | 'auth';
};

export function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useI18n();
  const { t } = useTranslation();

  if (variant === 'dashboard') {
    return (
      <div className="admin-lang-switch" role="group" aria-label={t('nav.langGroupAria')}>
        <button
          type="button"
          className={`admin-lang-switch__btn${language === 'en' ? ' admin-lang-switch__btn--active' : ''}`}
          onClick={() => setLanguage('en')}
          aria-label={t('nav.lang.enAria')}
          aria-pressed={language === 'en'}
        >
          {t('nav.lang.en')}
        </button>
        <button
          type="button"
          className={`admin-lang-switch__btn${language === 'fr' ? ' admin-lang-switch__btn--active' : ''}`}
          onClick={() => setLanguage('fr')}
          aria-label={t('nav.lang.frAria')}
          aria-pressed={language === 'fr'}
        >
          {t('nav.lang.fr')}
        </button>
      </div>
    );
  }

  if (variant === 'public' || variant === 'auth') {
    return (
      <div className={`andela-nav__lang${variant === 'auth' ? ' andela-nav__lang--auth' : ''}`} role="group" aria-label={t('nav.langGroupAria')}>
        <button
          type="button"
          className={`andela-nav__lang-btn${language === 'en' ? ' andela-nav__lang-btn--active' : ''}`}
          onClick={() => setLanguage('en')}
          aria-label={t('nav.lang.enAria')}
          aria-pressed={language === 'en'}
        >
          {t('nav.lang.en')}
        </button>
        <span className="andela-nav__lang-divider" aria-hidden>|</span>
        <button
          type="button"
          className={`andela-nav__lang-btn${language === 'fr' ? ' andela-nav__lang-btn--active' : ''}`}
          onClick={() => setLanguage('fr')}
          aria-label={t('nav.lang.frAria')}
          aria-pressed={language === 'fr'}
        >
          {t('nav.lang.fr')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
          language === 'en' ? 'bg-surface text-text' : 'text-muted hover:text-text'
        }`}
        onClick={() => setLanguage('en')}
        aria-label={t('nav.lang.enAria')}
        aria-pressed={language === 'en'}
      >
        {t('nav.lang.en')}
      </button>
      <button
        type="button"
        className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
          language === 'fr' ? 'bg-surface text-text' : 'text-muted hover:text-text'
        }`}
        onClick={() => setLanguage('fr')}
        aria-label={t('nav.lang.frAria')}
        aria-pressed={language === 'fr'}
      >
        {t('nav.lang.fr')}
      </button>
    </div>
  );
}
