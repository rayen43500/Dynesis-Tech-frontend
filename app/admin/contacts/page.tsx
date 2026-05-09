'use client'

import { useEffect, useState } from 'react'
import { AUTH_TOKEN_KEY, authFetch } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Contact = {
  _id: string
  name: string
  email: string
  message: string
  requestType?: string
  status?: string
  createdAt?: string
}

export default function AdminContactsPage() {
  const [items, setItems] = useState<Contact[]>([])
  const [error, setError] = useState('')

  const load = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (!token) return
    authFetch(token, '/api/admin/contacts?limit=100&skip=0')
      .then(async (r) => {
        if (!r.ok) throw new Error('fail')
        return r.json() as Promise<{ items: Contact[] }>
      })
      .then((d) => setItems(d.items))
      .catch(() => setError('Impossible de charger les messages.'))
  }

  useEffect(() => {
    load()
  }, [])

  const setStatus = async (id: string, status: 'new' | 'read' | 'archived') => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (!token) return
    const r = await authFetch(token, `/api/admin/contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
    if (r.ok) load()
  }

  if (error) return <p className="text-destructive">{error}</p>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Messages contact</h1>
        <p className="text-muted-foreground">Formulaires envoyés depuis le site.</p>
      </div>

      <div className="space-y-4">
        {items.length === 0 && !error && <p className="text-muted-foreground">Chargement…</p>}
        {items.map((c) => (
          <Card key={c._id}>
            <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2 pb-2">
              <CardTitle className="text-base">
                {c.name}{' '}
                <span className="font-normal text-muted-foreground">· {c.email}</span>
              </CardTitle>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize text-muted-foreground">
                {c.status || 'new'}
              </span>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="whitespace-pre-wrap text-sm text-foreground/90">{c.message}</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => setStatus(c._id, 'read')}>
                  Marquer lu
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setStatus(c._id, 'archived')}>
                  Archiver
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
