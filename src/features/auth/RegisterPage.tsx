import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { endpoints } from '../../shared/api/endpoints';
import { AuthLogo } from './AuthLogo';
import { AuthSplitPanel } from './AuthSplitPanel';
import { IconEnvelope, IconEye, IconLock, IconUser } from './AuthIcons';
import { useAuthPageScrollLock } from './useAuthPageScrollLock';
import './auth-pages.css';

const CLIENT_DASHBOARD_PATH = '/dashboard/client';

function redirectToClientDashboard() {
  window.location.href = CLIENT_DASHBOARD_PATH;
}

export function RegisterPage() {
  useAuthPageScrollLock();
  const { t } = useTranslation();

  const quoteParams = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const emailParam = params.get('email');
    if (!name && !emailParam) return null;
    return { name: name || '', email: emailParam || '' };
  }, []);

  const welcomeRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [welcomeVisible, setWelcomeVisible] = useState(Boolean(quoteParams));
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const showWelcomeBanner = Boolean(quoteParams && welcomeVisible);
  const showForm = !registrationSuccess;

  useEffect(() => {
    if (!quoteParams) return;
    if (quoteParams.name) setFullName(quoteParams.name);
    if (quoteParams.email) setEmail(quoteParams.email);
  }, [quoteParams]);

  useEffect(() => {
    if (!showWelcomeBanner) return;

    const banner = welcomeRef.current;
    if (!banner) return;

    let removeTimer: number | undefined;

    const dismissTimer = window.setTimeout(() => {
      banner.style.transition = 'opacity 0.3s ease';
      banner.style.opacity = '0';
      removeTimer = window.setTimeout(() => {
        banner.remove();
        setWelcomeVisible(false);
        if (registrationSuccess) {
          redirectToClientDashboard();
        }
      }, 300);
    }, 3000);

    return () => {
      window.clearTimeout(dismissTimer);
      if (removeTimer !== undefined) window.clearTimeout(removeTimer);
    };
  }, [showWelcomeBanner, registrationSuccess]);

  useEffect(() => {
    if (registrationSuccess && quoteParams && !welcomeVisible) {
      redirectToClientDashboard();
    }
  }, [registrationSuccess, quoteParams, welcomeVisible]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setEmailError(null);
    if (password !== confirmPassword) {
      setMessage(t('auth.register.error.passwordMismatch'));
      return;
    }

    setLoading(true);
    try {
      await endpoints.auth.register({ name: fullName, email, password });
      if (quoteParams) {
        setRegistrationSuccess(true);
      } else {
        redirectToClientDashboard();
      }
    } catch (err: any) {
      if (err?.response?.status === 409) {
        setEmailError(t('auth.register.error.emailTaken'));
      } else {
        setMessage(t('auth.register.error.generic'));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page auth-page--register">
      <AuthLogo />
      <div className="auth-page-container">
        <div className="auth-split">
        <div className="auth-split__left">
          <div className={`auth-form${showWelcomeBanner ? ' auth-form--welcome-banner' : ''}`}>
            <h1 className="auth-title">{t('auth.register.title')}</h1>
            <p className="auth-subtitle">{t('auth.register.subtitle')}</p>

            <div className="auth-form-content">
              {showWelcomeBanner ? (
                <div ref={welcomeRef} className="auth-quote-banner">
                  <p className="auth-quote-banner__title">
                    {t('auth.register.welcome.title', {
                      name: quoteParams?.name || t('auth.register.welcome.fallbackName')
                    })}
                  </p>
                  <p className="auth-quote-banner__text">{t('auth.register.welcome.text')}</p>
                </div>
              ) : null}

              {showForm ? (
              <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="register-name">
                  {t('auth.register.fullName.label')}
                </label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <IconUser />
                  </span>
                  <input
                    id="register-name"
                    className="auth-input"
                    type="text"
                    autoComplete="name"
                    placeholder={t('auth.register.fullName.placeholder')}
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="register-email">
                  {t('auth.register.email.label')}
                </label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <IconEnvelope />
                  </span>
                  <input
                    id="register-email"
                    className="auth-input"
                    type="email"
                    autoComplete="email"
                    placeholder={t('auth.register.email.placeholder')}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {emailError ? <p className="auth-error">{emailError}</p> : null}
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="register-password">
                  {t('auth.register.password.label')}
                </label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <IconLock />
                  </span>
                  <input
                    id="register-password"
                    className="auth-input auth-input--password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder={t('auth.register.password.placeholder')}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="auth-toggle-pw"
                    aria-label={showPassword ? t('auth.login.password.hide') : t('auth.login.password.show')}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    <IconEye open={showPassword} />
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="register-confirm">
                  {t('auth.register.confirmPassword.label')}
                </label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <IconLock />
                  </span>
                  <input
                    id="register-confirm"
                    className="auth-input auth-input--password"
                    type={showConfirm ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder={t('auth.register.confirmPassword.placeholder')}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="auth-toggle-pw"
                    aria-label={showConfirm ? t('auth.login.password.hide') : t('auth.login.password.show')}
                    onClick={() => setShowConfirm((v) => !v)}
                  >
                    <IconEye open={showConfirm} />
                  </button>
                </div>
              </div>

              {message ? <p className="auth-error">{message}</p> : null}

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? t('auth.register.submitting') : t('auth.register.submit')}
              </button>
              </form>
              ) : null}
            </div>

            <p className="auth-bottom">
              {t('auth.register.hasAccount')} <Link to="/login">{t('auth.register.signInLink')}</Link>
            </p>
          </div>
        </div>

        <AuthSplitPanel variant="register" />
        </div>
      </div>
    </div>
  );
}
