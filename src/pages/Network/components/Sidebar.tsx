import { Activity, Network, FolderGit2, User, BookOpen, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';

export default function Sidebar() {
  const navItems = [
    { icon: Activity, label: '#SKILLS', active: false },
    { icon: Network, label: '#NETWORK', active: true },
    { icon: FolderGit2, label: '#PROJECT', active: false },
    { icon: User, label: '#ABOUT-ME', active: false },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-40 bg-background border-r border-tertiary/10 flex flex-col pt-20 pb-6 px-4">
      <div className="mb-8 px-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-primary-container flex items-center justify-center">
            <LayoutGrid className="text-on-primary-container w-4 h-4" />
          </div>
          <div>
            <h2 className="text-primary font-bold font-mono text-xs tracking-tighter">ROOT_USER</h2>
            <p className="text-tertiary opacity-60 font-mono text-[0.6rem]">v2.4.0-stable</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 px-4 py-3 font-mono text-[0.6875rem] tracking-[5%] transition-all duration-200 ease-in-out ${
              item.active
                ? 'text-primary bg-primary/5 font-bold border-l-4 border-primary'
                : 'text-tertiary opacity-60 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto space-y-1 border-t border-tertiary/10 pt-4">
        <button className="w-full text-left flex items-center gap-3 px-4 py-2 text-tertiary opacity-60 font-mono text-[0.6875rem] hover:text-primary transition-colors">
          <BookOpen className="w-4 h-4" />
          Docs
        </button>
      </div>
    </aside>
  );
}
