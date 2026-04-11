/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Layout, 
  Terminal,
  User, 
  Cpu, 
  Network, 
  GitBranch, 
  FileText, 
  Search, 
  Layers, 
  Cloud, 
  Activity, 
  Share2,
  ExternalLink,
  Link as LinkIcon,
  Download
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

// --- Components ---

const Sidebar = () => {
  const navItems = [
    { icon: Cpu, label: '#SKILLS', active: true },
    { icon: Network, label: '#NETWORK' },
    { icon: GitBranch, label: '#PROJECTS' },
    { icon: FileText, label: '#ABOUT-ME' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-40 hidden md:flex flex-col bg-surface border-r border-tertiary/10 py-8 px-4 gap-6 pt-24">
      <div className="flex items-center gap-4 mb-8 px-2">
        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/20">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div className="font-label">
          <div className="font-bold text-primary text-sm">ROOT_USER</div>
          <div className="text-[10px] text-tertiary/70 tracking-widest uppercase">V.2.0.4-STABLE</div>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-4 py-3 px-4 font-label text-xs tracking-wider cursor-pointer transition-all ${
              item.active 
                ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                : 'text-tertiary/70 hover:bg-tertiary/5 hover:text-tertiary'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-2">
      </div>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 glass-panel border-b border-tertiary/10 h-16 flex justify-between items-center px-4 md:px-8">
      <div className="text-lg md:text-xl font-bold tracking-widest text-primary font-label truncate pr-2">
        ARCH_CORE_V1
      </div>
      
      <nav className="hidden md:flex gap-8 items-center h-full">
      </nav>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden lg:flex items-center bg-surface-container-low px-4 py-1 gap-2 border border-outline-variant/15">
          <Search className="w-3 h-3 text-primary" />
          <input 
            className="bg-transparent border-none focus:ring-0 text-xs font-label uppercase tracking-widest w-40 p-0 text-tertiary" 
            placeholder="QUERY_SYSTEM..." 
            type="text"
          />
        </div>
        <div className="flex gap-4">
        </div>
      </div>
    </header>
  );
};

const SkillProgressBar = ({ label, value }: { label: string, value: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between font-label text-[10px] md:text-xs uppercase">
      <span className="truncate pr-2">{label}</span>
      <span className="text-primary">{value}%</span>
    </div>
    <div className="h-[2px] w-full bg-surface-container-highest overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="h-full bg-primary-container"
      />
    </div>
  </div>
);

const LogItem = ({ date, title, description }: { date: string, title: string, description: string }) => (
  <motion.div 
    whileHover={{ backgroundColor: 'var(--color-surface-container-high)' }}
    className="bg-surface-container-low p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start group transition-colors w-full border-b border-outline-variant/10 last:border-0"
  >
    <div className="font-label text-[10px] md:text-xs text-primary min-w-[100px] md:min-w-[120px] pt-1 tracking-widest shrink-0 uppercase">
      {date}
    </div>
    <div className="flex-grow space-y-2 overflow-hidden">
      <h4 className="text-lg md:text-xl font-headline font-bold text-tertiary uppercase group-hover:text-primary transition-colors leading-tight break-words">
        {title}
      </h4>
      <p className="font-body text-[13px] md:text-sm text-tertiary/70 leading-relaxed">
        {description}
      </p>
    </div>
    <div className="flex gap-2 shrink-0 self-end md:self-start">
      <LinkIcon className="w-4 h-4 opacity-20 hover:opacity-100 cursor-pointer transition-opacity" />
      <ExternalLink className="w-4 h-4 opacity-20 hover:opacity-100 cursor-pointer transition-opacity" />
    </div>
  </motion.div>
);

export default function App() {
  const [latency, setLatency] = useState(89.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => +(prev + (Math.random() - 0.5) * 0.5).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-tertiary selection:bg-primary/30 overflow-x-hidden">
      <Header />
      <Sidebar />

      <main className="md:pl-64 pt-20 md:pt-24 pb-24 md:pb-8 px-4 md:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          
          {/* Page Header */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 md:mb-16">
            <div className="space-y-2 w-full">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-primary font-label text-[10px] md:text-xs tracking-[0.3em]"
              >
                <span className="w-8 md:w-12 h-[1px] bg-primary"></span>
                MODULE_STATUS: OPTIMIZED
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold tracking-tighter text-tertiary uppercase leading-[0.9]">
                Diagnostics<br/>
                <span className="text-primary-container">& Expertises</span>
              </h1>
            </div>
            <div className="text-left md:text-right font-label text-[9px] md:text-[10px] text-tertiary/60 uppercase tracking-[0.2em] leading-relaxed max-w-xs border-l-2 md:border-l-0 md:border-r-2 border-primary-container pl-4 md:pl-0 md:pr-6">
              Real-time visualization of cognitive architecture and technical proficiency indices.
            </div>
          </section>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-outline-variant/10 border border-outline-variant/10">
            
            {/* Subsystem 01: Interface Engineering */}
            <div className="md:col-span-8 bg-surface-container-low p-6 md:p-10 flex flex-col justify-between group">
              <div className="flex justify-between items-start mb-8 md:mb-12">
                <div>
                  <span className="font-label text-[10px] text-primary tracking-widest uppercase mb-2 block opacity-60">Subsystem_01</span>
                  <h3 className="text-2xl md:text-3xl font-headline font-bold text-tertiary break-words uppercase">Interface_Engineering</h3>
                </div>
                <Layers className="w-8 h-8 md:w-10 md:h-10 text-primary/30 shrink-0" />
              </div>
              
              <div className="space-y-6 md:space-y-8">
                <SkillProgressBar label="React_Framework" value={98} />
                <SkillProgressBar label="Tailwind_Architecture" value={95} />
                <SkillProgressBar label="ThreeJS_Visualization" value={82} />
              </div>

              <div className="mt-10 md:mt-16 flex flex-wrap gap-2 md:gap-4">
                {['Next.js', 'TypeScript', 'Vite'].map(tag => (
                  <span key={tag} className="px-2 md:px-3 py-1 bg-surface-container-highest text-tertiary font-label text-[8px] md:text-[9px] tracking-widest border border-outline-variant/20 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* System Integrity: Backend Sync */}
            <div className="md:col-span-4 bg-surface-container p-6 md:p-8 border-t md:border-t-0 md:border-l border-outline-variant/10 flex flex-col">
              <div className="mb-8 md:mb-10">
                <span className="font-label text-[10px] text-secondary tracking-widest uppercase mb-2 block opacity-60">System_Integrity</span>
                <h3 className="text-xl font-headline font-bold text-tertiary uppercase break-words">Backend_Sync</h3>
              </div>
              
              <div className="flex-grow flex items-center justify-center relative py-8 md:py-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 md:w-48 md:h-48 border border-outline-variant/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
                  <div className="absolute w-28 h-28 md:w-40 md:h-40 border-t-2 border-secondary rounded-full animate-[spin_10s_linear_infinite]"></div>
                </div>
                <div className="relative text-center">
                  <div className="text-3xl md:text-4xl font-headline font-bold text-secondary syntax-glow">{latency}</div>
                  <div className="text-[8px] md:text-[9px] font-label text-tertiary tracking-widest mt-1">LATENCY_MS</div>
                </div>
              </div>

              <div className="mt-8 md:mt-10 space-y-3 md:space-y-4">
                {[
                  { label: 'Node_Environ', status: 'Ready' },
                  { label: 'PostgreSQL', status: 'Ready' },
                  { label: 'Redis_Cache', status: 'Optimizing' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-[9px] md:text-[10px] font-label text-tertiary uppercase border-b border-outline-variant/10 pb-2">
                    <span>{item.label}</span>
                    <span className="text-secondary">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subsystem 02: Visual Systems */}
            <div className="md:col-span-6 bg-surface-container-low p-6 md:p-8 border-t border-outline-variant/10 relative overflow-hidden group">
              <div className="relative z-10">
                <span className="font-label text-[10px] text-tertiary/60 tracking-widest uppercase mb-2 block opacity-60">Subsystem_02</span>
                <h3 className="text-xl md:text-2xl font-headline font-bold text-tertiary mb-4 md:mb-6 uppercase">Visual_Systems</h3>
                <p className="font-body text-xs md:text-sm text-tertiary/70 leading-relaxed mb-6 md:mb-8 max-w-sm">
                  Architecting design languages through precision-tuned tokens and rigorous brutalist primitives.
                </p>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-surface-container-highest p-3 md:p-4 border border-outline-variant/10">
                    <div className="text-[10px] font-label text-tertiary mb-1 uppercase">Figma</div>
                    <div className="text-xl md:text-2xl font-headline font-bold text-primary uppercase">Adv</div>
                  </div>
                  <div className="bg-surface-container-highest p-3 md:p-4 border border-outline-variant/10">
                    <div className="text-[10px] font-label text-tertiary mb-1 uppercase">Motion</div>
                    <div className="text-xl md:text-2xl font-headline font-bold text-primary uppercase">Int</div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-5 transition-transform group-hover:scale-110 duration-700 pointer-events-none">
                <Layout className="w-40 h-40 md:w-48 md:h-48" />
              </div>
            </div>

            {/* Specialized Grid */}
            <div className="md:col-span-6 bg-surface-container border-t border-outline-variant/10 grid grid-cols-2 gap-px bg-outline-variant/20">
              {[
                { icon: Terminal, label: 'SCRIPT_L3', value: 'Python', color: 'text-primary' },
                { icon: Cloud, label: 'DEPLOY_L5', value: 'Docker', color: 'text-secondary' },
                { icon: Activity, label: 'DATA_L1', value: 'SQL_MOD', color: 'text-primary' },
                { icon: Share2, label: 'FLOW_L4', value: 'GraphQL', color: 'text-secondary' },
              ].map((item, i) => (
                <div key={i} className="bg-surface-container p-4 md:p-6 flex flex-col justify-between">
                  <item.icon className={`w-5 h-5 ${item.color} mb-4`} />
                  <div className="overflow-hidden">
                    <div className="text-[8px] md:text-[9px] font-label text-tertiary mb-1 uppercase">{item.label}</div>
                    <div className="text-base md:text-lg font-headline font-bold uppercase truncate">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Log */}
          <section className="mt-16 md:mt-24 space-y-8 md:space-y-12">
            <div className="flex items-center gap-4 md:gap-6">
              <h2 className="text-xl md:text-2xl font-headline font-bold tracking-widest text-primary uppercase whitespace-nowrap">Execution_Log</h2>
              <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
            </div>
            
            <div className="border border-outline-variant/10">
              <LogItem 
                date="2022-2024"
                title="Lead System Architect / NEXUS_LABS"
                description="Orchestrating the development of decentralized dashboard architectures for real-time telemetry processing and high-fidelity interface systems."
              />
              <LogItem 
                date="2020-2022"
                title="Core Interface Dev / SYNTH_MEDIA"
                description="Deployment of global-scale UI components for high-traffic media portals, focusing on 0-radius brutalist aesthetics and performance metrics."
              />
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-8 pb-8 md:pb-0">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-primary animate-pulse shrink-0"></div>
              <div className="font-label text-[10px] md:text-xs tracking-widest uppercase">Kernel_Status: All Systems Nominal</div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full md:w-auto">
              <button className="font-label text-[10px] md:text-xs text-tertiary hover:text-primary transition-colors uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                <Download className="w-3 h-3" />
                <span>Download_Bio</span>
              </button>
              <button className="bg-primary-container px-6 md:px-8 py-3 text-on-primary-container font-label text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] active:scale-95 transition-transform w-full sm:w-auto">
                Initiate_Linkage
              </button>
            </div>
          </section>

        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 w-full z-50 md:hidden glass-panel border-t border-tertiary/15 flex justify-around items-center h-16 px-2">
        {[
          { icon: Cpu, label: 'DIAGS', active: true },
          { icon: Network, label: 'NET' },
          { icon: GitBranch, label: 'GIT' },
          { icon: FileText, label: 'LOGS' },
        ].map(item => (
          <div key={item.label} className={`flex flex-col items-center justify-center py-2 font-label text-[9px] min-w-0 flex-1 ${item.active ? 'text-primary' : 'text-tertiary/50'}`}>
            <item.icon className="w-5 h-5" />
            <span className="mt-1 truncate uppercase">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
