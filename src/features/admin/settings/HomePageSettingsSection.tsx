import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useResetAdminSettings,
  useSettingsSectionFeedback,
  useUpdateAdminSettings
} from './adminSettingsHooks';
import { ColorField, LocalizedField, SettingsSectionCard, SimpleField } from './SettingsFormFields';
import { SettingsResetModal } from './SettingsResetModal';
import type { HomeThemeColors, LocalizedString, PlatformSettings, ScrollTabContent, TestimonialItem } from '../../../shared/types/platformSettings';
import { endpoints } from '../../../shared/api/endpoints';

type Props = {
  settings: PlatformSettings;
};

const TAB_IDS = ['design', 'development', 'transformation'] as const;
const HOME_COLOR_KEYS = ['accent', 'accentLight', 'heroCardBg', 'btnPrimary', 'btnSecondary', 'check', 'star'] as const;

export function HomePageSettingsSection({ settings }: Props) {
  const { t } = useTranslation();
  const mutation = useUpdateAdminSettings();
  const resetMutation = useResetAdminSettings();
  const { message, setMessage } = useSettingsSectionFeedback();
  const [form, setForm] = useState(settings.homeContent || {});
  const [resetOpen, setResetOpen] = useState(false);
  const [uploadingBackground, setUploadingBackground] = useState(false);
  const [uploadingShowcaseBg, setUploadingShowcaseBg] = useState(false);
  const [uploadingServicesBg, setUploadingServicesBg] = useState(false);
  const [uploadingAuthBg, setUploadingAuthBg] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [uploadingShowcase, setUploadingShowcase] = useState<number | null>(null);
  const [homeColors, setHomeColors] = useState<Record<string, string>>(settings.theme?.home || {});

  useEffect(() => {
    setForm(settings.homeContent || {});
    setHomeColors(settings.theme?.home || {});
  }, [settings]);

  function setHero(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, hero: { ...prev.hero, [key]: value } }));
  }

  function setIntro(key: 'line1' | 'line2', value: LocalizedString) {
    setForm((prev) => ({ ...prev, intro: { ...prev.intro, [key]: value } }));
  }

  function setScrollTab(tab: (typeof TAB_IDS)[number], patch: Partial<ScrollTabContent>) {
    setForm((prev) => ({
      ...prev,
      scrollTabs: {
        ...prev.scrollTabs,
        [tab]: { ...prev.scrollTabs?.[tab], ...patch }
      }
    }));
  }

  function setTestimonial(index: number, patch: Partial<TestimonialItem>) {
    setForm((prev) => {
      const items = [...(prev.testimonials?.items || [])];
      items[index] = { ...items[index], ...patch };
      return { ...prev, testimonials: { ...prev.testimonials, items } };
    });
  }
  async function handleShowcaseUpload(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setMessage('');
    setUploadingShowcase(index);
    try {
      const signedResponse = await endpoints.media.signUpload({ folder: 'homepage/showcase', resourceType: 'image' });
      const signed = signedResponse.data?.data;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signed.apiKey);
      formData.append('timestamp', String(signed.timestamp));
      formData.append('signature', signed.signature);
      formData.append('folder', signed.folder);

      const uploadResponse = await fetch(signed.uploadUrl, { method: 'POST', body: formData });
      if (!uploadResponse.ok) throw new Error('Cloudinary upload failed');
      const uploaded = await uploadResponse.json();

      await endpoints.media.createAsset({
        cloudinaryPublicId: uploaded.public_id,
        secureUrl: uploaded.secure_url,
        folder: 'homepage/showcase',
        altText: `Homepage showcase image ${index + 1}`,
        tags: ['homepage', 'showcase']
      });

      setForm((prev) => {
        const images = [...(prev.showcaseImages || [])];
        images[index] = uploaded.secure_url;
        return { ...prev, showcaseImages: images.slice(0, 6) };
      });
      setMessage(t('admin.settings.home.showcaseUploaded'));
    } catch {
      setMessage(t('admin.settings.home.showcaseUploadFailed'));
    } finally {
      setUploadingShowcase(null);
    }
  }

  function updateHomeColor(key: (typeof HOME_COLOR_KEYS)[number], value: string) {
    setHomeColors((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setMessage('');
    try {
      await mutation.mutateAsync({
        homeContent: form,
        theme: {
          ...settings.theme,
          home: homeColors
        }
      });
      setMessage(t('admin.settings.saved'));
    } catch {
      setMessage(t('admin.settings.saveFailed'));
    }
  }

  async function handleReset() {
    setMessage('');
    try {
      const data = await resetMutation.mutateAsync('homePage');
      setForm(data.homeContent || {});
      setHomeColors(data.theme?.home || {});
      setResetOpen(false);
      setMessage(t('admin.settings.resetSuccess'));
    } catch {
      setMessage(t('admin.settings.resetFailed'));
    }
  }

  async function handleBackgroundUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setMessage('');
    setUploadingBackground(true);
    try {
      const signedResponse = await endpoints.media.signUpload({ folder: 'homepage/backgrounds', resourceType: 'image' });
      const signed = signedResponse.data?.data;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signed.apiKey);
      formData.append('timestamp', String(signed.timestamp));
      formData.append('signature', signed.signature);
      formData.append('folder', signed.folder);

      const uploadResponse = await fetch(signed.uploadUrl, { method: 'POST', body: formData });
      if (!uploadResponse.ok) throw new Error('Cloudinary upload failed');
      const uploaded = await uploadResponse.json();

      await endpoints.media.createAsset({
        cloudinaryPublicId: uploaded.public_id,
        secureUrl: uploaded.secure_url,
        folder: 'homepage/backgrounds',
        altText: 'Homepage hero background',
        tags: ['homepage', 'background']
      });
      setHero('heroBackgroundImage', uploaded.secure_url);
      setMessage(t('admin.settings.home.backgroundUploaded'));
    } catch {
      setMessage(t('admin.settings.home.backgroundUploadFailed'));
    } finally {
      setUploadingBackground(false);
    }
  }

  async function handleShowcaseBgUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setMessage('');
    setUploadingShowcaseBg(true);
    try {
      const signedResponse = await endpoints.media.signUpload({ folder: 'homepage/backgrounds', resourceType: 'image' });
      const signed = signedResponse.data?.data;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signed.apiKey);
      formData.append('timestamp', String(signed.timestamp));
      formData.append('signature', signed.signature);
      formData.append('folder', signed.folder);

      const uploadResponse = await fetch(signed.uploadUrl, { method: 'POST', body: formData });
      if (!uploadResponse.ok) throw new Error('Cloudinary upload failed');
      const uploaded = await uploadResponse.json();

      await endpoints.media.createAsset({
        cloudinaryPublicId: uploaded.public_id,
        secureUrl: uploaded.secure_url,
        folder: 'homepage/backgrounds',
        altText: 'Showcase background image',
        tags: ['homepage', 'showcase', 'background']
      });

      const updatedForm = {
        ...form,
        hero: { ...(form.hero || {}), showcaseBackgroundImage: uploaded.secure_url }
      };
      setForm(updatedForm);

      await mutation.mutateAsync({
        homeContent: updatedForm,
        theme: { ...settings.theme, home: homeColors }
      });
      setMessage('Arrière-plan de la Galerie (Showcase) téléversé et enregistré sur Cloudinary !');
    } catch {
      setMessage('Échec du téléversement de l\'arrière-plan Showcase sur Cloudinary');
    } finally {
      setUploadingShowcaseBg(false);
    }
  }

  async function handleServicesBgUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setMessage('');
    setUploadingServicesBg(true);
    try {
      const signedResponse = await endpoints.media.signUpload({ folder: 'homepage/backgrounds', resourceType: 'image' });
      const signed = signedResponse.data?.data;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signed.apiKey);
      formData.append('timestamp', String(signed.timestamp));
      formData.append('signature', signed.signature);
      formData.append('folder', signed.folder);

      const uploadResponse = await fetch(signed.uploadUrl, { method: 'POST', body: formData });
      if (!uploadResponse.ok) throw new Error('Cloudinary upload failed');
      const uploaded = await uploadResponse.json();

      await endpoints.media.createAsset({
        cloudinaryPublicId: uploaded.public_id,
        secureUrl: uploaded.secure_url,
        folder: 'homepage/backgrounds',
        altText: 'Services background image',
        tags: ['homepage', 'services', 'background']
      });

      const updatedForm = {
        ...form,
        hero: { ...(form.hero || {}), servicesBackgroundImage: uploaded.secure_url }
      };
      setForm(updatedForm);

      await mutation.mutateAsync({
        homeContent: updatedForm,
        theme: { ...settings.theme, home: homeColors }
      });
      setMessage('Arrière-plan des Services téléversé et enregistré sur Cloudinary !');
    } catch {
      setMessage('Échec du téléversement de l\'arrière-plan Services sur Cloudinary');
    } finally {
      setUploadingServicesBg(false);
    }
  }

  async function handleAuthBgUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setMessage('');
    setUploadingAuthBg(true);
    try {
      const signedResponse = await endpoints.media.signUpload({ folder: 'auth/backgrounds', resourceType: 'image' });
      const signed = signedResponse.data?.data;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signed.apiKey);
      formData.append('timestamp', String(signed.timestamp));
      formData.append('signature', signed.signature);
      formData.append('folder', signed.folder);

      const uploadResponse = await fetch(signed.uploadUrl, { method: 'POST', body: formData });
      if (!uploadResponse.ok) throw new Error('Cloudinary upload failed');
      const uploaded = await uploadResponse.json();

      await endpoints.media.createAsset({
        cloudinaryPublicId: uploaded.public_id,
        secureUrl: uploaded.secure_url,
        folder: 'auth/backgrounds',
        altText: 'Authentication page background image',
        tags: ['auth', 'background']
      });

      const updatedForm = {
        ...form,
        hero: { ...(form.hero || {}), authBackgroundImage: uploaded.secure_url }
      };
      setForm(updatedForm);

      await mutation.mutateAsync({
        homeContent: updatedForm,
        branding: { ...(settings.branding || {}), authBackgroundImage: uploaded.secure_url },
        theme: { ...settings.theme, home: homeColors }
      });
      setMessage('Arrière-plan de Connexion / Inscription téléversé et enregistré sur Cloudinary !');
    } catch {
      setMessage('Échec du téléversement de l\'arrière-plan Auth sur Cloudinary');
    } finally {
      setUploadingAuthBg(false);
    }
  }

  async function handleVideoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setMessage('');
    setUploadingVideo(true);
    try {
      const signedResponse = await endpoints.media.signUpload({ folder: 'homepage/videos', resourceType: 'video' });
      const signed = signedResponse.data?.data;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signed.apiKey);
      formData.append('timestamp', String(signed.timestamp));
      formData.append('signature', signed.signature);
      formData.append('folder', signed.folder);

      const uploadResponse = await fetch(signed.uploadUrl, { method: 'POST', body: formData });
      if (!uploadResponse.ok) throw new Error('Cloudinary upload failed');
      const uploaded = await uploadResponse.json();

      await endpoints.media.createAsset({
        cloudinaryPublicId: uploaded.public_id,
        secureUrl: uploaded.secure_url,
        folder: 'homepage/videos',
        altText: 'Homepage hero video',
        tags: ['homepage', 'video']
      });

      const updatedForm = {
        ...form,
        hero: { ...(form.hero || {}), heroVideoUrl: uploaded.secure_url }
      };
      setForm(updatedForm);

      await mutation.mutateAsync({
        homeContent: updatedForm,
        theme: { ...settings.theme, home: homeColors }
      });

      setMessage('Vidéo téléversée et publiée sur l\'accueil avec succès !');
    } catch {
      setMessage('Échec du téléversement de la vidéo sur Cloudinary');
    } finally {
      setUploadingVideo(false);
    }
  }

  async function handlePosterUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setMessage('');
    setUploadingPoster(true);
    try {
      const signedResponse = await endpoints.media.signUpload({ folder: 'homepage/videos', resourceType: 'image' });
      const signed = signedResponse.data?.data;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signed.apiKey);
      formData.append('timestamp', String(signed.timestamp));
      formData.append('signature', signed.signature);
      formData.append('folder', signed.folder);

      const uploadResponse = await fetch(signed.uploadUrl, { method: 'POST', body: formData });
      if (!uploadResponse.ok) throw new Error('Cloudinary upload failed');
      const uploaded = await uploadResponse.json();

      await endpoints.media.createAsset({
        cloudinaryPublicId: uploaded.public_id,
        secureUrl: uploaded.secure_url,
        folder: 'homepage/videos',
        altText: 'Homepage hero video poster',
        tags: ['homepage', 'video', 'poster']
      });

      const updatedForm = {
        ...form,
        hero: { ...(form.hero || {}), heroVideoPoster: uploaded.secure_url }
      };
      setForm(updatedForm);

      await mutation.mutateAsync({
        homeContent: updatedForm,
        theme: { ...settings.theme, home: homeColors }
      });

      setMessage('Couverture vidéo téléversée et enregistrée avec succès !');
    } catch {
      setMessage('Échec du téléversement de la couverture vidéo sur Cloudinary');
    } finally {
      setUploadingPoster(false);
    }
  }

  const hero = form.hero || {};
  const ratings = form.ratings || {};
  const testimonials = form.testimonials || { items: [] };
  const intro = form.intro || {};

  const homeIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6.5L8 2l6 4.5V14a1 1 0 01-1 1H3a1 1 0 01-1-1V6.5z" />
      <path d="M6 15V9h4v6" />
    </svg>
  );

  return (
    <>
      <SettingsSectionCard
        title={t('admin.settings.tabs.homePage')}
        subtitle={t('admin.settings.home.pageSubtitle')}
        icon={homeIcon}
        onSave={() => void handleSave()}
        onReset={() => setResetOpen(true)}
        saving={mutation.isPending}
        resetting={resetMutation.isPending}
        saved={message}
        saveLabel={t('common.save')}
        resetLabel={t('admin.settings.reset')}
      >
      <h3 className="admin-settings-subtitle">{t('admin.settings.home.hero')}</h3>
      <LocalizedField
        label={t('admin.settings.home.headline1')}
        value={hero.headline1 || {}}
        onChange={(v) => setHero('headline1', v)}
      />
      <LocalizedField
        label={t('admin.settings.home.headline2')}
        value={hero.headline2 || {}}
        onChange={(v) => setHero('headline2', v)}
      />
      <LocalizedField
        label={t('admin.settings.home.subheading')}
        value={hero.subheading || {}}
        onChange={(v) => setHero('subheading', v)}
        multiline
      />
      <LocalizedField
        label={t('admin.settings.home.feature1')}
        value={hero.feature1 || {}}
        onChange={(v) => setHero('feature1', v)}
      />
      <LocalizedField
        label={t('admin.settings.home.feature2')}
        value={hero.feature2 || {}}
        onChange={(v) => setHero('feature2', v)}
      />
      <LocalizedField
        label={t('admin.settings.home.feature3')}
        value={hero.feature3 || {}}
        onChange={(v) => setHero('feature3', v)}
      />
      <h3 className="admin-settings-subtitle">🖼️ Personnalisation des Arrière-plans des Sections (Cloudinary)</h3>
      <div className="admin-settings-media" style={{ marginBottom: '32px' }}>
        <div className="admin-settings-media__controls">
          <SimpleField
            label="Arrière-plan du Hero"
            value={hero.heroBackgroundImage || ''}
            onChange={(v) => setHero('heroBackgroundImage', v)}
            type="url"
          />
          <label className="admin-field">
            <span className="admin-field__label admin-field__label--primary">🖼️ Téléverser l'arrière-plan Hero sur Cloudinary</span>
            <input type="file" accept="image/*" onChange={(event) => void handleBackgroundUpload(event)} disabled={uploadingBackground} />
            {uploadingBackground ? <small style={{ color: '#087cf0', marginTop: '4px', display: 'block' }}>Téléversement en cours…</small> : null}
          </label>

          <hr style={{ border: 'none', borderTop: '1px solid #e8e8e8', margin: '14px 0' }} />

          <SimpleField
            label="Arrière-plan de la Galerie (Showcase)"
            value={hero.showcaseBackgroundImage || ''}
            onChange={(v) => setHero('showcaseBackgroundImage', v)}
            type="url"
          />
          <label className="admin-field">
            <span className="admin-field__label admin-field__label--primary">🖼️ Téléverser l'arrière-plan Showcase sur Cloudinary</span>
            <input type="file" accept="image/*" onChange={(event) => void handleShowcaseBgUpload(event)} disabled={uploadingShowcaseBg} />
            {uploadingShowcaseBg ? <small style={{ color: '#087cf0', marginTop: '4px', display: 'block' }}>Téléversement en cours…</small> : null}
          </label>

          <hr style={{ border: 'none', borderTop: '1px solid #e8e8e8', margin: '14px 0' }} />

          <SimpleField
            label="Arrière-plan de la section Services"
            value={hero.servicesBackgroundImage || ''}
            onChange={(v) => setHero('servicesBackgroundImage', v)}
            type="url"
          />
          <label className="admin-field">
            <span className="admin-field__label admin-field__label--primary">🖼️ Téléverser l'arrière-plan Services sur Cloudinary</span>
            <input type="file" accept="image/*" onChange={(event) => void handleServicesBgUpload(event)} disabled={uploadingServicesBg} />
            {uploadingServicesBg ? <small style={{ color: '#087cf0', marginTop: '4px', display: 'block' }}>Téléversement en cours…</small> : null}
          </label>

          <hr style={{ border: 'none', borderTop: '1px solid #e8e8e8', margin: '14px 0' }} />

          <SimpleField
            label="Arrière-plan Page Connexion / Inscription"
            value={hero.authBackgroundImage || ''}
            onChange={(v) => setHero('authBackgroundImage', v)}
            type="url"
          />
          <label className="admin-field">
            <span className="admin-field__label admin-field__label--primary">🖼️ Téléverser l'arrière-plan Auth sur Cloudinary</span>
            <input type="file" accept="image/*" onChange={(event) => void handleAuthBgUpload(event)} disabled={uploadingAuthBg} />
            {uploadingAuthBg ? <small style={{ color: '#087cf0', marginTop: '4px', display: 'block' }}>Téléversement en cours…</small> : null}
          </label>
        </div>

        <div
          className="admin-settings-media__preview admin-settings-media__preview--background"
          aria-label="Aperçu des arrière-plans"
        >
          {hero.heroBackgroundImage ? (
            <div style={{ marginBottom: '10px' }}>
              <small style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>Aperçu Hero :</small>
              <img src={hero.heroBackgroundImage} alt="Aperçu arrière-plan Hero" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
            </div>
          ) : null}
          {hero.showcaseBackgroundImage ? (
            <div style={{ marginBottom: '10px' }}>
              <small style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>Aperçu Showcase :</small>
              <img src={hero.showcaseBackgroundImage} alt="Aperçu arrière-plan Showcase" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
            </div>
          ) : null}
          {hero.servicesBackgroundImage ? (
            <div style={{ marginBottom: '10px' }}>
              <small style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>Aperçu Services :</small>
              <img src={hero.servicesBackgroundImage} alt="Aperçu arrière-plan Services" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
            </div>
          ) : null}
          {hero.authBackgroundImage ? (
            <div>
              <small style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>Aperçu Connexion / Inscription :</small>
              <img src={hero.authBackgroundImage} alt="Aperçu arrière-plan Auth" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
            </div>
          ) : null}
          {!hero.heroBackgroundImage && !hero.showcaseBackgroundImage && !hero.servicesBackgroundImage && !hero.authBackgroundImage && (
            <span className="admin-settings-media__empty">Aucun arrière-plan sélectionné</span>
          )}
        </div>
      </div>
      <h3 className="admin-settings-subtitle">Galerie du site — 6 images</h3>
      <div className="admin-showcase-editor">
        {Array.from({ length: 6 }).map((_, index) => {
          const image = form.showcaseImages?.[index] || '';
          return (
            <div className="admin-showcase-editor__slot" key={index}>
              <div className="admin-showcase-editor__preview">
                {image ? <img src={image} alt={`Aperçu ${index + 1}`} /> : <span>Image {index + 1}</span>}
              </div>
              <input
                type="file"
                accept="image/*"
                aria-label={`Choisir l'image ${index + 1}`}
                onChange={(event) => void handleShowcaseUpload(index, event)}
                disabled={uploadingShowcase !== null}
              />
              {uploadingShowcase === index ? <small>Téléversement…</small> : null}
            </div>
          );
        })}
      </div>
      <h3 className="admin-settings-subtitle">Actions et informations complémentaires</h3>
      <SimpleField
        label={t('admin.settings.home.techStack')}
        value={(hero.techStack || []).join(', ')}
        onChange={(v) => setHero('techStack', v.split(',').map((s) => s.trim()).filter(Boolean))}
      />
      <LocalizedField
        label={t('admin.settings.home.ctaPrimary')}
        value={hero.ctaPrimary || {}}
        onChange={(v) => setHero('ctaPrimary', v)}
      />
      <SimpleField
        label={t('admin.settings.home.ctaPrimaryHref')}
        value={hero.ctaPrimaryHref || ''}
        onChange={(v) => setHero('ctaPrimaryHref', v)}
      />
      <LocalizedField
        label={t('admin.settings.home.ctaSecondary')}
        value={hero.ctaSecondary || {}}
        onChange={(v) => setHero('ctaSecondary', v)}
      />
      <SimpleField
        label={t('admin.settings.home.ctaSecondaryHref')}
        value={hero.ctaSecondaryHref || ''}
        onChange={(v) => setHero('ctaSecondaryHref', v)}
      />
      <LocalizedField
        label={t('admin.settings.home.matchBadge')}
        value={hero.matchBadge || {}}
        onChange={(v) => setHero('matchBadge', v)}
      />
      <LocalizedField
        label={t('admin.settings.home.featuredName')}
        value={hero.featuredName || {}}
        onChange={(v) => setHero('featuredName', v)}
      />
      <LocalizedField
        label={t('admin.settings.home.featuredRole')}
        value={hero.featuredRole || {}}
        onChange={(v) => setHero('featuredRole', v)}
      />

      <h3 className="admin-settings-subtitle">{t('admin.settings.home.ratings')}</h3>
      <SimpleField
        label={t('admin.settings.home.ratingScore')}
        value={ratings.score || ''}
        onChange={(v) => setForm((prev) => ({ ...prev, ratings: { ...prev.ratings, score: v } }))}
      />
      <LocalizedField
        label={t('admin.settings.home.reviewCount')}
        value={ratings.reviewCount || {}}
        onChange={(v) => setForm((prev) => ({ ...prev, ratings: { ...prev.ratings, reviewCount: v } }))}
      />

      <h3 className="admin-settings-subtitle">{t('admin.settings.home.testimonials')}</h3>
      <LocalizedField
        label={t('admin.settings.home.testimonialsHeading')}
        value={testimonials.heading || {}}
        onChange={(v) => setForm((prev) => ({ ...prev, testimonials: { ...prev.testimonials, heading: v } }))}
      />
      {(testimonials.items || []).map((item, idx) => (
        <div key={idx} className="admin-settings-block">
          <div className="admin-settings-block__header">
            <span className="admin-settings-block__number">{idx + 1}</span>
            <h4 className="admin-settings-block__title">{t('admin.settings.home.testimonialN', { n: idx + 1 })}</h4>
          </div>
          <div className="admin-settings-block__body">
            <LocalizedField
              label={t('admin.settings.home.quote')}
              value={item.quote || {}}
              onChange={(v) => setTestimonial(idx, { quote: v })}
              multiline
            />
            <LocalizedField
              label={t('admin.settings.home.name')}
              value={item.name || {}}
              onChange={(v) => setTestimonial(idx, { name: v })}
            />
            <LocalizedField
              label={t('admin.settings.home.role')}
              value={item.role || {}}
              onChange={(v) => setTestimonial(idx, { role: v })}
            />
          </div>
        </div>
      ))}

      <h3 className="admin-settings-subtitle">{t('admin.settings.home.intro')}</h3>
      <LocalizedField
        label={t('admin.settings.home.introLine1')}
        value={intro.line1 || {}}
        onChange={(v) => setIntro('line1', v)}
      />
      <LocalizedField
        label={t('admin.settings.home.introLine2')}
        value={intro.line2 || {}}
        onChange={(v) => setIntro('line2', v)}
      />

      {TAB_IDS.map((tabId) => {
        const tab = form.scrollTabs?.[tabId] || {};
        return (
          <div key={tabId} className="admin-settings-block">
            <div className="admin-settings-block__header">
              <h3 className="admin-settings-block__title">{t(`admin.settings.home.scrollTab.${tabId}`)}</h3>
            </div>
            <div className="admin-settings-block__body">
            <LocalizedField
              label={t('admin.settings.home.tabLabel')}
              value={tab.label || {}}
              onChange={(v) => setScrollTab(tabId, { label: v })}
            />
            <LocalizedField
              label={t('admin.settings.home.tabTag')}
              value={tab.tag || {}}
              onChange={(v) => setScrollTab(tabId, { tag: v })}
            />
            <LocalizedField
              label={t('admin.settings.home.headline1')}
              value={tab.headline1 || {}}
              onChange={(v) => setScrollTab(tabId, { headline1: v })}
            />
            <LocalizedField
              label={t('admin.settings.home.headline2')}
              value={tab.headline2 || {}}
              onChange={(v) => setScrollTab(tabId, { headline2: v })}
            />
            {(['c1', 'c2', 'c3', 'c4'] as const).map((c) => (
              <LocalizedField
                key={c}
                label={t('admin.settings.home.checkItem', { n: c.slice(1) })}
                value={tab[c] || {}}
                onChange={(v) => setScrollTab(tabId, { [c]: v })}
              />
            ))}
            <LocalizedField
              label={t('admin.settings.home.person')}
              value={tab.person || {}}
              onChange={(v) => setScrollTab(tabId, { person: v })}
            />
            <LocalizedField
              label={t('admin.settings.home.role')}
              value={tab.role || {}}
              onChange={(v) => setScrollTab(tabId, { role: v })}
            />
            <SimpleField
              label={t('admin.settings.home.tabImage')}
              value={tab.image || ''}
              onChange={(v) => setScrollTab(tabId, { image: v })}
              type="url"
            />
            <SimpleField
              label={t('admin.settings.home.tabTags')}
              value={(tab.tags || []).join(', ')}
              onChange={(v) => setScrollTab(tabId, { tags: v.split(',').map((s) => s.trim()).filter(Boolean) })}
            />
            <SimpleField
              label={t('admin.settings.home.learnHref')}
              value={tab.learnHref || ''}
              onChange={(v) => setScrollTab(tabId, { learnHref: v })}
            />
            </div>
          </div>
        );
      })}

      <h3 className="admin-settings-subtitle">{t('admin.settings.theme.homePage')}</h3>
      <div className="admin-settings-grid">
        {HOME_COLOR_KEYS.map((key) => (
          <ColorField
            key={key}
            label={t(`admin.settings.theme.homeVars.${key}`)}
            value={homeColors[key] || ''}
            onChange={(v) => updateHomeColor(key, v)}
          />
        ))}
      </div>
    </SettingsSectionCard>

      <SettingsResetModal
        open={resetOpen}
        onCancel={() => setResetOpen(false)}
        onConfirm={() => void handleReset()}
        confirming={resetMutation.isPending}
      />
    </>
  );
}
