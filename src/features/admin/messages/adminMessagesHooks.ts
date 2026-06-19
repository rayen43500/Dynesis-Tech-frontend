import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { endpoints } from '../../../shared/api/endpoints';

export type MessageStatus = 'new' | 'read' | 'replied';

export type AdminMessage = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  userId: string | null;
  userName: string;
  userEmail: string;
  isGuest: boolean;
  status: MessageStatus;
  adminReply: string;
  adminRepliedAt: string | null;
  createdAt: string;
  updatedAt?: string;
};

export function useAdminMessages() {
  return useQuery({
    queryKey: ['admin', 'messages'],
    queryFn: async () => {
      const res = await endpoints.admin.messages.list();
      return (res.data?.data || []) as AdminMessage[];
    }
  });
}

export function useAdminMessage(id?: string) {
  return useQuery({
    queryKey: ['admin', 'messages', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await endpoints.admin.messages.getById(id as string);
      return res.data?.data as AdminMessage;
    }
  });
}

export function useUpdateMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { status?: MessageStatus } }) =>
      endpoints.admin.messages.update(id, payload),
    onSuccess: (_res, vars) => {
      qc.invalidateQueries({ queryKey: ['admin', 'messages'] });
      qc.invalidateQueries({ queryKey: ['admin', 'messages', vars.id] });
      qc.invalidateQueries({ queryKey: ['admin', 'notifications'] });
    }
  });
}

export function useDeleteMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => endpoints.admin.messages.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'messages'] });
      qc.invalidateQueries({ queryKey: ['admin', 'notifications'] });
    }
  });
}

export function useReplyMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reply }: { id: string; reply: string }) => endpoints.admin.messages.reply(id, { reply }),
    onSuccess: (_res, vars) => {
      qc.invalidateQueries({ queryKey: ['admin', 'messages'] });
      qc.invalidateQueries({ queryKey: ['admin', 'messages', vars.id] });
      qc.invalidateQueries({ queryKey: ['admin', 'notifications'] });
    }
  });
}

export function messagePreviewSubject(message: AdminMessage) {
  const subject = (message.subject ?? '').trim();
  if (subject) return subject;
  const text = (message.message ?? '').trim();
  if (!text) return '—';
  return text.length > 40 ? `${text.slice(0, 40)}…` : text;
}
