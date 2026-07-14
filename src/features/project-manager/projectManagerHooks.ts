import { useQuery } from '@tanstack/react-query';

import { endpoints } from '../../shared/api/endpoints';

export type PmProject = {
  _id: string;
  title?: string;
  status?: string;
  clientId?: string;
  paymentStatus?: string;
  updatedAt?: string;
};

export type PmDashboard = {
  stats: {
    totalProjects: number;
    activeProjects: number;
    assignedTasks: number;
    overdueTasks: number;
  };
  projects: PmProject[];
  tasks: Record<string, unknown>[];
  overdueTasks: Record<string, unknown>[];
};

export function usePmDashboard() {
  return useQuery({
    queryKey: ['pm', 'dashboard'],
    queryFn: async () => {
      const res = await endpoints.projectManager.dashboard();
      return res.data?.data as PmDashboard;
    }
  });
}

export function usePmProjects() {
  return useQuery({
    queryKey: ['pm', 'projects'],
    queryFn: async () => {
      const res = await endpoints.projectManager.projects({ limit: 100 });
      return (res.data?.data || []) as PmProject[];
    }
  });
}
