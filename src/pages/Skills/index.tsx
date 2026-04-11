import React, { useState, useEffect } from 'react';
import { 
  Terminal as TerminalIcon,
  User, 
  Cpu, 
  Network, 
  GitBranch, 
  FileText, 
  Search, 
  Layers, 
  Activity, 
  ExternalLink,
  Link as LinkIcon,
  Download,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from './lib/utils';
import ParallaxSection from '../../components/ParallaxSection';

// --- Components ---

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) => {
  const navItems = [
    { icon: Cpu, label: '#SKILLS', to: '/skills', active: true },
    { icon: Network, label: '#NETWORK', to: '/network' },
    { icon: GitBranch, label: '#PROJECTS', to: '/projects' },
    { icon: FileText, label: '#ABOUT-ME', to: '/about' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[45] md:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "fixed left-0 top-0 h-full w-64 z-50 flex flex-col bg-background border-r border-tertiary/10 py-10 px-4 gap-12 font-label text-xs tracking-wider transition-transform duration-300 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex justify-between items-center mb-4 px-2">
          <Link to="/" className="text-xl font-bold tracking-widest text-primary hover:syntax-glow transition-all">
            ARCH_CORE_V1
          </Link>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-primary">
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4 px-2 mb-4 group cursor-pointer">
          <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center transition-colors group-hover:bg-primary/20 overflow-hidden">
            <img
              alt="System Architect Avatar"
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-500"
              src="/2_RamXCat.png"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-primary tracking-tight uppercase">ROOT_USER</div>
            <div className="text-[10px] text-tertiary opacity-50 uppercase tracking-tighter">V.2.0.4-STABLE</div>
          </div>
        </div>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-4 p-4 transition-all cursor-pointer border-l-2",
                item.active 
                  ? "bg-primary/10 text-primary border-primary shadow-[inset_4px_0_12px_rgba(199,120,221,0.1)]" 
                  : "text-tertiary/60 border-transparent hover:bg-tertiary/5 hover:text-tertiary"
              )}
            >
              <item.icon className={cn("w-5 h-5", item.active ? "text-primary" : "text-tertiary/60")} />
              <span className="font-bold tracking-widest">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-tertiary/5 space-y-4">
          <div className="flex flex-col gap-1 opacity-40 hover:opacity-100 transition-opacity">
            <div className="text-[9px] uppercase tracking-[0.2em] text-tertiary">Kernel_Status</div>
            <div className="text-[9px] text-primary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              SYSTEM_OPTIMIZED
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ onTerminalClick, onMenuClick }: { onTerminalClick: () => void, onMenuClick: () => void }) => {
  return (
    <nav className="fixed top-0 w-full z-40 bg-background/70 backdrop-blur-xl border-b border-tertiary/10 shadow-[0_0_40px_rgba(240,176,255,0.06)] flex justify-between items-center px-6 md:px-8 h-16">
      <Link to="/" className="md:hidden text-lg font-bold tracking-widest text-primary font-label hover:syntax-glow transition-all truncate pr-2">
        ARCH_CORE_V1
      </Link>
      
      {/* Desktop Actions */}
      <div className="hidden md:flex flex-grow justify-end gap-8 items-center">
        <button 
          onClick={onTerminalClick}
          className="text-primary cursor-pointer active:scale-95 transition-transform hover:scale-110"
        >
          <TerminalIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Actions */}
      <div className="md:hidden flex items-center gap-4">
        <button 
          onClick={onTerminalClick}
          className="text-primary cursor-pointer active:scale-95 transition-transform hover:scale-110"
        >
          <TerminalIcon className="w-5 h-5" />
        </button>
        <button 
          onClick={onMenuClick}
          className="text-primary cursor-pointer active:scale-95 transition-transform hover:scale-110"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
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

export default function Skills({ onMatrixToggle, onPartyToggle, onThemeChange, isTerminalOpen, setIsTerminalOpen }: { 
  onMatrixToggle: () => void, 
  onPartyToggle: () => void, 
  onThemeChange: (theme: string) => void,
  isTerminalOpen: boolean,
  setIsTerminalOpen: (open?: boolean) => void
}) {
  const [latency, setLatency] = useState(89.4);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => +(prev + (Math.random() - 0.5) * 0.5).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-tertiary selection:bg-primary/30 overflow-x-hidden">
      <Header 
        onTerminalClick={() => setIsTerminalOpen(true)} 
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      <main className="md:pl-64 pt-20 md:pt-24 pb-24 md:pb-8 px-4 md:px-8 neural-mesh min-h-screen overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          
          <ParallaxSection direction={1} distance={30}>
            {/* Page Header */}
            <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 md:mb-16 relative">
              <div className="absolute -top-6 md:-top-10 left-0 text-[60px] md:text-[120px] font-headline font-extrabold opacity-[0.03] select-none pointer-events-none whitespace-nowrap overflow-hidden w-full uppercase">
                DIAGNOSTICS
              </div>
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
                  <span className="text-primary-container">& Core Competencies</span>
                </h1>
              </div>
              <div className="text-left md:text-right font-label text-[9px] md:text-[10px] text-tertiary/60 uppercase tracking-[0.2em] leading-relaxed max-w-xs border-l-2 md:border-l-0 md:border-r-2 border-primary-container pl-4 md:pl-0 md:pr-6">
                Real-time visualization of cognitive architecture and technical proficiency indices.
              </div>
            </section>
          </ParallaxSection>

          <ParallaxSection direction={-1}>
            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-outline-variant/10 border border-outline-variant/10">
              
              {/* System Integrity: Backend_Core */}
              <div className="md:col-span-8 bg-surface-container-low p-6 md:p-10 flex flex-col justify-between group">
                <div className="flex justify-between items-start mb-8 md:mb-12">
                  <div>
                    <span className="font-label text-[10px] text-primary tracking-widest uppercase mb-2 block opacity-60">Subsystem_01</span>
                    <h3 className="text-2xl md:text-3xl font-headline font-bold text-tertiary break-words uppercase">Backend_Core</h3>
                  </div>
                  <Layers className="w-8 h-8 md:w-10 md:h-10 text-primary/30 shrink-0" />
                </div>
                
                <div className="space-y-6 md:space-y-8">
                  <SkillProgressBar label="Java_Platform" value={65} />
                  <SkillProgressBar label="SpringBoot_Arch" value={60} />
                  <SkillProgressBar label="Python_Script" value={55} />
                  <SkillProgressBar label="MySQL_Database" value={55} />
                  <SkillProgressBar label="MongoDB_System" value={50} />
                </div>
              </div>

              {/* System Integrity: Stability Meter */}
              <div className="md:col-span-4 bg-surface-container p-6 md:p-8 border-t md:border-t-0 md:border-l border-outline-variant/10 flex flex-col">
                <div className="mb-8 md:mb-10">
                  <span className="font-label text-[10px] text-secondary tracking-widest uppercase mb-2 block opacity-60">System_Integrity</span>
                  <h3 className="text-xl font-headline font-bold text-tertiary uppercase break-words">Module_Stats</h3>
                </div>
                
                <div className="flex-grow flex items-center justify-center relative py-8 md:py-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 md:w-48 md:h-48 border border-outline-variant/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
                    <div className="absolute w-28 h-28 md:w-40 md:h-40 border-t-2 border-secondary rounded-full animate-[spin_10s_linear_infinite]"></div>
                  </div>
                  <div className="relative text-center">
                    <div className="text-3xl md:text-4xl font-headline font-bold text-secondary syntax-glow">86.4%</div>
                    <div className="text-[8px] md:text-[9px] font-label text-tertiary tracking-widest mt-1 uppercase">System_Stability</div>
                  </div>
                </div>

                <div className="mt-8 md:mt-10 space-y-3 md:space-y-4">
                  {[
                    { label: 'Node_Environ', status: 'Ready' },
                    { label: 'MongoDB', status: 'Ready' },
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
                  <h3 className="text-xl md:text-2xl font-headline font-bold text-tertiary mb-4 md:mb-6 uppercase">Frontend_Interface</h3>
                  <p className="font-body text-xs md:text-sm text-tertiary/70 leading-relaxed mb-6 md:mb-8 max-w-sm">
                    Architecting responsive design languages through precision-tuned components and modern UI primitives.
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="bg-surface-container-highest p-3 md:p-4 border border-outline-variant/10">
                      <div className="text-[10px] font-label text-tertiary mb-1 uppercase">Javascript</div>
                      <div className="text-xl md:text-2xl font-headline font-bold text-primary uppercase">50%</div>
                    </div>
                    <div className="bg-surface-container-highest p-3 md:p-4 border border-outline-variant/10">
                      <div className="text-[10px] font-label text-tertiary mb-1 uppercase">ReactJS</div>
                      <div className="text-xl md:text-2xl font-headline font-bold text-primary uppercase">40%</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-8 -bottom-8 opacity-5 transition-transform group-hover:scale-110 duration-700 pointer-events-none">
                  <Layers className="w-40 h-40 md:w-48 md:h-48" />
                </div>
              </div>

              {/* Specialized Grid */}
              <div className="md:col-span-6 bg-surface-container border-t border-outline-variant/10 grid grid-cols-2 gap-px bg-outline-variant/20">
                {[
                  { icon: GitBranch, label: 'DEVOPS_L1', value: 'Docker_45%', color: 'text-primary' },
                  { icon: Network, label: 'SYST_L2', value: 'Linux_58%', color: 'text-secondary' },
                  { icon: Activity, label: 'WORKFLOW_L3', value: 'Github Actions_40%', color: 'text-primary' },
                  { icon: TerminalIcon, label: 'CORE_L4', value: 'Vim_70%', color: 'text-secondary' },
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
          </ParallaxSection>

          <ParallaxSection direction={1}>
            {/* Execution Log */}
            <section className="mt-16 md:mt-24 space-y-8 md:space-y-12">
              <div className="flex items-center gap-4 md:gap-6">
                <h2 className="text-xl md:text-2xl font-headline font-bold tracking-widest text-primary uppercase whitespace-nowrap">Execution_Log</h2>
                <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
              </div>
              
              <div className="border border-outline-variant/10">
                <LogItem 
                  date="2026 — PRESENT"
                  title="Fullstack Architect / Independent Development"
                  description="Currently building AI-based failure prediction and self-healing systems for CI/CD pipelines while maintaining clean, scalable full-stack architectures."
                />
              </div>
            </section>
          </ParallaxSection>

          {/* Bottom CTA */}
          <section className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-8 pb-8 md:pb-0">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-primary animate-pulse shrink-0"></div>
              <div className="font-label text-[10px] md:text-xs tracking-widest uppercase">Kernel_Status: All Systems Nominal</div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full md:w-auto">
              <a
                href="/RamXCat_Biography.txt"
                download="RamXCat_Biography.txt"
                className="font-label text-[10px] md:text-xs text-tertiary hover:text-primary transition-colors uppercase tracking-[0.2em] flex items-center justify-center gap-2"
              >
                <Download className="w-3 h-3" />
                <span>Download_Bio</span>
              </a>
              <Link 
                to="/network"
                className="bg-primary-container px-6 md:px-8 py-3 text-center text-on-primary-container font-label text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] active:scale-95 transition-transform w-full sm:w-auto"
              >
                Initiate_Linkage
              </Link>
            </div>
          </section>

        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 w-full z-50 md:hidden bg-background/90 backdrop-blur-md border-t border-tertiary/15 flex justify-around items-center h-16 px-2">
        <Link className="text-primary flex flex-col items-center justify-center py-2 flex-1" to="/skills">
          <Cpu className="w-5 h-5" />
          <span className="mt-1 font-label text-[9px] uppercase tracking-tighter">#SKILLS</span>
        </Link>
        <Link className="text-tertiary opacity-50 flex flex-col items-center justify-center py-2 flex-1" to="/network">
          <Network className="w-5 h-5" />
          <span className="mt-1 font-label text-[9px] uppercase tracking-tighter">#NETWORK</span>
        </Link>
        <Link className="text-tertiary opacity-50 flex flex-col items-center justify-center py-2 flex-1" to="/projects">
          <GitBranch className="w-5 h-5" />
          <span className="mt-1 font-label text-[9px] uppercase tracking-tighter">#PROJECTS</span>
        </Link>
        <Link className="text-tertiary opacity-50 flex flex-col items-center justify-center py-2 flex-1" to="/about">
          <FileText className="w-5 h-5" />
          <span className="mt-1 font-label text-[9px] uppercase tracking-tighter">#ABOUT-ME</span>
        </Link>
      </nav>
    </div>
  );
}
