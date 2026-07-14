import { useQuery } from '@tanstack/react-query';

import { endpoints } from '../../../shared/api/endpoints';

export type ClientProject = {
  _id: string;
  title?: string;
  status?: string;
  paymentStatus?: string;
  roadmap?: { title?: string; order?: number; completed?: boolean }[];
  milestones?: { title?: string; dueDate?: string; status?: string; notes?: string }[];
  activityTimeline?: { eventType?: string; message?: string; createdAt?: string }[];
  updatedAt?: string;
};

export function useClientProjects() {
  return useQuery({
    queryKey: ['client', 'projects'],
    queryFn: async () => {
      const res = await endpoints.client.projects.list();
      return (res.data?.data || []) as ClientProject[];
    }
  });
}

export function useClientProject(id?: string | null) {
  return useQuery({
    queryKey: ['client', 'projects', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await endpoints.client.projects.getById(id as string);
      return res.data?.data as ClientProject;
    }
  });
}

export function useClientProjectRoadmap(id?: string | null) {
  return useQuery({
    queryKey: ['client', 'projects', id, 'roadmap'],
    enabled: !!id,
    queryFn: async () => {
      const res = await endpoints.client.projects.roadmap(id as string);
      return res.data?.data as ClientProject;
    }
  });
}
