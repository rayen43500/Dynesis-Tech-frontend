import axios from 'axios';

type AccessTokenProvider = () => string | null;
type AccessTokenSetter = (token: string | null) => void;

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

let getAccessToken: AccessTokenProvider = () => null;
let setAccessToken: AccessTokenSetter = () => {};

export function configureAuthTokenHandlers(handlers: { getToken: AccessTokenProvider; setToken: AccessTokenSetter }) {
  getAccessToken = handlers.getToken;
  setAccessToken = handlers.setToken;
}

export const http = axios.create({
  baseURL,
  withCredentials: true
});

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken() {
  const response = await http.post('/api/v1/auth/refresh', {});
  const accessToken = response.data?.data?.accessToken || null;
  setAccessToken(accessToken);
  return accessToken;
}

http.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;
    const url: string = originalRequest?.url || '';

    // Never attempt refresh on auth endpoints themselves to avoid loops.
    const isAuthEndpoint =
      url.includes('/api/v1/auth/refresh') ||
      url.includes('/api/v1/auth/login') ||
      url.includes('/api/v1/auth/logout') ||
      url.includes('/api/v1/auth/google');

    if (status === 401 && originalRequest && !originalRequest.__isRetryRequest && !isAuthEndpoint) {
      originalRequest.__isRetryRequest = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = refreshAccessToken().finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
        }

        const newToken = refreshPromise ? await refreshPromise : await refreshAccessToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return http(originalRequest);
        }
      } catch {
        setAccessToken(null);
      }
    }

    return Promise.reject(error);
  }
);

