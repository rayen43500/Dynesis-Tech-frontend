import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { endpoints } from '../../../shared/api/endpoints';
import type { PlatformSettings } from '../../../shared/types/platformSettings';

export type SettingsResetScope = 'navbar' | 'footer' | 'homePage' | 'sitewide';

const PUBLIC_SETTINGS_KEY = ['public', 'settings'] as const;
const ADMIN_SETTINGS_KEY = ['admin', 'settings'] as const;

function syncSettingsCache(qc: ReturnType<typeof useQueryClient>, data: PlatformSettings) {
  qc.setQueryData(ADMIN_SETTINGS_KEY, data);
  qc.setQueryData(PUBLIC_SETTINGS_KEY, data);
  void qc.invalidateQueries({ queryKey: PUBLIC_SETTINGS_KEY });
}

export function useAdminSettings() {
  return useQuery({
    queryKey: ADMIN_SETTINGS_KEY,
    queryFn: async () => {
      const res = await endpoints.admin.settings.get();
      return res.data?.data as PlatformSettings;
    }
  });
}

export function useUpdateAdminSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<PlatformSettings>) => {
      const res = await endpoints.admin.settings.update(payload);
      return res.data?.data as PlatformSettings;
    },
    onSuccess: (data) => {
      syncSettingsCache(qc, data);
    }
  });
}

export function useResetAdminSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (scope: SettingsResetScope) => {
      const res = await endpoints.admin.settings.reset({ scope });
      return res.data?.data as PlatformSettings;
    },
    onSuccess: (data) => {
      syncSettingsCache(qc, data);
    }
  });
}

export function useSettingsSectionFeedback() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(''), 5000);
    return () => window.clearTimeout(timer);
  }, [message]);

  return {
    message,
    setMessage,
    clearMessage: () => setMessage('')
  };
}
