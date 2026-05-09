'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AUTH_TOKEN_KEY, authFetch } from '@/lib/api-config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type Overview = {
  quotesCount: number
  contactsCount: number
  usersCount: number
  portfolioCount: number
  recentQuotes: Array<{ _id: string; firstName?: string; lastName?: string; email?: string; createdAt?: string }>
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<Overview | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (!token) return
    authFetch(token, '/api/admin/overview')
      .then(async (r) => {
        if (!r.ok) throw new Error('Erreur API')
        return r.json() as Promise<Overview>
      })
      .then(setData)
      .catch(() => setError('Impossible de charger le tableau de bord.'))
  }, [])

  if (error) {
    return <p className="text-destructive">{error}</p>
  }

  if (!data) {
    return <p className="text-muted-foreground">Chargement…</p>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d’ensemble des demandes et du contenu.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Devis', value: data.quotesCount, href: '/admin/quotes' },
          { label: 'Messages contact', value: data.contactsCount, href: '/admin/contacts' },
          { label: 'Utilisateurs', value: data.usersCount, href: '#' },
          { label: 'Projets portfolio', value: data.portfolioCount, href: '/admin/portfolio' },
        ].map((item) => (
          <Card key={item.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{item.value}</p>
              {item.href !== '#' && (
                <Button variant="link" className="mt-2 h-auto p-0" asChild>
                  <Link href={item.href}>Voir</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Derniers devis</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {data.recentQuotes.length === 0 && (
              <li className="text-sm text-muted-foreground">Aucun devis pour le moment.</li>
            )}
            {data.recentQuotes.map((q) => (
              <li
                key={q._id}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 text-sm last:border-0"
              >
                <span className="font-medium text-foreground">
                  {q.firstName} {q.lastName}
                </span>
                <span className="text-muted-foreground">{q.email}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
