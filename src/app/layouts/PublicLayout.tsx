import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { AndelaNavbar } from '../../features/home/AndelaNavbar';
import { PublicFooter } from '../../shared/ui/layout/PublicFooter';
import { PageContainer } from '../../shared/ui/layout/PageContainer';

export function PublicLayout() {
  const { pathname } = useLocation();
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isContactPage = pathname === '/contact';
  const isDevelopersPage = pathname.startsWith('/developers');
  const isWorkWithUsPage = pathname === '/work-with-us';
  const isServicesPage = pathname === '/services';
  const isFullBleed =
    pathname === '/' || isAuthPage || isContactPage || isDevelopersPage || isWorkWithUsPage || isServicesPage;
  const showFooter = !isAuthPage;

  return (
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
    </div>
  );
}
