import React from 'react';
import { Terminal, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-tertiary/10 shadow-[0_0_40px_rgba(240,176,255,0.06)] flex justify-between items-center px-6 h-16">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-bold tracking-tighter text-primary font-mono cursor-pointer hover:syntax-glow transition-all">DEV_ARCHITECT</Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-tertiary/40" />
          <input
            className="bg-surface-high/30 border-0 text-tertiary font-mono text-[0.7rem] pl-8 pr-4 py-1.5 w-48 focus:ring-1 focus:ring-primary outline-none"
            placeholder="SEARCH_NETWORK..."
            type="text"
          />
        </div>
        <Terminal className="w-5 h-5 text-primary cursor-pointer hover:opacity-80" />
        <div className="w-8 h-8 bg-surface-high overflow-hidden border border-primary/20">
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://picsum.photos/seed/user/100/100"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
