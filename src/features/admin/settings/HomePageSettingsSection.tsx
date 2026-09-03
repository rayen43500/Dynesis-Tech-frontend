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
  const [homeColors, setHomeColors] = useState<HomeThemeColors>(settings.theme?.home || {});
  const [resetOpen, setResetOpen] = useState(false);

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
      <SimpleField
        label={t('admin.settings.home.heroImage')}
        value={hero.heroImage || ''}
        onChange={(v) => setHero('heroImage', v)}
        type="url"
      />
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
