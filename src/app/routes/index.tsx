import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PublicRoutes } from './publicRoutes';
import { ClientRoutes } from './clientRoutes';
import { AdminRoutes } from './adminRoutes';
import { RoutePlaceholder } from '../../shared/ui/placeholders/RoutePlaceholder';

export function AppRoutes() {
  return (
    <Routes>
      {PublicRoutes()}
      {ClientRoutes()}
      <Route path="/dashboard/client/*" element={<Navigate to="/client" replace />} />
      {AdminRoutes()}

      <Route path="*" element={<RoutePlaceholder name="NotFound" />} />
    </Routes>
  );
}

