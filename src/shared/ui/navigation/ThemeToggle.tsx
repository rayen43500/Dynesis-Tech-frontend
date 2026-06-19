import React from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../../app/providers/ThemeProvider';
import { Button } from '../primitives/Button';

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? t('nav.switchLight') : t('nav.switchDark')}
    >
      {theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
    </Button>
  );
}

