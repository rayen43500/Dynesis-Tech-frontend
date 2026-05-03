'use client'

import { useState } from 'react'
import { Mail, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to subscribe')
      }

      setSuccess(true)
      setEmail('')
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full rounded-lg border border-border bg-card py-3 pl-10 pr-4 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            aria-label="Email address"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 sm:w-auto whitespace-nowrap"
        >
          {loading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </Button>
      </div>

      {success && (
        <div className="mt-3 animate-in fade-in slide-in-from-bottom-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
          ✓ Thanks for subscribing! Check your email for confirmation.
        </div>
      )}

      {error && (
        <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          ✕ {error}
        </div>
      )}
    </form>
  )
}
