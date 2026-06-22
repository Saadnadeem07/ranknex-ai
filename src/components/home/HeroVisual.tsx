import { TrendingUp, Search, Users } from 'lucide-react';

const tiles = [
  { label: 'Keywords Top 10', value: '1,240' },
  { label: 'Conversion Rate', value: '6.8%' },
  { label: 'Domain Rating', value: '72' },
];

const bars = [38, 52, 46, 64, 58, 76, 70, 88];

/**
 * Static analytics-dashboard visual. Renders in final state (no per-element
 * JS animation) so it adds no main-thread work on landing — just one cheap
 * CSS fade-in on the whole panel.
 */
export default function HeroVisual() {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-3xl animate-fade-up" style={{ animationDelay: '0.4s' }}>
      {/* Ambient glow */}
      <div className="absolute -inset-6 rounded-[2.5rem] bg-teal-500/10 blur-3xl pointer-events-none" />

      {/* Dashboard card */}
      <div className="relative glass-strong rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
        {/* Window top bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
          <span className="w-3 h-3 rounded-full bg-red-400/70" />
          <span className="w-3 h-3 rounded-full bg-amber-400/70" />
          <span className="w-3 h-3 rounded-full bg-teal-400/70" />
          <span className="ml-3 text-xs text-slate-400 font-medium">RankNex Analytics</span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-semibold text-teal-400 bg-teal-500/10 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" /> Live
          </span>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          {/* Header row */}
          <div className="flex items-end justify-between mb-5">
            <div className="text-left">
              <p className="text-xs text-slate-400 mb-1">Organic Traffic</p>
              <p className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight">
                128,540
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-teal-400 text-sm font-semibold bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-lg">
              <TrendingUp className="w-4 h-4" /> +217%
            </span>
          </div>

          {/* Area chart + bars */}
          <div className="grid grid-cols-3 gap-4">
            {/* Line/area chart */}
            <div className="col-span-2 relative h-28 sm:h-32">
              <svg viewBox="0 0 320 120" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00C9A7" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#00C9A7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 100 L40 92 L80 96 L120 74 L160 78 L200 52 L240 40 L280 30 L320 12 L320 120 L0 120 Z"
                  fill="url(#heroArea)"
                />
                <path
                  d="M0 100 L40 92 L80 96 L120 74 L160 78 L200 52 L240 40 L280 30 L320 12"
                  fill="none"
                  stroke="#00E6BF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Bar chart */}
            <div className="flex items-end justify-between gap-1.5 h-28 sm:h-32 pb-1">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-teal-500/40 to-cyan-400/70"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Mini stat tiles */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {tiles.map((tile) => (
              <div
                key={tile.label}
                className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-left"
              >
                <p className="text-lg font-bold text-white font-heading leading-none">{tile.value}</p>
                <p className="text-[10px] text-slate-400 mt-1.5 leading-tight">{tile.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating accent cards (static position) */}
      <div className="absolute -left-4 sm:-left-8 top-24">
        <div className="flex items-center gap-2.5 glass-strong rounded-xl border border-white/10 px-3.5 py-2.5 shadow-xl shadow-black/30">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/15 text-teal-400">
            <Search className="w-4 h-4" />
          </span>
          <div className="text-left">
            <p className="text-xs font-bold text-white leading-none">#1 Ranking</p>
            <p className="text-[10px] text-slate-400 mt-1">Google Search</p>
          </div>
        </div>
      </div>

      <div className="absolute -right-4 sm:-right-8 bottom-20">
        <div className="flex items-center gap-2.5 glass-strong rounded-xl border border-white/10 px-3.5 py-2.5 shadow-xl shadow-black/30">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-400/15 text-cyan-400">
            <Users className="w-4 h-4" />
          </span>
          <div className="text-left">
            <p className="text-xs font-bold text-white leading-none">+1,240 Leads</p>
            <p className="text-[10px] text-slate-400 mt-1">This month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
