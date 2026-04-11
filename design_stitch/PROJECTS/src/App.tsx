import React, { useState } from 'react';
import { 
  Terminal, 
  Settings, 
  User, 
  Cpu, 
  Network as Hub, 
  GitBranch, 
  FileText, 
  Play, 
  LogOut, 
  Code, 
  Eye, 
  Download, 
  ArrowRight,
  LayoutGrid,
  Activity,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './lib/utils';

// --- Components ---

const Sidebar = () => {
  const navItems = [
    { icon: Cpu, label: '#SKILLS', active: false },
    { icon: Hub, label: '#NETWORK', active: false },
    { icon: GitBranch, label: '#PROJETS', active: true },
    { icon: FileText, label: '#ABOUT-ME', active: false },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-40 hidden md:flex flex-col bg-background border-r border-outline-variant/10 py-8 px-4 gap-6 font-mono text-xs tracking-wider">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-surface-container-high border border-outline-variant/20 flex items-center justify-center">
          <User className="text-primary w-5 h-5" />
        </div>
        <div>
          <div className="font-bold text-primary">ROOT_USER</div>
          <div className="text-[10px] opacity-50 uppercase">V.2.0.4-STABLE</div>
        </div>
      </div>
      
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "flex items-center gap-3 px-4 py-3 transition-all cursor-pointer group",
              item.active 
                ? "bg-primary/10 text-primary border-l-2 border-primary" 
                : "text-tertiary opacity-70 hover:bg-tertiary/5 hover:opacity-100"
            )}
          >
            <item.icon className={cn("w-4 h-4", item.active ? "text-primary" : "text-tertiary")} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-8 border-t border-outline-variant/10">
        <div className="flex flex-col gap-1 mt-4">
        </div>
      </div>
    </aside>
  );
};

const TopBar = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-outline-variant/10 flex justify-between items-center px-4 md:px-8 h-16">
      <div className="text-sm md:text-xl font-bold tracking-widest text-primary font-mono truncate">
        ARCH_CORE_V1
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-4 text-primary">
          <button className="hover:text-primary transition-colors duration-200 active:scale-95">
            <Terminal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

const ProjectCard = ({ 
  title, 
  branch, 
  uptime, 
  lang, 
  description, 
  image, 
  featured = false,
  tags = []
}: { 
  title: string; 
  branch?: string; 
  uptime?: string; 
  lang?: string; 
  description: string; 
  image: string; 
  featured?: boolean;
  tags?: string[];
}) => {
  if (featured) {
    return (
      <div className="md:col-span-12 lg:col-span-8 bg-surface-container-low overflow-hidden group relative flex flex-col border-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
        <div className="h-64 md:h-96 w-full relative">
          <img 
            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700" 
            src={image} 
            alt={title}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-wrap gap-2">
            <span className="bg-primary-container/20 text-primary px-3 py-1 text-[10px] font-mono border border-primary/20">STABLE</span>
            <span className="bg-tertiary/10 text-tertiary px-3 py-1 text-[10px] font-mono border border-tertiary/20">V.4.2</span>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-headline font-bold text-white tracking-tight uppercase">{title}</h3>
              <div className="font-mono text-[10px] md:text-xs text-primary mt-1">branch: {branch}</div>
            </div>
            <div className="flex flex-col items-start sm:items-end text-left sm:text-right font-mono text-[10px] text-tertiary opacity-60">
              <span>UPTIME: {uptime}</span>
              <span>LANG: {lang}</span>
            </div>
          </div>
          <p className="text-tertiary/70 text-sm leading-relaxed max-w-2xl">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
            <button className="bg-primary-container text-on-primary-container px-6 py-3 font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary active:scale-95 transition-all w-full sm:w-auto">
              <Eye className="w-4 h-4" />
              INSPECT_CODE
            </button>
            <button className="border border-outline-variant/30 text-white px-6 py-3 font-bold text-xs flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all w-full sm:w-auto">
              <Download className="w-4 h-4" />
              CLONE_REPO
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:col-span-6 lg:col-span-4 bg-surface-container-low p-6 group flex flex-col border-none">
      <div className="aspect-video bg-surface-lowest mb-6 overflow-hidden">
        <img 
          className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" 
          src={image} 
          alt={title}
          referrerPolicy="no-referrer"
        />
      </div>
      <h4 className="font-headline font-bold text-lg mb-2 uppercase text-white">{title}</h4>
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map(tag => (
          <span key={tag} className="text-[9px] font-mono border border-outline-variant/20 px-2 py-0.5">{tag}</span>
        ))}
      </div>
      <button className="mt-auto w-full py-3 bg-surface-container-high text-white font-bold text-xs hover:bg-primary-container hover:text-on-primary-container transition-all">
        VIEW_RESOURCES
      </button>
    </div>
  );
};

const StatsCard = () => {
  return (
    <div className="md:col-span-6 lg:col-span-4 bg-surface-container-high p-6 md:p-8 flex flex-col justify-center gap-2 border-none">
      <div className="text-4xl font-headline font-bold text-primary">2.4k</div>
      <div className="font-mono text-[10px] text-tertiary uppercase tracking-widest">Total_Commits_Daily</div>
      <div className="mt-4 flex gap-1 h-8 items-end">
        {[0.3, 0.6, 0.45, 0.85, 1, 0.7, 0.2].map((h, i) => (
          <div 
            key={i} 
            className="flex-1 bg-primary" 
            style={{ height: `${h * 100}%`, opacity: h }}
          />
        ))}
      </div>
    </div>
  );
};

const ProtocolCard = () => {
  return (
    <div className="md:col-span-12 lg:col-span-4 bg-surface-lowest p-6 md:p-8 flex flex-col justify-between border-none">
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-2">
          <Activity className="text-secondary w-5 h-5" />
          <div className="text-[10px] font-mono text-secondary px-2 py-1 bg-secondary/10 uppercase">Pending_Review</div>
        </div>
        <h3 className="text-xl font-headline font-bold tracking-tight uppercase text-white">Void_Link_Protocol</h3>
        <p className="text-tertiary/60 text-xs leading-relaxed">
          Encrypted bridge system for dark-data synchronization between isolated legacy mainframes.
        </p>
      </div>
      <div className="mt-12 font-mono space-y-3">
        {[
          { label: 'LANGUAGE', value: 'GO / ASSEMBLY' },
          { label: 'COMMIT_HASH', value: 'x9f2a_4bb2' },
          { label: 'COVERAGE', value: '94.2%', highlight: true },
        ].map((item, i) => (
          <React.Fragment key={item.label}>
            <div className="flex justify-between text-[10px] gap-2">
              <span className="text-tertiary">{item.label}</span>
              <span className={cn("text-right", item.highlight ? "text-primary" : "text-white")}>{item.value}</span>
            </div>
            {i < 2 && <div className="w-full h-px bg-outline-variant/10" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const GhostQueryCard = () => {
  return (
    <div className="md:col-span-6 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 bg-surface-container-low border-none">
      <div className="relative min-h-[200px]">
        <img 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 hover:opacity-50 transition-opacity" 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" 
          alt="Circuit Board"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-headline font-bold uppercase tracking-tight text-white">Ghost_Query_DB</h3>
          <div className="text-[10px] font-mono text-tertiary mt-1">NoSQL | Temporal Layering</div>
        </div>
        <p className="text-xs text-tertiary/60 leading-relaxed my-4">
          Sub-second query engine for non-linear databases where data points exist in multiple temporal states.
        </p>
        <a className="text-[10px] font-mono text-primary flex items-center gap-2 hover:underline group" href="#">
          EXPLORE_DOCUMENTATION <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-background text-tertiary selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <TopBar />
      <Sidebar />

      <main className="md:ml-64 pt-24 pb-24 px-4 md:px-12 min-h-screen">
        {/* Hero Section */}
        <section className="mb-16 max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-full">
            <div className="flex items-center gap-2 text-primary font-mono text-[10px] md:text-sm tracking-widest uppercase">
              <Code className="w-4 h-4" />
              <span>Repository Explorer</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold tracking-tighter text-white leading-none">
              PROJECTS<span className="text-primary-container">_</span>GALLERY
            </h1>
            <p className="font-mono text-tertiary-fixed-dim text-xs md:text-sm max-w-xl leading-relaxed opacity-80">
              Displaying active version control clusters. Synchronized with internal neural network branches. System uptime: 99.98% stable.
            </p>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-2 font-mono w-full lg:w-auto">
            <div className="text-[10px] text-tertiary uppercase tracking-[0.2em]">Live Terminal Input</div>
            <div className="bg-surface-container-low px-4 py-3 border border-outline-variant/10 flex items-center gap-3 w-full lg:w-80 overflow-hidden">
              <span className="text-primary shrink-0">&gt;</span>
              <span className="text-white/80 text-sm truncate">filter --tag neural_net</span>
              <span className="code-cursor shrink-0"></span>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
          <ProjectCard 
            featured
            title="Cyber_Nexus_Core"
            branch="main/production_v4"
            uptime="1,422H"
            lang="RUST/WASW"
            description="A decentralized backbone for neural packet processing. Implements Zero-Knowledge proofs for cross-chain identity verification. Engineered for sub-10ms latency in high-density traffic nodes."
            image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
          />

          <ProtocolCard />
          <StatsCard />
          <GhostQueryCard />

          {/* Divider Visual */}
          <div className="md:col-span-12 h-24 bg-surface-lowest flex items-center justify-between px-4 md:px-8 overflow-hidden opacity-30 pointer-events-none">
            <div className="flex gap-4 font-mono text-[8px] md:text-[10px] whitespace-nowrap text-tertiary overflow-hidden">
              <span>ARCH_INIT_SEC_01 [OK]</span>
              <span className="hidden sm:inline">MEMORY_ALLOC_99 [OK]</span>
              <span className="hidden md:inline">DRV_SYNT_LOAD [OK]</span>
            </div>
            <div className="flex-1 mx-4 md:mx-12 border-b border-dashed border-outline-variant/30"></div>
            <div className="font-mono text-[8px] md:text-[10px] text-primary-container whitespace-nowrap">0x000F42_ACTIVE</div>
          </div>

          <ProjectCard 
            title="NEURAL_DECODER"
            tags={['PYTHON', 'PYTORCH']}
            description=""
            image="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"
          />
          <ProjectCard 
            title="BLOCK_SHAPER_API"
            tags={['NODE.JS', 'GRAPHQL']}
            description=""
            image="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop"
          />
          <ProjectCard 
            title="SYNC_PULSE_V2"
            tags={['CPP', 'OPENGL']}
            description=""
            image="https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2071&auto=format&fit=crop"
          />
        </section>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto mt-24 pt-12 border-t border-outline-variant/10 flex flex-col items-center gap-8 font-mono text-[10px] text-tertiary">
          <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-between">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary"></span>
                <span>CORE_STATUS: OPERATIONAL</span>
              </div>
              <div className="text-center md:text-left">LAST_COMMIT: 12_MIN_AGO</div>
            </div>
            <div className="opacity-50 text-center md:text-right">© 2024 ARCH_CORE_V1 // SYSTEM_RESERVED</div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <button className="w-full sm:w-auto px-4 py-2 border border-outline-variant/20 hover:border-primary text-white transition-colors">PREV_CLUSTER</button>
            <div className="flex gap-2">
              <span className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary-container font-bold">01</span>
              <span className="w-10 h-10 flex items-center justify-center border border-outline-variant/20 hover:bg-surface-container-high cursor-pointer transition-colors">02</span>
              <span className="w-10 h-10 flex items-center justify-center border border-outline-variant/20 hover:bg-surface-container-high cursor-pointer transition-colors">03</span>
            </div>
            <button className="w-full sm:w-auto px-4 py-2 border border-outline-variant/20 hover:border-primary text-white transition-colors">NEXT_CLUSTER</button>
          </div>
        </footer>
      </main>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 w-full z-50 md:hidden bg-background/90 backdrop-blur-md border-t border-outline-variant/15 flex justify-around items-center h-16 font-mono text-[10px]">
        <a className="text-tertiary opacity-50 flex flex-col items-center justify-center py-2 flex-1" href="#">
          <Cpu className="w-5 h-5" />
          <span className="mt-1">DIAGS</span>
        </a>
        <a className="text-tertiary opacity-50 flex flex-col items-center justify-center py-2 flex-1" href="#">
          <Hub className="w-5 h-5" />
          <span className="mt-1">NET</span>
        </a>
        <a className="text-primary flex flex-col items-center justify-center py-2 flex-1" href="#">
          <GitBranch className="w-5 h-5" />
          <span className="mt-1 font-bold">GIT</span>
        </a>
        <a className="text-tertiary opacity-50 flex flex-col items-center justify-center py-2 flex-1" href="#">
          <FileText className="w-5 h-5" />
          <span className="mt-1">LOGS</span>
        </a>
      </nav>
    </div>
  );
}
