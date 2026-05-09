'use client'

import { useEffect, useState } from 'react'
import { AUTH_TOKEN_KEY, authFetch } from '@/lib/api-config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Quote = {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  industry: string
  projectType: string
  estimatedBudget: string
  message: string
  status?: string
  createdAt?: string
}

export default function AdminQuotesPage() {
  const [rows, setRows] = useState<Quote[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (!token) return
    authFetch(token, '/api/admin/quotes')
      .then(async (r) => {
        if (!r.ok) throw new Error('fail')
        return r.json() as Promise<Quote[]>
      })
      .then(setRows)
      .catch(() => setError('Impossible de charger les devis.'))
  }, [])

  if (error) return <p className="text-destructive">{error}</p>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Devis</h1>
        <p className="text-muted-foreground">Toutes les demandes soumises via le site.</p>
      </div>

      <div className="space-y-4">
        {rows.length === 0 && !error && <p className="text-muted-foreground">Chargement…</p>}
        {rows.map((q) => (
          <Card key={q._id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {q.firstName} {q.lastName}{' '}
                <span className="font-normal text-muted-foreground">· {q.email}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Projet :</span> {q.projectType} — {q.industry}
              </p>
              <p>
                <span className="font-medium text-foreground">Budget :</span> {q.estimatedBudget}
              </p>
              <p className="whitespace-pre-wrap text-foreground/90">{q.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
