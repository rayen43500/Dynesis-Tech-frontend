import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { endpoints } from '../../shared/api/endpoints';

export type DeveloperTaskStatus = 'todo' | 'in_progress' | 'blocked' | 'review' | 'testing' | 'done';

export type DeveloperProject = {
  _id: string;
  title: string;
  status: string;
  paymentStatus?: string;
  roadmap?: { title: string; order: number; completed: boolean }[];
  milestones?: { title: string; dueDate?: string; status?: string; notes?: string }[];
  consultationNotes?: string;
  updatedAt?: string;
};

export type DeveloperTask = {
  _id: string;
  projectId: string;
  title: string;
  description?: string;
  status: DeveloperTaskStatus;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  estimatedHours?: number;
  checklist?: { _id: string; label: string; completed: boolean }[];
  updatedAt?: string;
};

export type DeveloperTimeEntry = {
  _id: string;
  projectId?: string;
  taskId?: string;
  startedAt: string;
  endedAt?: string;
  durationMinutes: number;
  note?: string;
  source?: 'timer' | 'manual';
};

export type DeveloperBug = {
  _id: string;
  projectId: string;
  title: string;
  severity: string;
  status: string;
  description?: string;
};

export type DeveloperDeployment = {
  _id: string;
  projectId: string;
  version?: string;
  environment: string;
  status: string;
  releaseNotes?: string;
  deployedAt?: string;
};

export type DeveloperLeave = {
  _id: string;
  startDate: string;
  endDate: string;
  reason?: string;
  status: string;
};

export type DeveloperDashboard = {
  stats: {
    activeProjects: number;
    assignedTasks: number;
    dueSoon: number;
    weekMinutes: number;
    openBugs: number;
    unreadMessages: number;
    pendingLeaves: number;
  };
  projects: DeveloperProject[];
  tasks: DeveloperTask[];
  bugs: DeveloperBug[];
  deployments: DeveloperDeployment[];
  leaves: DeveloperLeave[];
  activities: { _id: string; eventType: string; message: string; createdAt: string }[];
};

export function useDeveloperDashboard() {
  return useQuery({
    queryKey: ['developer', 'dashboard'],
    queryFn: async () => {
      const res = await endpoints.developer.dashboard();
      return res.data?.data as DeveloperDashboard;
    }
  });
}

export function useDeveloperProjects() {
  return useQuery({
    queryKey: ['developer', 'projects'],
    queryFn: async () => {
      const res = await endpoints.developer.projects();
      return (res.data?.data || []) as DeveloperProject[];
    }
  });
}

export function useDeveloperTasks() {
  return useQuery({
    queryKey: ['developer', 'tasks'],
    queryFn: async () => {
      const res = await endpoints.developer.tasks.list();
      return (res.data?.data || []) as DeveloperTask[];
    }
  });
}

export function useUpdateDeveloperTaskStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: DeveloperTaskStatus }) => endpoints.developer.tasks.updateStatus(id, { status }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['developer'] });
    }
  });
}

export function useDeveloperTimeEntries() {
  return useQuery({
    queryKey: ['developer', 'time-entries'],
    queryFn: async () => {
      const res = await endpoints.developer.timeEntries.list();
      return (res.data?.data || []) as DeveloperTimeEntry[];
    }
  });
}

export function useCreateDeveloperTimeEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: endpoints.developer.timeEntries.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['developer'] });
    }
  });
}

export function useDeveloperBugs() {
  return useQuery({
    queryKey: ['developer', 'bugs'],
    queryFn: async () => {
      const res = await endpoints.developer.bugs.list();
      return (res.data?.data || []) as DeveloperBug[];
    }
  });
}

export function useDeveloperDeployments() {
  return useQuery({
    queryKey: ['developer', 'deployments'],
    queryFn: async () => {
      const res = await endpoints.developer.deployments.list();
      return (res.data?.data || []) as DeveloperDeployment[];
    }
  });
}

export function useDeveloperLeaves() {
  return useQuery({
    queryKey: ['developer', 'leaves'],
    queryFn: async () => {
      const res = await endpoints.developer.leaves.list();
      return (res.data?.data || []) as DeveloperLeave[];
    }
  });
}

export function useRequestDeveloperLeave() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: endpoints.developer.leaves.request,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['developer'] });
    }
  });
}
