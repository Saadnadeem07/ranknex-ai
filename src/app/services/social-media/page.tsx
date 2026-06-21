import { Metadata } from "next";
import SocialMediaContent from "./SocialMediaContent";

export const metadata: Metadata = {
  title: "Social Media Marketing Agency in Pakistan | SMM Lahore - RankNex AI",
  description: "RankNex AI is a top social media marketing agency in Pakistan, offering custom SMM services in Lahore and UK. Drive brand engagement and leads today.",
  keywords: [
    "social media marketing agency in pakistan",
    "smm agency lahore",
    "social media management uk",
    "social media agency pakistan",
    "instagram marketing services",
    "facebook advertising agency"
  ],
  alternates: {
    canonical: "https://ranknexai.com/services/social-media",
  },
  openGraph: {
    title: "Social Media Marketing (SMM) Services | RankNex AI",
    description: "RankNex AI delivers results-driven social media management and advertising for global brands. Accelerate your social growth.",
    url: "https://ranknexai.com/services/social-media",
    siteName: "RankNex AI",
    locale: "en_US",
    type: "website",
  },
};

export default function SocialMediaPage() {
  return <SocialMediaContent />;
}
