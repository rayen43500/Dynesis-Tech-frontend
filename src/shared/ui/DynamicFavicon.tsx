import { useEffect } from 'react';

import { useBrandingContent } from '../../shared/hooks/useSiteContent';

/**
 * Updates the browser favicon dynamically based on the branding logo
 * configured in the admin panel (PlatformSettings).
 */
export function DynamicFavicon() {
  const { logoUrl } = useBrandingContent();

  useEffect(() => {
    if (!logoUrl) return;

    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");

    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    link.type = 'image/png';
    link.href = logoUrl;
  }, [logoUrl]);

  return null;
}
