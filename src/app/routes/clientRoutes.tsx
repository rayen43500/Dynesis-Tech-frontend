import React from 'react';
import { Route } from 'react-router-dom';

import { ProtectedRoute } from '../guards/ProtectedRoute';
import { RoleGuard } from '../guards/RoleGuard';

import { ClientLayout } from '../layouts/ClientLayout';
import { ClientDashboardPage } from '../../features/client/ClientDashboardPage';
import { ClientMessagesPage } from '../../features/client/ClientMessagesPage';
import { ClientAccountPage } from '../../features/client/ClientAccountPage';
import { ClientProjectsPage } from '../../features/client/projects/ClientProjectsPage';
import { ClientRoadmapPage } from '../../features/client/roadmap/ClientRoadmapPage';
import { ClientNotificationsPage } from '../../features/client/notifications/ClientNotificationsPage';
import { ContactPage } from '../../features/contact/ContactPage';
import { RoutePlaceholder } from '../../shared/ui/placeholders/RoutePlaceholder';
import { Roles } from '../../shared/constants/roles';

export function ClientRoutes() {
  return (
    <Route
      path="/dashboard/client"
      element={
        <ProtectedRoute>
          <RoleGuard requiredRoles={[Roles.client]} children={<ClientLayout />} />
        </ProtectedRoute>
      }
    >
      <Route index element={<ClientDashboardPage />} />
      <Route path="request" element={<ClientDashboardPage />} />
      <Route path="account" element={<ClientAccountPage />} />
      <Route path="projects" element={<ClientProjectsPage />} />
      <Route path="invoices" element={<RoutePlaceholder nameKey="client.routes.invoices" />} />
      <Route path="messages" element={<ClientMessagesPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="roadmap" element={<ClientRoadmapPage />} />
      <Route path="notifications" element={<ClientNotificationsPage />} />
    </Route>
  );
}

