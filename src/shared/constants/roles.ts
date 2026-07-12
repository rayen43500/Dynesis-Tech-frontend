export const Roles = {
  admin: 'admin',
  client: 'client',
  developer: 'developer',
  projectManager: 'project_manager'
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export function getRoleHomePath(role?: Role | null) {
  if (role === Roles.admin) return '/dashboard/admin';
  if (role === Roles.client) return '/dashboard/client';
  if (role === Roles.developer) return '/dashboard/developer';
  if (role === Roles.projectManager) return '/dashboard/project-manager';
  return '/';
}

