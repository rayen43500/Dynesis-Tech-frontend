import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';

import en from '../../locales/en.json';
import fr from '../../locales/fr.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr }
};

if (!i18n.isInitialized) {
  const stored = localStorage.getItem('language');
  const initialLng = stored === 'en' || stored === 'fr' ? stored : 'fr';

  i18n.use(initReactI18next).init({
    resources,
    lng: initialLng,
    fallbackLng: 'fr',
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
    return 'fr';
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
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
