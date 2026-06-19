export const Roles = {
  admin: 'admin',
  client: 'client'
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export function getRoleHomePath(role?: Role | null) {
  if (role === Roles.admin) return '/dashboard/admin';
  if (role === Roles.client) return '/dashboard/client';
  return '/';
}

