export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  status: "DRAFT" | "PUBLISHED";
  metaTitle: string | null;
  metaDescription: string | null;
  categoryId: string | null;
  category?: BlogCategory | null;
  tags: string | null;
  publishedAt: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  posts?: BlogPost[];
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  clientIndustry: string;
  challenge: string;
  strategy: string;
  results: string;
  coverImage: string | null;
  metrics: string | null;
  featured: boolean;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string;
  message: string;
  read: boolean;
  createdAt: Date | string;
}

export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  href: string;
  keywords?: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  country: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
