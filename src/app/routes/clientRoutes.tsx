import React from 'react';
import { Route } from 'react-router-dom';

import { ProtectedRoute } from '../guards/ProtectedRoute';
import { RoleGuard } from '../guards/RoleGuard';

import { ClientLayout } from '../layouts/ClientLayout';
import { ClientDashboardPage } from '../../features/client/ClientDashboardPage';
import { RoutePlaceholder } from '../../shared/ui/placeholders/RoutePlaceholder';
import { Roles } from '../../shared/constants/roles';

export function ClientRoutes() {
  return (
    <Route
      path="/client"
      element={
        <ProtectedRoute>
          <RoleGuard requiredRoles={[Roles.client]} children={<ClientLayout />} />
        </ProtectedRoute>
      }
    >
      <Route index element={<ClientDashboardPage />} />
      <Route path="request" element={<ClientDashboardPage />} />
      <Route path="settings" element={<RoutePlaceholder name="Settings" />} />
      <Route path="projects" element={<RoutePlaceholder name="ProjectTracking" />} />
      <Route path="invoices" element={<RoutePlaceholder name="Invoices" />} />
      <Route path="messages" element={<RoutePlaceholder name="Messaging" />} />
      <Route path="roadmap" element={<RoutePlaceholder name="ProjectRoadmap" />} />
      <Route path="notifications" element={<RoutePlaceholder name="Notifications" />} />
    </Route>
  );
}

