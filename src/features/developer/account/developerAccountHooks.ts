import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '../../../shared/api/endpoints';

export type DeveloperAccount = {
  id: string;
  email: string;
  role: 'developer';
  displayName: string;
  profilePicture: string;
};

export function useDeveloperAccount() {
  return useQuery({
    queryKey: ['developer', 'account'],
    queryFn: async () => {
      const res = await endpoints.auth.me();
      return (res.data?.data || null) as DeveloperAccount | null;
    }
  });
}

export function useUpdateDeveloperAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await endpoints.developer.account.update(formData);
      return (res.data?.data || null) as DeveloperAccount | null;
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData(['developer', 'account'], data);
        queryClient.invalidateQueries({ queryKey: ['developer'] });
      }
    }
  });
}

export function useChangeDeveloperPassword() {
  return useMutation({
    mutationFn: async (payload: { currentPassword: string; newPassword: string }) => {
      await endpoints.developer.account.changePassword(payload);
    }
  });
}

export { getApiErrorMessage } from '../../client/clientAccountHooks';
