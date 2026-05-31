import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { endpoints } from '../../../shared/api/endpoints';

export type QuoteStatus = 'new' | 'reviewed' | 'proposal_sent' | 'closed';

export type AdminQuote = {
  _id: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  name: string;
  email: string;
  company?: string;
  wantsDiscoveryCall: boolean;
  status: QuoteStatus;
  adminNotes?: string;
  proposalSentAt?: string;
  proposalSubject?: string;
  proposalBody?: string;
  createdAt: string;
  updatedAt?: string;
};

export function useAdminQuotes() {
  return useQuery({
    queryKey: ['admin', 'quotes'],
    queryFn: async () => {
      const res = await endpoints.admin.quotes.list();
      return (res.data?.data || []) as AdminQuote[];
    }
  });
}

export function useAdminQuote(id?: string) {
  return useQuery({
    queryKey: ['admin', 'quotes', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await endpoints.admin.quotes.getById(id as string);
      return res.data?.data as AdminQuote;
    }
  });
}

export function useAdminQuoteNotifications(since?: number) {
  return useQuery({
    queryKey: ['admin', 'quotes', 'notifications', since ?? 'all'],
    queryFn: async () => {
      const res = await endpoints.admin.quotes.notifications(since);
      return (res.data?.newQuotes ?? 0) as number;
    },
    refetchInterval: 30_000
  });
}

export function useUpdateQuote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { status?: QuoteStatus; adminNotes?: string } }) =>
      endpoints.admin.quotes.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'quotes'] });
      qc.invalidateQueries({ queryKey: ['admin', 'quotes', 'notifications'] });
    }
  });
}

export function useDeleteQuote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => endpoints.admin.quotes.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'quotes'] });
      qc.invalidateQueries({ queryKey: ['admin', 'quotes', 'notifications'] });
    }
  });
}

export function useSendProposal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, subject, body }: { id: string; subject: string; body: string }) =>
      endpoints.admin.quotes.sendProposal(id, { subject, body }),
    onSuccess: (_res, vars) => {
      qc.invalidateQueries({ queryKey: ['admin', 'quotes'] });
      qc.invalidateQueries({ queryKey: ['admin', 'quotes', vars.id] });
      qc.invalidateQueries({ queryKey: ['admin', 'quotes', 'notifications'] });
    }
  });
}

const LAST_VISITED_KEY = 'admin-lastVisitedQuotes';

export function getLastVisitedQuotes(): number | undefined {
  const raw = localStorage.getItem(LAST_VISITED_KEY);
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export function markQuotesVisited() {
  localStorage.setItem(LAST_VISITED_KEY, String(Date.now()));
}

export function buildDefaultProposalBody(clientName: string) {
  return `Hi ${clientName},

Thank you for your patience.
After reviewing your project brief,
here is our proposal:

PROJECT OVERVIEW
─────────────────
[Describe the project scope here]

WHAT WE PROPOSE
─────────────────
[Deliverables, approach, stack...]

TIMELINE
─────────────────
[Estimated delivery]

INVESTMENT
─────────────────
[Price or price range]

NEXT STEPS
─────────────────
If this works for you, reply to
this email or book a discovery call.

Looking forward to working
with you.

— The Dynesis Tech Team
hello@dynesistech.com`;
}
