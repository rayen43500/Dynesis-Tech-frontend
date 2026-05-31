import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../providers/AuthProvider';

export function PublicOnlyRoute({ children }: { children: React.ReactElement }) {
  const { status, user } = useAuth();

  if (status === 'loading') return null;
  if (status === 'authenticated' && user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/client'} replace />;
  }

  return children;
}

