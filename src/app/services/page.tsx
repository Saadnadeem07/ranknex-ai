import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Digital Marketing Services | SEO, PPC, Social Media & Web Design | RankNex AI',
  description:
    'Explore RankNex AI\'s full suite of AI-powered digital marketing services — SEO, social media marketing, PPC advertising, content writing, web design, and branding. Results-driven strategies for businesses in Pakistan and worldwide.',
  keywords: [
    'digital marketing services pakistan',
    'seo services',
    'social media marketing',
    'ppc advertising',
    'content writing services',
    'web design pakistan',
    'branding agency',
  ],
  alternates: {
    canonical: 'https://ranknexai.com/services',
  },
  openGraph: {
    title: 'Digital Marketing Services | RankNex AI',
    description:
      'AI-powered SEO, PPC, social media, content, web design, and branding services that deliver measurable growth.',
    url: 'https://ranknexai.com/services',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
