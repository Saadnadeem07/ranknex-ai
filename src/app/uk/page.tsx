import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, Globe, Zap, BarChart3, Users, Shield, Headphones, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing & SEO Services for UK Businesses | RankNex AI",
  description: "Affordable, high-quality digital marketing and SEO services for UK businesses. Get international-standard results from RankNex AI — your outsourced digital growth partner.",
  keywords: [
    "seo uk services",
    "seo uk expert",
    "digital marketing agency uk affordable",
    "outsourced it support uk",
    "small business it support london",
    "website maintenance uk",
    "uk wordpress support services",
  ],
  alternates: {
    canonical: "https://ranknexai.com/uk",
  },
  openGraph: {
    title: "Digital Marketing & SEO Services for UK Businesses | RankNex AI",
    description: "Affordable, high-quality digital marketing and SEO services for UK businesses.",
    url: "https://ranknexai.com/uk",
    siteName: "RankNex AI",
    type: "website",
    locale: "en_GB",
  },
};

const ukServices = [
  {
    icon: Search,
    title: "SEO Services for UK Businesses",
    description: "Dominate Google UK search results. Our SEO experts understand the UK market, local search algorithms, and what British consumers search for.",
    href: "/services/seo",
  },
  {
    icon: BarChart3,
    title: "PPC & Google Ads Management",
    description: "Get more qualified leads with expert Google Ads management. We optimise campaigns for UK audiences to maximise your return on ad spend.",
    href: "/services/ppc-advertising",
  },
  {
    icon: Users,
    title: "Social Media Management",
    description: "Build your brand presence across UK social media. From LinkedIn for B2B to Instagram for consumer brands — strategic, results-driven management.",
    href: "/services/social-media",
  },
  {
    icon: Globe,
    title: "Website Design & Maintenance",
    description: "Professional website design and ongoing maintenance for UK businesses. WordPress, custom builds, e-commerce — all built for performance.",
    href: "/services/web-designing",
  },
  {
    icon: Zap,
    title: "Content Marketing",
    description: "SEO-optimised content that ranks and converts. Blog articles, landing pages, and lead magnets crafted for UK audiences.",
    href: "/services/content-writing",
  },
  {
    icon: Shield,
    title: "Branding & Visual Identity",
    description: "Stand out in the UK market with strategic branding that communicates trust, quality, and professionalism.",
    href: "/services/branding",
  },
];

const whyChooseUs = [
  {
    title: "UK-Quality, Pakistan-Priced",
    description: "Get the same calibre of digital marketing work you'd expect from a London agency — at 40-60% lower cost.",
  },
  {
    title: "Dedicated Account Manager",
    description: "A single point of contact who knows your business. No rotating support queues or ticket systems.",
  },
  {
    title: "AI-Powered Efficiency",
    description: "We use AI tools for research, analysis, and optimisation — which means faster execution without cutting corners.",
  },
  {
    title: "Transparent Reporting",
    description: "Monthly reports showing real metrics that matter: traffic, leads, conversions, and ROI. No vanity metrics.",
  },
  {
    title: "UK Business Hours",
    description: "Our team operates during UK business hours. Calls, meetings, and communications happen when it suits you.",
  },
  {
    title: "No Long Contracts",
    description: "Month-to-month engagements. We earn your business through results, not lock-in clauses.",
  },
];

export default function UKPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <div className="absolute inset-0 gradient-bg" />
        <div className="orb orb-teal w-[500px] h-[500px] -top-20 -right-20 opacity-10" />
        <div className="orb orb-cyan w-[400px] h-[400px] bottom-0 -left-20 opacity-10" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-teal-500 text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              Trusted by UK Businesses
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight">
              Affordable Digital Marketing & SEO for{" "}
              <span className="gradient-text">UK Businesses</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              RankNex AI is a Pakistan-based digital agency delivering international-standard SEO, PPC, 
              social media, and web services to UK businesses — at a fraction of the cost of hiring a London agency. 
              Same expertise. Same results. Significantly better value.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                <span>Get Your Free Audit</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/services" className="btn-secondary text-lg px-8 py-4">
                <span>View Our Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 relative z-10">
        <div className="container">
          <div className="glass rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50+", label: "UK Clients Served" },
              { value: "340%", label: "Avg Traffic Growth" },
              { value: "60%", label: "Cost Savings vs Local" },
              { value: "98%", label: "Client Retention" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold gradient-text-teal mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Digital Marketing Services for the <span className="gradient-text-teal">UK Market</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Comprehensive digital marketing solutions tailored for UK businesses, from local SEO to enterprise PPC campaigns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ukServices.map((service, i) => (
              <Link key={i} href={service.href} className="card group">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition-colors">
                  <service.icon className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="text-xl font-semibold font-heading mb-3">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.description}</p>
                <div className="mt-4 text-teal-500 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section-alt">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Why UK Businesses Choose <span className="gradient-text-teal">RankNex AI</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              The quality of a top-tier UK agency, the value of a dedicated offshore partner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="card-glass">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" />
                  <h3 className="text-lg font-semibold font-heading">{item.title}</h3>
                </div>
                <p className="text-slate-400 pl-8">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Getting Started is Simple
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Free Audit", desc: "We analyse your current digital presence and identify opportunities." },
              { step: "02", title: "Custom Strategy", desc: "We build a tailored plan with clear KPIs and realistic timelines." },
              { step: "03", title: "Execute & Optimise", desc: "Our team implements the strategy using AI tools and expert judgement." },
              { step: "04", title: "Report & Scale", desc: "Monthly transparent reporting with continuous improvement." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold text-teal-500/20 mb-4 font-heading">{item.step}</div>
                <h3 className="text-lg font-semibold font-heading mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
                    <ArrowRight className="w-5 h-5 text-teal-500/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="orb orb-teal w-[300px] h-[300px] -top-20 -right-20 opacity-20" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Ready to Grow Your UK Business Online?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Get a free, no-obligation audit of your website and digital marketing. We&apos;ll show you exactly where the opportunities are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                  <span>Get Your Free Audit</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="https://wa.me/923224044150" className="btn-secondary text-lg px-8 py-4">
                  <Headphones className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
