'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { API_BASE_URL } from '@/lib/api-config'

function VerifyContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [message, setMessage] = useState('Vérification en cours…')
  const [ok, setOk] = useState<boolean | null>(null)

  useEffect(() => {
    if (!token) {
      setMessage('Lien invalide : token manquant.')
      setOk(false)
      return
    }
    fetch(`${API_BASE_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const data = await r.json().catch(() => ({}))
        if (!r.ok) {
          setMessage(data.message || 'Vérification impossible.')
          setOk(false)
          return
        }
        setMessage(data.message || 'Email vérifié.')
        setOk(true)
      })
      .catch(() => {
        setMessage('Erreur réseau.')
        setOk(false)
      })
  }, [token])

  return (
    <div className="mx-auto max-w-md space-y-6 px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-foreground">Vérification email</h1>
      <p className={ok === false ? 'text-destructive' : 'text-muted-foreground'}>{message}</p>
      <Link href="/login" className="text-primary underline-offset-4 hover:underline">
        Aller à la connexion
      </Link>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-muted-foreground">Chargement…</div>}>
      <VerifyContent />
    </Suspense>
  )
}
