"use client";

import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { Palette, Compass, BookOpen, Layers } from "lucide-react";

const brandingFeatures = [
  {
    icon: Compass,
    title: "Brand Strategy & Positioning",
    description: "We define your core values, brand voice, target buyer persona, and market positioning statement, laying a solid strategic foundation before designing.",
  },
  {
    icon: Palette,
    title: "Logo & Visual Identity Design",
    description: "Our design team crafts bespoke logo marks, selects custom color palettes, and pairs modern typography that communicates your brand personality.",
  },
  {
    icon: BookOpen,
    title: "Brand Guidelines (Styleguide)",
    description: "Consistency is key. We deliver comprehensive brand styleguides detailing logo usage rules, color codes (HEX/RGB), font families, and visual rules.",
  },
  {
    icon: Layers,
    title: "Marketing Collateral",
    description: "We design premium business cards, letterheads, presentation templates (PowerPoint), social media grid layouts, and digital banners that match your brand.",
  },
];

const brandingProcess = [
  {
    step: "01",
    title: "Discovery & Moodboards",
    description: "We run a brand discovery session and compile visual moodboards to align on the artistic direction and aesthetic tone before starting layout design.",
  },
  {
    step: "02",
    title: "Concept Development",
    description: "We design 3 unique logo and branding concepts, showing them in real-world application mockups (e.g., stationery, website, apparel) for review.",
  },
  {
    step: "03",
    title: "Feedback & Refinement",
    description: "We gather your feedback and run up to three rounds of design tweaks to perfect the logos, color pairings, and chosen typography.",
  },
  {
    step: "04",
    title: "Asset Delivery",
    description: "We package and hand over all final assets in print-ready vector formats (AI, EPS, PDF) along with standard web formats (PNG, SVG, JPG) and guidelines.",
  },
];

const brandingBenefits = [
  "Command premium rates by presenting a highly professional global image",
  "Stand out memorably in a crowded market from generic templated brands",
  "Align all marketing channels (website, ads, social) under one visual standard",
  "Foster customer loyalty through clean, emotionally resonant brand storytelling",
];

const brandingFaqs = [
  {
    question: "What exactly is included in a complete branding package?",
    answer: "A standard package includes brand discovery research, 3 initial logo concepts, visual identity elements (color palette, typography pairings), a digital PDF brand guidelines document, corporate stationery designs (business card, letterhead), and social media launch assets.",
  },
  {
    question: "Do we get the vector source files for our logo?",
    answer: "Yes, absolutely. You will receive 100% ownership of your brand assets. We deliver high-resolution vector files (.AI, .EPS, .PDF) that can be scaled infinitely for billboard printing, along with transparent web formats (.PNG, .SVG).",
  },
  {
    question: "How long does the branding process take?",
    answer: "Typically, a comprehensive brand identity project takes between 3 to 4 weeks. This includes the initial discovery phase, visual direction alignment, concept design, revision rounds, and final asset preparation.",
  },
  {
    question: "Can you help us rebrand an existing business?",
    answer: "Yes, we specialize in rebranding. We analyze what equity your current brand holds, identify gaps in market perception, and modernize your visual identity while maintaining key elements to avoid confusing your existing client base.",
  },
];

export default function BrandingContent() {
  return (
    <ServicePageTemplate
      tag="Brand Identity & Strategy"
      headline="Strategic Branding That Makes You"
      headlineAccent="Unforgettable"
      description="Craft a premium brand identity that commands attention. Our branding specialists define your brand strategy and design visuals that build credibility and trust."
      features={brandingFeatures}
      processSteps={brandingProcess}
      benefits={brandingBenefits}
      faqs={brandingFaqs}
      ctaTitle="Start Your Branding Journey"
      ctaDescription="Ready to define your brand identity? Schedule a free 30-minute discovery call with our brand strategists to discuss your vision and outline a custom roadmap."
    />
  );
}
