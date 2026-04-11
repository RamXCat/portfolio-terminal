import { 
  Cpu, 
  Activity, 
  Network, 
  GitBranch, 
  FileText, 
  Settings,
  LayoutGrid
} from 'lucide-react';
import { cn } from '../lib/utils';

const NAV_ITEMS = [
  { id: 'skills', label: '#SKILLS', icon: Activity },
  { id: 'network', label: '#NETWORK', icon: Network },
  { id: 'projects', label: '#PROJECTS', icon: LayoutGrid, active: true },
  { id: 'about', label: '#ABOUT-ME', icon: FileText },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] z-40 flex flex-col bg-background border-r border-primary/10 w-64 font-mono text-[11px] tracking-wide uppercase">
      <div className="p-6 border-b border-primary/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-surface-container-high flex items-center justify-center border border-primary/20">
            <Cpu size={20} className="text-primary" />
          </div>
          <div>
            <div className="text-primary font-bold tracking-tighter">System_User</div>
            <div className="text-tertiary/60 text-[9px]">Arch: x64_86</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-4 py-2 text-tertiary/40 text-[9px] font-bold tracking-[0.2em]">CORE_SYSTEM</div>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href="#"
            className={cn(
              "flex items-center space-x-3 py-3 px-4 transition-all cursor-pointer",
              item.active 
                ? "bg-primary/10 text-primary border-r-2 border-primary" 
                : "text-tertiary hover:bg-primary/10 hover:text-primary"
            )}
          >
            <item.icon size={16} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-primary/5">
        <div className="flex items-center space-x-3 text-tertiary py-2 px-4 hover:text-primary transition-all cursor-pointer">
          <Settings size={14} />
          <span>Settings</span>
        </div>
      </div>
    </aside>
  );
}
