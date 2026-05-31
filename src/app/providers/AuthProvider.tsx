import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { endpoints } from '../../shared/api/endpoints';
import { configureAuthTokenHandlers } from '../../shared/api/httpClient';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type User = {
  id: string;
  email: string;
  role: 'admin' | 'client';
  displayName?: string;
};

type AuthContextValue = {
  status: AuthStatus;
  user: User | null;
  accessToken: string | null;
  signIn: (payload: { email: string; password: string }) => Promise<User>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(() => {
    return localStorage.getItem('access_token');
  });

  const accessTokenSetter = (token: string | null) => {
    setAccessTokenState(token);
    if (token) localStorage.setItem('access_token', token);
    else localStorage.removeItem('access_token');
  };

  useEffect(() => {
    configureAuthTokenHandlers({
      getToken: () => accessToken,
      setToken: accessTokenSetter
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  async function refreshMe() {
    let token = accessToken;
    if (!token) {
      try {
        const refreshRes = await endpoints.auth.refresh();
        token = refreshRes.data?.data?.accessToken || null;
        accessTokenSetter(token);
      } catch {
        setStatus('unauthenticated');
        setUser(null);
        accessTokenSetter(null);
        return;
      }
    }

    try {
      const res = await endpoints.auth.me();
      const u = res.data?.data || null;
      setUser(u);
      setStatus('authenticated');
    } catch {
      setStatus('unauthenticated');
      setUser(null);
      accessTokenSetter(null);
    }
  }

  useEffect(() => {
    refreshMe().catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      accessToken,
      signIn: async ({ email, password }) => {
        const res = await endpoints.auth.login({ email, password });
        const payload = res.data?.data;
        setUser(payload.user);
        accessTokenSetter(payload.accessToken);
        setStatus('authenticated');
        return payload.user as User;
      },
      logout: async () => {
        try {
          await endpoints.auth.logout();
        } finally {
          accessTokenSetter(null);
          setUser(null);
          setStatus('unauthenticated');
        }
      },
      refreshMe
    }),
    [accessToken, status, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

