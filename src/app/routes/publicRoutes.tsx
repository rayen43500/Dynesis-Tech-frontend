import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';

import { PublicLayout } from '../layouts/PublicLayout';
import { RoutePlaceholder } from '../../shared/ui/placeholders/RoutePlaceholder';
import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { AuthenticatedRedirect } from '../guards/AuthenticatedRedirect';
import { PublicOnlyRoute } from '../guards/PublicOnlyRoute';

const AndelaHomePage = lazy(() =>
  import('../../features/home/AndelaHomePage').then((m) => ({ default: m.AndelaHomePage }))
);
const DevelopersDirectoryPage = lazy(() =>
  import('../../features/developers/DevelopersDirectoryPage').then((m) => ({ default: m.DevelopersDirectoryPage }))
);
const DeveloperProfilePage = lazy(() =>
  import('../../features/developers/DeveloperProfilePage').then((m) => ({ default: m.DeveloperProfilePage }))
);
const ServicesPage = lazy(() =>
  import('../../features/services/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const WorkWithUsPage = lazy(() =>
  import('../../features/work-with-us/WorkWithUsPage').then((m) => ({ default: m.WorkWithUsPage }))
);
const ContactPage = lazy(() =>
  import('../../features/contact/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const PrivacyPolicyPage = lazy(() =>
  import('../../features/contact/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const PricingPage = lazy(() =>
  import('../../features/pricing/PricingPage').then((m) => ({ default: m.PricingPage }))
);
const LoginPage = lazy(() =>
  import('../../features/auth/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() =>
  import('../../features/auth/RegisterPage').then((m) => ({ default: m.RegisterPage }))
);
const ActivationPage = lazy(() =>
  import('../../features/auth/ActivationPage').then((m) => ({ default: m.ActivationPage }))
);

export function PublicRoutes() {
  return (
    <Route path="/" element={<PublicLayout />}>
      <Route
        index
        element={
          <Suspense fallback={<LoadingState />}>
            <AuthenticatedRedirect>
              <AndelaHomePage />
            </AuthenticatedRedirect>
          </Suspense>
        }
      />
      <Route
        path="developers"
        element={
          <Suspense fallback={<LoadingState />}>
            <DevelopersDirectoryPage />
          </Suspense>
        }
      />
      <Route
        path="developers/:id"
        element={
          <Suspense fallback={<LoadingState />}>
            <DeveloperProfilePage />
          </Suspense>
        }
      />
      <Route
        path="services"
        element={
          <Suspense fallback={<LoadingState />}>
            <ServicesPage />
          </Suspense>
        }
      />
      <Route
        path="work-with-us"
        element={
          <Suspense fallback={<LoadingState />}>
            <WorkWithUsPage />
          </Suspense>
        }
      />
      <Route
        path="contact"
        element={
          <Suspense fallback={<LoadingState />}>
            <ContactPage />
          </Suspense>
        }
      />
      <Route
        path="privacy-policy"
        element={
          <Suspense fallback={<LoadingState />}>
            <PrivacyPolicyPage />
          </Suspense>
        }
      />
      <Route
        path="pricing"
        element={
          <Suspense fallback={<LoadingState />}>
            <PricingPage />
          </Suspense>
        }
      />

      <Route
        path="login"
        element={
          <Suspense fallback={<LoadingState />}>
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          </Suspense>
        }
      />
      <Route
        path="register"
        element={
          <Suspense fallback={<LoadingState />}>
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          </Suspense>
        }
      />
      <Route
        path="activate/:token"
        element={
          <Suspense fallback={<LoadingState />}>
            <ActivationPage />
          </Suspense>
        }
      />
      <Route path="403" element={<RoutePlaceholder nameKey="placeholder.notAuthorized" />} />
    </Route>
  );
}

