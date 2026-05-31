import React from 'react';
import { Route } from 'react-router-dom';

import { ProtectedRoute } from '../guards/ProtectedRoute';
import { RoleGuard } from '../guards/RoleGuard';

import { AdminLayout } from '../layouts/AdminLayout';
import { AdminOverviewPage } from '../../features/admin/AdminOverviewPage';
import { DevelopersAdminListPage } from '../../features/admin/developers/DevelopersAdminListPage';
import { QuotesAdminPage } from '../../features/admin/quotes/QuotesAdminPage';
import { RoutePlaceholder } from '../../shared/ui/placeholders/RoutePlaceholder';
import { Roles } from '../../shared/constants/roles';

export function AdminRoutes() {
  return (
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <RoleGuard requiredRoles={[Roles.admin]} children={<AdminLayout />} />
        </ProtectedRoute>
      }
    >
      <Route index element={<AdminOverviewPage />} />
      <Route path="developers" element={<DevelopersAdminListPage />} />
      <Route path="portfolios" element={<RoutePlaceholder name="PortfolioManagement" />} />
      <Route path="services" element={<RoutePlaceholder name="ServicesManagement" />} />
      <Route path="homepage" element={<RoutePlaceholder name="HomepageManagement" />} />
      <Route path="inquiries" element={<RoutePlaceholder name="InquiriesManagement" />} />
      <Route path="quotes" element={<QuotesAdminPage />} />
      <Route path="projects" element={<RoutePlaceholder name="ProjectManagement" />} />
      <Route path="pricing" element={<RoutePlaceholder name="PricingManagement" />} />
      <Route path="translations" element={<RoutePlaceholder name="TranslationManagement" />} />
      <Route path="media" element={<RoutePlaceholder name="MediaUploads" />} />
      <Route path="operations" element={<RoutePlaceholder name="OperationalManagement" />} />
      <Route path="settings" element={<RoutePlaceholder name="Settings" />} />
    </Route>
  );
}
