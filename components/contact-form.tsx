'use client'

import { useState } from 'react'
import { Send, Loader, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

type RequestType = 'quote' | 'invoice' | 'email' | 'project' | 'support'

const requestTypeOptions = [
  { value: 'quote', label: 'Devis / Factures' },
  { value: 'invoice', label: 'Demande Facture' },
  { value: 'email', label: 'Demande par Email' },
  { value: 'project', label: 'Nouveau Projet' },
  { value: 'support', label: 'Support Technique' },
]

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requestType: 'quote' as RequestType,
    message: '',
    invoiceNumber: '',
    projectDetails: '',
    subscribeNewsletter: false,
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to send message')
      }

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        requestType: 'quote',
        message: '',
        invoiceNumber: '',
        projectDetails: '',
        subscribeNewsletter: false,
      })

      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const showInvoiceField = formData.requestType === 'invoice'
  const showProjectField = formData.requestType === 'project'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Success Message - Clear visual feedback with good hierarchy */}
      {success && (
        <div className="animate-in fade-in slide-in-from-top flex items-start gap-4 rounded-lg border border-green-200 bg-green-50 p-5">
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-semibold text-green-900">Message envoyé avec succès!</h3>
            <p className="text-sm text-green-700">Nous vous recontacterons bientôt.</p>
          </div>
        </div>
      )}

      {/* Error Message - Clear visual hierarchy */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-700 font-medium">
          ✕ {error}
        </div>
      )}

      {/* Personal Information Section - Clear group with visual separation */}
      <div className="space-y-6">
        <div>
          <h2 className="text-base font-semibold text-foreground mb-4">Informations Personnelles</h2>
        </div>
        {/* Name and Email - Grouped together */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2.5">
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Nom Complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full rounded-lg border border-border/70 bg-card/80 px-4 py-3 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2.5">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full rounded-lg border border-border/70 bg-card/80 px-4 py-3 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Phone and Company - Secondary information group */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2.5">
            <label htmlFor="phone" className="block text-sm font-medium text-foreground">
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-border/70 bg-card/80 px-4 py-3 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
              placeholder="+33 1 23 45 67 89"
            />
          </div>
          <div className="space-y-2.5">
            <label htmlFor="company" className="block text-sm font-medium text-foreground">
              Entreprise
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-border/70 bg-card/80 px-4 py-3 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
              placeholder="Votre Entreprise"
            />
          </div>
        </div>
      </div>

      {/* Request Details Section */}
      <div className="space-y-6 border-t border-border/30 pt-6">
        <div>
          <h2 className="text-base font-semibold text-foreground mb-4">Détails de la Demande</h2>
        </div>
        
        {/* Request Type - Primary selector */}
        <div className="space-y-2.5">
          <label htmlFor="requestType" className="block text-sm font-medium text-foreground">
            Type de Demande <span className="text-red-500">*</span>
          </label>
          <select
            id="requestType"
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-border/70 bg-card/80 px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
          >
            {requestTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

      {/* Conditional Fields - Contextual information */}
      {showInvoiceField && (
        <div className="space-y-2.5">
          <label htmlFor="invoiceNumber" className="block text-sm font-medium text-foreground">
            Numéro de Facture / Référence
          </label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-border/70 bg-card/80 px-4 py-3 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
            placeholder="INV-2024-0001"
          />
        </div>
      )}

      {showProjectField && (
        <div className="space-y-2.5">
          <label htmlFor="projectDetails" className="block text-sm font-medium text-foreground">
            Détails du Projet
          </label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            disabled={loading}
            rows={3}
            className="w-full rounded-lg border border-border/70 bg-card/80 px-4 py-3 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 resize-none"
            placeholder="Décrivez votre projet..."
          />
        </div>
      )}

      {/* Main Message - Primary focus */}
      <div className="space-y-2.5">
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={loading}
          rows={5}
          className="w-full rounded-lg border border-border/70 bg-card/80 px-4 py-3 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 resize-none"
          placeholder="Votre message ici..."
        />
      </div>

      {/* Newsletter Opt-in - Subtle secondary action */}
      <div className="flex items-start gap-3.5 rounded-lg border border-border/30 bg-card/50 p-5">
        <input
          type="checkbox"
          id="subscribeNewsletter"
          name="subscribeNewsletter"
          checked={formData.subscribeNewsletter}
          onChange={handleChange}
          disabled={loading}
          className="h-5 w-5 rounded border-border/70 text-primary focus:ring-2 focus:ring-primary/30 mt-0.5"
        />
        <label htmlFor="subscribeNewsletter" className="text-sm text-foreground/60 cursor-pointer leading-relaxed">
          S&apos;abonner à notre newsletter pour recevoir des insights tech, mises à jour et offres exclusives
        </label>
      </div>

      {/* Submit Button - Clear primary action with visual prominence */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {loading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Envoyer le Message
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
