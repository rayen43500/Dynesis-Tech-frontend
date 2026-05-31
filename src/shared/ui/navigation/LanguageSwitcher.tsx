import React from 'react';

import { useI18n } from '../../../app/providers/I18nProvider';
import { Button } from '../primitives/Button';

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === 'en' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        aria-label="Switch language to English"
      >
        EN
      </Button>
      <Button
        variant={language === 'fr' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('fr')}
        aria-label="Switch language to French"
      >
        FR
      </Button>
    </div>
  );
}

