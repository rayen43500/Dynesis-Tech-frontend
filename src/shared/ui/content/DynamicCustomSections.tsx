import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { usePlatformSettingsOptional } from '../../../app/providers/PlatformSettingsProvider';
import type { CustomSectionItem } from '../../types/platformSettings';

export function DynamicCustomSections() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith('fr') ? 'fr' : 'en') as 'fr' | 'en';
  const settingsCtx = usePlatformSettingsOptional();
  const customSections = settingsCtx?.settings?.customSections || [];

  const activeSections = customSections
    .filter((sec) => sec.enabled !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (activeSections.length === 0) return null;

  return (
    <div className="dynamic-custom-sections-wrapper" style={{ padding: '40px 0', background: 'transparent' }}>
      <div className="dynamic-custom-sections-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '36px' }}>
        {activeSections.map((sec) => (
          <CustomSectionCard key={sec.id} section={sec} lang={lang} />
        ))}
      </div>
    </div>
  );
}

function CustomSectionCard({ section, lang }: { section: CustomSectionItem; lang: 'fr' | 'en' }) {
  const title = section.title?.[lang] || section.title?.fr || section.title?.en;
  const subtitle = section.subtitle?.[lang] || section.subtitle?.fr || section.subtitle?.en;
  const content = section.content?.[lang] || section.content?.fr || section.content?.en;
  const badge = section.badge?.[lang] || section.badge?.fr || section.badge?.en;
  const buttonText = section.buttonText?.[lang] || section.buttonText?.fr || section.buttonText?.en;

  const variant = section.layoutVariant || 'card';

  if (variant === 'banner') {
    return (
      <div
        style={{
          padding: '40px 48px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #eaf4ea 0%, #ffffff 100%)',
          border: '1px solid #b8ddc8',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '16px'
        }}
      >
        {badge && (
          <span style={{ padding: '5px 14px', borderRadius: '9999px', background: '#edf7f2', border: '1px solid #b8ddc8', color: '#2d6a4f', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            {badge}
          </span>
        )}
        {title && <h2 style={{ margin: 0, fontSize: '32px', fontFamily: 'Lora, serif', color: '#1a1a1a', fontWeight: 400 }}>{title}</h2>}
        {subtitle && <p style={{ margin: 0, fontSize: '16px', color: '#4a5568', maxWidth: '700px' }}>{subtitle}</p>}
        {content && <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.6, maxWidth: '800px' }}>{content}</p>}
        {buttonText && section.buttonLink && (
          <Link
            to={section.buttonLink}
            className="andela-nav__btn andela-nav__btn--primary"
            style={{ marginTop: '8px', padding: '12px 28px', textDecoration: 'none' }}
          >
            {buttonText} →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '36px 36px',
        borderRadius: '20px',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
        transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}
    >
      {badge && (
        <span style={{ alignSelf: 'flex-start', padding: '4px 12px', borderRadius: '9999px', background: '#edf7f2', border: '1px solid #b8ddc8', color: '#2d6a4f', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          {badge}
        </span>
      )}
      {title && <h3 style={{ margin: 0, fontSize: '24px', fontFamily: 'Lora, serif', color: '#1a1a1a', fontWeight: 400 }}>{title}</h3>}
      {subtitle && <p style={{ margin: 0, fontSize: '15px', color: '#4a5568' }}>{subtitle}</p>}
      {content && <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>{content}</p>}
      {buttonText && section.buttonLink && (
        <Link
          to={section.buttonLink}
          style={{
            alignSelf: 'flex-start',
            marginTop: '6px',
            color: '#2d6a4f',
            fontWeight: 600,
            fontSize: '14px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {buttonText} →
        </Link>
      )}
    </div>
  );
}
