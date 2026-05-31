import React from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../app/providers/AuthProvider';
import { endpoints } from '../../shared/api/endpoints';
import './auth-pages.css';

const CLIENT_DASHBOARD_PATH = '/dashboard/client';

export function ActivationPage() {
  const { token } = useParams();
  const { refreshMe } = useAuth();

  React.useEffect(() => {
    let mounted = true;

    async function verify() {
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        const res = await endpoints.auth.activate(token);
        const accessToken = res.data?.data?.accessToken;
        if (accessToken) {
          localStorage.setItem('access_token', accessToken);
          await refreshMe();
        }
        if (mounted) {
          window.location.href = CLIENT_DASHBOARD_PATH;
        }
      } catch {
        if (mounted) {
          window.location.href = '/login';
        }
      }
    }

    void verify();

    return () => {
      mounted = false;
    };
  }, [token, refreshMe]);

  return null;
}
