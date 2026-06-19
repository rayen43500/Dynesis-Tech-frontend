import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { endpoints } from '../../shared/api/endpoints';

export type ClientAccount = {
  id: string;
  email: string;
  role: 'admin' | 'client';
  displayName: string;
  profilePicture: string;
};

export function useClientAccount() {
  return useQuery({
    queryKey: ['client', 'account'],
    queryFn: async () => {
      const res = await endpoints.auth.me();
      return (res.data?.data || null) as ClientAccount | null;
    }
  });
}

export function useUpdateClientAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await endpoints.client.account.update(formData);
      return (res.data?.data || null) as ClientAccount | null;
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData(['client', 'account'], data);
      }
    }
  });
}

export function useChangeClientPassword() {
  return useMutation({
    mutationFn: async (payload: { currentPassword: string; newPassword: string }) => {
      await endpoints.client.account.changePassword(payload);
    }
  });
}

function getApiErrorMessage(error: unknown, fallback: string) {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const data = (error as { response?: { data?: { error?: { message?: string }; message?: string } } }).response?.data;
    const message = data?.error?.message || data?.message;
    if (message) return message;
  }
  return fallback;
}

export { getApiErrorMessage };
