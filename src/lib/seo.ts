import { Metadata } from "next";

const SITE_URL = process.env.NEXTAUTH_URL || "https://ranknexai.com";
const SITE_NAME = "RankNex AI";
const DEFAULT_DESCRIPTION = "RankNex AI delivers AI-powered digital marketing, SEO, PPC, social media, and web development services for businesses in Pakistan, UK, and US. Get your free audit today.";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function generateSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  path = "",
  ogImage,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
}: SEOProps): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "" ? `${title} | ${SITE_NAME}` : `${title} | ${SITE_NAME}`;

  const defaultKeywords = [
    "digital marketing agency pakistan",
    "seo company pakistan",
    "ai powered digital marketing",
    "RankNex AI",
    "digital marketing services",
  ];

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    authors: author ? [{ name: author }] : [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: type === "article" ? "article" : "website",
      locale: "en_US",
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };

  return metadata;
}

export function generateArticleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string;
  featuredImage?: string | null;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
    image: post.featuredImage || undefined,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: DEFAULT_DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-322-404-4150",
      contactType: "customer service",
      areaServed: ["PK", "GB", "US"],
      availableLanguage: ["English", "Urdu"],
    },
    sameAs: [
      "https://www.facebook.com/ranknexai",
      "https://www.linkedin.com/company/ranknexai",
      "https://twitter.com/ranknexai",
      "https://www.instagram.com/ranknexai",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
      addressLocality: "Lahore",
    },
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${SITE_URL}${service.url}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
