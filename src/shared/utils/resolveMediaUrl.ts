import { getMediaApiBaseUrl } from '../api/apiBase';

function getMediaApiBase() {
  return getMediaApiBaseUrl();
}

const API_BASE = getMediaApiBase();

/** Same-origin `/uploads` (Vite proxy in dev, or reverse proxy in prod). Avoids Helmet CORP blocking :5000 assets on :3000. */
function resolveUploadPath(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (import.meta.env.DEV || import.meta.env.VITE_UPLOADS_SAME_ORIGIN === 'true') {
    return normalized;
  }
  return `${API_BASE}${normalized}`;
}

export function resolveMediaUrl(url?: string | null) {
  if (!url) return '';
  const trimmed = String(url).trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('blob:') || trimmed.startsWith('data:')) return trimmed;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  if (trimmed.startsWith('//')) return `https:${trimmed}`;

  if (trimmed.startsWith('/uploads/')) return resolveUploadPath(trimmed);
  if (trimmed.startsWith('uploads/')) return resolveUploadPath(`/${trimmed}`);
  if (!trimmed.includes('/') && /\.(jpe?g|png|webp|gif)$/i.test(trimmed)) {
    return resolveUploadPath(`/uploads/developers/${trimmed}`);
  }

  return `${API_BASE}${trimmed.startsWith('/') ? trimmed : `/${trimmed}`}`;
}

/** Resolves developer photo from API `profileImage`, legacy `photo`, or nested image objects. */
export function resolveDeveloperPhoto(dev?: {
  profileImage?: string | { secureUrl?: string; url?: string } | null;
  photo?: string | null;
}) {
  if (!dev) return '';

  const raw = dev.profileImage ?? dev.photo;
  if (!raw) return '';

  if (typeof raw === 'object') {
    return resolveMediaUrl(raw.secureUrl || raw.url || '');
  }

  return resolveMediaUrl(raw);
}
