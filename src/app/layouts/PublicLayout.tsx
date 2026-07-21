import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { PlatformSettingsProvider } from '../providers/PlatformSettingsProvider';
import { AndelaNavbar } from '../../features/home/AndelaNavbar';
import { PublicFooter } from '../../shared/ui/layout/PublicFooter';
import { PageContainer } from '../../shared/ui/layout/PageContainer';
import { ChatbotWidget } from '../../features/chatbot/ChatbotWidget';

export function PublicLayout() {
  const { pathname } = useLocation();
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isContactPage = pathname === '/contact';
  const isDevelopersPage = pathname.startsWith('/developers');
  const isWorkWithUsPage = pathname === '/work-with-us';
  const isServicesPage = pathname === '/services';
  const isPricingPage = pathname === '/pricing';
  const isFullBleed =
    pathname === '/' || isAuthPage || isContactPage || isDevelopersPage || isWorkWithUsPage || isServicesPage || isPricingPage;
  const showFooter = !isAuthPage;

  return (
    <PlatformSettingsProvider>
      <div className="flex min-h-screen flex-col bg-bg">
        {!isAuthPage && !isContactPage && <AndelaNavbar />}
        <div className="flex flex-1 flex-col">
          {isFullBleed ? (
            <Outlet />
          ) : (
            <PageContainer className="flex-1 py-10 sm:py-12">
              <Outlet />
            </PageContainer>
          )}
        </div>
        {showFooter ? <PublicFooter /> : null}
        <ChatbotWidget />
      </div>
    </PlatformSettingsProvider>
  );
}
