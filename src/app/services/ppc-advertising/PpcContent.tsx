"use client";

import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { MousePointerClick, Search, Target, Landmark } from "lucide-react";

const ppcFeatures = [
  {
    icon: Search,
    title: "Google Search Ads",
    description: "Capture high-intent buyers exactly when they search for your services. We build and manage keyword-rich Google Ads campaigns that dominate the top spots.",
  },
  {
    icon: Target,
    title: "Social Media Advertising",
    description: "Reach your demographic with high-performing ads on Facebook, Instagram, LinkedIn, and TikTok. We design visually striking ad creative that generates conversions.",
  },
  {
    icon: MousePointerClick,
    title: "Retargeting & Display Ads",
    description: "Bring back warm prospects who visited your website but did not buy. Our retargeting campaigns keep your brand top-of-mind and increase overall conversion rates.",
  },
  {
    icon: Landmark,
    title: "Landing Page Optimization",
    description: "Ads are only half the battle. We review, build, and optimize high-converting landing pages to ensure you get the absolute maximum conversions from your paid clicks.",
  },
];

const ppcProcess = [
  {
    step: "01",
    title: "Strategy & Audit",
    description: "We analyze your target market, perform competitor bidding research, and audit your conversion tracking to ensure every cent is measured.",
  },
  {
    step: "02",
    title: "Campaign Development",
    description: "We set up tracking tags, perform keyword selection, write compelling ad copy variations, and design high-converting visual assets.",
  },
  {
    step: "03",
    title: "Launch & A/B Testing",
    description: "We launch the campaigns with structured budgets and immediately start testing different ad creatives, copy, and audience demographic targets.",
  },
  {
    step: "04",
    title: "Optimize & Scale",
    description: "Our PPC experts constantly adjust bids, add negative keywords, and reallocate budget to the highest-performing campaigns to maximize ROAS.",
  },
];

const ppcBenefits = [
  "Immediate flow of targeted traffic and inbound leads from the day of launch",
  "Highly predictable and controllable client acquisition costs",
  "Reach buyers actively searching with high purchasing intent",
  "Total transparency over ad spend, impressions, clicks, and conversion values",
];

const ppcFaqs = [
  {
    question: "What is PPC and how does it benefit my business?",
    answer: "PPC (Pay-Per-Click) is a model of digital advertising where you pay a fee each time one of your ads is clicked. Unlike organic SEO which takes time to build, PPC allows you to buy visits to your site immediately, making it perfect for rapid lead generation and sales scaling.",
  },
  {
    question: "What is a reasonable starting budget for paid ads?",
    answer: "There is no minimum budget, but we recommend starting with at least $500 to $1,000 per month for ad spend. This budget allows us to gather enough performance data to test keywords, ad copy, and landing pages, optimizing your campaigns effectively.",
  },
  {
    question: "Do you manage both search and social ads?",
    answer: "Yes, we are a full-service PPC agency. We manage search campaigns (Google, Bing) as well as paid social ad campaigns (Meta, Instagram, LinkedIn, TikTok) depending on where your audience is most active and conversion-friendly.",
  },
  {
    question: "How do you ensure our ad spend isn't wasted?",
    answer: "We employ strict optimization techniques: setting up precise negative keywords (so you don't pay for irrelevant clicks), hyper-targeted audience scoping, landing page conversion tests, and active manual bid management to ensure your ads only show to qualified prospects.",
  },
];

export default function PpcContent() {
  return (
    <ServicePageTemplate
      tag="Pay-Per-Click Advertising"
      headline="PPC Advertising Services That Maximize"
      headlineAccent="Every Dollar"
      description="Get instant visibility and high-quality leads. Our certified paid ads specialists build, monitor, and optimize strategic PPC campaigns that drive direct ROI."
      features={ppcFeatures}
      processSteps={ppcProcess}
      benefits={ppcBenefits}
      faqs={ppcFaqs}
      ctaTitle="Request a Free Ad Account Audit"
      ctaDescription="Already running ads? Let our certified specialists perform a free audit on your Google or Meta ad account. We will uncover wasted spend and outline 3 key optimization tips."
    />
  );
}
