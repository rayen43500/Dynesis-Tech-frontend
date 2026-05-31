import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../providers/AuthProvider';

export function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { status } = useAuth();

  React.useEffect(() => {
    if (status !== 'authenticated') return;

    const blockBackNavigation = () => {
      window.history.pushState(null, '', window.location.href);
    };

    blockBackNavigation();
    window.addEventListener('popstate', blockBackNavigation);
    return () => window.removeEventListener('popstate', blockBackNavigation);
  }, [status]);

  if (status === 'loading') return null;
  if (status === 'unauthenticated') return <Navigate to="/login" replace />;

  return children;
}

