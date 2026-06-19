import React from 'react';
import { Route } from 'react-router-dom';

import { ProtectedRoute } from '../guards/ProtectedRoute';
import { RoleGuard } from '../guards/RoleGuard';

import { AdminLayout } from '../layouts/AdminLayout';
import { AdminOverviewPage } from '../../features/admin/AdminOverviewPage';
import { DevelopersAdminListPage } from '../../features/admin/developers/DevelopersAdminListPage';
import { QuotesAdminPage } from '../../features/admin/quotes/QuotesAdminPage';
import { MessagesAdminPage } from '../../features/admin/messages/MessagesAdminPage';
import { SettingsAdminPage } from '../../features/admin/settings/SettingsAdminPage';
import { RoutePlaceholder } from '../../shared/ui/placeholders/RoutePlaceholder';
import { Roles } from '../../shared/constants/roles';

export function AdminRoutes() {
  return (
    <Route
      path="/dashboard/admin"
      element={
        <ProtectedRoute>
          <RoleGuard requiredRoles={[Roles.admin]} children={<AdminLayout />} />
        </ProtectedRoute>
      }
    >
      <Route index element={<AdminOverviewPage />} />
      <Route path="developers" element={<DevelopersAdminListPage />} />
      <Route path="portfolios" element={<RoutePlaceholder nameKey="admin.routes.portfolios" />} />
      <Route path="services" element={<RoutePlaceholder nameKey="admin.routes.services" />} />
      <Route path="homepage" element={<RoutePlaceholder nameKey="admin.routes.homepage" />} />
      <Route path="inquiries" element={<RoutePlaceholder nameKey="admin.routes.inquiries" />} />
      <Route path="quotes" element={<QuotesAdminPage />} />
      <Route path="messages" element={<MessagesAdminPage />} />
      <Route path="projects" element={<RoutePlaceholder nameKey="admin.routes.projects" />} />
      <Route path="pricing" element={<RoutePlaceholder nameKey="admin.routes.pricing" />} />
      <Route path="translations" element={<RoutePlaceholder nameKey="admin.routes.translations" />} />
      <Route path="media" element={<RoutePlaceholder nameKey="admin.routes.media" />} />
      <Route path="operations" element={<RoutePlaceholder nameKey="admin.routes.operations" />} />
      <Route path="settings" element={<SettingsAdminPage />} />
    </Route>
  );
}
