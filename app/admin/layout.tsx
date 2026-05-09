import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { AdminShell } from '@/components/admin-shell'

export const metadata: Metadata = {
  title: 'Espace admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
