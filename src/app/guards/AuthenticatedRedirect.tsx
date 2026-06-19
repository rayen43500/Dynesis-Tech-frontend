import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../providers/AuthProvider';
import { getRoleHomePath } from '../../shared/constants/roles';

/** Redirects authenticated users away from public-only entry pages (home, login, register). */
export function AuthenticatedRedirect({ children }: { children: React.ReactElement }) {
  const { status, user } = useAuth();

  if (status === 'loading') return null;
  if (status === 'authenticated' && user) {
    return <Navigate to={getRoleHomePath(user.role)} replace />;
  }

  return children;
}
