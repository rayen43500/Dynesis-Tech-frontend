import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'Dynesis Tech',
      roleAdmin: 'Admin',
      roleClient: 'Client'
    }
  },
  fr: {
    translation: {
      appName: 'Dynesis Tech',
      roleAdmin: 'Admin',
      roleClient: 'Client'
    }
  }
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });
}

type Language = 'en' | 'fr';

type I18nContextValue = {
  language: Language;
  setLanguage: (l: Language) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    if (stored === 'en' || stored === 'fr') return stored;
    return 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState
    }),
    [language]
  );

  return (
    <I18nextProvider i18n={i18n}>
      <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
    </I18nextProvider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

