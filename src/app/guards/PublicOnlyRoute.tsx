import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../providers/AuthProvider';
import { getRoleHomePath } from '../../shared/constants/roles';

export function PublicOnlyRoute({ children }: { children: React.ReactElement }) {
  const { status, user } = useAuth();

  if (status === 'authenticated' && user) {
    return <Navigate to={getRoleHomePath(user.role)} replace />;
  }
  if (status === 'loading' && Boolean(localStorage.getItem('access_token'))) {
    return null;
  }

  return children;
}

