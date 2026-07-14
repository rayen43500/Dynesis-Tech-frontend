import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '../../../shared/api/endpoints';

export type UserRole = 'admin' | 'client' | 'developer' | 'project_manager';

export type AdminUserListItem = {
  _id: string;
  email: string;
  role: UserRole;
  displayName: string;
  profilePicture?: string;
  permissions: string[];
  isActivated: boolean;
  createdAt: string;
};

export function useAdminUsers(params?: { role?: string; search?: string }) {
  return useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: async () => {
      const res = await endpoints.admin.users.list(params);
      return (res.data?.data || []) as AdminUserListItem[];
    }
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload
    }: {
      id: string;
      payload: { displayName?: string; role?: string; permissions?: string[]; isActivated?: boolean };
    }) => endpoints.admin.users.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
    }
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => endpoints.admin.users.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
    }
  });
}

export function useInviteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { email: string; role: string }) => endpoints.admin.users.invite(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
    }
  });
}
