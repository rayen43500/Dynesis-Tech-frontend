import React from 'react';
import { Route } from 'react-router-dom';

import { PublicLayout } from '../layouts/PublicLayout';
import { RoutePlaceholder } from '../../shared/ui/placeholders/RoutePlaceholder';
import { AndelaHomePage } from '../../features/home/AndelaHomePage';
import { DevelopersDirectoryPage } from '../../features/developers/DevelopersDirectoryPage';
import { DeveloperProfilePage } from '../../features/developers/DeveloperProfilePage';
import { WorkWithUsPage } from '../../features/work-with-us/WorkWithUsPage';
import { LoginPage } from '../../features/auth/LoginPage';
import { RegisterPage } from '../../features/auth/RegisterPage';
import { ActivationPage } from '../../features/auth/ActivationPage';
import { ContactPage } from '../../features/contact/ContactPage';
import { ServicesPage } from '../../features/services/ServicesPage';
import { AuthenticatedRedirect } from '../guards/AuthenticatedRedirect';
import { PublicOnlyRoute } from '../guards/PublicOnlyRoute';

export function PublicRoutes() {
  return (
    <Route path="/" element={<PublicLayout />}>
      <Route
        index
        element={
          <AuthenticatedRedirect>
            <AndelaHomePage />
          </AuthenticatedRedirect>
        }
      />
      <Route path="developers" element={<DevelopersDirectoryPage />} />
      <Route path="developers/:id" element={<DeveloperProfilePage />} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="work-with-us" element={<WorkWithUsPage />} />
      <Route path="contact" element={<ContactPage />} />

      <Route
        path="login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />
      <Route path="activate/:token" element={<ActivationPage />} />
      <Route path="403" element={<RoutePlaceholder nameKey="placeholder.notAuthorized" />} />
    </Route>
  );
}

