import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../app/providers/AuthProvider';
import { endpoints } from '../../shared/api/endpoints';
import { AuthLogo } from './AuthLogo';
import { AuthSplitPanel } from './AuthSplitPanel';
import { IconApple, IconEnvelope, IconEye, IconGoogle, IconLock } from './AuthIcons';
import { useAuthPageScrollLock } from './useAuthPageScrollLock';
import './auth-pages.css';

export function LoginPage() {
  useAuthPageScrollLock();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    if (emailParam) setEmail(emailParam);
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activationNotice, setActivationNotice] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setActivationNotice(null);
    setLoading(true);
    try {
      const user = await signIn({ email, password });
      navigate(user.role === 'admin' ? '/admin' : '/client', { replace: true });
    } catch (err: any) {
      if (err?.response?.status === 403) {
        setActivationNotice('Please activate your account first. Check your email.');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResendActivation() {
    if (!email) return;
    setResending(true);
    try {
      await endpoints.auth.resendActivation({ email });
      setActivationNotice('Email resent! Check your inbox.');
    } catch {
      setActivationNotice('Please activate your account first. Check your email.');
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="auth-page auth-page--login">
      <AuthLogo />
      <div className="auth-page-container">
        <div className="auth-split">
        <div className="auth-split__left">
          <div className="auth-form">
            <h1 className="auth-title">Welcome Back!</h1>
            <p className="auth-subtitle">Sign in to access your dashboard and manage your projects.</p>

            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="login-email">
                  Email
                </label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <IconEnvelope />
                  </span>
                  <input
                    id="login-email"
                    className="auth-input"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="login-password">
                  Password
                </label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <IconLock />
                  </span>
                  <input
                    id="login-password"
                    className="auth-input auth-input--password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
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
                <a href="#" className="auth-forgot" onClick={(e) => e.preventDefault()}>
                  Forgot Password?
                </a>
              </div>

              {error ? <p className="auth-error">{error}</p> : null}

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
              {activationNotice ? (
                <p className="auth-warning">
                  {activationNotice}{' '}
                  <button type="button" className="auth-warning__link" onClick={handleResendActivation} disabled={resending}>
                    {resending ? 'Resending…' : 'Resend →'}
                  </button>
                </p>
              ) : null}
            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <button type="button" className="auth-social">
              <IconGoogle />
              Continue with Google
            </button>
            <button type="button" className="auth-social">
              <IconApple />
              Continue with Apple
            </button>

            <p className="auth-bottom">
              Don&apos;t have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>

        <AuthSplitPanel variant="login" />
        </div>
      </div>
    </div>
  );
}
