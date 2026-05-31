import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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
      setMessage('Passwords do not match.');
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
        setEmailError('This email is already registered.');
      } else {
        setMessage('Unable to create account right now. Please try again.');
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
            <h1 className="auth-title">Create Your Account</h1>
            <p className="auth-subtitle">Start delivering premium digital products today.</p>

            <div className="auth-form-content">
              {showWelcomeBanner ? (
                <div ref={welcomeRef} className="auth-quote-banner">
                  <p className="auth-quote-banner__title">👋 Welcome {quoteParams?.name || 'there'}!</p>
                  <p className="auth-quote-banner__text">Create your account to track your project request.</p>
                </div>
              ) : null}

              {showForm ? (
              <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="register-name">
                  Full Name
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
                    placeholder="Enter your full name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="register-email">
                  Email
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
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {emailError ? <p className="auth-error">{emailError}</p> : null}
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="register-password">
                  Password
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
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="auth-toggle-pw"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    <IconEye open={showPassword} />
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="register-confirm">
                  Confirm Password
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
                    placeholder="Confirm your password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="auth-toggle-pw"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    onClick={() => setShowConfirm((v) => !v)}
                  >
                    <IconEye open={showConfirm} />
                  </button>
                </div>
              </div>

              {message ? <p className="auth-error">{message}</p> : null}

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? 'Creating Account…' : 'Create Account'}
              </button>
              </form>
              ) : null}
            </div>

            <p className="auth-bottom">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>

        <AuthSplitPanel variant="register" />
        </div>
      </div>
    </div>
  );
}
