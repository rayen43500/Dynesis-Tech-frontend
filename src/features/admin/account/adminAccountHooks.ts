import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { endpoints } from '../../../shared/api/endpoints';

export type AdminAccount = {
  id: string;
  email: string;
  role: 'admin' | 'client';
  displayName: string;
  profilePicture: string;
};

export function useAdminAccount() {
  return useQuery({
    queryKey: ['admin', 'account'],
    queryFn: async () => {
      const res = await endpoints.auth.me();
      return (res.data?.data || null) as AdminAccount | null;
    }
  });
}

export function useUpdateAdminAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await endpoints.admin.account.update(formData);
      return (res.data?.data || null) as AdminAccount | null;
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData(['admin', 'account'], data);
      }
    }
  });
}

export function useChangeAdminPassword() {
  return useMutation({
    mutationFn: async (payload: { currentPassword: string; newPassword: string }) => {
      await endpoints.admin.account.changePassword(payload);
    }
  });
}

export { getApiErrorMessage } from '../../client/clientAccountHooks';
