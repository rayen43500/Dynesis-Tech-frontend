import { useQuery } from '@tanstack/react-query';

import { endpoints } from '../../shared/api/endpoints';

export type ClientMessage = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  adminReply: string;
  adminRepliedAt: string | null;
  createdAt: string;
};

export function useClientMessages(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['client', 'messages'],
    queryFn: async () => {
      const res = await endpoints.client.messages.list();
      return (res.data?.data || []) as ClientMessage[];
    },
    enabled: options?.enabled ?? true
  });
}

export function clientMessageTitle(message: ClientMessage) {
  const subject = (message.subject ?? '').trim();
  if (subject) return subject;
  const text = (message.message ?? '').trim();
  if (!text) return '—';
  return text.length > 40 ? `${text.slice(0, 40)}…` : text;
}
