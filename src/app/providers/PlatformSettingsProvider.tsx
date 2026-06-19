import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useTheme } from './ThemeProvider';
import { endpoints } from '../../shared/api/endpoints';
import { applyPlatformTheme } from '../../shared/platform/platformSettingsUtils';
import type { PlatformSettings } from '../../shared/types/platformSettings';

type PlatformSettingsContextValue = {
  settings: PlatformSettings | undefined;
  isLoading: boolean;
};

const PlatformSettingsContext = createContext<PlatformSettingsContextValue | null>(null);

export function PlatformSettingsProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const query = useQuery({
    queryKey: ['public', 'settings'],
    queryFn: async () => {
      const res = await endpoints.public.settings.get();
      return res.data?.data as PlatformSettings;
    },
    staleTime: 0
  });

  const settings = query.data;

  useEffect(() => {
    if (!settings) return;
    applyPlatformTheme(settings, theme);
  }, [settings, theme]);

  const value = useMemo<PlatformSettingsContextValue>(
    () => ({ settings, isLoading: query.isLoading }),
    [settings, query.isLoading]
  );

  return <PlatformSettingsContext.Provider value={value}>{children}</PlatformSettingsContext.Provider>;
}

export function usePlatformSettings() {
  const ctx = useContext(PlatformSettingsContext);
  if (!ctx) throw new Error('usePlatformSettings must be used within PlatformSettingsProvider');
  return ctx;
}

export function usePlatformSettingsOptional() {
  return useContext(PlatformSettingsContext);
}
