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
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="animate-in fade-in slide-in-from-top flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900">Message sent successfully!</h3>
            <p className="text-sm text-green-700">We&apos;ll get back to you shortly.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          ✕ {error}
        </div>
      )}

      {/* Name and Email - 2 columns on desktop */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Phone and Company */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            placeholder="Your Company"
          />
        </div>
      </div>

      {/* Request Type */}
      <div>
        <label htmlFor="requestType" className="block text-sm font-medium text-foreground mb-2">
          Type of Request *
        </label>
        <select
          id="requestType"
          name="requestType"
          value={formData.requestType}
          onChange={handleChange}
          disabled={loading}
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
        >
          {requestTypeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional Fields */}
      {showInvoiceField && (
        <div>
          <label htmlFor="invoiceNumber" className="block text-sm font-medium text-foreground mb-2">
            Invoice Number / Reference
          </label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            placeholder="INV-2024-0001"
          />
        </div>
      )}

      {showProjectField && (
        <div>
          <label htmlFor="projectDetails" className="block text-sm font-medium text-foreground mb-2">
            Project Details
          </label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            disabled={loading}
            rows={3}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 resize-none"
            placeholder="Tell us about your project..."
          />
        </div>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={loading}
          rows={5}
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 resize-none"
          placeholder="Your message here..."
        />
      </div>

      {/* Newsletter Opt-in */}
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-4">
        <input
          type="checkbox"
          id="subscribeNewsletter"
          name="subscribeNewsletter"
          checked={formData.subscribeNewsletter}
          onChange={handleChange}
          disabled={loading}
          className="h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
        />
        <label htmlFor="subscribeNewsletter" className="text-sm text-foreground/70 cursor-pointer">
          Subscribe to our newsletter for tech insights, updates, and exclusive offers
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base font-medium transition-all"
      >
        {loading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
