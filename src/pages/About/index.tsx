import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { Link } from "react-router-dom";
import ParallaxSection from "../../components/ParallaxSection";
import {
  Cpu,
  Network,
  GitBranch,
  FileText,
  Radio,
  Terminal as TerminalIcon,
  Menu,
  X
} from "lucide-react";

// --- Data ---
const EXPERIENCES = [
  {
    period: "2026 — PRESENT",
    role: "AI-BASED FAILURE PREDICTION AND SELF-HEALING SYSTEM FOR CI/CD PIPELINES",
    company: "Independent Research & Development",
    description:
      "Designing and implementing an intelligent CI/CD framework that leverages machine learning to predict build and test failures in real-time and autonomously triggers self-healing mechanisms using Docker, GitHub Actions, SpringBoot microservices, and Linux infrastructure.",
  },
  {
    period: "2024",
    role: "WASTE COLLECTION MANAGEMENT SYSTEM",
    company: "Full-stack Web Development",
    description:
      "Full-stack web application for smart waste collection management. Built user, admin and staff portals with real-time tracking, image upload, dark mode and secure authentication. https://github.com/RamXCat/waste-collection-website",
  },
  {
    period: "2024",
    role: "TASK REMINDER ANDROID APP",
    company: "Mobile Native Development",
    description:
      "Modern Android application with Kotlin, Room Database, WorkManager and smart reminders. Features MVVM architecture, background notifications and home-screen widgets. https://github.com/RamXCat/TaskReminderApp",
  },
];

const ACADEMIC_RECORD = [
  {
    degree: "Pursuing B.E. Computer Science",
    institution: "Engineering Academy",
    meta: "CLASS_OF_2027 / ONGOING",
  },
];

const TECH_STACK = ["Java", "SpringBoot", "React", "Docker", "Linux", "MySQL"];

// --- Sub-components ---
function SidebarItem({
  icon,
  label,
  to,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-3 transition-all cursor-pointer font-mono text-xs tracking-wider ${active
          ? "bg-primary/10 text-primary border-l-2 border-primary"
          : "text-tertiary opacity-70 hover:bg-tertiary/5 hover:opacity-100"
        }`}
    >
      <span className="text-sm">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function MobileNavItem({
  icon,
  label,
  to,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center py-2 flex-1 transition-colors ${active ? "text-primary" : "text-tertiary opacity-50"
        }`}
    >
      {icon}
      <span className="font-mono text-[9px] mt-1 uppercase">{label}</span>
    </Link>
  );
}

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) => {
  const navItems = [
    { icon: Cpu, label: '#SKILLS', to: '/skills', active: false },
    { icon: Network, label: '#NETWORK', to: '/network', active: false },
    { icon: GitBranch, label: '#PROJECTS', to: '/projects', active: false },
    { icon: FileText, label: '#ABOUT-ME', to: '/about', active: true },
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
              className={`flex items-center gap-4 p-4 transition-all cursor-pointer border-l-2 ${item.active
                  ? 'bg-primary/10 text-primary border-primary shadow-[inset_4px_0_12px_rgba(199,120,221,0.1)]'
                  : 'text-tertiary/60 border-transparent hover:bg-tertiary/5 hover:text-tertiary'
                }`}
            >
              <item.icon className={`w-5 h-5 ${item.active ? 'text-primary' : 'text-tertiary/60'}`} />
              <span className="font-bold tracking-widest">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default function About({ onMatrixToggle, onPartyToggle, onThemeChange, isTerminalOpen, setIsTerminalOpen }: {
  onMatrixToggle: () => void,
  onPartyToggle: () => void,
  onThemeChange: (theme: string) => void,
  isTerminalOpen: boolean,
  setIsTerminalOpen: (open?: boolean) => void
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-tertiary selection:bg-primary/30">
      {/* Top Bar */}
      <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-tertiary/10 flex justify-between items-center px-6 md:px-8 h-16 shadow-[0_0_40px_rgba(240,176,255,0.06)]">
        <Link
          to="/"
          className="md:hidden text-lg font-bold tracking-widest text-primary font-label truncate pr-2 hover:syntax-glow transition-all"
        >
          ARCH_CORE_V1
        </Link>
        <div className="flex-grow justify-end items-center gap-4 md:gap-8 flex">
          <TerminalIcon
            onClick={() => setIsTerminalOpen(true)}
            className="text-primary w-5 h-5 cursor-pointer active:scale-95 transition-transform hover:scale-110"
          />
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-primary">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <main className="md:ml-64 pt-24 md:pt-32 pb-24 px-6 md:px-12 lg:px-20 overflow-x-hidden">
        <ParallaxSection direction={1} distance={30}>
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20 md:mb-32"
          >
            <div className="lg:col-span-7">
              <p className="font-mono text-primary mb-4 tracking-widest text-xs md:text-sm flex items-center gap-2">
                <span className="w-8 h-px bg-primary" />
                ENTITY_IDENTIFICATION_FILE
              </p>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
                JAVA FULLSTACK ARCHITECT <br />
                <span className="text-primary-container">RAMXCAT</span>
              </h1>
              <p className="font-sans text-lg md:text-xl text-tertiary max-w-xl leading-relaxed">
                Operating at the intersection of clean Java logic and modern full-stack design. Specialized in building scalable, high-performance web and mobile applications from Bangalore, Karnataka.
              </p>
            </div>
            <div className="lg:col-span-5 relative group mt-8 lg:mt-0">
              <div className="lg:w-[322px] lg:h-[435px] aspect-square lg:aspect-auto bg-surface-container overflow-hidden mx-auto lg:mx-0">
                <img
                  alt="Architect Portrait"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                  src="/2_img.png"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-primary-container p-4 md:p-6 w-40 md:w-48 font-mono text-background text-[10px] md:text-xs">
                <p>SERIAL: RXC-25-BLR</p>
                <p>STATUS: ACTIVE</p>
                <p>CLASS: 3RD YEAR</p>
              </div>
            </div>
          </motion.header>
        </ParallaxSection>

        <ParallaxSection direction={-1}>
          {/* Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-20 md:mb-32">
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-2 lg:col-span-3 bg-surface-container-low p-6 md:p-8"
            >
              <span className="font-mono text-secondary text-xs mb-6 block">// 01_VISION</span>
              <h3 className="font-headline text-2xl font-bold mb-4 text-white">Structural Integrity</h3>
              <p className="text-tertiary opacity-80 leading-relaxed text-sm md:text-base">
                Code is more than logic — it is an architectural blueprint. Every endpoint, every component, every service must serve a purpose within the greater system. I build applications that don’t just work — they scale, they endure, and they solve real problems.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-2 lg:col-span-3 bg-surface-container-highest p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-secondary text-xs mb-6 block">// 02_TECH_STACK</span>
                <div className="flex flex-wrap gap-2">
                  {TECH_STACK.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 md:px-3 py-1 bg-surface-container text-primary font-mono text-[10px] md:text-xs uppercase tracking-tighter"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-outline-variant/10 text-3xl md:text-4xl font-headline font-bold text-primary">
                0+ <span className="text-xs font-mono text-tertiary uppercase">YRS_XP</span>
              </div>
            </motion.div>
          </section>
        </ParallaxSection>

        <ParallaxSection direction={1}>
          {/* Experience Log */}
          <section className="mb-20 md:mb-32">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-outline-variant/20 pb-4 mb-8 md:mb-12 gap-2">
              <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-white">EXPERIENCE_LOG</h2>
              <span className="font-mono text-[10px] md:text-xs text-primary">DESCENDING_ORDER</span>
            </div>
            <div className="space-y-px">
              {EXPERIENCES.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 hover:bg-surface-container-low transition-colors px-4 -mx-4"
                >
                  <div className="lg:col-span-2">
                    <p className="font-mono text-xs md:text-sm text-tertiary">{exp.period}</p>
                  </div>
                  <div className="lg:col-span-4">
                    <h4 className="font-headline text-lg md:text-xl font-bold uppercase text-white">{exp.role}</h4>
                    <p className="font-mono text-primary text-[10px] md:text-xs mt-1">{exp.company}</p>
                  </div>
                  <div className="lg:col-span-6">
                    <p className="text-tertiary text-sm md:text-base leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </ParallaxSection>

        {/* Education & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <section>
            <h3 className="font-mono text-[10px] md:text-xs text-primary mb-6 md:mb-8 tracking-widest uppercase">// ACADEMIC_RECORD</h3>
            <div className="space-y-8">
              {ACADEMIC_RECORD.map((edu, idx) => (
                <div key={idx}>
                  <h4 className="font-headline text-lg font-bold text-white">{edu.degree}</h4>
                  <p className="text-tertiary text-sm mt-1">{edu.institution}</p>
                  <p className="font-mono text-[10px] text-secondary mt-2">{edu.meta}</p>
                </div>
              ))}
            </div>
          </section>
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary/5 p-6 md:p-10 border-l-2 border-primary"
          >
            <h3 className="font-mono text-[10px] md:text-xs text-primary mb-6 tracking-widest uppercase">// CORE_MANIFESTO</h3>
            <blockquote className="font-headline text-xl md:text-2xl font-light italic leading-snug text-white">
              “Simplicity is the highest form of sophistication. True system design is found in the ruthless elimination of the non-essential until only clean, powerful, and scalable architecture remains.”
            </blockquote>
            <p className="font-mono text-[10px] md:text-xs mt-6 md:mt-8 text-tertiary">— RAMXCAT</p>
          </motion.section>
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 w-full z-50 md:hidden bg-background/90 backdrop-blur-md border-t border-tertiary/15 flex justify-around items-center h-16 px-2">
        <Link className="text-tertiary opacity-50 flex flex-col items-center justify-center py-2 flex-1" to="/skills">
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
        <Link className="text-primary flex flex-col items-center justify-center py-2 flex-1" to="/about">
          <FileText className="w-5 h-5" />
          <span className="mt-1 font-label text-[9px] uppercase tracking-tighter">#ABOUT-ME</span>
        </Link>
      </nav>
    </div>
  );
}
