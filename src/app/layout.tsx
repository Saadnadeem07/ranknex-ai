import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import SiteChrome from '@/components/layout/SiteChrome';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo';

/* ------------------------------------------------------------------ */
/*  Fonts                                                              */
/* ------------------------------------------------------------------ */

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://ranknexai.com'),
  title: {
    default: 'RankNex AI | AI-Powered Digital Marketing Agency',
    template: '%s | RankNex AI',
  },
  description:
    'RankNex AI delivers AI-powered digital marketing, SEO, PPC, social media, and web development services for businesses in Pakistan, UK, and US. Get your free audit today.',
  keywords: [
    'digital marketing agency',
    'SEO company Pakistan',
    'AI powered digital marketing',
    'RankNex AI',
    'PPC advertising',
    'social media marketing',
    'web design Pakistan',
    'content writing services',
    'branding agency',
    'digital marketing Lahore',
  ],
  authors: [{ name: 'RankNex AI' }],
  creator: 'RankNex AI',
  publisher: 'RankNex AI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'RankNex AI',
    title: 'RankNex AI | AI-Powered Digital Marketing Agency',
    description:
      'AI-powered digital marketing agency delivering measurable growth through SEO, PPC, social media, and web solutions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RankNex AI | AI-Powered Digital Marketing Agency',
    description:
      'AI-powered digital marketing agency delivering measurable growth through SEO, PPC, social media, and web solutions.',
  },
  alternates: {
    canonical: '/',
  },
};

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="bg-navy-950 text-slate-300 antialiased">
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
