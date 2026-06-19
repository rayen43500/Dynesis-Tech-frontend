import { useQuery } from '@tanstack/react-query';

import { endpoints } from '../../shared/api/endpoints';

export type AdminNotifications = {
  newQuotes: number;
  newMessages: number;
};

export function useAdminNotifications(since?: number) {
  return useQuery({
    queryKey: ['admin', 'notifications', since ?? 'all'],
    queryFn: async () => {
      const res = await endpoints.admin.notifications(since);
      return {
        newQuotes: res.data?.newQuotes ?? 0,
        newMessages: res.data?.newMessages ?? 0
      } as AdminNotifications;
    },
    refetchInterval: 30_000
  });
}
