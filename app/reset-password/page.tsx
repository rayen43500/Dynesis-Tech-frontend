'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { API_BASE_URL } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function ResetForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tokenFromUrl = searchParams.get('token') || ''

  const [token, setToken] = useState(tokenFromUrl)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const r = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) {
        setError(data.message || 'Lien invalide ou expiré.')
        return
      }
      setSuccess(data.message || 'Mot de passe mis à jour.')
      setTimeout(() => router.push('/login'), 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 px-4 py-16">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Nouveau mot de passe</h1>
        <p className="text-sm text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline">
            Connexion
          </Link>
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="token">Token (pré-rempli depuis l’email)</Label>
          <Input id="token" value={token} onChange={(e) => setToken(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Nouveau mot de passe</Label>
          <Input
            id="password"
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {success && <p className="text-sm text-green-700 dark:text-green-400">{success}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Mise à jour…' : 'Enregistrer'}
        </Button>
      </form>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-muted-foreground">Chargement…</div>}>
      <ResetForm />
    </Suspense>
  )
}
