import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { endpoints } from '../../../shared/api/endpoints';

export type AppNotification = {
  _id: string;
  type?: string;
  title?: string;
  body?: string;
  link?: string;
  readAt?: string | null;
  createdAt?: string;
};

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await endpoints.notifications.list({ limit: 50 });
      return {
        items: (res.data?.data || []) as AppNotification[],
        unreadCount: res.data?.meta?.unreadCount ?? 0
      };
    }
  });
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => endpoints.notifications.markRead(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] });
    }
  });
}

export function useMarkAllNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => endpoints.notifications.markAllRead(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] });
    }
  });
}
