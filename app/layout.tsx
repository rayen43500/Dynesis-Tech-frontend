import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dynesis Tech',
  url: siteUrl,
  description:
    'Agence digitale : design web, développement et solutions IA pour accélérer la croissance des entreprises.',
  sameAs: [] as string[],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Dynesis Tech - Digital Innovation Solutions',
    template: '%s | Dynesis Tech',
  },
  description:
    'Transform your business with cutting-edge web design and development solutions. We create powerful digital experiences for businesses of all sizes.',
  keywords: ['web design', 'web development', 'digital solutions', 'technology', 'innovation', 'agence web'],
  authors: [{ name: 'Dynesis Tech' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'Dynesis Tech',
    title: 'Dynesis Tech - Digital Innovation Solutions',
    description:
      'Transform your business with cutting-edge web design and development solutions. We create powerful digital experiences for businesses of all sizes.',
    images: [{ url: '/images/hero-bg-light.jpg', width: 1200, height: 630, alt: 'Dynesis Tech' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dynesis Tech - Digital Innovation Solutions',
    description:
      'Transform your business with cutting-edge web design and development solutions. We create powerful digital experiences for businesses of all sizes.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${_geist.className} font-sans antialiased bg-background text-foreground`}>
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
