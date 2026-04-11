import React from 'react';
import { motion } from 'motion/react';
import { Terminal, User, Activity, Server, GitBranch, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-[#10141a]/70 backdrop-blur-xl border-b border-primary/10">
      <Link to="/" className="font-headline text-xl font-bold tracking-tighter text-primary hover:syntax-glow transition-all">
        DEV_ARCHITECT
      </Link>
      <div className="flex items-center gap-4">
        <Terminal className="w-5 h-5 text-primary" />
      </div>
    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] z-40 flex flex-col w-64 bg-background border-r border-primary/10 hidden lg:flex">
      <div className="p-6 flex items-center gap-3 border-b border-primary/10 bg-surface-container-low">
        <div className="w-10 h-10 bg-surface-container-high flex items-center justify-center ghost-border">
          <User className="w-4 h-4 text-primary" />
        </div>
        <div>
          <div className="font-mono text-[11px] font-bold text-on-surface">System_User</div>
          <div className="font-mono text-[9px] text-tertiary">Arch: x64_86</div>
        </div>
      </div>
      
      <nav className="flex-1 py-4">
        <SidebarItem icon={<Activity className="w-4 h-4" />} label="#SKILLS" />
        <SidebarItem icon={<Server className="w-4 h-4" />} label="#NETWORK" />
        <SidebarItem icon={<GitBranch className="w-4 h-4" />} label="#PROJECTS" />
        <SidebarItem icon={<FileText className="w-4 h-4" />} label="#ABOUT-ME" active />
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "py-3 px-4 font-mono text-[11px] tracking-wide uppercase transition-all cursor-pointer flex items-center gap-3",
        active 
          ? "text-primary bg-primary/5 border-r-2 border-primary" 
          : "text-tertiary hover:bg-primary/10"
      )}
    >
      {icon} {label}
    </div>
  );
}

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#10141a]/90 backdrop-blur-lg border-t border-primary/10 h-16 flex items-center justify-around z-[60]">
      <div className="flex flex-col items-center gap-1 text-primary">
        <Terminal className="w-5 h-5" />
        <span className="font-mono text-[9px] uppercase">System</span>
      </div>
    </nav>
  );
}
