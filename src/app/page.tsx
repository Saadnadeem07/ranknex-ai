import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyRankNex from "@/components/home/WhyRankNex";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import CaseStudyPreview from "@/components/home/CaseStudyPreview";
import BlogPreview from "@/components/home/BlogPreview";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "RankNex AI | AI-Powered Digital Marketing & SEO Agency in Pakistan",
  description: "RankNex AI delivers world-class SEO, AI automation solutions, PPC advertising, social media marketing, content writing, and web development for UK, US, and Pakistani businesses. Get your free digital audit today.",
  keywords: [
    "digital marketing agency Pakistan",
    "best SEO company in Pakistan",
    "AI powered digital marketing",
    "SEO agency Lahore",
    "outsourced digital marketing UK",
    "outsourced SEO agency US",
    "web development company Lahore",
    "branding agency Pakistan"
  ],
  alternates: {
    canonical: "https://ranknexai.com",
  },
  openGraph: {
    title: "RankNex AI | AI-Powered Digital Marketing & SEO Agency",
    description: "RankNex AI delivers world-class SEO, AI automation, PPC, social media, content writing, and web development for global businesses.",
    url: "https://ranknexai.com",
    siteName: "RankNex AI",
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-navy-950 text-slate-300 overflow-hidden">
      <HeroSection />
      <StatsBar />
      <ServicesGrid />
      <WhyRankNex />
      <ProcessSection />
      <TestimonialsSlider />
      <CaseStudyPreview />
      <BlogPreview />
      <CTABanner />
    </main>
  );
}
