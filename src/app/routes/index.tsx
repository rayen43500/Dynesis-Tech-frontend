import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PublicRoutes } from './publicRoutes';
import { ClientRoutes } from './clientRoutes';
import { AdminRoutes } from './adminRoutes';
import { RoutePlaceholder } from '../../shared/ui/placeholders/RoutePlaceholder';
import { LegacyDashboardRedirect } from '../guards/LegacyDashboardRedirect';

export function AppRoutes() {
  return (
    <Routes>
      {PublicRoutes()}
      {ClientRoutes()}
      <Route path="/admin/*" element={<LegacyDashboardRedirect role="admin" />} />
      <Route path="/client/*" element={<LegacyDashboardRedirect role="client" />} />
      {AdminRoutes()}

      <Route path="*" element={<RoutePlaceholder nameKey="placeholder.notFound" />} />
    </Routes>
  );
}
