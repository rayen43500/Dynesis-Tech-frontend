import { Navigate, useLocation } from 'react-router-dom';

type Props = {
  role: 'admin' | 'client';
};

export function LegacyDashboardRedirect({ role }: Props) {
  const location = useLocation();
  const prefix = role === 'admin' ? '/admin' : '/client';
  const targetPrefix = role === 'admin' ? '/dashboard/admin' : '/dashboard/client';
  const rest = location.pathname.replace(new RegExp(`^${prefix}`), '') || '';
  return <Navigate to={`${targetPrefix}${rest}${location.search}${location.hash}`} replace />;
}
