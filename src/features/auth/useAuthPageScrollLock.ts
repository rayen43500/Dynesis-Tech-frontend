import { useEffect } from 'react';

/** Locks document scroll on auth pages only (login / register). */
export function useAuthPageScrollLock() {
  useEffect(() => {
    document.documentElement.classList.add('auth-route');
    document.body.classList.add('auth-route');
    return () => {
      document.documentElement.classList.remove('auth-route');
      document.body.classList.remove('auth-route');
    };
  }, []);
}
