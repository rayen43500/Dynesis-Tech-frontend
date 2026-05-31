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

export type DeveloperExperienceItem = {
  company: string;
  role: string;
  years: string;
  bullets: string[];
  technologies: string[];
};

export type DeveloperEducationItem = {
  school: string;
  degree: string;
  years: string;
};

export type DeveloperSkillYear = {
  skill: string;
  years: number;
};

export type DeveloperProfileData = {
  id: string;
  fullName: string;
  roleTitle: string;
  verified: boolean;
  location: string;
  memberSince: string;
  yearsOfExperience: number;
  availabilityStatus: 'Available' | 'Limited Availability' | 'Unavailable';
  previouslyAt: string;
  companyLogo: string;
  expertiseSummary: string;
  shortDescription: string;
  biography: string;
  profileImage: string;
  expertiseTags: string[];
  experienceTimeline: DeveloperExperienceItem[];
  portfolioProjects: DeveloperPortfolioProject[];
  education: DeveloperEducationItem[];
  skillYears: DeveloperSkillYear[];
};

const portfolioProjects: DeveloperPortfolioProject[] = [
  {
    id: 'project-nova',
    title: 'Nova Client Operations Hub',
    categoryPills: ['Enterprise SaaS', 'Operations'],
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL'],
    images: [
      'https://picsum.photos/seed/nova1/1200/800',
      'https://picsum.photos/seed/nova2/1200/800',
      'https://picsum.photos/seed/nova3/1200/800'
    ],
    overview:
      'A premium internal collaboration workspace for project operations, invoices, and client communication.',
    brief:
      'The agency needed a modern unified portal replacing disconnected tools and reducing operational friction.',
    challenges:
      'Multiple workflows were fragmented across systems. Teams struggled with visibility and handoff quality.',
    solutions:
      'Designed a modular dashboard architecture with role-aware views, timeline updates, and integrated billing flows.',
    outcomes:
      'Improved delivery clarity, reduced manual coordination, and increased client visibility across active projects.'
  },
  {
    id: 'project-atlas',
    title: 'Atlas Engineering Marketplace',
    categoryPills: ['Talent Platform', 'Marketplace'],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'GraphQL'],
    images: [
      'https://picsum.photos/seed/atlas1/1200/800',
      'https://picsum.photos/seed/atlas2/1200/800'
    ],
    overview:
      'A curated expert directory with profile depth, editorial structure, and high-quality conversion pathways.',
    brief:
      'The goal was to present senior experts in a highly readable, trust-first experience for enterprise buyers.',
    challenges:
      'Previous profile pages lacked credibility depth and users abandoned early in the discovery funnel.',
    solutions:
      'Introduced structured profile narratives, timeline credibility, and immersive project overlays.',
    outcomes:
      'Higher profile engagement time and stronger lead qualification from the discovery flow.'
  }
];

export const developersData: DeveloperProfileData[] = [
  {
    id: 'lucas-ferreira',
    fullName: 'Lucas Ferreira',
    roleTitle: 'Full Stack Engineer',
    verified: true,
    location: 'Paris, France',
    memberSince: 'January 2023',
    yearsOfExperience: 8,
    availabilityStatus: 'Available',
    previouslyAt: 'Google',
    companyLogo: 'https://logo.clearbit.com/google.com',
    expertiseSummary: 'Production-grade web platforms with React, Node.js, and cloud-native architecture.',
    shortDescription: 'Lucas builds scalable full-stack products with clean architecture and fast delivery cycles.',
    biography:
      'Lucas partners with product teams to ship reliable, high-performance applications. He combines strong frontend craftsmanship with backend systems design, and leads technical decisions from discovery through production deployment.',
    profileImage: 'https://i.pravatar.cc/300?img=11',
    expertiseTags: [
      'React',
      'Node.js',
      'TypeScript',
      'Next.js',
      'MongoDB',
      'AWS',
      'Docker',
      'PostgreSQL',
      'GraphQL',
      'Redis',
      'CI/CD',
      'Microservices'
    ],
    experienceTimeline: [
      {
        company: 'Google',
        role: 'Senior Software Engineer',
        years: '2020 – 2024',
        bullets: [
          'Led development of internal tooling used by 2,000+ engineers across product teams.',
          'Architected microservices migration reducing deployment time by 40%.',
          'Mentored junior developers and established code review standards.'
        ],
        technologies: ['React', 'Node.js', 'Go', 'Kubernetes', 'GCP']
      },
      {
        company: 'FlowCore Labs',
        role: 'Full Stack Engineer',
        years: '2017 – 2020',
        bullets: [
          'Built client-facing SaaS dashboards with real-time data pipelines.',
          'Implemented CI/CD pipelines and automated testing across the stack.'
        ],
        technologies: ['React', 'Express', 'PostgreSQL', 'AWS']
      }
    ],
    portfolioProjects,
    education: [
      {
        school: 'École Polytechnique',
        degree: 'M.S. Computer Science',
        years: '2013 – 2015'
      }
    ],
    skillYears: [
      { skill: 'React', years: 5 },
      { skill: 'Node.js', years: 4 },
      { skill: 'TypeScript', years: 4 },
      { skill: 'AWS', years: 3 },
      { skill: 'Docker', years: 3 }
    ]
  },
  {
    id: 'aisha-malik',
    fullName: 'Aisha Malik',
    roleTitle: 'Frontend Engineer',
    verified: true,
    location: 'London, UK',
    memberSince: 'March 2023',
    yearsOfExperience: 7,
    availabilityStatus: 'Available',
    previouslyAt: 'Meta',
    companyLogo: 'https://logo.clearbit.com/meta.com',
    expertiseSummary: 'Design systems, React performance, and accessible UI architecture.',
    shortDescription: 'Aisha crafts polished, accessible frontend experiences at scale.',
    biography:
      'Aisha specializes in component architecture, design systems, and performance optimization for large-scale React applications. She bridges design and engineering with pixel-perfect execution.',
    profileImage: 'https://i.pravatar.cc/300?img=32',
    expertiseTags: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind CSS', 'Storybook'],
    experienceTimeline: [
      {
        company: 'Meta',
        role: 'Senior Frontend Engineer',
        years: '2019 – 2024',
        bullets: [
          'Built reusable component libraries used across multiple product surfaces.',
          'Improved Core Web Vitals scores by 35% through performance optimization.'
        ],
        technologies: ['React', 'GraphQL', 'Relay', 'TypeScript']
      }
    ],
    portfolioProjects: [portfolioProjects[1]],
    education: [
      {
        school: 'Imperial College London',
        degree: 'B.S. Computer Science',
        years: '2012 – 2016'
      }
    ],
    skillYears: [
      { skill: 'React', years: 6 },
      { skill: 'TypeScript', years: 5 },
      { skill: 'Next.js', years: 3 }
    ]
  },
  {
    id: 'marcus-chen',
    fullName: 'Marcus Chen',
    roleTitle: 'Backend Engineer',
    verified: true,
    location: 'Singapore',
    memberSince: 'June 2022',
    yearsOfExperience: 9,
    availabilityStatus: 'Limited Availability',
    previouslyAt: 'Amazon',
    companyLogo: 'https://logo.clearbit.com/amazon.com',
    expertiseSummary: 'Distributed systems, API design, and high-availability backend services.',
    shortDescription: 'Marcus builds resilient backend platforms with clean API contracts.',
    biography:
      'Marcus focuses on API architecture, service reliability, and scalable data pipelines. He helps teams stabilize critical backend workflows while maintaining developer-friendly systems.',
    profileImage: 'https://i.pravatar.cc/300?img=15',
    expertiseTags: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Microservices'],
    experienceTimeline: [
      {
        company: 'Amazon',
        role: 'Software Development Engineer II',
        years: '2018 – 2024',
        bullets: [
          'Designed event-driven architectures handling 10M+ daily transactions.',
          'Led migration from monolith to microservices with zero downtime.'
        ],
        technologies: ['Java', 'AWS', 'DynamoDB', 'Lambda']
      }
    ],
    portfolioProjects: [portfolioProjects[0]],
    education: [
      {
        school: 'National University of Singapore',
        degree: 'B.Eng. Computer Engineering',
        years: '2011 – 2015'
      }
    ],
    skillYears: [
      { skill: 'Node.js', years: 5 },
      { skill: 'AWS', years: 4 },
      { skill: 'PostgreSQL', years: 4 }
    ]
  },
  {
    id: 'sofia-reyes',
    fullName: 'Sofia Reyes',
    roleTitle: 'DevOps Engineer',
    verified: true,
    location: 'Barcelona, Spain',
    memberSince: 'September 2023',
    yearsOfExperience: 6,
    availabilityStatus: 'Available',
    previouslyAt: 'Microsoft',
    companyLogo: 'https://logo.clearbit.com/microsoft.com',
    expertiseSummary: 'Cloud infrastructure, CI/CD pipelines, and platform engineering.',
    shortDescription: 'Sofia automates delivery pipelines and cloud operations at scale.',
    biography:
      'Sofia builds reliable infrastructure and deployment automation for engineering teams. She specializes in Kubernetes, Terraform, and observability tooling.',
    profileImage: 'https://i.pravatar.cc/300?img=25',
    expertiseTags: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD', 'Azure'],
    experienceTimeline: [
      {
        company: 'Microsoft',
        role: 'DevOps Engineer',
        years: '2020 – 2024',
        bullets: [
          'Built self-service deployment platforms for 50+ engineering teams.',
          'Reduced incident response time by 60% through improved monitoring.'
        ],
        technologies: ['Azure', 'Kubernetes', 'Terraform', 'Prometheus']
      }
    ],
    portfolioProjects: [portfolioProjects[0]],
    education: [
      {
        school: 'Universitat Politècnica de Catalunya',
        degree: 'B.S. Telecommunications',
        years: '2014 – 2018'
      }
    ],
    skillYears: [
      { skill: 'Kubernetes', years: 4 },
      { skill: 'AWS', years: 3 },
      { skill: 'Terraform', years: 3 }
    ]
  },
  {
    id: 'james-okafor',
    fullName: 'James Okafor',
    roleTitle: 'Mobile Engineer',
    verified: true,
    location: 'Lagos, Nigeria',
    memberSince: 'February 2024',
    yearsOfExperience: 7,
    availabilityStatus: 'Available',
    previouslyAt: 'Stripe',
    companyLogo: 'https://logo.clearbit.com/stripe.com',
    expertiseSummary: 'React Native, iOS, and cross-platform mobile product development.',
    shortDescription: 'James ships polished mobile experiences with native performance.',
    biography:
      'James builds cross-platform mobile applications with a focus on performance, offline support, and seamless user experiences. He has shipped apps used by millions of users.',
    profileImage: 'https://i.pravatar.cc/300?img=53',
    expertiseTags: ['React Native', 'Swift', 'TypeScript', 'Firebase', 'GraphQL'],
    experienceTimeline: [
      {
        company: 'Stripe',
        role: 'Mobile Engineer',
        years: '2019 – 2024',
        bullets: [
          'Built payment SDK components used in merchant mobile apps worldwide.',
          'Led React Native migration for internal tooling used by 500+ employees.'
        ],
        technologies: ['React Native', 'Swift', 'Kotlin', 'GraphQL']
      }
    ],
    portfolioProjects: [portfolioProjects[1]],
    education: [
      {
        school: 'University of Lagos',
        degree: 'B.S. Computer Science',
        years: '2013 – 2017'
      }
    ],
    skillYears: [
      { skill: 'React Native', years: 5 },
      { skill: 'Swift', years: 3 },
      { skill: 'TypeScript', years: 4 }
    ]
  }
];

export function findDeveloperById(id?: string) {
  if (!id) return null;
  return developersData.find((d) => d.id === id) || null;
}
