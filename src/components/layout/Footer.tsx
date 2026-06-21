import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  Zap,
  ArrowUpRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services = [
  { label: 'SEO', href: '/services/seo' },
  { label: 'Social Media', href: '/services/social-media' },
  { label: 'PPC Advertising', href: '/services/ppc' },
  { label: 'Content Writing', href: '/services/content-writing' },
  { label: 'Web Designing', href: '/services/web-designing' },
  { label: 'Branding', href: '/services/branding' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/ranknexai', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/ranknexai', label: 'Twitter' },
  {
    icon: Instagram,
    href: 'https://instagram.com/ranknexai',
    label: 'Instagram',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/company/ranknexai',
    label: 'LinkedIn',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] bg-navy-950">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-teal-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* ---- Main grid ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pt-16 pb-12">
          {/* Column 1 – Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-heading tracking-tight">
                Rank<span className="gradient-text-teal">Nex</span>{' '}
                <span className="text-slate-400 font-normal text-sm">AI</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              AI-powered digital marketing agency delivering measurable growth
              through cutting-edge SEO, social media, PPC, and web solutions for
              businesses worldwide.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-teal-500 hover:border-teal-500/30 hover:bg-teal-500/[0.08] transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 – Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-slate-400 text-sm hover:text-teal-500 transition-colors duration-200"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-slate-400 text-sm hover:text-teal-500 transition-colors duration-200"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 – Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/923224044150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-slate-400 text-sm hover:text-teal-500 transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-teal-500/60 group-hover:text-teal-500 transition-colors shrink-0" />
                  <span>03224044150</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ranknexai.com"
                  className="flex items-start gap-3 text-slate-400 text-sm hover:text-teal-500 transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-teal-500/60 group-hover:text-teal-500 transition-colors shrink-0" />
                  <span>info@ranknexai.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-teal-500/60 shrink-0" />
                  <span>Lahore, Pakistan</span>
                </div>
              </li>
            </ul>

            {/* Mini CTA */}
            <div className="mt-6">
              <Link
                href="/contact"
                className="btn-primary !py-2.5 !px-5 !text-xs !rounded-lg w-full justify-center"
              >
                <span>Get Free Audit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ---- Bottom bar ---- */}
        <div className="border-t border-white/[0.05] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} RankNex AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-slate-500 text-xs hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-slate-500 text-xs hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
