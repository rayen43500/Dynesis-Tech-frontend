'use client'

import { useState } from 'react'
import Link from 'next/link'
import { API_BASE_URL } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ResendVerificationPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    try {
      const r = await fetch(`${API_BASE_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await r.json().catch(() => ({}))
      setMessage(data.message || 'Si un compte existe, un email a été envoyé.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 px-4 py-16">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Renvoyer l’email de vérification</h1>
        <p className="text-sm text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline">
            Retour connexion
          </Link>
        </p>
      </div>
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Envoi…' : 'Renvoyer'}
        </Button>
      </form>
    </div>
  )
}
