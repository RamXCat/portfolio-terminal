import React from 'react';
import { motion } from 'motion/react';
import { Terminal, User, Activity, Network, GitBranch, FileText, BookOpen, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-tertiary/10 shadow-[0_0_40px_rgba(240,176,255,0.06)] flex justify-between items-center px-6 h-16">
      <Link to="/" className="text-xl font-bold tracking-tighter text-primary font-mono hover:syntax-glow transition-all">DEV_ARCHITECT</Link>
      <div className="flex items-center gap-4">
        <Terminal className="text-primary cursor-pointer active:opacity-80 w-5 h-5" />
        <div className="w-8 h-8 bg-surface-container-high border border-outline-variant flex items-center justify-center">
          <User className="w-4 h-4 text-primary" />
        </div>
      </div>
    </nav>
  );
};

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-40 bg-background border-r border-tertiary/10 flex flex-col pt-20 pb-6 px-4 font-mono text-[0.6875rem] tracking-[5%]">
      <div className="mb-8 px-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary-container/20 flex items-center justify-center">
            <Cpu className="text-primary w-6 h-6" />
          </div>
          <div>
            <div className="text-primary font-bold">ROOT_USER</div>
            <div className="text-tertiary opacity-60">v2.4.0-stable</div>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-1">
        <SidebarLink to="/skills" icon={<Activity className="w-4 h-4" />} label="#SKILLS" active />
        <SidebarLink to="/network" icon={<Network className="w-4 h-4" />} label="#NETWORK" />
        <SidebarLink to="/projects" icon={<GitBranch className="w-4 h-4" />} label="#PROJECTS" />
        <SidebarLink to="/about" icon={<FileText className="w-4 h-4" />} label="#ABOUT-ME" />
      </div>
      <div className="mt-auto border-t border-outline-variant/10 pt-4 space-y-1">
        <a className="flex items-center gap-3 px-4 py-2 text-tertiary opacity-60 hover:text-primary" href="#">
          <BookOpen className="w-4 h-4" />
          <span>Docs</span>
        </a>
      </div>
    </aside>
  );
};

const SidebarLink = ({ icon, label, to, active = false }: { icon: React.ReactNode, label: string, to: string, active?: boolean }) => (
  <Link to={to} className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-in-out ${
    active ? 'text-primary bg-primary/5 font-bold border-l-4 border-primary' : 'text-tertiary opacity-60 hover:bg-primary/10 hover:text-primary'
  }`}>
    {icon}
    <span>{label}</span>
  </Link>
);
