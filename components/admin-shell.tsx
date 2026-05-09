'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Mail, Briefcase, FileText, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AUTH_TOKEN_KEY, authFetch } from '@/lib/api-config'

type Me = { role?: string; email?: string; firstName?: string }

const nav = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/quotes', label: 'Devis', icon: FileText },
  { href: '/admin/contacts', label: 'Messages', icon: Mail },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
]

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)
  const [me, setMe] = useState<Me | null>(null)

  useEffect(() => {
    const nextUrl = `${window.location.pathname}${window.location.search}` || '/admin'
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (!token) {
      router.replace(`/login?next=${encodeURIComponent(nextUrl)}`)
      return
    }
    authFetch(token, '/api/auth/me')
      .then(async (r) => {
        if (!r.ok) throw new Error('auth')
        return r.json() as Promise<Me>
      })
      .then((u) => {
        if (u.role !== 'admin') {
          router.replace('/')
          return
        }
        setMe(u)
        setReady(true)
      })
      .catch(() => {
        router.replace(`/login?next=${encodeURIComponent(nextUrl)}`)
      })
  }, [router])

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    router.push('/login')
  }

  if (!ready || !me) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Vérification de l&apos;accès administrateur…
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden min-h-screen w-56 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="flex h-16 items-center border-b border-border px-4">
          <Link href="/admin" className="font-semibold text-foreground">
            Admin
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-border p-3">
          <p className="truncate px-1 text-xs text-muted-foreground">{me.email}</p>
          <Button variant="ghost" size="sm" className="mt-2 w-full justify-start gap-2" onClick={logout}>
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border px-4 md:hidden">
          <span className="font-semibold">Admin</span>
          <Button variant="outline" size="sm" onClick={logout}>
            Sortir
          </Button>
        </header>
        <div className="border-b border-border px-2 py-2 md:hidden">
          <div className="flex flex-wrap gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-2 py-1 text-xs ${
                  pathname === item.href ? 'bg-primary/15 text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
