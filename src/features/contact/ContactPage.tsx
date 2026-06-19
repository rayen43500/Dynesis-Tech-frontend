import React, { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../app/providers/AuthProvider';
import { endpoints } from '../../shared/api/endpoints';
import { useClientMessages } from '../client/clientMessagesHooks';
import { useClientQuotes } from '../client/clientQuotesHooks';
import { AndelaNavbar } from '../home/AndelaNavbar';
import { ContactHeroMap } from './ContactHeroMap';
import '../home/andela-home.css';
import '../client/client-messages.css';
import './contact-page.css';

type Feedback = { type: 'success' | 'error'; text: string } | null;

function getLoggedInPrefill(
  user: { displayName?: string; email: string },
  latestQuote?: { name?: string; company?: string },
  latestMessage?: { phone?: string; company?: string }
) {
  return {
    name: user.displayName || latestQuote?.name || '',
    email: user.email || '',
    phone: latestMessage?.phone || '',
    company: latestQuote?.company || latestMessage?.company || ''
  };
}

export function ContactPage() {
  const { t } = useTranslation();
  const { status, user } = useAuth();
  const location = useLocation();
  const isEmbedded = location.pathname === '/dashboard/client/contact';
  const formRef = useRef<HTMLFormElement>(null);
  const dismissTimer = useRef<number | null>(null);

  const quotesQuery = useClientQuotes({ enabled: isEmbedded });
  const messagesQuery = useClientMessages({ enabled: isEmbedded });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    if (status !== 'authenticated' || !user) return;

    if (isEmbedded) {
      const prefill = getLoggedInPrefill(user, quotesQuery.data?.[0], messagesQuery.data?.[0]);
      setName(prefill.name);
      setEmail(prefill.email);
      setPhone(prefill.phone);
      setCompany(prefill.company);
      return;
    }

    setName(user.displayName || '');
    setEmail(user.email || '');
  }, [status, user, isEmbedded, quotesQuery.data, messagesQuery.data]);

  useEffect(() => {
    return () => {
      if (dismissTimer.current) window.clearTimeout(dismissTimer.current);
    };
  }, []);

  function clearDismissTimer() {
    if (dismissTimer.current) {
      window.clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
  }

  function resetFormFields(isLoggedIn: boolean) {
    if (isLoggedIn && user) {
      if (isEmbedded) {
        const prefill = getLoggedInPrefill(user, quotesQuery.data?.[0], messagesQuery.data?.[0]);
        setName(prefill.name);
        setEmail(prefill.email);
        setPhone(prefill.phone);
        setCompany(prefill.company);
      } else {
        setName(user.displayName || '');
        setEmail(user.email || '');
        setPhone('');
        setCompany('');
      }
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
    }
    setMessage('');
  }

  function scheduleDismiss(isLoggedIn: boolean) {
    clearDismissTimer();
    dismissTimer.current = window.setTimeout(() => {
      setFeedback(null);
      formRef.current?.reset();
      resetFormFields(isLoggedIn);
    }, 3000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);
    clearDismissTimer();

    const isLoggedIn = status === 'authenticated' && Boolean(user);

    try {
      await endpoints.contact.create({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        company: company.trim() || undefined,
        message: message.trim()
      });

      setFeedback({
        type: 'success',
        text: isLoggedIn ? t('contact.success.loggedIn') : t('contact.success.guest')
      });
      scheduleDismiss(isLoggedIn);
    } catch {
      setFeedback({
        type: 'error',
        text: t('contact.error.generic')
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (status === 'authenticated' && user?.role === 'client' && !isEmbedded) {
    return <Navigate to="/dashboard/client/contact" replace />;
  }

  const feedbackEl = feedback ? (
    <p
      className={isEmbedded ? 'contact-logged-in-feedback' : undefined}
      style={
        isEmbedded
          ? { color: feedback.type === 'success' ? '#3A8A3A' : '#E05555' }
          : {
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              color: feedback.type === 'success' ? '#3A8A3A' : '#E05555',
              marginTop: 12,
              textAlign: 'center'
            }
      }
    >
      {feedback.text}
    </p>
  ) : null;

  if (isEmbedded) {
    return (
      <div className="client-messages-page">
        <h1 className="client-messages-page__title">{t('contact.embedded.title')}</h1>
        <section className="contact-logged-in-card client-message-card" aria-label="Contact form">
          <form id="contact-message-form" ref={formRef} onSubmit={handleSubmit}>
            <section className="admin-section">
              <div className="admin-grid-2">
                <label className="admin-field">
                  <span className="admin-field__label">{t('contact.form.name.label')}</span>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="admin-field">
                  <span className="admin-field__label">{t('contact.form.email.label')}</span>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label className="admin-field">
                  <span className="admin-field__label">{t('contact.form.phone.label')}</span>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
                <label className="admin-field">
                  <span className="admin-field__label">{t('contact.form.company.label')}</span>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </label>
              </div>
              <label className="admin-field">
                <span className="admin-field__label">{t('contact.form.message.label')}</span>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>
            </section>
            <div className="contact-logged-in-footer">
              <button type="submit" className="admin-btn" disabled={submitting}>
                {t('contact.form.submit')}
              </button>
              {feedbackEl}
            </div>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <header className="contact-hero-unified" aria-label="Contact hero">
        <div className="contact-hero__map-wrap" aria-hidden>
          <ContactHeroMap />
        </div>
        <div className="contact-hero__overlay" aria-hidden />
        <AndelaNavbar variant="contact" />
        <div className="contact-hero__content">
          <h1 className="contact-hero__title">{t('contact.hero.title')}</h1>
          <p className="contact-hero__sub">{t('contact.hero.subtitle')}</p>
        </div>
      </header>

      <div className="contact-panel-outer">
        <section className="contact-panel" aria-label="Contact form and information">
          <div className="contact-form-col">
            <div className="contact-form-header">
              <h2 className="contact-form-col__title">{t('contact.form.title')}</h2>
              <div className="contact-form-header__icon" aria-hidden>
                <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="2" x2="14" y2="2" stroke="#3A8A3A" strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="9" x2="14" y2="9" stroke="#3A8A3A" strokeWidth="2" strokeLinecap="round" />
                  <rect x="16" y="4" width="12" height="14" rx="1" stroke="#3A8A3A" strokeWidth="2" />
                  <path d="M16 6 L22 11 L28 6" stroke="#3A8A3A" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <form id="contact-message-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="contact-form-grid">
                <div className="contact-field">
                  <label htmlFor="contact-name">{t('contact.form.name.label')}</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">{t('contact.form.email.label')}</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-phone">{t('contact.form.phone.label')}</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-company">{t('contact.form.company.label')}</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="contact-field contact-field--full">
                  <label htmlFor="contact-message">{t('contact.form.message.label')}</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
              <div className="contact-form-footer">
                <button type="submit" className="contact-send-btn" aria-label={t('contact.form.submitAria')} disabled={submitting}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden>
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
                {feedbackEl}
              </div>
            </form>
          </div>

          <aside className="contact-info-col">
            <div className="contact-info-col__decor" aria-hidden />
            <h2 className="contact-info-col__title">{t('contact.info.title')}</h2>
            <div className="contact-info-row">
              <MapPin size={18} strokeWidth={1.5} fill="none" aria-hidden />
              <p>{t('contact.info.location')}</p>
            </div>
            <div className="contact-info-row">
              <Phone size={18} strokeWidth={1.5} fill="none" aria-hidden />
              <p>{t('contact.info.phone')}</p>
            </div>
            <div className="contact-info-row">
              <Mail size={18} strokeWidth={1.5} fill="none" aria-hidden />
              <p>{t('contact.info.email')}</p>
            </div>
            <hr className="contact-info-divider" />
            <div className="contact-social">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label={t('contact.social.twitter')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label={t('contact.social.linkedin')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label={t('contact.social.github')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
