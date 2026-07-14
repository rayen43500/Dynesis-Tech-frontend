import React from 'react';
import { Route } from 'react-router-dom';

import { ProtectedRoute } from '../guards/ProtectedRoute';
import { RoleGuard } from '../guards/RoleGuard';
import { DeveloperLayout } from '../layouts/DeveloperLayout';
import { Roles } from '../../shared/constants/roles';
import { DeveloperDashboardPage } from '../../features/developer/DeveloperDashboardPage';
import { DeveloperProjectsPage } from '../../features/developer/DeveloperProjectsPage';
import { DeveloperTasksPage } from '../../features/developer/DeveloperTasksPage';
import { DeveloperTimePage } from '../../features/developer/DeveloperTimePage';
import { DeveloperBugsPage } from '../../features/developer/DeveloperBugsPage';
import { DeveloperDeploymentsPage } from '../../features/developer/DeveloperDeploymentsPage';
import { DeveloperLeavesPage } from '../../features/developer/DeveloperLeavesPage';
import { DeveloperAccountPage } from '../../features/developer/account/DeveloperAccountPage';
import { RoutePlaceholder } from '../../shared/ui/placeholders/RoutePlaceholder';

export function DeveloperRoutes() {
  return (
    <Route
      path="/dashboard/developer"
      element={
        <ProtectedRoute>
          <RoleGuard requiredRoles={[Roles.developer]} children={<DeveloperLayout />} />
        </ProtectedRoute>
      }
    >
      <Route index element={<DeveloperDashboardPage />} />
      <Route path="projects" element={<DeveloperProjectsPage />} />
      <Route path="tasks" element={<DeveloperTasksPage />} />
      <Route path="kanban" element={<DeveloperTasksPage />} />
      <Route path="time" element={<DeveloperTimePage />} />
      <Route path="deliverables" element={<RoutePlaceholder nameKey="developer.routes.deliverables" />} />
      <Route path="bugs" element={<DeveloperBugsPage />} />
      <Route path="deployments" element={<DeveloperDeploymentsPage />} />
      <Route path="documents" element={<RoutePlaceholder nameKey="developer.routes.documents" />} />
      <Route path="messages" element={<RoutePlaceholder nameKey="developer.routes.messages" />} />
      <Route path="calendar" element={<RoutePlaceholder nameKey="developer.routes.calendar" />} />
      <Route path="leaves" element={<DeveloperLeavesPage />} />
      <Route path="performance" element={<DeveloperDashboardPage />} />
      <Route path="account" element={<DeveloperAccountPage />} />
      <Route path="profile" element={<RoutePlaceholder nameKey="developer.routes.profile" />} />
    </Route>
  );
}
