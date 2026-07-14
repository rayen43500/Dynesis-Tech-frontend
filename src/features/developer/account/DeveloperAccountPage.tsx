import React, { useEffect, useState } from 'react';
import { Camera, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../../app/providers/AuthProvider';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { resolveMediaUrl } from '../../../shared/utils/resolveMediaUrl';
import {
  useDeveloperAccount,
  useChangeDeveloperPassword,
  useUpdateDeveloperAccount,
  getApiErrorMessage
} from './developerAccountHooks';
import '../../client/client-messages.css';
import '../../client/client-account.css';

type Feedback = { type: 'success' | 'error'; text: string } | null;

export function DeveloperAccountPage() {
  const { t } = useTranslation();
  const { refreshMe } = useAuth();
  const accountQuery = useDeveloperAccount();
  const updateMutation = useUpdateDeveloperAccount();
  const changePasswordMutation = useChangeDeveloperPassword();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [feedback, setFeedback] = useState<Feedback>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState<Feedback>(null);

  useEffect(() => {
    const account = accountQuery.data;
    if (!account) return;
    setDisplayName(account.displayName || '');
    setEmail(account.email || '');
    setPhotoPreview(account.profilePicture ? resolveMediaUrl(account.profilePicture) : '');
    setPhotoFile(null);
  }, [accountQuery.data]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);

    const formData = new FormData();
    formData.append('displayName', displayName.trim());
    if (photoFile) {
      formData.append('photo', photoFile);
    }

    try {
      await updateMutation.mutateAsync(formData);
      await refreshMe();
      setPhotoFile(null);
      setFeedback({ type: 'success', text: t('client.account.success') });
    } catch {
      setFeedback({ type: 'error', text: t('client.account.error') });
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordFeedback(null);

    if (newPassword !== confirmPassword) {
      setPasswordFeedback({ type: 'error', text: t('client.account.password.mismatch') });
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword,
        newPassword
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordFeedback({ type: 'success', text: t('client.account.password.success') });
    } catch (error) {
      setPasswordFeedback({
        type: 'error',
        text: getApiErrorMessage(error, t('client.account.password.error'))
      });
    }
  }

  if (accountQuery.isLoading) {
    return <LoadingState label={t('client.account.loading')} />;
  }

  const showPhoto = photoPreview || photoFile;

  return (
    <div className="client-messages-page">
      <section className="client-message-card client-account-card" aria-label="Developer account settings">
        <form onSubmit={handleSubmit}>
          <section className="admin-section">
            <h3 className="admin-section__title">{t('client.account.profile.title')}</h3>

            <div className="admin-photo-upload-wrap">
              <label className="admin-photo-upload">
                {showPhoto ? (
                  <img src={photoPreview} alt="" className="admin-photo-upload__preview" />
                ) : (
                  <User className="admin-photo-upload__icon" size={28} strokeWidth={1.5} aria-hidden />
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setPhotoFile(file);
                    if (file) setPhotoPreview(URL.createObjectURL(file));
                  }}
                />
              </label>
              <span className="admin-photo-upload__label">
                <Camera size={14} strokeWidth={1.75} aria-hidden style={{ verticalAlign: -2, marginRight: 4 }} />
                {t('client.account.changePhoto')}
              </span>
            </div>

            <div className="admin-grid-2">
              <label className="admin-field">
                <span className="admin-field__label">{t('client.account.name.label')}</span>
                <input
                  id="dev-account-display-name"
                  name="displayName"
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">{t('client.account.email.label')}</span>
                <input
                  id="dev-account-email"
                  name="email"
                  type="email"
                  value={email}
                  disabled
                  readOnly
                  aria-disabled="true"
                />
              </label>
            </div>
          </section>

          <div className="client-account-footer">
            <button type="submit" className="admin-btn" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? t('client.account.saving') : t('client.account.save')}
            </button>
            {feedback ? (
              <p
                className="client-account-feedback"
                style={{ color: feedback.type === 'success' ? '#3A8A3A' : '#E05555' }}
              >
                {feedback.text}
              </p>
            ) : null}
          </div>
        </form>
      </section>

      <section className="client-message-card client-account-card" aria-label="Change developer password">
        <form onSubmit={handlePasswordSubmit}>
          <section className="admin-section">
            <h3 className="admin-section__title">{t('client.account.password.title')}</h3>

            <label className="admin-field">
              <span className="admin-field__label">{t('client.account.password.current.label')}</span>
              <input
                id="dev-account-current-password"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
            <div className="admin-grid-2">
              <label className="admin-field">
                <span className="admin-field__label">{t('client.account.password.new.label')}</span>
                <input
                  id="dev-account-new-password"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">{t('client.account.password.confirm.label')}</span>
                <input
                  id="dev-account-confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
            </div>
          </section>

          <div className="client-account-footer">
            <button type="submit" className="admin-btn" disabled={changePasswordMutation.isPending}>
              {changePasswordMutation.isPending ? t('client.account.password.updating') : t('client.account.password.update')}
            </button>
            {passwordFeedback ? (
              <p
                className="client-account-feedback"
                style={{ color: passwordFeedback.type === 'success' ? '#3A8A3A' : '#E05555' }}
              >
                {passwordFeedback.text}
              </p>
            ) : null}
          </div>
        </form>
      </section>
    </div>
  );
}
