import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { endpoints } from '../../../shared/api/endpoints';

export type LocalizedString = {
  en?: string;
  fr?: string;
};

export type ServiceCTA = {
  label?: LocalizedString;
  href?: string;
  actionType?: 'link' | 'modal' | 'scroll';
};

export type AdminService = {
  _id: string;
  title?: LocalizedString;
  shortDescription?: LocalizedString;
  supportingTags?: string[];
  highlight?: boolean;
  visible?: boolean;
  ordering?: number;
  cta?: ServiceCTA | null;
  createdAt?: string;
  updatedAt?: string;
};

export type AdminServicePayload = {
  title: LocalizedString;
  shortDescription: LocalizedString;
  supportingTags: string[];
  highlight: boolean;
  visible: boolean;
  ordering: number;
  cta: ServiceCTA | null;
};

export function useAdminServices() {
  return useQuery({
    queryKey: ['admin', 'services'],
    queryFn: async () => {
      const res = await endpoints.admin.services.list({ limit: 100 });
      return (res.data?.data || []) as AdminService[];
    }
  });
}

export function useAdminService(id?: string | null) {
  return useQuery({
    queryKey: ['admin', 'services', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await endpoints.admin.services.getById(id as string);
      return res.data?.data as AdminService;
    }
  });
}

export function useCreateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: AdminServicePayload) => endpoints.admin.services.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'services'] });
    }
  });
}

export function useUpdateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: AdminServicePayload }) => endpoints.admin.services.update(id, payload),
    onSuccess: (_res, vars) => {
      qc.invalidateQueries({ queryKey: ['admin', 'services'] });
      qc.invalidateQueries({ queryKey: ['admin', 'services', vars.id] });
    }
  });
}

export function useDeleteService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => endpoints.admin.services.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'services'] });
    }
  });
}
