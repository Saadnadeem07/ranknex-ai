"use client";

import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { Users2, Compass, Image, BarChart3 } from "lucide-react";

const smmFeatures = [
  {
    icon: Compass,
    title: "Platform Strategy & Audit",
    description: "We analyze your audience and competitors to determine which platforms (Facebook, Instagram, LinkedIn, TikTok, X) are most profitable for your brand.",
  },
  {
    icon: Image,
    title: "Content Creation & Reels",
    description: "Our design and copy teams produce eye-catching graphics, engaging copy, and viral-ready short-form video (Reels, TikToks, Shorts) to capture attention.",
  },
  {
    icon: Users2,
    title: "Community Management",
    description: "We actively monitor comments, direct messages, and brand mentions to engage with your audience, build loyalty, and route hot leads to your sales team.",
  },
  {
    icon: BarChart3,
    title: "Paid Social Campaigns",
    description: "Accelerate your results with hyper-targeted paid social ads. We design and optimize campaigns for lead generation, traffic, and direct e-commerce sales.",
  },
];

const smmProcess = [
  {
    step: "01",
    title: "Brand Strategy Audit",
    description: "We dive deep into your brand voice, industry competition, and target customer demographics to align on clear communication goals.",
  },
  {
    step: "02",
    title: "Content Calendar & Design",
    description: "We draft a 30-day content calendar including visual designs, video concepts, and copy templates, all reviewed and approved by you.",
  },
  {
    step: "03",
    title: "Publishing & Engagement",
    description: "Our team posts according to peak engagement times and actively manages the comments and inbox to nurture incoming inquiries.",
  },
  {
    step: "04",
    title: "Analytics & Optimization",
    description: "We analyze month-over-month engagement rate, reach, click-through rates, and lead metrics to continually refine our creative strategy.",
  },
];

const smmBenefits = [
  "Build a highly loyal and engaged community of brand advocates",
  "Drastically increase brand awareness and organic word-of-mouth recommendations",
  "Turn social channels into consistent customer acquisition pipelines",
  "Clean visual consistency that elevates your brand perception above competitors",
];

const smmFaqs = [
  {
    question: "Which social media platforms should my business focus on?",
    answer: "The ideal platforms depend entirely on your target audience. B2B and professional services see the highest return on LinkedIn and Twitter. E-commerce, lifestyle, and visual brands thrive on Instagram, Facebook, and TikTok. We help you focus budget on the channels where your customers spend their time.",
  },
  {
    question: "Do you create all of the images and videos yourself?",
    answer: "Yes, our team includes professional graphic designers, video editors, and animators. We create custom graphics, design stories, and edit video reels. If you have existing assets, we incorporate them; otherwise, we build files from scratch using stock media, custom animations, and client-provided assets.",
  },
  {
    question: "How often will you post on our accounts?",
    answer: "Post frequency is tailored to your strategy. Typically, we recommend 3 to 5 high-quality feed posts per week, combined with daily active stories. Quality and relevance always win over spamming low-value posts.",
  },
  {
    question: "What metrics do you track to measure SMM success?",
    answer: "We track metrics at every stage: Reach and Impressions (awareness), Likes, Comments, Shares, and Saves (engagement), Link Clicks (traffic), and Form Submissions, Inquiries, or Purchases (conversions). Monthly reports break down exactly what return you got on your investment.",
  },
];

export default function SocialMediaContent() {
  return (
    <ServicePageTemplate
      tag="Social Media Marketing"
      headline="Social Media Marketing That Builds"
      headlineAccent="Brands & Revenue"
      description="Engage your target audience where they spend their time. Our SMM specialists design and execute creative social media campaigns that turn passive followers into active buyers."
      features={smmFeatures}
      processSteps={smmProcess}
      benefits={smmBenefits}
      faqs={smmFaqs}
      ctaTitle="Get a Free Social Media Assessment"
      ctaDescription="Let our social media strategists audit your current social channels. We will give you 3 actionable recommendations on how to improve your engagement and leads — completely free."
    />
  );
}
