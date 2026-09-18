import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '../../../shared/api/endpoints';

export function useAdminInvoices() {
  return useQuery({
    queryKey: ['admin', 'invoices'],
    queryFn: async () => {
      const res = await endpoints.admin.invoices.list({ limit: 100 });
      return res.data?.data || [];
    }
  });
}

export function useAdminTickets() {
  return useQuery({
    queryKey: ['admin', 'tickets'],
    queryFn: async () => {
      const res = await endpoints.admin.tickets.list({ limit: 100 });
      return res.data?.data || [];
    }
  });
}

export function useAdminFaq() {
  return useQuery({
    queryKey: ['admin', 'faq'],
    queryFn: async () => {
      const res = await endpoints.admin.faq.list({ limit: 100 });
      return res.data?.data || [];
    }
  });
}

export function useAdminBlog() {
  return useQuery({
    queryKey: ['admin', 'blog'],
    queryFn: async () => {
      const res = await endpoints.admin.blog.list({ limit: 100 });
      return res.data?.data || [];
    }
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const res = await endpoints.admin.blog.create(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] });
      queryClient.invalidateQueries({ queryKey: ['public', 'blog'] });
    }
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Record<string, unknown> }) => {
      const res = await endpoints.admin.blog.update(id, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] });
      queryClient.invalidateQueries({ queryKey: ['public', 'blog'] });
    }
  });
}

export function useSetMainBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isMain }: { id: string; isMain?: boolean }) => {
      const res = await endpoints.admin.blog.setMain(id, { isMain });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] });
      queryClient.invalidateQueries({ queryKey: ['public', 'blog'] });
    }
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await endpoints.admin.blog.remove(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] });
      queryClient.invalidateQueries({ queryKey: ['public', 'blog'] });
    }
  });
}

export function useAdminClients() {
  return useQuery({
    queryKey: ['admin', 'clients'],
    queryFn: async () => {
      const res = await endpoints.admin.clients.list({ limit: 100 });
      return res.data?.data || [];
    }
  });
}

export function useAdminHomepage() {
  return useQuery({
    queryKey: ['admin', 'homepage'],
    queryFn: async () => {
      const res = await endpoints.admin.homepage.get();
      return res.data?.data;
    }
  });
}

export function useAdminTranslations() {
  return useQuery({
    queryKey: ['admin', 'translations'],
    queryFn: async () => {
      const res = await endpoints.admin.translations.list({ limit: 100 });
      return res.data?.data || [];
    }
  });
}
