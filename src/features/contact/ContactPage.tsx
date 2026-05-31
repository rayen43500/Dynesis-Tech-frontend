import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

import { AndelaNavbar } from '../home/AndelaNavbar';
import { ContactHeroMap } from './ContactHeroMap';
import '../home/andela-home.css';
import './contact-page.css';

export function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
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
          <h1 className="contact-hero__title">Get In Touch</h1>
          <p className="contact-hero__sub">
            We&apos;re ready to listen, collaborate, and bring your vision to life.
          </p>
        </div>
      </header>

      <div className="contact-panel-outer">
      <section className="contact-panel" aria-label="Contact form and information">
        <div className="contact-form-col">
          <div className="contact-form-header">
            <h2 className="contact-form-col__title">Send us a Message</h2>
            <div className="contact-form-header__icon" aria-hidden>
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="2" x2="14" y2="2" stroke="#3A8A3A" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="9" x2="14" y2="9" stroke="#3A8A3A" strokeWidth="2" strokeLinecap="round" />
                <rect x="16" y="4" width="12" height="14" rx="1" stroke="#3A8A3A" strokeWidth="2" />
                <path d="M16 6 L22 11 L28 6" stroke="#3A8A3A" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <form id="contact-message-form" onSubmit={handleSubmit}>
            <div className="contact-form-grid">
              <div className="contact-field">
                <label htmlFor="contact-name">Your Name</label>
                <input id="contact-name" name="name" type="text" required />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">Email Address</label>
                <input id="contact-email" name="email" type="email" required />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-phone">Phone</label>
                <input id="contact-phone" name="phone" type="tel" />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-company">Company</label>
                <input id="contact-company" name="company" type="text" />
              </div>
              <div className="contact-field contact-field--full">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" required />
              </div>
            </div>
            {sent ? (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#3A8A3A', marginTop: 16 }}>
                Thank you — we&apos;ll be in touch shortly.
              </p>
            ) : null}
            <div className="contact-form-footer">
              <button type="submit" className="contact-send-btn" aria-label="Send message">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden>
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        <aside className="contact-info-col">
          <div className="contact-info-col__decor" aria-hidden />
          <h2 className="contact-info-col__title">Contact Information</h2>
          <div className="contact-info-row">
            <MapPin size={18} strokeWidth={1.5} fill="none" aria-hidden />
            <p>Paris, France</p>
          </div>
          <div className="contact-info-row">
            <Phone size={18} strokeWidth={1.5} fill="none" aria-hidden />
            <p>+33 X XX XX XX XX</p>
          </div>
          <div className="contact-info-row">
            <Mail size={18} strokeWidth={1.5} fill="none" aria-hidden />
            <p>hello@dynesistech.com</p>
          </div>
          <hr className="contact-info-divider" />
          <div className="contact-social">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
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
