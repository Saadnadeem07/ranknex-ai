"use client";

import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { ShieldAlert, Compass, Target, LineChart, Cpu } from "lucide-react";

const seoFeatures = [
  {
    icon: Compass,
    title: "Technical SEO & Site Audits",
    description: "We optimize your site architecture, speed, mobile responsiveness, and schema markup to make it easy for search engines to crawl and index your pages.",
  },
  {
    icon: Target,
    title: "On-Page & Keyword Strategy",
    description: "Target search terms with real intent. We optimize titles, headings, meta tags, and body copy, ensuring your content aligns perfectly with search intent.",
  },
  {
    icon: LineChart,
    title: "Off-Page & Authority Building",
    description: "Earn high-quality backlinks and digital PR placements. We build clean, contextual authority that tells search engines your website is trustworthy.",
  },
  {
    icon: Cpu,
    title: "Generative Engine Optimization (GEO)",
    description: "Go beyond traditional search. We optimize your brand for AI search engines like ChatGPT, Perplexity, and Google Gemini to ensure you're recommended in AI search answers.",
  },
];

const seoProcess = [
  {
    step: "01",
    title: "Audit & Analysis",
    description: "We perform a comprehensive crawl of your website, run competitor analysis, and audit your target keywords to find immediate growth opportunities.",
  },
  {
    step: "02",
    title: "Strategy Formulation",
    description: "We design a custom SEO roadmap mapping out keyword targets, content gaps, technical fixes, and link-building opportunities.",
  },
  {
    step: "03",
    title: "Implementation",
    description: "Our technical and content teams optimize your site code, rebuild metadata, optimize existing pages, and start executing the content plan.",
  },
  {
    step: "04",
    title: "Monitor & Scale",
    description: "We track your keyword rankings, organic traffic, and conversions, providing transparent monthly reports and pivoting to scale winning tactics.",
  },
];

const seoBenefits = [
  "Continuous stream of high-quality organic leads without ongoing ad spend",
  "Higher conversions through landing pages optimized for search intent",
  "Authority and trust established as your brand dominates industry searches",
  "Long-term traffic equity that grows over time and outlasts pay-per-click budgets",
];

const seoFaqs = [
  {
    question: "How long does it take to see results from SEO?",
    answer: "SEO is a long-term investment. Typically, you will start seeing initial improvements in keyword rankings and search impressions within 3 to 6 months. Significant traffic and conversion gains usually show between 6 and 12 months, depending on your niche competitiveness and starting domain authority.",
  },
  {
    question: "Do you guarantee #1 rankings on Google?",
    answer: "No professional SEO company can guarantee specific rankings, as search engine algorithms change constantly and competitors are active. However, we guarantee that our white-hat, AI-supported SEO strategies will improve your overall organic traffic, ranking numbers, and inbound leads.",
  },
  {
    question: "What is the difference between local SEO and international SEO?",
    answer: "Local SEO focuses on optimizing your site for location-based search queries (e.g., 'SEO agency in Lahore') and ranking in Google Maps. International SEO targets broader, non-geographically bound terms (e.g., 'outsourced SEO services') to attract clients in markets like the UK and US.",
  },
  {
    question: "What is Generative Engine Optimization (GEO)?",
    answer: "GEO is the new frontier of search optimization. It involves structuring and formatting your brand information and content so that AI search engines (like Gemini, Perplexity, and ChatGPT Search) reference, quote, and recommend your business when users ask them queries.",
  },
];

export default function SeoContent() {
  return (
    <ServicePageTemplate
      tag="Search Engine Optimization"
      headline="SEO Services That Drive"
      headlineAccent="Real Growth"
      description="Dominate search results and attract high-converting organic traffic. Our AI-driven SEO strategies help businesses in Pakistan, UK, and US outrank competitors and scale leads."
      features={seoFeatures}
      processSteps={seoProcess}
      benefits={seoBenefits}
      faqs={seoFaqs}
      ctaTitle="Get Your Free SEO Audit"
      ctaDescription="Find out exactly what is holding your website back from ranking on page 1. Get a comprehensive technical and content audit from our experts today — 100% free."
    />
  );
}
