import React, { useState } from 'react';
import {
  Terminal as TerminalIcon,
  Cpu,
  Network as Hub,
  GitBranch,
  FileText,
  Eye,
  Download,
  ArrowRight,
  Activity,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from './lib/utils';
import ParallaxSection from '../../components/ParallaxSection';

// --- Components ---

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) => {
  const navItems = [
    { icon: Cpu, label: '#SKILLS', to: '/skills', active: false },
    { icon: Hub, label: '#NETWORK', to: '/network', active: false },
    { icon: GitBranch, label: '#PROJECTS', to: '/projects', active: true },
    { icon: FileText, label: '#ABOUT-ME', to: '/about', active: false },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed left-0 top-0 h-full w-64 z-50 flex flex-col bg-background border-r border-tertiary/10 py-10 px-4 gap-12 font-label text-xs tracking-wider transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-center mb-4">
          <Link to="/" className="text-xl font-bold tracking-widest text-primary hover:syntax-glow transition-all">
            ARCH_CORE_V1
          </Link>
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
              className={cn(
                "flex items-center gap-4 p-4 transition-all cursor-pointer border-l-2",
                item.active
                  ? 'bg-primary/10 text-primary border-primary shadow-[inset_4px_0_12px_rgba(199,120,221,0.1)]'
                  : 'text-tertiary/60 border-transparent hover:bg-tertiary/5 hover:text-tertiary'
              )}
            >
              <item.icon className={cn("w-5 h-5", item.active ? "text-primary" : "text-tertiary/60")} />
              <span className="font-bold tracking-widest">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

const TopBar = ({ onMenuClick, onTerminalClick }: { onMenuClick: () => void; onTerminalClick: () => void }) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-background/70 backdrop-blur-xl border-b border-tertiary/10 shadow-[0_0_40px_rgba(240,176,255,0.06)] flex justify-between items-center px-6 md:px-8 h-16">
      <Link to="/" className="md:hidden text-lg font-bold tracking-widest text-primary font-label truncate pr-2 hover:syntax-glow transition-all">
        ARCH_CORE_V1
      </Link>

      <div className="flex flex-grow justify-end items-center gap-4 md:gap-8">
        <div className="hidden md:flex items-center gap-4 text-primary">
          <button 
            onClick={onTerminalClick}
            className="hover:text-primary transition-colors duration-200 active:scale-95"
          >
            <TerminalIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <TerminalIcon 
            onClick={onTerminalClick}
            className="text-primary w-5 h-5 cursor-pointer active:scale-95 transition-transform" 
          />
          <button onClick={onMenuClick} className="text-primary">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

interface ProjectCardProps {
  title: string;
  branch?: string;
  uptime?: string;
  lang?: string;
  description: string;
  image: string;
  featured?: boolean;
  tags?: string[];
  link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  branch,
  uptime,
  lang,
  description,
  image,
  featured = false,
  tags = [],
  link
}) => {
  if (featured) {
    return (
      <div className="md:col-span-12 lg:col-span-8 bg-surface-container-low overflow-hidden group relative flex flex-col border-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
        <div className="h-64 md:h-96 w-full relative border-0">
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
            <a 
              href={link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-container text-on-primary-container px-6 py-3 font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary active:scale-95 transition-all w-full sm:w-auto text-center"
            >
              <Eye className="w-4 h-4" />
              INSPECT_CODE
            </a>
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
      <a 
        href={link || "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-auto w-full py-3 bg-surface-container-high text-white font-bold text-xs hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center"
      >
        VIEW_RESOURCES
      </a>
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

const PROJECTS_DATA = [
  {
    title: "AI_SELF_HEALING_CICD",
    branch: "research/ml-core",
    uptime: "2026_PROTO",
    lang: "JAVA/PYTHON",
    description: "Designing and implementing an intelligent CI/CD framework that leverages machine learning to predict build failures in real-time and autonomously triggers self-healing mechanisms using Docker and SpringBoot microservices.",
    image: "/ci_cd.png",
    featured: true,
    tags: ['JAVA', 'ML', 'SpringBoot', 'DOCKER', 'ACTIONS'],
    link: "https://github.com/RamXCat"
  },
  {
    title: "WASTE_MANAGEMENT_HUB",
    branch: "main",
    uptime: "2024",
    lang: "JAVA/REACT",
    description: "Full-stack web application for smart waste collection management. Built portals for users, admins, and staff with real-time tracking, image uploads, and secure authentication.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop",
    tags: ['MYSQL', 'SpringBoot', 'REACT', 'DARK_MODE'],
    link: "https://github.com/RamXCat/waste-collection-website"
  },
  {
    title: "TASK_REMINDER_ANDROID",
    branch: "play/store_v1",
    uptime: "2024",
    lang: "KOTLIN",
    description: "Modern Android application built with Kotlin and Room Database. Features smart reminders via WorkManager, background notifications, and custom home-screen widgets.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    tags: ['KOTLIN', 'MVVM', 'ROOM', 'WORKER'],
    link: "https://github.com/RamXCat/TaskReminderApp"
  }
];

export default function Projects({ onMatrixToggle, onPartyToggle, onThemeChange, isTerminalOpen, setIsTerminalOpen }: { 
  onMatrixToggle: () => void, 
  onPartyToggle: () => void, 
  onThemeChange: (theme: string) => void,
  isTerminalOpen: boolean,
  setIsTerminalOpen: (open?: boolean) => void
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-tertiary selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <TopBar 
        onMenuClick={() => setIsSidebarOpen(true)} 
        onTerminalClick={() => setIsTerminalOpen(true)}
      />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="md:ml-64 pt-24 pb-24 px-4 md:px-12 neural-mesh min-h-screen overflow-x-hidden">
        <ParallaxSection direction={1} distance={30}>
          {/* Hero Section */}
          <section className="mb-16 max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative">
            <div className="absolute -top-6 md:-top-10 left-0 text-[60px] md:text-[120px] font-headline font-extrabold opacity-[0.03] select-none pointer-events-none whitespace-nowrap overflow-hidden w-full">
              REPOSITORY_CLUSTER
            </div>
            <div className="space-y-4 max-w-full">
              <div className="flex items-center gap-2 text-primary font-mono text-[10px] md:text-sm tracking-widest uppercase">
                <TerminalIcon className="w-4 h-4" />
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
        </ParallaxSection>

        <ParallaxSection direction={-1}>
          {/* Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
            {PROJECTS_DATA.filter(p => !!p.featured).map((p, idx) => (
              <ProjectCard
                key={`${p.title}-${idx}`}
                title={p.title}
                branch={p.branch}
                uptime={p.uptime}
                lang={p.lang}
                description={p.description || ""}
                image={p.image || ""}
                featured={p.featured}
                tags={p.tags}
                link={p.link}
              />
            ))}

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

            {PROJECTS_DATA.filter(p => !p.featured).map((p, idx) => (
              <ProjectCard
                key={`${p.title}-${idx}`}
                title={p.title}
                branch={p.branch}
                uptime={p.uptime}
                lang={p.lang}
                description={p.description || ""}
                image={p.image || ""}
                featured={p.featured}
                tags={p.tags}
                link={p.link}
              />
            ))}
          </section>
        </ParallaxSection>

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
            <div className="opacity-50 text-center md:text-right">© 2026 BY RAMXCAT // SYSTEM_RESERVED</div>
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
      <nav className="fixed bottom-0 w-full z-50 md:hidden bg-background/90 backdrop-blur-md border-t border-outline-variant/15 flex justify-around items-center h-16 px-2">
        <Link className="text-tertiary opacity-50 flex flex-col items-center justify-center py-2 flex-1" to="/skills">
          <Cpu className="w-5 h-5" />
          <span className="mt-1 font-label text-[9px] uppercase tracking-tighter">#SKILLS</span>
        </Link>
        <Link className="text-tertiary opacity-50 flex flex-col items-center justify-center py-2 flex-1" to="/network">
          <Hub className="w-5 h-5" />
          <span className="mt-1 font-label text-[9px] uppercase tracking-tighter">#NETWORK</span>
        </Link>
        <Link className="text-primary flex flex-col items-center justify-center py-2 flex-1" to="/projects">
          <GitBranch className="w-5 h-5" />
          <span className="mt-1 font-label text-[9px] uppercase tracking-tighter font-bold">#PROJECTS</span>
        </Link>
        <Link className="text-tertiary opacity-50 flex flex-col items-center justify-center py-2 flex-1" to="/about">
          <FileText className="w-5 h-5" />
          <span className="mt-1 font-label text-[9px] uppercase tracking-tighter">#ABOUT-ME</span>
        </Link>
      </nav>
    </div>
  );
}
