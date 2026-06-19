import { useEffect } from 'react';

/** Prevents browser back from leaving authenticated dashboard shells. */
export function useBlockBackNavigation(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const block = () => {
      window.history.pushState(null, '', window.location.href);
    };

    block();
    window.addEventListener('popstate', block);
    return () => window.removeEventListener('popstate', block);
  }, [enabled]);
}
