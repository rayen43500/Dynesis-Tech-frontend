export type LocalizedString = { en?: string; fr?: string };

export type ThemeModeColors = {
  accent?: string;
  accent2?: string;
  bg?: string;
  surface?: string;
  text?: string;
  muted?: string;
  border?: string;
};

export type HomeThemeColors = {
  accent?: string;
  accentLight?: string;
  heroCardBg?: string;
  btnPrimary?: string;
  btnSecondary?: string;
  check?: string;
  star?: string;
};

export type ScrollTabContent = {
  label?: LocalizedString;
  tag?: LocalizedString;
  headline1?: LocalizedString;
  headline2?: LocalizedString;
  c1?: LocalizedString;
  c2?: LocalizedString;
  c3?: LocalizedString;
  c4?: LocalizedString;
  person?: LocalizedString;
  role?: LocalizedString;
  image?: string;
  tags?: string[];
  learnHref?: string;
};

export type TestimonialItem = {
  quote?: LocalizedString;
  name?: LocalizedString;
  role?: LocalizedString;
};

export type CustomSectionItem = {
  id: string;
  title?: LocalizedString;
  subtitle?: LocalizedString;
  content?: LocalizedString;
  badge?: LocalizedString;
  buttonText?: LocalizedString;
  buttonLink?: string;
  layoutVariant?: 'card' | 'banner' | 'grid' | 'split';
  enabled?: boolean;
  order?: number;
};

export type TypographySettings = {
  headingFont?: 'Lora' | 'Inter' | 'Outfit' | 'Playfair Display' | 'Plus Jakarta Sans';
  bodyFont?: 'Inter' | 'DM Sans' | 'Roboto' | 'System';
  headingScale?: 'sm' | 'md' | 'lg' | 'xl';
  headingWeight?: '300' | '400' | '500' | '600' | '700';
  letterSpacing?: 'normal' | 'tight' | 'wide';
};

export type PlatformSettings = {
  branding?: {
    siteName?: LocalizedString;
    tagline?: LocalizedString;
    logoUrl?: string;
    logoMark?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    location?: LocalizedString;
    hours?: LocalizedString;
    about?: LocalizedString;
  };
  social?: {
    x?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  copyright?: LocalizedString;
  typography?: TypographySettings;
  customSections?: CustomSectionItem[];
  theme?: {
    defaultMode?: 'light' | 'dark' | 'system';
    global?: {
      light?: ThemeModeColors;
      dark?: ThemeModeColors;
    };
    home?: HomeThemeColors;
  };
  homeContent?: {
    hero?: {
      headline1?: LocalizedString;
      headline2?: LocalizedString;
      subheading?: LocalizedString;
      feature1?: LocalizedString;
      feature2?: LocalizedString;
      feature3?: LocalizedString;
      heroImage?: string;
      techStack?: string[];
      ctaPrimary?: LocalizedString;
      ctaPrimaryHref?: string;
      ctaSecondary?: LocalizedString;
      ctaSecondaryHref?: string;
      matchBadge?: LocalizedString;
      featuredName?: LocalizedString;
      featuredRole?: LocalizedString;
    };
    ratings?: {
      score?: string;
      reviewCount?: LocalizedString;
    };
    testimonials?: {
      heading?: LocalizedString;
      items?: TestimonialItem[];
    };
    intro?: {
      line1?: LocalizedString;
      line2?: LocalizedString;
    };
    scrollTabs?: {
      design?: ScrollTabContent;
      development?: ScrollTabContent;
      transformation?: ScrollTabContent;
    };
  };
};

export type SettingsTab = 'homePage' | 'sections' | 'typography' | 'contact' | 'navbar' | 'footer' | 'sitewide';

