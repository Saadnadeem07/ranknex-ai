import { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Hire AI-Powered Digital Marketing Agency - RankNex AI",
  description: "Get in touch with RankNex AI. Contact our digital marketing and SEO agency in Pakistan for your B2B growth, PPC, web design, or a free audit.",
  keywords: [
    "contact ranknex ai",
    "hire seo agency pakistan",
    "digital marketing agency contact",
    "seo company lahore contact",
    "hire digital marketing agency",
    "free website seo audit"
  ],
  alternates: {
    canonical: "https://ranknexai.com/contact",
  },
  openGraph: {
    title: "Contact RankNex AI | Digital Marketing Partner",
    description: "Ready to scale your business online? Send us a message or chat on WhatsApp. Get a response from our growth consultant within 24 hours.",
    url: "https://ranknexai.com/contact",
    siteName: "RankNex AI",
    locale: "en_US",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
