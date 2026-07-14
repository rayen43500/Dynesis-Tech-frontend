import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { endpoints } from '../../../shared/api/endpoints';

export type ProjectStatus = 'active' | 'paused' | 'completed' | 'canceled';

export type RoadmapStage = {
  title?: string;
  order?: number;
  completed?: boolean;
};

export type Milestone = {
  title?: string;
  dueDate?: string;
  status?: string;
  notes?: string;
};

export type AdminProject = {
  _id: string;
  clientId?: string;
  projectManagerId?: string | null;
  assignedDeveloperIds?: string[];
  title?: string;
  status?: ProjectStatus;
  milestones?: Milestone[];
  roadmap?: RoadmapStage[];
  paymentStatus?: string;
  consultationNotes?: string;
  createdAt?: string;
  updatedAt?: string;
};

export function useAdminProjects() {
  return useQuery({
    queryKey: ['admin', 'projects'],
    queryFn: async () => {
      const res = await endpoints.admin.projects.list({ limit: 100 });
      return (res.data?.data || []) as AdminProject[];
    }
  });
}

export function useAdminProject(id?: string | null) {
  return useQuery({
    queryKey: ['admin', 'projects', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await endpoints.admin.projects.getById(id as string);
      return res.data?.data as AdminProject;
    }
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      endpoints.admin.projects.update(id, payload),
    onSuccess: (_res, vars) => {
      qc.invalidateQueries({ queryKey: ['admin', 'projects'] });
      qc.invalidateQueries({ queryKey: ['admin', 'projects', vars.id] });
    }
  });
}
