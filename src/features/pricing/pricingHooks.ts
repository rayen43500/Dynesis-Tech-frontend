import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { endpoints } from '../../shared/api/endpoints';

export type PricingFeature = {
  label: string;
  included: boolean;
};

export type PricingPlan = {
  _id: string;
  name: string;
  description: string;
  price: string;
  priceNote: string;
  category: 'vitrine' | 'blockchain' | 'custom' | 'other';
  features: PricingFeature[];
  highlighted: boolean;
  badgeLabel: string;
  ctaLabel: string;
  ctaHref: string;
  ctaType: 'link' | 'quote' | 'contact';
  visible: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
};

export function usePublicPricingPlans() {
  return useQuery({
    queryKey: ['public', 'pricing'],
    queryFn: async () => {
      const res = await endpoints.public.pricing.list();
      return (res.data?.data || []) as PricingPlan[];
    }
  });
}

export function useAdminPricingPlans() {
  return useQuery({
    queryKey: ['admin', 'pricing'],
    queryFn: async () => {
      const res = await endpoints.admin.pricing.list({ limit: 100 });
      return (res.data?.data || []) as PricingPlan[];
    }
  });
}

export function useCreatePricingPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => endpoints.admin.pricing.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'pricing'] })
  });
}

export function useUpdatePricingPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      endpoints.admin.pricing.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'pricing'] });
      qc.invalidateQueries({ queryKey: ['public', 'pricing'] });
    }
  });
}

export function useDeletePricingPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => endpoints.admin.pricing.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'pricing'] });
      qc.invalidateQueries({ queryKey: ['public', 'pricing'] });
    }
  });
}
