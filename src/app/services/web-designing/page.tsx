import { Metadata } from "next";
import WebDesigningContent from "./WebDesigningContent";

export const metadata: Metadata = {
  title: "Web Design in Pakistan | Website Development Company Lahore - RankNex AI",
  description: "RankNex AI is a top web design and development company in Lahore. We design fast, responsive, custom websites for businesses in UK, US, and Pakistan.",
  keywords: [
    "web design in pakistan",
    "website development company in lahore",
    "website maintenance uk",
    "web design agency lahore",
    "custom nextjs development",
    "wordpress website development"
  ],
  alternates: {
    canonical: "https://ranknexai.com/services/web-designing",
  },
  openGraph: {
    title: "Web Design & Development Services | RankNex AI",
    description: "Launch high-performance websites built for speed, SEO, and conversions. Custom React, Next.js, and WordPress solutions.",
    url: "https://ranknexai.com/services/web-designing",
    siteName: "RankNex AI",
    locale: "en_US",
    type: "website",
  },
};

export default function WebDesigningPage() {
  return <WebDesigningContent />;
}
