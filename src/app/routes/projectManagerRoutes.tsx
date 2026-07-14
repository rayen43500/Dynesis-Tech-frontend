import React from 'react';
import { Route } from 'react-router-dom';

import { ProtectedRoute } from '../guards/ProtectedRoute';
import { RoleGuard } from '../guards/RoleGuard';
import { ProjectManagerLayout } from '../layouts/ProjectManagerLayout';
import { ProjectManagerDashboardPage } from '../../features/project-manager/ProjectManagerDashboardPage';
import { ProjectManagerProjectsPage } from '../../features/project-manager/ProjectManagerProjectsPage';
import { RoutePlaceholder } from '../../shared/ui/placeholders/RoutePlaceholder';
import { Roles } from '../../shared/constants/roles';

export function ProjectManagerRoutes() {
  return (
    <Route
      path="/dashboard/project-manager"
      element={
        <ProtectedRoute>
          <RoleGuard requiredRoles={[Roles.projectManager]} children={<ProjectManagerLayout />} />
        </ProtectedRoute>
      }
    >
      <Route index element={<ProjectManagerDashboardPage />} />
      <Route path="projects" element={<ProjectManagerProjectsPage />} />
      <Route path="tasks" element={<RoutePlaceholder nameKey="pm.routes.tasks" />} />
      <Route path="sprints" element={<RoutePlaceholder nameKey="pm.routes.sprints" />} />
      <Route path="roadmap" element={<RoutePlaceholder nameKey="pm.routes.roadmap" />} />
      <Route path="reports" element={<RoutePlaceholder nameKey="pm.routes.reports" />} />
      <Route path="messages" element={<RoutePlaceholder nameKey="pm.routes.messages" />} />
    </Route>
  );
}
