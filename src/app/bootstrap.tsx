import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './state/queryClient';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { I18nProvider } from './providers/I18nProvider';

import { PlatformSettingsProvider } from './providers/PlatformSettingsProvider';
import { SplashScreen } from '../shared/ui/splash/SplashScreen';

import { AppRoutes } from './routes/index';

export function AppBootstrap() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <PlatformSettingsProvider>
              <SplashScreen />
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </PlatformSettingsProvider>
          </QueryClientProvider>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
