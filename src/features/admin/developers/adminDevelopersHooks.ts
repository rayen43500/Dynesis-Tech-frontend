import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { endpoints } from '../../../shared/api/endpoints';
import type { DeveloperDirectoryItem, DeveloperProfileResponse } from '../../developers/hooks';

export type AdminDeveloperListItem = {
  id: string;
  fullName: string;
  roleTitle: string;
  photo: string;
  availability: boolean;
  visible: boolean;
  verifiedBadge: boolean;
  expertiseTags: string[];
  portfolioCount: number;
};

export type AdminDeveloperDetail = {
  id: string;
  fullName: string;
  roleTitle: string;
  location: string;
  biography?: { en?: string; fr?: string };
  photo: string;
  availability: boolean;
  memberSince?: string;
  verifiedBadge: boolean;
  expertiseTags: string[];
  previousCompanies: { name: string; logo: string }[];
  experience: {
    company: string;
    role: string;
    startYear?: number;
    endYear?: number | string;
    bullets: string[];
    technologies: string[];
  }[];
  education: { school: string; degree: string; year?: number }[];
  skills: { name: string; years: number }[];
  portfolio: {
    _id: string;
    title: string;
    description?: string;
    overview?: string;
    brief?: string;
    challenges?: string;
    solutions?: string;
    outcomes?: string;
    technologies: string[];
    images: string[];
    category?: string;
  }[];
  visible: boolean;
};

export function useAdminDevelopers() {
  return useQuery({
    queryKey: ['admin', 'developers'],
    queryFn: async () => {
      const res = await endpoints.admin.developers.list();
      return (res.data?.data || []) as AdminDeveloperListItem[];
    }
  });
}

export function useAdminDeveloper(id?: string) {
  return useQuery({
    queryKey: ['admin', 'developers', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await endpoints.admin.developers.getById(id as string);
      return res.data?.data as AdminDeveloperDetail;
    }
  });
}

export function useCreateDeveloper() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => endpoints.admin.developers.create(formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'developers'] })
  });
}

export function useUpdateDeveloper() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      endpoints.admin.developers.update(id, formData),
    onSuccess: (_res, vars) => {
      qc.invalidateQueries({ queryKey: ['admin', 'developers'] });
      qc.invalidateQueries({ queryKey: ['admin', 'developers', vars.id] });
      qc.invalidateQueries({ queryKey: ['public', 'developers'] });
    }
  });
}

export function useDeleteDeveloper() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => endpoints.admin.developers.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'developers'] })
  });
}

export type { DeveloperDirectoryItem, DeveloperProfileResponse };
