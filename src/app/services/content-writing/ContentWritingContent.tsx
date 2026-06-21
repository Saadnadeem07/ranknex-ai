"use client";

import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { PenTool, Search, BookOpen, Mail } from "lucide-react";

const contentFeatures = [
  {
    icon: Search,
    title: "SEO Blog Writing",
    description: "Attract organic search traffic with well-researched, high-value blog posts. We write detailed articles that answer your customers' queries and rank high on Google.",
  },
  {
    icon: PenTool,
    title: "Website Copywriting",
    description: "Make an unforgettable first impression. We write copy for landing pages, homepages, services pages, and about pages that clearly communicates your value.",
  },
  {
    icon: BookOpen,
    title: "Case Studies & Whitepapers",
    description: "Establish industry authority. Our team designs, interviews, and writes compelling case studies and guides that prove your capability and build credibility.",
  },
  {
    icon: Mail,
    title: "Email & Newsletter Copy",
    description: "Nurture leads and retain customers. We build strategic newsletter outlines and sales email sequences that keep subscribers engaged and increase conversions.",
  },
];

const contentProcess = [
  {
    step: "01",
    title: "Research & Interview",
    description: "We research your target audience, analyze competitor topics, and align on a brand voice guidelines to write authentic, accurate copy.",
  },
  {
    step: "02",
    title: "SEO Strategy Outline",
    description: "Before writing, we build a detailed content outline with keyword density metrics, search intent mapping, and clear calls-to-action.",
  },
  {
    step: "03",
    title: "Drafting & Integration",
    description: "Our copywriters compose the draft, weaving in primary and secondary keywords naturally without compromising readability.",
  },
  {
    step: "04",
    title: "Edit & Optimize",
    description: "Our editor reviews the article for formatting, grammar, clarity, and checks keyword targets using SEO optimization tools before delivery.",
  },
];

const contentBenefits = [
  "Build long-term ranking equity that drives free traffic for years",
  "Position your brand as the leading, trusted voice in your industry",
  "Boost website conversions with clear, benefits-focused sales copy",
  "Keep your audience engaged across emails, blogs, and social platforms",
];

const contentFaqs = [
  {
    question: "Do you research our specific industry before writing?",
    answer: "Absolutely. We write for a wide variety of industries including SaaS, B2B services, real estate, healthcare, and e-commerce. Our writers perform deep research and look at competitor articles to ensure our content is accurate, authoritative, and helpful.",
  },
  {
    question: "What is your stance on using AI tools like ChatGPT for writing?",
    answer: "We use AI strategically to speed up keyword research, generate outline ideas, and check grammatical issues. However, we never copy-paste AI outputs. Every sentence is written, structured, and edited by real humans to ensure it has original insights, brand voice alignment, and is free of AI jargon.",
  },
  {
    question: "Are your articles fully SEO-optimized before delivery?",
    answer: "Yes, every blog post and page copy we write comes with custom-optimized meta titles, meta descriptions, image alt tags, structured H1/H2/H3 layouts, and naturally integrated target keywords.",
  },
  {
    question: "What is your typical turnaround time for articles?",
    answer: "Typically, we deliver a standard 1,500-word SEO article within 3 to 5 business days, including editing. Larger orders or technical guides may take slightly longer, depending on scope and resource availability.",
  },
];

export default function ContentWritingContent() {
  return (
    <ServicePageTemplate
      tag="Content Writing & Strategy"
      headline="Content Writing & Strategy That Converts"
      headlineAccent="Readers Into Customers"
      description="Tell your brand story and climb search engine rankings. Our expert copywriters create high-value blogs, landing page copy, and case studies that rank and convert."
      features={contentFeatures}
      processSteps={contentProcess}
      benefits={contentBenefits}
      faqs={contentFaqs}
      ctaTitle="Get a Free Content Sample"
      ctaDescription="Want to test our quality first? We'll write a custom 500-word SEO blog outline or short intro paragraph for your chosen topic — 100% free, so you can see our style."
    />
  );
}
