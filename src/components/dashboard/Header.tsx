'use client';

import { Search, Bell, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-slate-950/60 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-white tracking-tight">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus-within:border-blue-500/50 focus-within:bg-white/10 transition-all duration-200">
          <Search className="w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search transactions"
            className="bg-transparent text-sm text-white placeholder:text-white/40 outline-none w-48"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-slate-950" />
        </button>

        {/* Settings */}
        <button className="hidden sm:block p-2 rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold ring-2 ring-white/10">
          JD
        </div>
      </div>
    </header>
  );
}
