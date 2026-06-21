import { Metadata } from "next";
import ContentWritingContent from "./ContentWritingContent";

export const metadata: Metadata = {
  title: "Professional Content Writing Services | SEO Content - RankNex AI",
  description: "RankNex AI offers high-quality content writing services and content marketing strategies for UK, US, and Pakistani brands. Grow rankings with expert copywriting.",
  keywords: [
    "content marketing",
    "content writing services",
    "seo content",
    "professional copywriting",
    "blog writing company",
    "website copywriting agency"
  ],
  alternates: {
    canonical: "https://ranknexai.com/services/content-writing",
  },
  openGraph: {
    title: "Content Writing & Strategy Services | RankNex AI",
    description: "Engage your audience and climb search rankings with expert copywriting, SEO blog posts, and website content optimized for conversions.",
    url: "https://ranknexai.com/services/content-writing",
    siteName: "RankNex AI",
    locale: "en_US",
    type: "website",
  },
};

export default function ContentWritingPage() {
  return <ContentWritingContent />;
}
