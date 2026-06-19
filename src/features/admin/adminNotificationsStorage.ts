const LAST_READ_KEY = 'lastReadNotifications';

export function getLastReadNotifications(): number | undefined {
  const raw = localStorage.getItem(LAST_READ_KEY);
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export function markAllNotificationsRead() {
  localStorage.setItem(LAST_READ_KEY, String(Date.now()));
}
