import React from 'react';

type AuthSplitPanelProps = {
  variant: 'login' | 'register';
};

const PANEL_COPY = {
  login: {
    headline: (
      <>
        Premium Software,
        <br />
        Built for Your Growth.
      </>
    ),
    quote:
      'Dynesis Tech delivered our platform on time, on scope, and exactly as we envisioned it.',
    author: 'Sarah Chen',
    role: 'VP Product, NovaScale',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  register: {
    headline: (
      <>
        Join Teams That
        <br />
        Ship With Confidence.
      </>
    ),
    quote: 'From day one, the process was clear, fast, and completely stress-free. Exactly what we needed.',
    author: 'James Okonkwo',
    role: 'Founder, Meridian Labs',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  }
} as const;

const TRUSTED_LOGOS = ['Meridian', 'NovaScale', 'Helix', 'Aperture'];

export function AuthSplitPanel({ variant }: AuthSplitPanelProps) {
  const copy = PANEL_COPY[variant];

  return (
    <aside className="auth-split__right" aria-label="Testimonial and social proof">
      <div className="auth-split__glow" aria-hidden />
      <div className="auth-split__right-inner">
        <div className="auth-right-top">
          <h2 className="auth-right-headline">{copy.headline}</h2>

          <div>
            <p className="auth-quote-mark" aria-hidden>
              "
            </p>
            <p className="auth-quote">{copy.quote}</p>
            <div className="auth-author">
              <img className="auth-avatar" src={copy.avatar} alt="" />
              <div>
                <p className="auth-author-name">{copy.author}</p>
                <p className="auth-author-role">{copy.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right-bottom">
        <hr className="auth-right-divider" />

        <div>
          <p className="auth-trusted-label">TRUSTED BY TEAMS AT</p>
          <div className="auth-logos">
            {TRUSTED_LOGOS.map((name) => (
              <span key={name} className="auth-logo-item">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
