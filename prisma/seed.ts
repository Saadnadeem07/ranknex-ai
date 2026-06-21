import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("RankNex@2024", 12);
  
  const admin = await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: {
      password: hashedPassword,
      email: "admin@ranknexai.com",
      name: "RankNex Admin",
    },
    create: {
      username: "admin",
      email: "admin@ranknexai.com",
      password: hashedPassword,
      name: "RankNex Admin",
    },
  });
  console.log("✅ Admin user created:", admin.username);

  // Create blog categories
  const categories = [
    { name: "SEO", slug: "seo" },
    { name: "PPC", slug: "ppc" },
    { name: "Social Media", slug: "social-media" },
    { name: "Content Marketing", slug: "content-marketing" },
    { name: "Web Design", slug: "web-design" },
    { name: "AI & Automation", slug: "ai-automation" },
    { name: "Digital Marketing", slug: "digital-marketing" },
    { name: "Branding", slug: "branding" },
  ];

  for (const cat of categories) {
    await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("✅ Blog categories created");

  // Create sample blog posts
  const seoCategory = await prisma.blogCategory.findUnique({ where: { slug: "seo" } });
  const dmCategory = await prisma.blogCategory.findUnique({ where: { slug: "digital-marketing" } });
  const aiCategory = await prisma.blogCategory.findUnique({ where: { slug: "ai-automation" } });

  const blogPosts = [
    {
      title: "10 SEO Strategies That Will Dominate in 2025",
      slug: "seo-strategies-2025",
      excerpt: "Stay ahead of the competition with these proven SEO strategies that are shaping the future of search engine optimization in 2025 and beyond.",
      content: `<h2>The SEO Landscape is Evolving</h2><p>Search engine optimization has undergone massive changes in recent years. With AI-powered search results, zero-click searches, and evolving user behavior, businesses need to adapt their strategies to stay competitive.</p><h2>1. AI-Optimized Content Strategy</h2><p>Google's algorithms are becoming increasingly sophisticated at understanding content quality and relevance. Focus on creating comprehensive, well-researched content that genuinely answers user queries rather than keyword-stuffed pages.</p><h2>2. Technical SEO Foundation</h2><p>Core Web Vitals remain crucial. Ensure your website loads fast, is mobile-responsive, and provides a smooth user experience. Technical SEO isn't glamorous, but it's the foundation everything else builds upon.</p><h2>3. E-E-A-T Signals</h2><p>Experience, Expertise, Authoritativeness, and Trustworthiness are more important than ever. Showcase your credentials, publish case studies, and build genuine authority in your niche.</p><h2>4. Local SEO Dominance</h2><p>For businesses serving specific geographic areas, local SEO continues to be a goldmine. Optimize your Google Business Profile, build local citations, and generate authentic reviews.</p><h2>5. Video and Visual Search Optimization</h2><p>Video content is becoming increasingly important for SEO. YouTube is the second-largest search engine, and Google increasingly features video results in SERPs.</p><h2>6. Voice Search Optimization</h2><p>With smart speakers and voice assistants becoming ubiquitous, optimizing for conversational queries is essential.</p><h2>7. Schema Markup Implementation</h2><p>Structured data helps search engines understand your content better and can lead to rich snippet results that dramatically improve click-through rates.</p><h2>8. Link Building Through Digital PR</h2><p>Traditional link building is being replaced by digital PR strategies that earn high-quality backlinks through newsworthy content and industry partnerships.</p><h2>9. Content Refreshing Strategy</h2><p>Regularly updating existing content can be more effective than creating new content from scratch. Identify your best-performing pages and keep them current.</p><h2>10. AI Search Engine Optimization (GEO)</h2><p>Generative Engine Optimization is the next frontier. As AI-powered search tools like ChatGPT and Perplexity gain market share, optimizing for these platforms is becoming essential.</p><h2>Ready to Implement These Strategies?</h2><p>At RankNex AI, we combine AI-powered tools with human expertise to deliver SEO results that matter. Contact us for a free SEO audit and discover where your biggest opportunities lie.</p>`,
      featuredImage: null,
      status: "PUBLISHED" as const,
      metaTitle: "10 SEO Strategies That Will Dominate in 2025 | RankNex AI",
      metaDescription: "Discover the top 10 SEO strategies for 2025, from AI-optimized content to GEO. Stay ahead with expert insights from RankNex AI.",
      categoryId: seoCategory?.id,
      tags: "SEO,Strategy,2025,Digital Marketing",
      publishedAt: new Date("2025-01-15"),
    },
    {
      title: "Why Pakistani Businesses Need Digital Marketing Now More Than Ever",
      slug: "pakistani-businesses-digital-marketing",
      excerpt: "The digital landscape in Pakistan is rapidly evolving. Here's why investing in digital marketing is no longer optional for Pakistani businesses looking to grow.",
      content: `<h2>Pakistan's Digital Revolution</h2><p>With over 120 million internet users and growing smartphone penetration, Pakistan's digital landscape presents enormous opportunities for businesses willing to invest in online marketing.</p><h2>The Shift in Consumer Behavior</h2><p>Pakistani consumers are increasingly turning to online search, social media, and e-commerce platforms to discover and purchase products and services. Businesses that aren't visible online are losing customers to competitors who are.</p><h2>Cost-Effective Growth</h2><p>Digital marketing offers Pakistani businesses something traditional advertising can't: measurable, cost-effective reach. A well-executed SEO campaign or PPC strategy can deliver ROI that far exceeds traditional media spending.</p><h2>Competing Globally</h2><p>The beauty of digital marketing is that it levels the playing field. A Pakistan-based business can compete with international companies for the same keywords and the same customers, if their digital strategy is strong enough.</p><h2>The RankNex AI Advantage</h2><p>We understand the Pakistani market deeply while delivering international-standard results. Our AI-powered approach means you get premium digital marketing services without premium international agency pricing.</p>`,
      featuredImage: null,
      status: "PUBLISHED" as const,
      metaTitle: "Why Pakistani Businesses Need Digital Marketing | RankNex AI",
      metaDescription: "Discover why digital marketing is essential for Pakistani businesses. Learn how to leverage SEO, PPC, and social media for growth.",
      categoryId: dmCategory?.id,
      tags: "Pakistan,Digital Marketing,Business Growth",
      publishedAt: new Date("2025-02-01"),
    },
    {
      title: "How AI is Transforming Digital Marketing in 2025",
      slug: "ai-transforming-digital-marketing-2025",
      excerpt: "Artificial intelligence is revolutionizing how agencies approach SEO, PPC, and content marketing. Learn how RankNex AI leverages AI tools for better results.",
      content: `<h2>The AI Revolution in Marketing</h2><p>Artificial intelligence is no longer a futuristic concept in digital marketing — it's the present reality. From automated bid management to AI-generated content suggestions, the tools available to modern marketers are more powerful than ever.</p><h2>AI in SEO</h2><p>AI tools can analyze thousands of keywords, identify content gaps, and predict ranking potential in seconds. At RankNex AI, we use these tools to accelerate our research process while maintaining the strategic human oversight that makes the difference between good and great results.</p><h2>AI in PPC Management</h2><p>Google's own AI-powered bidding strategies have transformed how we manage ad campaigns. Combined with our proprietary analysis tools, we can optimize campaigns more efficiently than ever before.</p><h2>Content at Scale</h2><p>AI helps us produce content briefs, identify trending topics, and optimize existing content faster. But we never publish AI-generated content without human review and refinement — because quality still matters more than quantity.</p><h2>The Human Element</h2><p>Here's what we believe at RankNex AI: AI is a powerful tool, not a replacement for expertise. We use AI to work faster and smarter, but every strategy is built and reviewed by experienced professionals who understand your business.</p>`,
      featuredImage: null,
      status: "PUBLISHED" as const,
      metaTitle: "How AI is Transforming Digital Marketing in 2025 | RankNex AI",
      metaDescription: "Explore how artificial intelligence is changing SEO, PPC, and content marketing. RankNex AI shares insights on leveraging AI for better marketing results.",
      categoryId: aiCategory?.id,
      tags: "AI,Digital Marketing,Innovation,2025",
      publishedAt: new Date("2025-03-10"),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log("✅ Sample blog posts created");

  // Create sample case studies
  const caseStudies = [
    {
      title: "E-Commerce SEO Growth: 340% Organic Traffic Increase",
      slug: "ecommerce-seo-growth-340-percent",
      clientIndustry: "E-Commerce / Retail",
      challenge: "A Pakistan-based e-commerce brand was struggling with minimal organic visibility. Despite having quality products, they relied entirely on paid advertising for traffic, resulting in high customer acquisition costs and razor-thin margins.",
      strategy: "We conducted a comprehensive technical SEO audit, restructured the site architecture for better crawlability, implemented schema markup for all products, built a content hub targeting long-tail buyer-intent keywords, and executed a strategic link-building campaign focusing on industry-relevant publications.",
      results: "Within 8 months, organic traffic increased by 340%, organic revenue grew by 280%, and the cost per acquisition dropped by 62%. The client was able to reduce their PPC spend by 40% while maintaining the same revenue levels.",
      coverImage: null,
      metrics: JSON.stringify({
        "Organic Traffic": "+340%",
        "Revenue Growth": "+280%",
        "CPA Reduction": "-62%",
        "Timeline": "8 Months",
      }),
      featured: true,
      published: true,
    },
    {
      title: "UK SaaS Company: From Page 5 to Position 1",
      slug: "uk-saas-page-5-to-position-1",
      clientIndustry: "SaaS / Technology",
      challenge: "A UK-based SaaS startup needed to compete against established players with massive domain authority. Their primary keywords were ranking on page 5+, and their content strategy was unfocused.",
      strategy: "We implemented a topic cluster strategy targeting their core service areas, optimized their technical SEO foundation, built high-quality backlinks through digital PR and guest posting, and created a conversion-optimized landing page structure.",
      results: "Within 12 months, 15 primary keywords moved to page 1 positions, organic traffic increased by 520%, and demo requests from organic search grew by 410%. The client achieved a 12x ROI on their SEO investment.",
      coverImage: null,
      metrics: JSON.stringify({
        "Keywords on Page 1": "15+",
        "Organic Traffic": "+520%",
        "Demo Requests": "+410%",
        "ROI": "12x",
      }),
      featured: true,
      published: true,
    },
    {
      title: "Real Estate PPC: 5x Return on Ad Spend",
      slug: "real-estate-ppc-5x-roas",
      clientIndustry: "Real Estate",
      challenge: "A real estate developer in Lahore was spending heavily on Google Ads with poor results. Their campaigns were poorly structured, targeting broad keywords with generic ad copy, resulting in a 0.8x ROAS.",
      strategy: "We rebuilt their Google Ads account from scratch with tightly themed ad groups, implemented location-based targeting, created dedicated landing pages for each project, set up conversion tracking, and used AI-powered bid management for continuous optimization.",
      results: "Within 3 months, ROAS improved from 0.8x to 5.2x, cost per lead dropped by 73%, and qualified lead volume increased by 185%. The campaign became the client's primary source of property inquiries.",
      coverImage: null,
      metrics: JSON.stringify({
        "ROAS": "5.2x",
        "Cost Per Lead": "-73%",
        "Lead Volume": "+185%",
        "Timeline": "3 Months",
      }),
      featured: true,
      published: true,
    },
  ];

  for (const cs of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: {},
      create: cs,
    });
  }
  console.log("✅ Sample case studies created");

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
