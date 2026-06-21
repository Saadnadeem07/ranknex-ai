import { Metadata } from "next";
import BrandingContent from "./BrandingContent";

export const metadata: Metadata = {
  title: "Branding Agency Pakistan | Brand Strategy & Visual Identity - RankNex AI",
  description: "RankNex AI is a premier branding agency in Pakistan offering brand strategy, logo design, and visual identity services for UK, US, and Pakistani clients.",
  keywords: [
    "branding agency pakistan",
    "brand strategy",
    "visual identity",
    "logo design company lahore",
    "brand guidelines styleguide",
    "corporate rebranding services"
  ],
  alternates: {
    canonical: "https://ranknexai.com/services/branding",
  },
  openGraph: {
    title: "Strategic Branding Services | RankNex AI",
    description: "Craft a memorable visual identity. Logo design, brand strategy, guidelines, and corporate stationery designed to elevate your business.",
    url: "https://ranknexai.com/services/branding",
    siteName: "RankNex AI",
    locale: "en_US",
    type: "website",
  },
};

export default function BrandingPage() {
  return <BrandingContent />;
}
