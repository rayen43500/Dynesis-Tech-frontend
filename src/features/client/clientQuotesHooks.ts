import { useQuery } from '@tanstack/react-query';

import { endpoints } from '../../shared/api/endpoints';

export type ClientQuoteStatus = 'new' | 'reviewed' | 'proposal_sent' | 'closed';

export type ClientQuote = {
  _id: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  name: string;
  email: string;
  company?: string;
  wantsDiscoveryCall: boolean;
  status: ClientQuoteStatus;
  createdAt: string;
};

export function useClientQuotes() {
  return useQuery({
    queryKey: ['client', 'quotes'],
    queryFn: async () => {
      const res = await endpoints.client.quotes.list();
      return (res.data?.data || []) as ClientQuote[];
    }
  });
}
