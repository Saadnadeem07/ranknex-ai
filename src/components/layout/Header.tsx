'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  TrendingUp,
  Share2,
  MousePointerClick,
  PenTool,
  Layout,
  Palette,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Navigation data                                                    */
/* ------------------------------------------------------------------ */

interface ServiceItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}

const mainServices: ServiceItem[] = [
  {
    label: 'SEO',
    href: '/services/seo',
    icon: <Search className="w-5 h-5" />,
    description: 'Dominate search rankings with AI-driven strategies',
  },
  {
    label: 'Social Media',
    href: '/services/social-media',
    icon: <Share2 className="w-5 h-5" />,
    description: 'Build brand presence across all platforms',
  },
  {
    label: 'PPC Advertising',
    href: '/services/ppc',
    icon: <MousePointerClick className="w-5 h-5" />,
    description: 'Maximize ROI with data-driven ad campaigns',
  },
  {
    label: 'Content Writing',
    href: '/services/content-writing',
    icon: <PenTool className="w-5 h-5" />,
    description: 'Compelling content that converts visitors',
  },
];

const moreServices: ServiceItem[] = [
  {
    label: 'Web Designing',
    href: '/services/web-designing',
    icon: <Layout className="w-5 h-5" />,
    description: 'Stunning, performance-optimized websites',
  },
  {
    label: 'Branding',
    href: '/services/branding',
    icon: <Palette className="w-5 h-5" />,
    description: 'Craft a memorable brand identity',
  },
];

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Blogs', href: '/blog' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact Us', href: '/contact' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  // Hidden admin access: 6 clicks on logo within 3 seconds
  const clickTimestamps = useRef<number[]>([]);
  const REQUIRED_CLICKS = 6;
  const TIME_WINDOW_MS = 3000;

  const handleLogoClick = useCallback(() => {
    const now = Date.now();
    clickTimestamps.current = [
      ...clickTimestamps.current.filter((t) => now - t < TIME_WINDOW_MS),
      now,
    ];
    if (clickTimestamps.current.length >= REQUIRED_CLICKS) {
      clickTimestamps.current = [];
      router.push('/admin/login');
    }
  }, [router]);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsMobileServicesOpen(false);
  }, [pathname]);

  // Close services dropdown on click outside
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-strong shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* ---- Logo ---- */}
            <button
              onClick={handleLogoClick}
              className="flex items-center select-none transition-transform duration-300 hover:scale-[1.03] active:scale-95"
              aria-label="RankNex AI Home"
            >
              <Logo size={36} />
            </button>

            {/* ---- Desktop Nav ---- */}
            <nav className="hidden lg:flex items-center gap-3">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  /* Services with dropdown */
                  <div key={link.label} ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isActive(link.href)
                          ? 'text-teal-500'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isServicesOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Mega menu dropdown */}
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-navy-900/98 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50"
                        >
                          {/* Arrow */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-navy-900/98 border-l border-t border-white/10" />

                          <div className="grid grid-cols-2 gap-6 relative z-10">
                            {/* Main services */}
                            <div>
                              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                Core Services
                              </p>
                              <div className="space-y-1">
                                {mainServices.map((service) => (
                                  <Link
                                    key={service.href}
                                    href={service.href}
                                    onClick={() => setIsServicesOpen(false)}
                                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors group/item"
                                  >
                                    <div className="mt-0.5 p-2 rounded-lg bg-teal-500/10 text-teal-500 group-hover/item:bg-teal-500/20 transition-colors">
                                      {service.icon}
                                    </div>
                                    <div>
                                      <p className="text-white text-sm font-medium">
                                        {service.label}
                                      </p>
                                      <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                                        {service.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* More services */}
                            <div>
                              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                More
                              </p>
                              <div className="space-y-1">
                                {moreServices.map((service) => (
                                  <Link
                                    key={service.href}
                                    href={service.href}
                                    onClick={() => setIsServicesOpen(false)}
                                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors group/item"
                                  >
                                    <div className="mt-0.5 p-2 rounded-lg bg-cyan-400/10 text-cyan-400 group-hover/item:bg-cyan-400/20 transition-colors">
                                      {service.icon}
                                    </div>
                                    <div>
                                      <p className="text-white text-sm font-medium">
                                        {service.label}
                                      </p>
                                      <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                                        {service.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>

                              {/* CTA inside dropdown */}
                              <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-400/5 border border-teal-500/10">
                                <div className="flex items-center gap-2 mb-1">
                                  <Sparkles className="w-4 h-4 text-teal-500" />
                                  <p className="text-white text-sm font-semibold">
                                    Free SEO Audit
                                  </p>
                                </div>
                                <p className="text-slate-400 text-xs mb-3">
                                  Get a comprehensive analysis of your website
                                </p>
                                <Link
                                  href="/contact"
                                  onClick={() => setIsServicesOpen(false)}
                                  className="inline-flex items-center gap-1 text-teal-500 text-xs font-semibold hover:text-teal-400 transition-colors"
                                >
                                  Get Started
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* Regular nav link */
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive(link.href)
                        ? 'text-teal-500'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* ---- Desktop CTA + Mobile Toggle ---- */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden lg:inline-flex btn-primary !py-2.5 !px-5 !text-sm !rounded-lg"
              >
                <span>Get Free Audit</span>
                <TrendingUp className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---- Mobile Menu Overlay ---- */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[300px] max-w-[85vw] bg-navy-900 border-l border-white/[0.05] overflow-y-auto lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/[0.05]">
                <span className="text-lg font-bold text-white font-heading">
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="p-4">
                <motion.ul
                  className="space-y-1"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                    },
                    closed: {},
                  }}
                >
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.label}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: 20 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {link.hasDropdown ? (
                        <>
                          <button
                            onClick={() =>
                              setIsMobileServicesOpen(!isMobileServicesOpen)
                            }
                            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                              isActive(link.href)
                                ? 'text-teal-500 bg-teal-500/[0.08]'
                                : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                            }`}
                          >
                            {link.label}
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isMobileServicesOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {isMobileServicesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 py-2 space-y-0.5">
                                  {[...mainServices, ...moreServices].map(
                                    (service) => (
                                      <Link
                                        key={service.href}
                                        href={service.href}
                                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                                      >
                                        <span className="text-teal-500/70">
                                          {service.icon}
                                        </span>
                                        {service.label}
                                      </Link>
                                    )
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                            isActive(link.href)
                              ? 'text-teal-500 bg-teal-500/[0.08]'
                              : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 pt-6 border-t border-white/[0.05]"
                >
                  <Link
                    href="/contact"
                    className="btn-primary w-full justify-center !py-3"
                  >
                    <span>Get Free Audit</span>
                    <TrendingUp className="w-4 h-4" />
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
