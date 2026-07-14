import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { endpoints } from '../../../shared/api/endpoints';

export type InquiryStatus = 'new' | 'contacted' | 'assigned' | 'consultation' | 'converted' | 'closed';

export type AdminInquiry = {
  _id: string;
  projectType?: string;
  budgetRange?: string;
  timeline?: string;
  projectDetails?: { en?: string; fr?: string };
  clientInfo?: {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
    location?: string;
  };
  status?: InquiryStatus;
  consultationNotes?: string;
  convertedProjectId?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export function useAdminInquiries() {
  return useQuery({
    queryKey: ['admin', 'inquiries'],
    queryFn: async () => {
      const res = await endpoints.admin.inquiries.list({ limit: 100 });
      return (res.data?.data || []) as AdminInquiry[];
    }
  });
}

export function useUpdateInquiryStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: InquiryStatus }) =>
      endpoints.admin.inquiries.setStatus(id, { status }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'inquiries'] });
    }
  });
}

export function useConvertInquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => endpoints.admin.inquiries.convertToProject(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'inquiries'] });
      qc.invalidateQueries({ queryKey: ['admin', 'projects'] });
    }
  });
}
