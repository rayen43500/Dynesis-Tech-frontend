const PRODUCTION_API_BASE = 'https://dynesis-tech-backend.onrender.com';

/**
 * Local dev: always use same-origin requests (Vite proxies /api → localhost:5000).
 * Never call Render from localhost:3000 — that triggers CORS errors.
 */
export function getApiBaseUrl(): string {
  if (import.meta.env.DEV) {
    return '';
  }

  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  return (configured || PRODUCTION_API_BASE).replace(/\/$/, '');
}

export function getMediaApiBaseUrl(): string {
  return getApiBaseUrl().replace(/\/api\/v\d+$/, '');
}
