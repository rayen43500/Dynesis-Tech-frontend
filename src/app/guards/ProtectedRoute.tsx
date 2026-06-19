import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../providers/AuthProvider';
import { useBlockBackNavigation } from '../hooks/useBlockBackNavigation';

export function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { status, refreshMe } = useAuth();
  const location = useLocation();

  useBlockBackNavigation(status === 'authenticated');

  useEffect(() => {
    refreshMe().catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.replace('/login');
    }
  }, [status]);

  if (status === 'loading') return null;
  if (status === 'unauthenticated') return null;

  return children;
}
