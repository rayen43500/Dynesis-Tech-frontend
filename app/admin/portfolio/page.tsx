'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AUTH_TOKEN_KEY, API_BASE_URL, authFetch } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type Project = {
  _id: string
  title?: string
  imageUrl?: string
  mission?: string
  technologies?: string[]
}

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState('')

  const loadPublic = () => {
    fetch(`${API_BASE_URL}/api/content/portfolio`)
      .then(async (r) => {
        if (!r.ok) throw new Error('fail')
        return r.json() as Promise<Project[]>
      })
      .then(setProjects)
      .catch(() => setError('Impossible de charger le portfolio.'))
  }

  useEffect(() => {
    loadPublic()
  }, [])

  const remove = async (id: string) => {
    if (!confirm('Supprimer ce projet ?')) return
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (!token) return
    const r = await authFetch(token, `/api/admin/portfolio/${id}`, { method: 'DELETE' })
    if (r.ok) loadPublic()
  }

  if (error) return <p className="text-destructive">{error}</p>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
        <p className="text-muted-foreground">Projets affichés sur le site (API publique + actions admin).</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 && !error && <p className="text-muted-foreground">Chargement…</p>}
        {projects.map((p) => (
          <Card key={p._id} className="overflow-hidden">
            <div className="relative aspect-video bg-muted">
              {p.imageUrl ? (
                <Image src={p.imageUrl} alt={p.title || ''} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
              ) : null}
            </div>
            <CardContent className="space-y-2 p-4">
              <h2 className="font-semibold text-foreground">{p.title || 'Sans titre'}</h2>
              {p.mission && <p className="text-sm text-muted-foreground line-clamp-2">{p.mission}</p>}
              <Button size="sm" variant="destructive" onClick={() => remove(p._id)}>
                Supprimer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
