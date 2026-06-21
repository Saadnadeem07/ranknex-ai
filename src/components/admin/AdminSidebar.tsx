"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Inbox,
  LogOut,
  Menu,
  X,
  Compass,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blog Posts", href: "/admin/blogs", icon: FileText },
  { label: "Case Studies", href: "/admin/case-studies", icon: Briefcase },
  { label: "Submissions", href: "/admin/contacts", icon: Inbox },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="lg:hidden flex items-center justify-between bg-navy-900 border-b border-white/5 px-6 py-4 fixed top-0 left-0 right-0 z-40 h-16">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-white font-heading">
          <Compass className="w-6 h-6 text-teal-500" />
          <span>RankNex Admin</span>
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-2 text-slate-400 hover:text-white rounded-lg bg-navy-850 hover:bg-navy-800 transition-all cursor-pointer"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 lg:top-0 bottom-0 left-0 z-30 w-64 bg-navy-900 border-r border-white/5 py-8 px-4 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          {/* Logo (Desktop only) */}
          <div className="hidden lg:flex items-center gap-2.5 px-3 mb-6">
            <Compass className="w-7 h-7 text-teal-500 animate-pulse" />
            <span className="text-xl font-bold text-white font-heading tracking-wide">
              RankNex Admin
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                    isActive
                      ? "bg-teal-500/10 text-teal-400 border border-teal-500/15"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? "text-teal-400" : "text-slate-400 group-hover:text-white"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/10 transition-all cursor-pointer group"
          >
            <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-20 bg-black/40 backdrop-blur-sm"
        />
      )}
    </>
  );
}
