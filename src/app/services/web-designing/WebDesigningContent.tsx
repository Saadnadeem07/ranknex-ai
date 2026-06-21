"use client";

import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { Monitor, Cpu, ShieldCheck, HeartHandshake } from "lucide-react";

const webFeatures = [
  {
    icon: Monitor,
    title: "Custom UI/UX Design",
    description: "Stand out from templates. We create beautiful, bespoke interfaces that capture your brand essence and guide visitors intuitively toward conversion.",
  },
  {
    icon: Cpu,
    title: "Full-Stack Development",
    description: "Fast, modern development. We specialize in Next.js, React, Node.js, and custom WordPress setups, building robust, scalable web applications.",
  },
  {
    icon: ShieldCheck,
    title: "Website Maintenance & Support",
    description: "Peace of mind. We offer website speed optimization, regular security patches, plugin updates, and backup management to keep your site running safely.",
  },
  {
    icon: HeartHandshake,
    title: "Conversion-Rate Optimization",
    description: "Designed to sell. We place forms, buttons, and trust signals strategically across pages, ensuring your site acts as a 24/7 lead generation tool.",
  },
];

const webProcess = [
  {
    step: "01",
    title: "Wireframe & Design",
    description: "We start by wireframing layouts and designing UI mockups in Figma, working closely with you to finalize details and brand styles.",
  },
  {
    step: "02",
    title: "Coding & Development",
    description: "Our developers write clean, responsive code, converting designs into fast-loading interactive web pages utilizing modern frameworks.",
  },
  {
    step: "03",
    title: "QA & Speed Optimization",
    description: "We test across popular browsers and devices, optimize image sizes, set up lazy loading, and audit code to score 90+ on Google PageSpeed Insights.",
  },
  {
    step: "04",
    title: "Launch & Training",
    description: "We deploy the website to your domain, set up SSL, connect analytics, and provide a training walkthrough so your team can edit content easily.",
  },
];

const webBenefits = [
  "Lightning-fast performance that satisfies Google ranking algorithms",
  "Fully responsive layouts that offer great UX on mobile, tablet, and desktop",
  "High security against malware, bot spam, and database leaks",
  "Scale your business easily with clean, structured code and architecture",
];

const webFaqs = [
  {
    question: "What content management systems (CMS) do you build on?",
    answer: "We build custom websites using React, Next.js, and Tailwind CSS for maximum speed and interactivity. For clients requiring easy blogging and editor controls, we build custom WordPress websites using lightweight page builders (like Elementor or Gutenberg) rather than heavy pre-made themes.",
  },
  {
    question: "Will my website be mobile-friendly and optimized for SEO?",
    answer: "Yes, 100%. Every website we design is built mobile-first, ensuring it looks gorgeous and functions perfectly on all screen sizes. Additionally, we write clean HTML and optimize loading speed, giving you a strong technical SEO foundation.",
  },
  {
    question: "Do you provide hosting and domain names?",
    answer: "We help you select and set up the best hosting providers (such as Vercel, Hostinger, or AWS) and register your domain names. You will have full ownership of your accounts, and we handle the technical installation.",
  },
  {
    question: "What is your website maintenance service?",
    answer: "Our maintenance package includes weekly plugin and core system updates, malware scanning, database optimization, daily backups, and minor content edits. This ensures your site stays fast, secure, and up-to-date.",
  },
];

export default function WebDesigningContent() {
  return (
    <ServicePageTemplate
      tag="Web Design & Development"
      headline="Web Design & Development That"
      headlineAccent="Performs"
      description="Make a powerful first impression with a premium website built for speed, responsiveness, and SEO. We merge beautiful design with custom code to convert visitors into clients."
      features={webFeatures}
      processSteps={webProcess}
      benefits={webBenefits}
      faqs={webFaqs}
      ctaTitle="Get a Custom Website Mockup"
      ctaDescription="Let's discuss your vision. We will outline a complete website structure and create a basic layout concept diagram for your new homepage — 100% free."
    />
  );
}
