import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About RankNex AI | AI-Powered SEO & Digital Marketing Agency in Pakistan',
  description:
    'Learn about RankNex AI — a Pakistan-based, globally capable digital marketing agency combining AI intelligence with human creativity to deliver measurable growth for businesses worldwide.',
  keywords: [
    'about ranknex ai',
    'digital marketing agency pakistan',
    'seo company lahore',
    'ai powered marketing agency',
    'best seo company in pakistan',
    'digital marketing experts',
  ],
  alternates: {
    canonical: 'https://ranknexai.com/about',
  },
  openGraph: {
    title: 'About RankNex AI | AI-Powered Digital Marketing Agency',
    description:
      'We combine AI intelligence with human creativity to deliver measurable growth for businesses in Pakistan, UK, and beyond.',
    url: 'https://ranknexai.com/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
