import React from 'react';
import { Route } from 'react-router-dom';

import { ProtectedRoute } from '../guards/ProtectedRoute';
import { RoleGuard } from '../guards/RoleGuard';

import { AdminLayout } from '../layouts/AdminLayout';
import { AdminOverviewPage } from '../../features/admin/AdminOverviewPage';
import { DevelopersAdminListPage } from '../../features/admin/developers/DevelopersAdminListPage';
import { ServicesAdminPage } from '../../features/admin/services/ServicesAdminPage';
import { QuotesAdminPage } from '../../features/admin/quotes/QuotesAdminPage';
import { MessagesAdminPage } from '../../features/admin/messages/MessagesAdminPage';
import { SettingsAdminPage } from '../../features/admin/settings/SettingsAdminPage';
import { AdminAccountPage } from '../../features/admin/account/AdminAccountPage';
import { ProjectsAdminPage } from '../../features/admin/projects/ProjectsAdminPage';
import { InquiriesAdminPage } from '../../features/admin/inquiries/InquiriesAdminPage';
import { PortfoliosAdminPage } from '../../features/admin/portfolios/PortfoliosAdminPage';
import { UsersAdminPage } from '../../features/admin/users/UsersAdminPage';
import { PricingAdminPage } from '../../features/admin/pricing/PricingAdminPage';
import { NewsletterAdminPage } from '../../features/admin/newsletter/NewsletterAdminPage';
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
      <Route path="portfolios" element={<PortfoliosAdminPage />} />
      <Route path="services" element={<ServicesAdminPage />} />
      <Route path="homepage" element={<RoutePlaceholder nameKey="admin.routes.homepage" />} />
      <Route path="inquiries" element={<InquiriesAdminPage />} />
      <Route path="quotes" element={<QuotesAdminPage />} />
      <Route path="messages" element={<MessagesAdminPage />} />
      <Route path="projects" element={<ProjectsAdminPage />} />
      <Route path="pricing" element={<PricingAdminPage />} />
      <Route path="newsletter" element={<NewsletterAdminPage />} />
      <Route path="translations" element={<RoutePlaceholder nameKey="admin.routes.translations" />} />
      <Route path="media" element={<RoutePlaceholder nameKey="admin.routes.media" />} />
      <Route path="operations" element={<UsersAdminPage />} />
      <Route path="settings" element={<SettingsAdminPage />} />
      <Route path="account" element={<AdminAccountPage />} />
    </Route>
  );
}

