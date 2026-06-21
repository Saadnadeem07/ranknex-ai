import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, Globe, Zap, BarChart3, Users, Shield, Headphones, CheckCircle2, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Powered Digital Marketing & IT Services for US Businesses | RankNex AI",
  description: "Affordable, AI-driven digital marketing, SEO, and IT solutions for US businesses. Premium quality, competitive pricing. Get your free audit today.",
  keywords: [
    "ai automation company",
    "digital marketing agency usa affordable",
    "it services for businesses",
    "managed it services companies",
    "it service companies",
    "affordable seo services usa",
  ],
  alternates: {
    canonical: "https://ranknexai.com/us",
  },
  openGraph: {
    title: "AI-Powered Digital Marketing & IT Services for US Businesses | RankNex AI",
    description: "Affordable, AI-driven digital marketing, SEO, and IT solutions for US businesses.",
    url: "https://ranknexai.com/us",
    siteName: "RankNex AI",
    type: "website",
    locale: "en_US",
  },
};

const usServices = [
  {
    icon: Search,
    title: "SEO & Organic Growth",
    description: "Data-driven SEO strategies built for the competitive US market. From local SEO to enterprise-level campaigns that deliver consistent organic traffic growth.",
    href: "/services/seo",
  },
  {
    icon: BarChart3,
    title: "PPC & Paid Advertising",
    description: "Google Ads, Meta Ads, and LinkedIn campaigns managed by experts who focus on ROAS and cost-per-acquisition, not vanity metrics.",
    href: "/services/ppc-advertising",
  },
  {
    icon: Bot,
    title: "AI Automation Solutions",
    description: "Custom AI chatbots, workflow automation, and intelligent tools that reduce operational costs and accelerate business processes.",
    href: "/services/seo",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "High-performance websites and web applications built with modern frameworks. Fast, secure, conversion-optimized, and built to scale.",
    href: "/services/web-designing",
  },
  {
    icon: Users,
    title: "Social Media Marketing",
    description: "Strategic social media management for US brands. Build authority on LinkedIn, grow on Instagram and TikTok, and drive real business results.",
    href: "/services/social-media",
  },
  {
    icon: Zap,
    title: "Content Strategy",
    description: "SEO-optimized content that establishes authority, generates leads, and supports your sales funnel from awareness to conversion.",
    href: "/services/content-writing",
  },
];

const whyChooseUs = [
  {
    title: "AI-First Approach",
    description: "We leverage AI for research, analysis, and optimization — delivering faster results with data-driven precision.",
  },
  {
    title: "US-Quality at Better Rates",
    description: "Get the same caliber of work you'd expect from a top US agency, delivered by a dedicated team at significantly lower cost.",
  },
  {
    title: "Dedicated Teams",
    description: "Not freelancers. Not rotating contractors. A dedicated team that learns your business and becomes an extension of your company.",
  },
  {
    title: "Performance Guarantee",
    description: "We stake our reputation on results. If we don't deliver measurable improvement, you don't pay. Simple as that.",
  },
  {
    title: "US Timezone Coverage",
    description: "Our team overlaps with US business hours. Real-time communication, scheduled calls, and Slack availability when you need it.",
  },
  {
    title: "Scalable Engagement",
    description: "Start small, scale fast. Our flexible engagement models adapt as your business grows — no rigid retainers.",
  },
];

export default function USPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <div className="absolute inset-0 gradient-bg" />
        <div className="orb orb-teal w-[500px] h-[500px] -top-20 -left-20 opacity-10" />
        <div className="orb orb-cyan w-[400px] h-[400px] bottom-0 -right-20 opacity-10" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-teal-500 text-sm font-medium mb-6">
              <Bot className="w-4 h-4" />
              AI-Powered Digital Growth Partner
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight">
              AI-Driven Digital Marketing & IT Solutions for{" "}
              <span className="gradient-text">US Businesses</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              RankNex AI combines artificial intelligence with human expertise to deliver SEO, PPC, 
              AI automation, and full-stack development services to US companies — with the quality of a 
              Silicon Valley agency and the economics that make growth actually profitable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                <span>Get Your Free Audit</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/services" className="btn-secondary text-lg px-8 py-4">
                <span>Explore Services</span>
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
              { value: "150+", label: "Projects Delivered" },
              { value: "520%", label: "Avg Traffic Growth" },
              { value: "12x", label: "Average Client ROI" },
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
              Enterprise-Grade Services, <span className="gradient-text-teal">Startup-Friendly Pricing</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              From AI automation to full-funnel marketing — everything a US business needs to dominate digitally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usServices.map((service, i) => (
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
              Why US Companies Partner with <span className="gradient-text-teal">RankNex AI</span>
            </h2>
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

      {/* Process */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              How We Work With US Clients
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery Call", desc: "We learn your business, goals, and challenges in a 30-minute strategy call." },
              { step: "02", title: "Free Audit", desc: "We analyze your digital presence and deliver a detailed opportunity report." },
              { step: "03", title: "Custom Roadmap", desc: "A tailored strategy with clear KPIs, timelines, and resource allocation." },
              { step: "04", title: "Execute & Scale", desc: "We implement, optimize, and scale — with transparent monthly reporting." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold text-teal-500/20 mb-4 font-heading">{item.step}</div>
                <h3 className="text-lg font-semibold font-heading mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="orb orb-cyan w-[300px] h-[300px] -top-20 -left-20 opacity-20" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Ready to Scale Your Business with AI-Powered Marketing?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Join 150+ businesses that trust RankNex AI for their digital growth. 
                Get a free audit and see exactly where the opportunities are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                  <span>Get Your Free Audit</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="https://wa.me/923224044150" className="btn-secondary text-lg px-8 py-4">
                  <Headphones className="w-5 h-5" />
                  <span>Schedule a Call</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
