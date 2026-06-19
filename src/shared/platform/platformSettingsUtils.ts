import type { LocalizedString, PlatformSettings, ThemeModeColors } from '../types/platformSettings';

export function pickLocalized(value: LocalizedString | undefined, lang: 'en' | 'fr', fallback = '') {
  if (!value) return fallback;
  return value[lang]?.trim() || value.en?.trim() || value.fr?.trim() || fallback;
}

const GLOBAL_VAR_MAP: Record<keyof ThemeModeColors, string> = {
  accent: '--color-accent',
  accent2: '--color-accent-2',
  bg: '--color-bg',
  surface: '--color-surface',
  text: '--color-text',
  muted: '--color-muted',
  border: '--color-border'
};

const HOME_VAR_MAP: Record<string, string> = {
  accent: '--color-accent',
  accentLight: '--color-accent-light',
  heroCardBg: '--color-hero-card-bg',
  btnPrimary: '--color-btn-primary',
  btnSecondary: '--color-btn-secondary',
  check: '--color-check',
  star: '--color-star'
};

const HOME_THEME_STYLE_ID = 'platform-home-theme';

export function applyGlobalPlatformTheme(settings: PlatformSettings | undefined, mode: 'light' | 'dark') {
  const root = document.documentElement;
  const global = settings?.theme?.global?.[mode];
  if (global) {
    for (const [key, cssVar] of Object.entries(GLOBAL_VAR_MAP)) {
      const val = global[key as keyof ThemeModeColors];
      if (val) root.style.setProperty(cssVar, val);
    }
  }
}

export function applyHomePlatformTheme(settings: PlatformSettings | undefined) {
  const home = settings?.theme?.home;
  let el = document.getElementById(HOME_THEME_STYLE_ID) as HTMLStyleElement | null;

  if (!home) {
    el?.remove();
    return;
  }

  const rules = Object.entries(HOME_VAR_MAP)
    .map(([key, cssVar]) => {
      const val = home[key as keyof typeof home];
      return val ? `  ${cssVar}: ${val};` : '';
    })
    .filter(Boolean)
    .join('\n');

  if (!rules) {
    el?.remove();
    return;
  }

  const css = `.andela-page {\n${rules}\n}`;
  if (!el) {
    el = document.createElement('style');
    el.id = HOME_THEME_STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = css;
}

/**
 * Applies saved platform theme tokens: global HSL on :root, home hex scoped to .andela-page.
 */
export function applyPlatformTheme(settings: PlatformSettings | undefined, mode: 'light' | 'dark') {
  applyGlobalPlatformTheme(settings, mode);
  applyHomePlatformTheme(settings);
}

export function resolveDefaultThemeMode(settings: PlatformSettings | undefined): 'light' | 'dark' {
  const pref = settings?.theme?.defaultMode || 'system';
  if (pref === 'light' || pref === 'dark') return pref;
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
}
