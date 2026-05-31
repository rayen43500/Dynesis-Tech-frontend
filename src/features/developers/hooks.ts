import { useQuery } from '@tanstack/react-query';

import { endpoints } from '../../shared/api/endpoints';

export type DeveloperDirectoryItem = {
  id: string;
  fullName: string;
  roleTitle: string;
  verified: boolean;
  location: string;
  yearsOfExperience: number;
  availabilityStatus: string;
  expertiseSummary: string;
  shortDescription: string;
  biography: string;
  expertiseTags: string[];
  technologies: string[];
  profileImage: string;
  previouslyAt?: string;
  companyLogo?: string;
};

export type DeveloperExperienceItem = {
  company: string;
  role: string;
  years: string;
  bullets: string[];
  technologies: string[];
};

export type DeveloperPortfolioProject = {
  id: string;
  title: string;
  categoryPills: string[];
  technologies: string[];
  images: string[];
  overview: string;
  brief: string;
  challenges: string;
  solutions: string;
  outcomes: string;
};

export type DeveloperProfileResponse = {
  id: string;
  fullName: string;
  roleTitle: string;
  verified: boolean;
  location: string;
  memberSince: string;
  yearsOfExperience: number;
  availabilityStatus: string;
  expertiseSummary: string;
  shortDescription: string;
  biography: string;
  expertiseTags: string[];
  technologies: string[];
  profileImage: string;
  previousCompanies?: { name: string; logo: string }[];
  education: { school: string; degree: string; year?: number }[];
  skillYears: { skill: string; years: number }[];
  experienceTimeline: DeveloperExperienceItem[];
  portfolioProjects: DeveloperPortfolioProject[];
};

export function useDevelopersDirectory(lang: 'en' | 'fr') {
  return useQuery({
    queryKey: ['public', 'developers', lang],
    queryFn: async () => {
      const res = await endpoints.public.developers.list({ lang });
      const rows = (res.data?.data || []) as (DeveloperDirectoryItem & { photo?: string })[];
      return rows.map((item) => ({
        ...item,
        profileImage:
          typeof item.profileImage === 'string'
            ? item.profileImage
            : item.photo || ''
      }));
    }
  });
}

export function useDeveloperProfile(id: string | undefined, lang: 'en' | 'fr') {
  return useQuery({
    queryKey: ['public', 'developers', id, lang],
    enabled: !!id,
    queryFn: async () => {
      const res = await endpoints.public.developers.getById(id as string, { lang });
      const data = res.data?.data as DeveloperProfileResponse & { photo?: string };
      if (!data) return data;
      return {
        ...data,
        profileImage:
          typeof data.profileImage === 'string' ? data.profileImage : data.photo || ''
      };
    }
  });
}
