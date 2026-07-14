import { useQuery } from '@tanstack/react-query';
import { endpoints } from '../../../shared/api/endpoints';

export function useClientInvoices() {
  return useQuery({
    queryKey: ['client', 'invoices'],
    queryFn: async () => {
      const res = await endpoints.client.invoices.list();
      return res.data?.data || [];
    }
  });
}

export function useClientTickets() {
  return useQuery({
    queryKey: ['client', 'tickets'],
    queryFn: async () => {
      const res = await endpoints.client.tickets.list();
      return res.data?.data || [];
    }
  });
}
