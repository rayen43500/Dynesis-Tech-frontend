import { useQuery } from '@tanstack/react-query';

import { endpoints } from '../../../shared/api/endpoints';

export type LocalizedString = {
  en?: string;
  fr?: string;
};

export type AdminPortfolio = {
  _id: string;
  developerId?: string;
  projectTitle?: LocalizedString;
  projectOverview?: LocalizedString;
  technologies?: string[];
  categories?: string[];
  featured?: boolean;
  ordering?: number;
  createdAt?: string;
  updatedAt?: string;
};

export function useAdminPortfolios() {
  return useQuery({
    queryKey: ['admin', 'portfolios'],
    queryFn: async () => {
      const res = await endpoints.admin.portfolios.list({ limit: 100 });
      return (res.data?.data || []) as AdminPortfolio[];
    }
  });
}
