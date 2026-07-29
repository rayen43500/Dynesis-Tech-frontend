import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '../../../shared/api/endpoints';

export type NewsletterSubscriberItem = {
  _id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  subscribedAt: string;
  unsubscribedAt?: string;
  source: string;
};

export type NewsletterCampaignItem = {
  _id: string;
  subject: string;
  content: string;
  sentBy?: { displayName?: string; email?: string };
  recipientCount: number;
  status: 'draft' | 'sending' | 'sent' | 'failed';
  sentAt?: string;
  createdAt: string;
};

export type NewsletterStats = {
  totalSubscribers: number;
  activeSubscribers: number;
  unsubscribedCount: number;
  totalCampaignsSent: number;
};

export function useAdminNewsletterStats() {
  return useQuery({
    queryKey: ['admin', 'newsletter', 'stats'],
    queryFn: async () => {
      const res = await endpoints.admin.newsletter.stats();
      return res.data?.data as NewsletterStats;
    }
  });
}

export function useAdminNewsletterSubscribers(params?: { page?: number; limit?: number; status?: string; search?: string }) {
  return useQuery({
    queryKey: ['admin', 'newsletter', 'subscribers', params?.page, params?.limit, params?.status, params?.search],
    queryFn: async () => {
      const res = await endpoints.admin.newsletter.subscribers(params);
      return res.data?.data as {
        subscribers: NewsletterSubscriberItem[];
        pagination: { total: number; page: number; limit: number; pages: number };
      };
    }
  });
}

export function useAdminNewsletterCampaigns() {
  return useQuery({
    queryKey: ['admin', 'newsletter', 'campaigns'],
    queryFn: async () => {
      const res = await endpoints.admin.newsletter.campaigns();
      return res.data?.data as NewsletterCampaignItem[];
    }
  });
}

export function useAddNewsletterSubscriber() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { email: string; source?: string }) => {
      const res = await endpoints.admin.newsletter.addSubscriber(payload);
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'newsletter'] });
    }
  });
}

export function useDeleteNewsletterSubscriber() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await endpoints.admin.newsletter.deleteSubscriber(id);
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'newsletter'] });
    }
  });
}

export function useSendNewsletterCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { subject: string; content: string }) => {
      const res = await endpoints.admin.newsletter.sendCampaign(payload);
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'newsletter'] });
    }
  });
}
