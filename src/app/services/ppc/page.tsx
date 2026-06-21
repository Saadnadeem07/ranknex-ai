import { Metadata } from "next";
import PpcContent from "../ppc-advertising/PpcContent";

export const metadata: Metadata = {
  title: "PPC Agency Pakistan | Google Ads Management UK - RankNex AI",
  description: "RankNex AI is a top PPC agency in Pakistan providing certified Google Ads management and Facebook Ads setup for UK, US, and Pakistani brands. Grow your ROAS.",
  keywords: [
    "ppc agency pakistan",
    "google ads management uk",
    "facebook ads agency pakistan",
    "pay per click advertising",
    "certified google ads specialist",
    "paid advertising agency"
  ],
  alternates: {
    canonical: "https://ranknexai.com/services/ppc",
  },
  openGraph: {
    title: "PPC Advertising Services | RankNex AI",
    description: "Certified search and social ad management designed to lower cost per lead and maximize your return on ad spend.",
    url: "https://ranknexai.com/services/ppc",
    siteName: "RankNex AI",
    locale: "en_US",
    type: "website",
  },
};

export default function PpcPage() {
  return <PpcContent />;
}
