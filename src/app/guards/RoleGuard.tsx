import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../providers/AuthProvider';
import type { Role } from '../../shared/constants/roles';

export function RoleGuard({ requiredRoles, children }: { requiredRoles: Role[]; children: React.ReactElement }) {
  const { user, status } = useAuth();

  if (status === 'loading') return null;
  if (!user) return <Navigate to="/login" replace />;

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}

