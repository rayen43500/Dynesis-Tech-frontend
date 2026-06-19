import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../app/providers/AuthProvider';
import { getRoleHomePath } from '../../shared/constants/roles';
import { endpoints } from '../../shared/api/endpoints';
import { AuthLogo } from './AuthLogo';
import { AuthSplitPanel } from './AuthSplitPanel';
import { IconApple, IconEnvelope, IconEye, IconGoogle, IconLock } from './AuthIcons';
import { useAuthPageScrollLock } from './useAuthPageScrollLock';
import './auth-pages.css';

export function LoginPage() {
  useAuthPageScrollLock();
  const { t } = useTranslation();
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
      navigate(getRoleHomePath(user.role), { replace: true });
    } catch (err: any) {
      if (err?.response?.status === 403) {
        setActivationNotice(t('auth.login.error.activationRequired'));
      } else {
        setError(t('auth.login.error.invalidCredentials'));
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
      setActivationNotice(t('auth.login.activationResent'));
    } catch {
      setActivationNotice(t('auth.login.error.activationRequired'));
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
            <h1 className="auth-title">{t('auth.login.title')}</h1>
            <p className="auth-subtitle">{t('auth.login.subtitle')}</p>

            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="login-email">
                  {t('auth.login.email.label')}
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
                    placeholder={t('auth.login.email.placeholder')}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="login-password">
                  {t('auth.login.password.label')}
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
                    placeholder={t('auth.login.password.placeholder')}
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
                <a href="#" className="auth-forgot" onClick={(e) => e.preventDefault()}>
                  {t('auth.login.forgotPassword')}
                </a>
              </div>

              {error ? <p className="auth-error">{error}</p> : null}

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? t('auth.login.submitting') : t('auth.login.submit')}
              </button>
              {activationNotice ? (
                <p className="auth-warning">
                  {activationNotice}{' '}
                  <button type="button" className="auth-warning__link" onClick={handleResendActivation} disabled={resending}>
                    {resending ? t('auth.login.resending') : t('auth.login.resend')}
                  </button>
                </p>
              ) : null}
            </form>

            <div className="auth-divider">
              <span>{t('auth.login.divider')}</span>
            </div>

            <button type="button" className="auth-social">
              <IconGoogle />
              {t('auth.login.continueGoogle')}
            </button>
            <button type="button" className="auth-social">
              <IconApple />
              {t('auth.login.continueApple')}
            </button>

            <p className="auth-bottom">
              {t('auth.login.noAccount')} <Link to="/register">{t('auth.login.signUpLink')}</Link>
            </p>
          </div>
        </div>

        <AuthSplitPanel variant="login" />
        </div>
      </div>
    </div>
  );
}
